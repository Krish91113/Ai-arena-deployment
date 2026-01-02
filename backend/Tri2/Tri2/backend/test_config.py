"""Test script to verify OpenRouter API configuration."""

import sys
from pathlib import Path

# Add parent directory to path to import backend modules
sys.path.insert(0, str(Path(__file__).parent.parent))

from backend.config import OPENROUTER_API_KEY, COUNCIL_MODELS, CHAIRMAN_MODEL

def test_config():
    """Test if configuration is properly loaded."""
    print("=" * 60)
    print("OpenRouter API Configuration Test")
    print("=" * 60)
    
    # Check if API key is set
    if not OPENROUTER_API_KEY:
        print("❌ ERROR: OPENROUTER_API_KEY is not set!")
        print("\nTo fix this:")
        print("1. Copy .env.example to .env")
        print("2. Get your API key from: https://openrouter.ai/keys")
        print("3. Add it to the .env file: OPENROUTER_API_KEY=your_key_here")
        return False
    
    # Check if API key looks valid (basic check)
    if OPENROUTER_API_KEY == "your_openrouter_api_key_here":
        print("❌ ERROR: OPENROUTER_API_KEY is still set to the example value!")
        print("\nPlease replace it with your actual API key from https://openrouter.ai/keys")
        return False
    
    # Mask the API key for security
    masked_key = OPENROUTER_API_KEY[:8] + "..." + OPENROUTER_API_KEY[-4:] if len(OPENROUTER_API_KEY) > 12 else "***"
    
    print(f"✅ OPENROUTER_API_KEY is set: {masked_key}")
    print(f"\n📋 Council Models ({len(COUNCIL_MODELS)}):")
    for i, model in enumerate(COUNCIL_MODELS, 1):
        print(f"   {i}. {model}")
    
    print(f"\n👔 Chairman Model: {CHAIRMAN_MODEL}")
    
    print("\n" + "=" * 60)
    print("Configuration looks good! ✅")
    print("=" * 60)
    return True

if __name__ == "__main__":
    success = test_config()
    sys.exit(0 if success else 1)
