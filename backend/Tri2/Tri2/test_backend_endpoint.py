"""Test the backend /api/ask endpoint."""

import requests
import json

print("=" * 70)
print("Testing Backend /api/ask Endpoint")
print("=" * 70)

url = "http://localhost:8002/api/ask"
payload = {
    "question": "What is 2+2? Please answer briefly."
}

print(f"\n[INFO] Sending request to: {url}")
print(f"[INFO] Question: {payload['question']}")

try:
    response = requests.post(url, json=payload, timeout=60)
    
    print(f"\n[RESPONSE] Status Code: {response.status_code}")
    
    if response.status_code == 200:
        data = response.json()
        print(f"\n[SUCCESS] Backend is working!")
        print(f"\n[RESULT] Enhanced Answer:")
        print(f"  {data.get('enhanced_answer', {}).get('answer', 'No answer')}")
        print(f"\n[INFO] Full response structure:")
        print(json.dumps(data, indent=2)[:500] + "...")
    else:
        print(f"\n[ERROR] Request failed")
        print(f"Response: {response.text}")
        
except requests.exceptions.Timeout:
    print(f"\n[ERROR] Request timed out (this is normal for first request)")
    print(f"[INFO] The models are loading, try again in a moment")
except Exception as e:
    print(f"\n[ERROR] {e}")

print("\n" + "=" * 70)
