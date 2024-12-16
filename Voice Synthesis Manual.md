# The Mad Scientist's Guide to Voice Synthesis
*A Comprehensive Manual for Digital Voice Generation*

## Table of Contents
1. [Specimen Preparation](#specimen-preparation)
2. [Data Harvesting](#data-harvesting)
3. [Environment Sterilization](#environment-sterilization)
4. [The Core Experiment](#the-core-experiment)
5. [Execution Protocol](#execution-protocol)
6. [Version Control](#version-control)

## Specimen Preparation
First, we must create our laboratory structure. Like preparing separate chambers for our various experiments.

```bash
# Create your containment structure
mkdir -p data
mkdir -p audio/raw
mkdir -p audio/enhanced
```

## Data Harvesting
The preparation of our test subjects is crucial. Like selecting the perfect specimens for cloning.

1. Export Google Sheet to CSV
2. Place in `data/MetacrisesScripts.csv`
3. Format must be:
```csv
filename,script
specimen_001,"First experimental utterance"
specimen_002,"Second collection of words"
```

## Environment Sterilization
Proper tool preparation is essential. Like sterilizing your surgical implements.

```bash
# Create and activate your isolation chamber
python3 -m venv venv
source venv/bin/activate

# Install your medical supplies
pip install elevenlabs python-dotenv pandas
```

## The Core Experiment
Our primary procedure. Like the perfect recipe for creating artificial life.

```python
# audio_gen.py
from elevenlabs import ElevenLabs
import os
from pathlib import Path
from dotenv import load_dotenv
import pandas as pd
import logging

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

def load_scripts(csv_path):
    try:
        df = pd.read_csv(csv_path)
        logger.info(f"Found {len(df)} potential victims... I mean, scripts")
        return df
    except Exception as e:
        logger.error(f"Failed to read our subject list: {e}")
        return None

def process_scripts():
    load_dotenv('config/.env')
    api_key = os.getenv('ELEVENLABS_API_KEY')

    if not api_key:
        logger.error("No API key found. Like a surgeon without hands.")
        return

    Path('audio/raw').mkdir(parents=True, exist_ok=True)
    client = ElevenLabs(api_key=api_key)
    scripts_df = load_scripts('data/MetacrisesScripts.csv')
    
    if scripts_df is None:
        return

    for index, row in scripts_df.iterrows():
        logger.info(f"Processing specimen {row['filename']}")
        try:
            audio_generator = client.text_to_speech.convert(
                voice_id="rqIpnbTdDDC7mpH83y5P",  # Your voice ID here
                model_id="eleven_multilingual_v2",
                text=row['script']
            )
            
            audio_data = b''.join(audio_generator)
            output_path = f"audio/raw/{row['filename']}.mp3"
            
            with open(output_path, 'wb') as f:
                f.write(audio_data)
                
            logger.info(f"Specimen preserved in {output_path}")
            
        except Exception as e:
            logger.error(f"Failed to process specimen {row['filename']}: {e}")
            continue

if __name__ == "__main__":
    process_scripts()
```

## Execution Protocol
Time to bring our creation to life. Like throwing the switch on a moonless night.

```bash
# Activate your environment (if not already active)
source venv/bin/activate

# Run the experiment
python3 scripts/audio_gen.py
```

## Version Control
Document everything. Like maintaining a proper medical record of our... procedures.

```bash
# Document your procedures
git add scripts/audio_gen.py data/MetacrisesScripts.csv
git commit -m "feat(voice): Generated new batch of synthetic specimens"
git push
```

## Notes on Usage
- Always check audio/raw for your newly generated specimens
- Each run will overwrite existing files unless renamed
- Consider backing up particularly successful mutations
- Monitor system resources during mass generation

*Remember: A good mad scientist is a methodical mad scientist.*