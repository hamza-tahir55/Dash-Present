from typing import Optional
from pydantic import BaseModel


class UserConfig(BaseModel):
    LLM: Optional[str] = None

    # OpenAI
    OPENAI_API_KEY: Optional[str] = "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"
    OPENAI_MODEL: Optional[str] = "gpt-4o"

    # Google
    GOOGLE_API_KEY: Optional[str] = None
    GOOGLE_MODEL: Optional[str] = None

    # Anthropic
    ANTHROPIC_API_KEY: Optional[str] = None
    ANTHROPIC_MODEL: Optional[str] = None

    # Ollama
    OLLAMA_URL: Optional[str] = None
    OLLAMA_MODEL: Optional[str] = None

    # Custom LLM
    CUSTOM_LLM_URL: Optional[str] = None
    CUSTOM_LLM_API_KEY: Optional[str] = None
    CUSTOM_MODEL: Optional[str] = None

    # Image Provider
    IMAGE_PROVIDER: Optional[str] = "dall-e-3"
    PEXELS_API_KEY: Optional[str] = None
    PIXABAY_API_KEY: Optional[str] = None

    # Reasoning
    TOOL_CALLS: Optional[bool] = None
    DISABLE_THINKING: Optional[bool] = None
    EXTENDED_REASONING: Optional[bool] = None

    # Web Search
    WEB_GROUNDING: Optional[bool] = None
