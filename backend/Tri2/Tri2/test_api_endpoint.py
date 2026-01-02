"""Quick test of the /api/ask endpoint with the new hybrid setup."""
import asyncio
import httpx

async def test_ask_endpoint():
    """Test the /api/ask endpoint."""
    url = "http://localhost:8002/api/ask"
    payload = {"question": "What is 2+2? Answer in one sentence."}
    
    print("=" * 60)
    print("TESTING /api/ask ENDPOINT")
    print("=" * 60)
    print(f"\nSending question: {payload['question']}")
    print("\nWaiting for response (this may take 10-30 seconds)...\n")
    
    try:
        async with httpx.AsyncClient(timeout=60.0) as client:
            response = await client.post(url, json=payload)
            response.raise_for_status()
            data = response.json()
            
            print("=" * 60)
            print("RESPONSE RECEIVED")
            print("=" * 60)
            print(f"\nAgent A Model: {data['agent_a']['model']}")
            print(f"Agent A Answer: {data['agent_a']['answer'][:150]}...")
            print(f"\nAgent B Model: {data['agent_b']['model']}")
            print(f"Agent B Answer: {data['agent_b']['answer'][:150]}...")
            print(f"\nReferee Model: {data['referee']['model']}")
            print(f"Chosen Agent: {data['referee']['chosen_agent']}")
            print(f"\nEnhanced Answer Model: {data['enhanced_answer']['model']}")
            print(f"Enhanced Answer: {data['enhanced_answer']['answer'][:200]}...")
            print("\n" + "=" * 60)
            print("✅ TEST PASSED - All models responded successfully!")
            print("=" * 60)
            return True
            
    except httpx.HTTPStatusError as e:
        print(f"\n❌ HTTP Error: {e.response.status_code}")
        print(f"Response: {e.response.text[:500]}")
        return False
    except Exception as e:
        print(f"\n❌ Error: {e}")
        print("\nMake sure the backend server is running:")
        print("  cd c:\\Users\\HP\\Desktop\\ai-arena\\backend\\Tri2\\Tri2")
        print("  python -m uvicorn backend.main:app --host 0.0.0.0 --port 8002")
        return False

if __name__ == "__main__":
    success = asyncio.run(test_ask_endpoint())
    exit(0 if success else 1)
