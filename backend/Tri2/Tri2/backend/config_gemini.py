"""Modified config to use Google Gemini API as primary (works immediately, free)."""

import os
from pathlib import Path
from dotenv import load_dotenv

# Load .env from this backend package root or its parent
_here = Path(__file__).resolve().parent
candidate_envs = [
    _here / ".env",
    _here.parent / ".env",
    _here.parent.parent / ".env",
]
for _env in candidate_envs:
    if _env.exists():
        load_dotenv(_env)
        break
else:
    load_dotenv()

# OpenRouter API key (currently not working - account not activated)
OPENROUTER_API_KEY = os.getenv("OPENROUTER_API_KEY")

# Google Gemini API key (FREE, works immediately)
GOOGLE_API_KEY = os.getenv("GOOGLE_API_KEY")

# Council members - using Gemini models (free and instant)
# These work without any account verification or credits
COUNCIL_MODELS_GEMINI = [
    "gemini-1.5-flash",
    "gemini-1.5-pro", 
    "gemini-1.0-pro"
]

# Fallback to OpenRouter free models if Gemini not available
COUNCIL_MODELS_OPENROUTER = [
    "meta-llama/llama-3.1-8b-instruct:free",
    "mistralai/mistral-7b-instruct:free",
    "gryphe/mythomax-l2-13b:free",
]

# Use both if available (Primary Goal: Diversity)
if GOOGLE_API_KEY and OPENROUTER_API_KEY:
    # Agent A: OpenAI (via OpenRouter)
    # Agent B: Gemini (via Google)
    COUNCIL_MODELS = ["openai/gpt-3.5-turbo", "gemini-1.5-flash"]
    USE_GEMINI = True # Keep using Gemini for chairman
    print("✅ Using Hybrid Council: OpenAI (A) + Gemini (B)")
elif GOOGLE_API_KEY:
    COUNCIL_MODELS = COUNCIL_MODELS_GEMINI
    USE_GEMINI = True
    print("✅ Using Google Gemini API (free, instant activation)")
else:
    COUNCIL_MODELS = COUNCIL_MODELS_OPENROUTER
    USE_GEMINI = False
    print("⚠️  Using OpenRouter API (requires account activation)")

# Chairman model
CHAIRMAN_MODEL = "gemini-1.5-flash" if USE_GEMINI else "meta-llama/llama-3.1-8b-instruct:free"

# OpenRouter API endpoint
OPENROUTER_API_URL = "https://openrouter.ai/api/v1/chat/completions"

# Data directory for conversation storage
DATA_DIR = "data/conversations"
