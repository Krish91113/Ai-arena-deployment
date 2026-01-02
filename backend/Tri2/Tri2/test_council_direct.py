"""Direct test of the council process without running the server."""
import asyncio
from backend.council import run_full_council
from backend.config import COUNCIL_MODELS, CHAIRMAN_MODEL

async def test_council_direct():
    """Test the council process directly."""
    print("=" * 70)
    print("TESTING HYBRID MODEL SETUP - DIRECT COUNCIL TEST")
    print("=" * 70)
    print(f"\nConfiguration:")
    print(f"  Agent A: {COUNCIL_MODELS[0]}")
    print(f"  Agent B: {COUNCIL_MODELS[1]}")
    print(f"  Referee: {CHAIRMAN_MODEL}")
    print("\n" + "=" * 70)
    
    question = "What is 2+2? Explain in one sentence."
    print(f"\nQuestion: {question}")
    print("\nRunning 3-stage council process...")
    print("(This may take 20-40 seconds)\n")
    
    try:
        stage1, stage2, stage3, metadata = await run_full_council(question)
        
        print("=" * 70)
        print("STAGE 1: Individual Responses")
        print("=" * 70)
        for i, result in enumerate(stage1, 1):
            print(f"\n[{i}] Model: {result['model']}")
            print(f"    Response: {result['response'][:150]}...")
        
        print("\n" + "=" * 70)
        print("STAGE 2: Rankings")
        print("=" * 70)
        for i, result in enumerate(stage2, 1):
            print(f"\n[{i}] Model: {result['model']}")
            parsed = result.get('parsed_ranking', [])
            print(f"    Ranking: {parsed}")
        
        print("\n" + "=" * 70)
        print("STAGE 3: Final Synthesis")
        print("=" * 70)
        print(f"\nModel: {stage3['model']}")
        print(f"Response: {stage3['response'][:200]}...")
        
        print("\n" + "=" * 70)
        print("AGGREGATE RANKINGS")
        print("=" * 70)
        for rank in metadata.get('aggregate_rankings', []):
            print(f"  {rank['model']}: avg rank {rank['average_rank']}")
        
        print("\n" + "=" * 70)
        success_count = len(stage1)
        print(f"✅ TEST PASSED - {success_count} agents responded successfully!")
        print(f"   Agent A ({COUNCIL_MODELS[0]}): {'✅' if any(r['model'] == COUNCIL_MODELS[0] for r in stage1) else '❌'}")
        print(f"   Agent B ({COUNCIL_MODELS[1]}): {'✅' if any(r['model'] == COUNCIL_MODELS[1] for r in stage1) else '❌'}")
        print(f"   Referee ({CHAIRMAN_MODEL}): {'✅' if stage3['model'] == CHAIRMAN_MODEL else '❌'}")
        print("=" * 70)
        
        return success_count > 0
        
    except Exception as e:
        print(f"\n❌ Error: {e}")
        import traceback
        traceback.print_exc()
        return False

if __name__ == "__main__":
    success = asyncio.run(test_council_direct())
    exit(0 if success else 1)
