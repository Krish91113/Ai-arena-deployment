"""Quick script to update the OpenRouter API key in .env file."""

import os
from pathlib import Path

def update_api_key():
    """Update the API key in .env file."""
    env_file = Path(__file__).parent / ".env"
    
    print("=" * 70)
    print("OpenRouter API Key Updater")
    print("=" * 70)
    print("\nGet your API key from: https://openrouter.ai/keys")
    print("\nCurrent .env file location:", env_file)
    print()
    
    new_key = input("Enter your new OpenRouter API key: ").strip()
    
    if not new_key:
        print("❌ No key provided. Exiting.")
        return
    
    if not new_key.startswith("sk-or-v1-"):
        print("⚠️  Warning: Key doesn't start with 'sk-or-v1-'. Are you sure this is correct?")
        confirm = input("Continue anyway? (y/n): ").strip().lower()
        if confirm != 'y':
            print("Cancelled.")
            return
    
    # Update .env file
    env_content = f"""# OpenRouter API Configuration
OPENROUTER_API_KEY={new_key}

# Optional: Google Gemini API (if you want to use Gemini models)
# GOOGLE_API_KEY=your_google_api_key_here
"""
    
    with open(env_file, 'w') as f:
        f.write(env_content)
    
    print("\n✅ API key updated successfully!")
    print("\nNext steps:")
    print("1. Restart your backend server (Ctrl+C then restart)")
    print("2. Test with: python -m backend.diagnose_api")
    print("3. If successful, your backend will work!")
    print()

if __name__ == "__main__":
    update_api_key()
