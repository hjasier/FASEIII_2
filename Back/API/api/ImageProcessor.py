from openai import OpenAI
import os
import time
from dotenv import load_dotenv

load_dotenv()

#LOAD KEYS
azure_api_key = os.getenv("AZURE_OPENAI_API_KEY")

client = OpenAI(
    base_url="https://models.inference.ai.azure.com",
    api_key=azure_api_key,
)


prompt = "Describe la imagen , acuerdate de dar los nombres de los edificios y lugares que veas en la imagen."
model = "gpt-4o-mini"


def process_image(base64):
    response = client.chat.completions.create(
        model=model,
        messages=[{
            "role": "user",
            "content": [
                {"type": "text", "text": prompt},
                {"type": "image_url", "image_url": {"url": base64}},
            ],
        }],
    )
    answer = response.choices[0].message.content
    return answer




