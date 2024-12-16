# The Dark DaVinci Playbook
*A Guide to Automated Visual Storytelling*

## Table of Contents
1. [Project Setup](#project-setup)
2. [Environment Configuration](#environment-configuration)
3. [Data Preparation](#data-preparation)
4. [The Core Operation](#the-core-operation)
5. [Execution Protocol](#execution-protocol)
6. [Visual Alchemy](#visual-alchemy)
7. [Notes on Usage](#notes-on-usage)

## Project Setup
First, we must prepare our workspace - like an artist arranging their studio.

```bash
# Create project structure if it doesn't exist
mkdir -p scripts
mkdir -p data
mkdir -p config
```

## Environment Configuration
Proper tool preparation is essential - like mixing the perfect palette.

```bash
# Create package.json in project root
{
  "name": "shorts-automation",
  "type": "module",
  "version": "1.0.0",
  "description": "Automation tools for short-form video content",
  "dependencies": {
    "openai": "^4.0.0",
    "dotenv": "^16.0.0",
    "papaparse": "^5.0.0"
  }
}

# Install dependencies
npm install

# Create .env file in config directory
echo "OPENAI_API_KEY=your_key_here" > config/.env
```

## Data Preparation
Organizing our source material - like sketching the initial composition.

Create `data/MetacrisesScripts.csv` with format:
```csv
filename,script
AP1,"Your first script here"
AP2,"Your second script here"
```

## The Core Operation
Our primary script - like a master artist's favorite brush.

Save as `scripts/generate-prompts.js`:
```javascript
// Import necessary tools
import dotenv from 'dotenv';
import fs from 'fs/promises';
import OpenAI from 'openai';
import Papa from 'papaparse';

// Configuration details here...
```

## Execution Protocol
Time to bring our creation to life - like unveiling a masterpiece.

```bash
# Run the prompt generator
node scripts/generate-prompts.js --run
```

## Visual Alchemy
Our style guide infuses each creation with:
- Italian Futurism's bold, angular dynamism
- Deep, cool-toned palette (midnight blue, forest green)
- Bright accents (turquoise, aqua)
- Electric highlights (tangerine, lime)
- Sharp lines and exaggerated perspectives
- 1990s editorial illustration aesthetic
- Active, layered compositions

## Notes on Usage
- Always verify the output CSV in the data directory
- Each prompt follows the framework stages before the final command
- The midjourney_prompt column contains ready-to-use commands
- Aspect ratio is optimized for Shorts (9:16)
- Standard parameters: --s 750 --style raw

### Standard Prompt Structure:
1. Framework Thinking:
   ```
   1. Visual Description: [Scene elements]
   2. Detail Layer: [Composition details]
   3. Artistic Style: [Style integration]
   ```

2. Final Prompt Format:
   ```
   [Detailed scene description], Italian Futurism style, sharp angular composition, editorial illustration, neon accents --ar 9:16 --s 750 --style raw
   ```

*Remember: A good artist knows their tools, but a great artist knows when to break the rules.*