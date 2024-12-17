import dotenv from 'dotenv';
import fs from 'fs/promises';
import Papa from 'papaparse';
import OpenAI from 'openai';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

dotenv.config({ path: 'config/.env' });

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY
});

const generateMetadata = async (script, visual) => {
    const prompt = `Given this script and visual prompt for a YouTube video:

Script: "${script}"
Visual: "${visual}"

Generate two engaging title and description pairs that would work well for YouTube. 
The titles should be attention-grabbing but not clickbait, around 40-60 characters.
The descriptions should be 2-3 sentences, include relevant keywords, and end with a call to action.

Format as JSON:
{
    "title1": "title here",
    "description1": "description here",
    "title2": "alternative title here",
    "description2": "alternative description here"
}`;

    try {
        const completion = await openai.chat.completions.create({
            model: "gpt-4-1106-preview",
            messages: [{ role: "user", content: prompt }],
            response_format: { type: "json_object" }
        });

        return JSON.parse(completion.choices[0].message.content);
    } catch (error) {
        console.error('Error generating metadata:', error);
        return null;
    }
};

const processScripts = async () => {
    try {
        // Read the input CSV
        const inputData = await fs.readFile('data/MetacrisesScripts.csv', 'utf-8');
        const parsed = Papa.parse(inputData, { header: true });
        
        const results = [];
        const timestamp = new Date().toISOString();

        console.log('Beginning metadata generation...');
        
        for (const row of parsed.data) {
            console.log(`Processing ${row.filename}...`);
            
            const metadata = await generateMetadata(row.script, row.visual);
            
            if (metadata) {
                results.push({
                    filename: row.filename,
                    title: metadata.title1,
                    description: metadata.description1,
                    alt_title: metadata.title2,
                    alt_description: metadata.description2,
                    timestamp: timestamp
                });
            }
        }

        // Generate output CSV
        const csv = Papa.unparse(results);
        const outputPath = join(__dirname, '..', 'data', `youtube_metadata_${timestamp.split('T')[0]}.csv`);
        
        await fs.writeFile(outputPath, csv);
        console.log(`Metadata generated and saved to ${outputPath}`);
        
    } catch (error) {
        console.error('Fatal error:', error);
    }
};

// Execute if run directly
if (process.argv[1] === fileURLToPath(import.meta.url)) {
    processScripts();
}