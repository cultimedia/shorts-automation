import dotenv from 'dotenv';
import fs from 'fs/promises';
import path from 'path';
import OpenAI from 'openai';
import Papa from 'papaparse';

dotenv.config({ path: 'config/.env' });

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

const SYSTEM_PROMPT = `You are Dark DaVinci, a specialist in creating Midjourney prompts with a focus on balance, integrity, and visual harmony.

Base Style Guide:
Create vibrant, energetic scenes with Italian Futurism influences - bold, angular, dynamic compositions.
Color Palette:
- Deep, cool-toned base: midnight blue, forest green
- Accents: bright turquoise, aqua
- Highlights: electric tangerine, neon lime
Style Elements:
- Sharp lines and exaggerated perspectives suggesting motion
- 1990s editorial illustration aesthetic
- Active, layered compositions
- Modern flair mixed with historical art styles

Follow this framework for every prompt:
1. Visual Description: Clear nouns and modifiers incorporating the style guide elements
2. Detail Layer: Specify composition, lighting, colors from the palette, mood, and perspective
3. Artistic Style: Blend Italian Futurism with 90s editorial style

Return your response in TWO parts, separated by exactly three dashes (---):

First, show your framework thinking:
1. Visual Description: [your description]
2. Detail Layer: [your details]
3. Artistic Style: [your style notes]

After the ---, provide the complete, final Midjourney prompt in this exact format:
[Your detailed prompt], Italian Futurism style, sharp angular composition, editorial illustration, neon accents --ar 9:16 --s 750 --style raw

Note: Do NOT include any labels like "Materials:", "Main Idea Nouns:" in the final prompt.`;

async function generateImagePrompts(script) {
  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [
        {
          role: "system",
          content: SYSTEM_PROMPT
        },
        {
          role: "user",
          content: `Create a cinematic Midjourney prompt for this script: "${script}". 
          Follow the framework and separate your thinking from the final prompt with ---. 
          Ensure the final prompt incorporates the style guide elements and uses correct parameters.`
        }
      ],
      temperature: 0.7
    });

    const response = completion.choices[0].message.content;
    const [framework, finalPrompt] = response.split('---').map(s => s.trim());
    
    return {
      framework,
      finalPrompt
    };
  } catch (error) {
    console.error('Error generating image prompt:', error);
    return {
      framework: '',
      finalPrompt: ''
    };
  }
}

async function processScripts() {
  try {
    // Read the scripts CSV
    const csvContent = await fs.readFile('data/MetacrisesScripts.csv', 'utf-8');
    const { data } = Papa.parse(csvContent, { header: true });
    
    const results = [];
    
    // Process each script
    for (const row of data) {
      console.log(`Processing script for ${row.filename}...`);
      
      const prompt = await generateImagePrompts(row.script);
      
      results.push({
        ...row,
        prompt_framework: prompt.framework,
        midjourney_prompt: prompt.finalPrompt
      });
      
      // Add a small delay to avoid rate limiting
      await new Promise(resolve => setTimeout(resolve, 1000));
    }
    
    // Save the results with timestamp
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    const outputCsv = Papa.unparse(results);
    await fs.writeFile(
      `data/scripts_with_prompts_${timestamp}.csv`,
      outputCsv
    );
    
    console.log('Successfully generated all image prompts!');
    
  } catch (error) {
    console.error('Error processing scripts:', error);
  }
}

// Add command line interface
if (process.argv[2] === '--run') {
  processScripts();
}