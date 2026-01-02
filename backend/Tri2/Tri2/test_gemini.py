"""Quick test for Google Gemini API."""

import asyncio
import sys
from pathlib import Path

# Add parent directory to path
sys.path.insert(0, str(Path(__file__).parent.parent))

from backend.config import GOOGLE_API_KEY, USE_GEMINI, COUNCIL_MODELS
from backend.openrouter import query_model

async def test_gemini():
    """Test Gemini API connectivity."""
    print("=" * 70)
    print("Google Gemini API Test")
    print("=" * 70)
    
    if not GOOGLE_API_KEY:
        print("❌ GOOGLE_API_KEY is not set!")
        return False
    
    masked_key = GOOGLE_API_KEY[:10] + "..." + GOOGLE_API_KEY[-4:]
    print(f"\n✅ API Key: {masked_key}")
    print(f"✅ Using Gemini: {USE_GEMINI}")
    print(f"\n📋 Council Models:")
    for i, model in enumerate(COUNCIL_MODELS, 1):
        print(f"   {i}. {model}")
    
    print(f"\n🧪 Testing first model: {COUNCIL_MODELS[0]}")
    print("-" * 70)
    
    messages = [{"role": "user", "content": "Say 'Gemini API is working!' if you can read this."}]
    
    try:
        response = await query_model(COUNCIL_MODELS[0], messages, timeout=30.0)
        
        if response and response.get('content'):
            print(f"\n✅ SUCCESS!")
            print(f"\nResponse: {response['content']}")
            print("\n" + "=" * 70)
            print("🎉 Your Gemini API is working perfectly!")
            print("=" * 70)
            return True
        else:
            print(f"\n❌ FAILED: No response received")
            return False
            
    except Exception as e:
        print(f"\n❌ ERROR: {e}")
        import traceback
        traceback.print_exc()
        return False

if __name__ == "__main__":
    success = asyncio.run(test_gemini())
    sys.exit(0 if success else 1)
