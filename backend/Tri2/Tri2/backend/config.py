"""Configuration for the LLM Council."""

import os
from pathlib import Path
from dotenv import load_dotenv

# Load .env from this backend package root or its parent so the key is found
_here = Path(__file__).resolve().parent  # .../backend
candidate_envs = [
    _here / ".env",
    _here.parent / ".env",        # .../Tri2/.env (repo-level backend)
    _here.parent.parent / ".env", # .../ai-arena/.env (workspace root)
]
for _env in candidate_envs:
    if _env.exists():
        load_dotenv(_env)
        break
else:
    load_dotenv()  # fallback to default lookup

# Google Gemini API key (FREE, works immediately)
GOOGLE_API_KEY = os.getenv("GOOGLE_API_KEY")

# OpenRouter API key (backup - requires account activation)
OPENROUTER_API_KEY = os.getenv("OPENROUTER_API_KEY")

# Determine which API to use
USE_GEMINI = bool(GOOGLE_API_KEY)
USE_OPENROUTER = bool(OPENROUTER_API_KEY)

# Council members - HYBRID setup: Mistral vs Gemini
# Agent A: Mistral AI (OpenRouter - FREE)
# Agent B: Gemini (Google - FREE)
# Referee: Gemini (Google - FREE) - judges which answer is best
# Council members - HYBRID setup: OpenAI vs Gemini
# Agent A: OpenAI GPT-3.5 (OpenRouter)
# Agent B: Gemini (Google)
# Referee: Gemini (Google)
if USE_GEMINI and USE_OPENROUTER:
    COUNCIL_MODELS = [
        "openai/gpt-3.5-turbo",                   # Agent A
        "gemini-flash-latest",                    # Agent B
    ]
    CHAIRMAN_MODEL = "gemini-flash-latest"        # Referee
    print("[OK] Using HYBRID setup: OpenAI vs Gemini (Gemini judges)")
    print(f"    Agent A: {COUNCIL_MODELS[0]}")
    print(f"    Agent B: {COUNCIL_MODELS[1]}")
    print(f"    Referee: {CHAIRMAN_MODEL}")
elif USE_OPENROUTER:
    # OpenRouter only
    COUNCIL_MODELS = [
        "openai/gpt-3.5-turbo",
        "openai/gpt-3.5-turbo",
    ]
    CHAIRMAN_MODEL = "openai/gpt-3.5-turbo"
    print("[OK] Using OpenRouter only")
elif USE_GEMINI:
    # Gemini only
    COUNCIL_MODELS = [
        "gemini-2.0-flash",
        "gemini-2.0-flash",
    ]
    CHAIRMAN_MODEL = "gemini-2.0-flash"
    print("[OK] Using Google Gemini API (free)")
else:
    # No API keys available
    COUNCIL_MODELS = []
    CHAIRMAN_MODEL = "gemini-pro"
    print("[ERROR] No API keys configured!")

# OpenRouter API endpoint
OPENROUTER_API_URL = "https://openrouter.ai/api/v1/chat/completions"

# Data directory for conversation storage
DATA_DIR = "data/conversations"