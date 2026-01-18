import requests
import json

def test_live_api():
    url = "http://localhost:8002/api/ask"
    payload = {"question": "How to solve next greater element in leetcode using java stacks"}
    
    print(f"🚀 Sending request to {url}...")
    try:
        response = requests.post(url, json=payload)
        response.raise_for_status()
        data = response.json()
        
        agent_a = data.get("agent_a", {})
        agent_b = data.get("agent_b", {})
        
        print("\n📊 Response Analysis:")
        print(f"Agent A Model: {agent_a.get('model')}")
        print(f"Agent B Model: {agent_b.get('model')}")
        
        ans_a = agent_a.get('answer', '')
        ans_b = agent_b.get('answer', '')
        
        print(f"\n💬 Agent A Answer (first 100 chars):\n{ans_a[:100]}...")
        print(f"\n💬 Agent B Answer (first 100 chars):\n{ans_b[:100]}...")
        
        if ans_a == ans_b:
            print("\n❌ CRITICAL ERROR: Agent A and Agent B answers are IDENTICAL!")
            print(f"Length: {len(ans_a)} chars")
        else:
            print("\n✅ SUCCESS: Answers are different.")
            
    except Exception as e:
        print(f"❌ Error: {e}")
        if hasattr(e, 'response') and e.response:
             print(f"Response text: {e.response.text}")

if __name__ == "__main__":
    test_live_api()
