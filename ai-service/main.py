from fastapi import FastAPI, UploadFile, File, HTTPException
from fastapi.middleware.cors import CORSMiddleware
import uvicorn

from models import MindMap, ChatUpdateRequest
from services.pdf_parser import extract_text_from_pdf
from services.graph_extractor import generate_initial_mindmap
from services.graph_updater import update_mindmap_state
from config import PORT

app = FastAPI(title="MERN MindMap AI Microservice")

# Optimization: Configure CORS so your React frontend can communicate with this
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], # Change to your React app URL in production
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.post("/api/v1/extract", response_model=MindMap)
async def api_extract_mindmap(file: UploadFile = File(...)):
    """
    Endpoint 1: Upload a PDF and get an initial Mind Map JSON[cite: 36].
    """
    print (f"Received file: {file.filename}, content type: {file.content_type}")
    if not file.filename.endswith('.pdf'):
        raise HTTPException(status_code=403, detail="Only PDF files are supported.")
    
    try:
        # Read file bytes into memory
        file_bytes = await file.read()
        
        # 1. Parse PDF
        text = await extract_text_from_pdf(file_bytes)
        print (f"Extracted text from PDF: {text[:100]}...")  # Log first 100 chars
        
        # 2. Extract Mind Map via LLM
        mind_map = await generate_initial_mindmap(text)
        
        return mind_map
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/api/v1/chat-update", response_model=MindMap)
async def api_chat_update_mindmap(request: ChatUpdateRequest):
    """
    Endpoint 2: Conversational UI to mutate the mind map[cite: 35, 39].
    Accepts the current JSON graph and a text prompt to edit it.
    """
    try:
        updated_map = await update_mindmap_state(request.current_map, request.user_prompt)
        return updated_map
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/health")
async def health_check():
    return {"status": "healthy", "service": "mindmap-ai"}

if __name__ == "__main__":
    uvicorn.run("main:app", host="0.0.0.0", port=PORT, reload=True)