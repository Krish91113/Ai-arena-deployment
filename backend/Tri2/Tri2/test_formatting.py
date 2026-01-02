"""Test the improved formatting."""

import requests
import json

print("=" * 70)
print("Testing Improved Response Formatting")
print("=" * 70)

url = "http://localhost:8002/api/ask"
payload = {
    "question": "Explain the Two Sum problem and provide two solutions: brute force and hash map approach."
}

print(f"\n[INFO] Sending request...")
print(f"[INFO] Question: {payload['question']}")

try:
    response = requests.post(url, json=payload, timeout=90)
    
    print(f"\n[RESPONSE] Status Code: {response.status_code}")
    
    if response.status_code == 200:
        data = response.json()
        print(f"\n[SUCCESS] Got response!")
        
        # Show Agent A's answer
        print(f"\n{'='*70}")
        print(f"AGENT A ({data['agent_a']['model']}):")
        print(f"{'='*70}")
        print(data['agent_a']['answer'])
        
        # Show Agent B's answer
        print(f"\n{'='*70}")
        print(f"AGENT B ({data['agent_b']['model']}):")
        print(f"{'='*70}")
        print(data['agent_b']['answer'])
        
        # Show enhanced answer
        print(f"\n{'='*70}")
        print(f"ENHANCED ANSWER ({data['enhanced_answer']['model']}):")
        print(f"{'='*70}")
        print(data['enhanced_answer']['answer'])
        
    else:
        print(f"\n[ERROR] Request failed")
        print(f"Response: {response.text}")
        
except requests.exceptions.Timeout:
    print(f"\n[ERROR] Request timed out")
except Exception as e:
    print(f"\n[ERROR] {e}")

print("\n" + "=" * 70)
