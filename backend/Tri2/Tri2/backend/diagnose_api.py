"""Detailed OpenRouter API diagnostic tool."""

import asyncio
import httpx
import sys
from pathlib import Path

# Add parent directory to path
sys.path.insert(0, str(Path(__file__).parent.parent))

from backend.config import OPENROUTER_API_KEY, OPENROUTER_API_URL

async def test_api_detailed():
    """Perform detailed API diagnostics."""
    print("=" * 70)
    print("OpenRouter API Detailed Diagnostics")
    print("=" * 70)
    
    # Check API key format
    print(f"\n1. API Key Format Check:")
    if not OPENROUTER_API_KEY:
        print("   ❌ API key is not set!")
        return False
    
    masked_key = OPENROUTER_API_KEY[:12] + "..." + OPENROUTER_API_KEY[-8:]
    print(f"   ✅ API Key: {masked_key}")
    print(f"   ✅ Length: {len(OPENROUTER_API_KEY)} characters")
    
    # Check API endpoint
    print(f"\n2. API Endpoint:")
    print(f"   URL: {OPENROUTER_API_URL}")
    
    # Test API call with detailed error handling
    print(f"\n3. Testing API Connection:")
    print(f"   Sending test request...")
    
    headers = {
        "Authorization": f"Bearer {OPENROUTER_API_KEY}",
        "Content-Type": "application/json",
        "HTTP-Referer": "http://localhost:8002",
        "X-Title": "AI Arena Backend Test"
    }
    
    payload = {
        "model": "meta-llama/llama-3.1-8b-instruct:free",
        "messages": [
            {"role": "user", "content": "Hello! Please respond with 'API Working' if you receive this."}
        ],
        "max_tokens": 50
    }
    
    try:
        async with httpx.AsyncClient(timeout=30.0) as client:
            response = await client.post(
                OPENROUTER_API_URL,
                headers=headers,
                json=payload
            )
            
            print(f"   Status Code: {response.status_code}")
            
            if response.status_code == 200:
                data = response.json()
                content = data['choices'][0]['message']['content']
                print(f"   ✅ SUCCESS! Response: {content}")
                print("\n" + "=" * 70)
                print("✅ All checks passed! Your backend is ready to run!")
                print("=" * 70)
                return True
            else:
                print(f"   ❌ HTTP Error: {response.status_code}")
                print(f"\n   Response Body:")
                try:
                    error_data = response.json()
                    import json
                    print(f"   {json.dumps(error_data, indent=2)}")
                except:
                    print(f"   {response.text}")
                
                print(f"\n   Common Solutions:")
                if response.status_code == 401:
                    print(f"   - Verify your API key at: https://openrouter.ai/keys")
                    print(f"   - Make sure you've confirmed your email on OpenRouter")
                    print(f"   - Check if your API key has been activated")
                    print(f"   - Try generating a new API key")
                elif response.status_code == 402:
                    print(f"   - Add credits to your OpenRouter account")
                    print(f"   - Visit: https://openrouter.ai/credits")
                elif response.status_code == 429:
                    print(f"   - You've hit the rate limit, wait a moment and try again")
                
                return False
                
    except httpx.RequestError as e:
        print(f"   ❌ Network Error: {e}")
        print(f"\n   Please check:")
        print(f"   - Your internet connection")
        print(f"   - Firewall settings")
        print(f"   - Proxy configuration")
        return False
    except Exception as e:
        print(f"   ❌ Unexpected Error: {e}")
        import traceback
        traceback.print_exc()
        return False

if __name__ == "__main__":
    success = asyncio.run(test_api_detailed())
    sys.exit(0 if success else 1)
