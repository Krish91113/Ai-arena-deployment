import asyncio
import os
import sys

# Add the project root to the python path
sys.path.append(os.path.dirname(os.path.abspath(__file__)))

from backend.council import stage1_collect_responses, stage3_synthesize_final
from backend.config import COUNCIL_MODELS, CHAIRMAN_MODEL

async def test_diversity():
    print("🔬 Testing Agent Diversity...")
    print(f"📋 Configured Council Models: {COUNCIL_MODELS}")
    print(f"👨‍⚖️ Chairman Model: {CHAIRMAN_MODEL}")

    query = "Explain quantum computing in one sentence."
    print(f"\n❓ Query: {query}")

    # Stage 1: Collect Responses
    print("\nActions: Collecting responses from agents...")
    stage1_results = await stage1_collect_responses(query)
    
    print(f"📊 Responses received: {len(stage1_results)}")
    
    models_found = []
    for res in stage1_results:
        model = res['model']
        content = res['response']
        models_found.append(model)
        print(f"\n🤖 Model: {model}")
        print(f"💬 Response: {content[:100]}...")

    # Verification
    if len(stage1_results) != 2:
        print(f"\n❌ Error: Expected 2 responses, got {len(stage1_results)}")
        return

    model_a = "openai/gpt-3.5-turbo"
    model_b = "gemini-flash-latest"
    
    if model_a in models_found and model_b in models_found:
        print("\n✅ Verification SUCCESS: Both OpenAI (Agent A) and Gemini (Agent B) responses found.")
    else:
        print(f"\n❌ Verification FAILED: Expected {model_a} and {model_b}. Found: {models_found}")

    # Stage 3: Synthesis
    print("\nActions: Testing Chairman synthesis...")
    # Mocking stage 2 results for stage 3 input as we just want to test synthesis connection
    mock_stage2 = [
        {"model": model_a, "ranking": "FINAL RANKING: 1. Response A"},
        {"model": model_b, "ranking": "FINAL RANKING: 1. Response B"}
    ]
    
    stage3_result = await stage3_synthesize_final(query, stage1_results, mock_stage2)
    
    if stage3_result['model'] == CHAIRMAN_MODEL and stage3_result['response']:
         print(f"✅ Chairman ({stage3_result['model']}) successfully synthesized a response.")
         print(f"💬 Final Answer: {stage3_result['response'][:100]}...")
    else:
         print(f"❌ Chairman synthesis failed. Result: {stage3_result}")

if __name__ == "__main__":
    asyncio.run(test_diversity())
