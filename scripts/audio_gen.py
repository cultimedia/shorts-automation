import os
from elevenlabs.client import Client
from elevenlabs.api import Models, Voices
from datetime import datetime
from dotenv import load_dotenv

# Load our secret ingredients from the correct location
load_dotenv('config/.env')

def generate_test_audio(text, voice_name="Keith conversational"):
    """Wake up Keith and make him speak"""
    try:
        # Acquire and verify the secret key
        api_key = os.getenv('ELEVENLABS_API_KEY')
        if not api_key:
            raise ValueError("No API key found. Has Keith been properly medicated?")
        
        print(f"API Key found: {'*' * 8}{api_key[-4:]}")
        
        # Initialize our mad scientist's toolkit
        client = Client(api_key=api_key)
        
        print("Searching for Keith in the void...")
        voices_api = Voices()
        available_voices = voices_api.get_all()
        
        print(f"Available voices: {[v.name for v in available_voices]}")
        
        # Generate our audio specimen
        print("Attempting to generate audio...")
        models_api = Models()
        model = models_api.get("eleven_multilingual_v2")
        
        audio = client.generate(
            text=text,
            voice=voice_name,
            model=model
        )
        
        # Ensure our output directory exists
        os.makedirs('audio/raw', exist_ok=True)
        
        # Preserve our specimen for future study
        timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")
        filename = f"audio/raw/test_keith_{timestamp}.mp3"
        print(f"Saving to: {filename}")
        
        # Save the audio bytes to file
        with open(filename, 'wb') as f:
            f.write(audio)
        
        return {
            'status': 'success',
            'filename': filename,
            'message': 'Keith has been successfully awakened'
        }
        
    except Exception as e:
        print(f"Detailed error: {str(e)}")
        return {
            'status': 'error',
            'message': f"Experiment failed: {str(e)}"
        }

if __name__ == "__main__":
    print("Initiating voice generation experiment...")
    
    # Our initial test phrase
    test_text = """Hey there! Just testing my voice to make sure everything's working properly. 
    You know what they say about content creation - it's all fun and games until someone adds a ukulele."""
    
    # Awaken our specimen
    result = generate_test_audio(test_text)
    print("\nFinal result:", result)