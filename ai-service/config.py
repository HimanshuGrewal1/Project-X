import os
from dotenv import load_dotenv

load_dotenv()

# Add your Modal URL configuration here
MODAL_QWEN_BASE_URL = os.getenv("MODAL_QWEN_BASE_URL")
PORT = int(os.getenv("PORT", 8000))

if not MODAL_QWEN_BASE_URL:
    raise ValueError("MODAL_QWEN_BASE_URL is not set in the environment.")