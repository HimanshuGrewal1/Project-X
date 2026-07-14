import fitz  # PyMuPDF
import io

async def extract_text_from_pdf(file_bytes: bytes) -> str:
    """
    Optimized PDF parsing using PyMuPDF.
    Extracts text cleanly while skipping heavy image rendering.
    """
    text = ""
    # Open the PDF directly from memory bytes
    with fitz.open(stream=file_bytes, filetype="pdf") as doc:
        for page in doc:
            # extract_text("blocks") can be used for structural analysis, 
            # but plain text is best for LLM context windows.
            text += page.get_text("text") + "\n"
    
    # Optional Optimization: If text is massive, chunk it here using Langchain's RecursiveCharacterTextSplitter.
    # For mind-maps, you typically summarize the first 10-20k tokens.
    return text[:30000] # Safeguard: limit to approx 30k characters to save GPT-4o context space.