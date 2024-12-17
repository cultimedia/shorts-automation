# The Spider's Guide to YouTube Metadata Generation
*A Comprehensive Manual for Digital Marketing Mutations*

## Table of Contents
1. [Project Architecture](#project-architecture)
2. [Environment Preparation](#environment-preparation)
3. [The Specimen](#the-specimen)
4. [The Operation](#the-operation)
5. [Quality Control](#quality-control)

## Project Architecture
Like any well-constructed web, structure is everything.

```bash
shorts-automation/
├── config/
│   └── .env             # Your secrets stay here, like a spider's hidden cache
├── data/
│   ├── MetacrisesScripts.csv      # Source material
│   └── youtube_metadata_*.csv      # Our beautiful mutations
└── scripts/
    └── generate-youtube-metadata.js # The venom that makes the magic happen
```

## Environment Preparation
First, ensure your laboratory is properly equipped.

```bash
# Initialize your experiment
npm init -y

# Install your tools
npm install dotenv openai papaparse

# Prepare your package.json
{
    "name": "shorts-automation",
    "type": "module",
    "version": "1.0.0",
    "description": "Automation tools for short-form video content",
    "dependencies": {
        "dotenv": "^16.4.7",
        "openai": "^4.77.0",
        "papaparse": "^5.4.1"
    }
}
```

## The Specimen
Your `MetacrisesScripts.csv` should be properly formatted, like a well-preserved fly:

```csv
filename,script,visual
specimen_001,"Your script here","Your visual prompt here"
```

## The Operation
Running the experiment is beautifully simple:

```bash
node scripts/generate-youtube-metadata.js
```

The script will:
1. Read your specimens from `MetacrisesScripts.csv`
2. Consult with Dr. GPT-4 for each specimen
3. Generate two variations of titles and descriptions
4. Document everything in a timestamped CSV file

## Quality Control
Each specimen in your output CSV will contain:
- Original filename
- Primary title (40-60 characters of pure attention-grabbing potential)
- Primary description (2-3 sentences with keywords and call to action)
- Alternative title (for A/B testing your prey... er, audience)
- Alternative description (because variety is the spice of life)
- Timestamp (for proper specimen documentation)

## Notes on Usage
- Always check your `MetacrisesScripts.csv` for accuracy before running
- Each run creates a fresh CSV with timestamp
- Keep your API key secured in `config/.env`
- Monitor your GPT-4 usage like a spider monitors its web

*Remember: A good metadata generator is like a good spider - patient, precise, and always ready to catch attention in its web.*