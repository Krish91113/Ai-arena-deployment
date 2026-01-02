"""API client for both Google Gemini and OpenRouter."""

import httpx
from typing import List, Dict, Any, Optional
import google.generativeai as genai
from .config import OPENROUTER_API_KEY, OPENROUTER_API_URL, GOOGLE_API_KEY, USE_GEMINI

# Configure Gemini if available
if GOOGLE_API_KEY:
    genai.configure(api_key=GOOGLE_API_KEY)


async def query_gemini_model(
    model: str,
    messages: List[Dict[str, str]],
    timeout: float = 120.0
) -> Optional[Dict[str, Any]]:
    """
    Query a Google Gemini model.
    
    Args:
        model: Gemini model identifier (e.g., "gemini-1.5-flash")
        messages: List of message dicts with 'role' and 'content'
        timeout: Request timeout in seconds
    
    Returns:
        Response dict with 'content', or None if failed
    """
    print(f"DEBUG: Querying Gemini model {model} with {len(messages)} messages")
    
    try:
        # Initialize the model
        gemini_model = genai.GenerativeModel(model)
        
        # Convert messages to Gemini format with formatting instructions
        user_messages = [m for m in messages if m['role'] == 'user']
        if user_messages:
            # Add formatting instructions to ensure well-structured output
            original_content = user_messages[-1]['content']
            enhanced_prompt = f"""{original_content}

Please provide a well-structured response with:
- Clear paragraphs separated by blank lines
- Proper headings using markdown (## for main sections)
- Bullet points or numbered lists where appropriate
- Code blocks with ``` if showing code
- Proper spacing for readability

Format your response in clean, readable markdown."""
            
            prompt = enhanced_prompt
        else:
            prompt = "\n".join([f"{m['role']}: {m['content']}" for m in messages])
        
        # Generate response
        response = gemini_model.generate_content(prompt)
        
        # Extract text from response - preserve all formatting
        response_text = response.text if hasattr(response, 'text') else str(response)
        
        return {
            'content': response_text,
            'model': model
        }
        
    except Exception as e:
        print(f"Error querying Gemini model {model}: {e}")
        return None


async def query_openrouter_model(
    model: str,
    messages: List[Dict[str, str]],
    timeout: float = 120.0
) -> Optional[Dict[str, Any]]:
    """
    Query a single model via OpenRouter API.
    
    Args:
        model: OpenRouter model identifier (e.g., "openai/gpt-4o")
        messages: List of message dicts with 'role' and 'content'
        timeout: Request timeout in seconds
    
    Returns:
        Response dict with 'content' and optional 'reasoning_details', or None if failed
    """
    print(f"DEBUG: Querying OpenRouter model {model} with {len(messages)} messages")
    headers = {
        "Authorization": f"Bearer {OPENROUTER_API_KEY}",
        "Content-Type": "application/json",
    }

    payload = {
        "model": model,
        "messages": messages,
        "max_tokens": 1000,
    }

    try:
        async with httpx.AsyncClient(timeout=timeout) as client:
            response = await client.post(
                OPENROUTER_API_URL,
                headers=headers,
                json=payload
            )
            response.raise_for_status()

            data = response.json()
            message = data['choices'][0]['message']

            return {
                'content': message.get('content'),
                'reasoning_details': message.get('reasoning_details')
            }

    except httpx.HTTPStatusError as e:
        try:
            error_text = e.response.text
            error_json = e.response.json() if e.response.headers.get('content-type', '').startswith('application/json') else None
            if error_json:
                error_msg = error_json.get('error', {}).get('message', str(error_json))
                print(f"HTTP error querying model {model}: {e.response.status_code} - {error_msg}")
            else:
                print(f"HTTP error querying model {model}: {e.response.status_code} - {error_text[:500]}")
        except:
            print(f"HTTP error querying model {model}: {e.response.status_code} - {str(e)}")
        return None
    except httpx.RequestError as e:
        print(f"Network error querying model {model}: {e}")
        return None
    except Exception as e:
        print(f"Unexpected error querying model {model}: {e}")
        return None


async def query_model(
    model: str,
    messages: List[Dict[str, str]],
    timeout: float = 120.0
) -> Optional[Dict[str, Any]]:
    """
    Query a model (automatically routes to Gemini or OpenRouter based on model name).
    
    Args:
        model: Model identifier
        messages: List of message dicts with 'role' and 'content'
        timeout: Request timeout in seconds
    
    Returns:
        Response dict with 'content', or None if failed
    """
    # Determine if this is a Gemini model based on the model name
    # Route to Gemini API only if model name starts with "gemini-"
    # Route to OpenRouter for all other models (including llama, mistral, etc.)
    if model.startswith("gemini-"):
        return await query_gemini_model(model, messages, timeout)
    else:
        return await query_openrouter_model(model, messages, timeout)


async def query_models_parallel(
    models: List[str],
    messages: List[Dict[str, str]]
) -> Dict[str, Optional[Dict[str, Any]]]:
    """
    Query multiple models in parallel.
    
    Args:
        models: List of model identifiers
        messages: List of message dicts to send to each model
    
    Returns:
        Dict mapping model identifier to response dict (or None if failed)
    """
    import asyncio

    # Create tasks for all models
    tasks = [query_model(model, messages) for model in models]

    # Wait for all to complete
    responses = await asyncio.gather(*tasks)

    # Map models to their responses
    return {model: response for model, response in zip(models, responses)}
