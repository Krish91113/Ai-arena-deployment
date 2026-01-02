"""Test the hybrid model configuration with both Gemini and OpenRouter."""
import asyncio
from backend.openrouter import query_model
from backend.config import COUNCIL_MODELS, CHAIRMAN_MODEL, USE_GEMINI, USE_OPENROUTER

async def test_hybrid_setup():
    """Test if all configured models are working."""
    print("=" * 60)
    print("TESTING HYBRID MODEL SETUP")
    print("=" * 60)
    print(f"\nConfiguration:")
    print(f"  USE_GEMINI: {USE_GEMINI}")
    print(f"  USE_OPENROUTER: {USE_OPENROUTER}")
    print(f"  COUNCIL_MODELS: {COUNCIL_MODELS}")
    print(f"  CHAIRMAN_MODEL: {CHAIRMAN_MODEL}")
    print("\n" + "=" * 60)
    
    test_message = [{"role": "user", "content": "Say 'Hello from' followed by your model name in one short sentence."}]
    
    # Test Agent A (should be Gemini)
    print(f"\n[Agent A] Testing {COUNCIL_MODELS[0]}...")
    response_a = await query_model(COUNCIL_MODELS[0], test_message, timeout=30.0)
    if response_a:
        print(f"✅ Success! Response: {response_a.get('content', '')[:100]}")
    else:
        print("❌ Failed to get response")
    
    # Test Agent B (should be Llama via OpenRouter)
    print(f"\n[Agent B] Testing {COUNCIL_MODELS[1]}...")
    response_b = await query_model(COUNCIL_MODELS[1], test_message, timeout=30.0)
    if response_b:
        print(f"✅ Success! Response: {response_b.get('content', '')[:100]}")
    else:
        print("❌ Failed to get response")
    
    # Test Referee (should be Mistral via OpenRouter)
    print(f"\n[Referee] Testing {CHAIRMAN_MODEL}...")
    response_ref = await query_model(CHAIRMAN_MODEL, test_message, timeout=30.0)
    if response_ref:
        print(f"✅ Success! Response: {response_ref.get('content', '')[:100]}")
    else:
        print("❌ Failed to get response")
    
    print("\n" + "=" * 60)
    success_count = sum([1 for r in [response_a, response_b, response_ref] if r is not None])
    print(f"RESULT: {success_count}/3 models working")
    print("=" * 60)
    
    return success_count == 3

if __name__ == "__main__":
    success = asyncio.run(test_hybrid_setup())
    exit(0 if success else 1)
