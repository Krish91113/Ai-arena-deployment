"""Quick test to verify OpenRouter API is working."""

import asyncio
import sys
from pathlib import Path

# Add parent directory to path
sys.path.insert(0, str(Path(__file__).parent.parent))

from backend.openrouter import query_model

async def test_api():
    """Test a simple API call."""
    print("Testing OpenRouter API connection...")
    print("-" * 60)
    
    messages = [{"role": "user", "content": "Say 'API is working!' if you can read this."}]
    
    try:
        response = await query_model("meta-llama/llama-3.1-8b-instruct:free", messages, timeout=30.0)
        
        if response:
            print("✅ SUCCESS! API is working!")
            print(f"\nResponse: {response.get('content', 'No content')}")
            print("-" * 60)
            return True
        else:
            print("❌ FAILED: No response received")
            print("This might be due to:")
            print("  - Invalid API key")
            print("  - Network connectivity issues")
            print("  - OpenRouter service issues")
            return False
            
    except Exception as e:
        print(f"❌ ERROR: {e}")
        return False

if __name__ == "__main__":
    success = asyncio.run(test_api())
    sys.exit(0 if success else 1)
