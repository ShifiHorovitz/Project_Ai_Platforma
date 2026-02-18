from typing import Optional

import os

try:
    from openai import OpenAI
    OPENAI_AVAILABLE = True
except ImportError:
    OPENAI_AVAILABLE = False


class AIClient:
    """
    Small wrapper around OpenAI (or a mock).

    Exposes a single `generate_lesson` method so the rest of the
    application is decoupled from the concrete AI provider.
    """

    def __init__(self) -> None:
        api_key = os.getenv("OPENAI_API_KEY")
        self.enabled = bool(api_key) and OPENAI_AVAILABLE
        if self.enabled:
            self.client = OpenAI(api_key=api_key)
        else:
            self.client = None

    async def generate_lesson(
        self,
        topic: str,
        sub_topic: str,
        prompt: str,
        user_name: Optional[str] = None,
    ) -> str:
        """
        Generate a lesson-like response for the given prompt.

        If no API key is configured, returns a deterministic mock response
        so the system remains demoable.
        """
        if not self.enabled or not self.client:
            return (
                f"[MOCK RESPONSE]\n\n"
                f"Topic: {topic} / {sub_topic}\n"
                f"Prompt: {prompt}\n\n"
                f"This is where an AI-generated lesson would appear.\n\n"
                f"To enable real AI responses, set OPENAI_API_KEY in your .env file."
            )

        # Simple, clear prompt for the model
        system_message = (
            "You are a helpful learning assistant. "
            "Given a topic, sub-topic and user prompt, produce a clear, structured lesson "
            "with explanations and short examples, in simple language."
        )

        user_prefix = f"For the learner {user_name}, " if user_name else ""
        user_message = (
            f"{user_prefix}create a lesson about '{topic} -> {sub_topic}'.\n"
            f"User prompt: {prompt}"
        )

        # Run sync OpenAI client in executor to make it async-compatible
        import asyncio
        completion = await asyncio.get_event_loop().run_in_executor(
            None,
            lambda: self.client.chat.completions.create(
                model="gpt-3.5-turbo",
                messages=[
                    {"role": "system", "content": system_message},
                    {"role": "user", "content": user_message},
                ],
            )
        )

        return completion.choices[0].message.content.strip()


ai_client = AIClient()

