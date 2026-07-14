from langchain_google_genai import ChatGoogleGenerativeAI
from langchain_core.prompts import ChatPromptTemplate
from models import MindMap
from utils.icon_mapper import enrich_nodes_with_icons
from config import GOOGLE_API_KEY

# Initialize Gemini 3.5 Flash with structured output
llm = ChatGoogleGenerativeAI(
    model="gemini-3.5-flash", 
    temperature=0.1, 
    google_api_key=GOOGLE_API_KEY
)
structured_llm = llm.with_structured_output(MindMap)

async def generate_initial_mindmap(document_text: str) -> MindMap:
    prompt = ChatPromptTemplate.from_messages([
        ("system", """You are an expert knowledge graph extraction AI. 
        Your task is to read the provided document and extract a MIND MAP.
        Do NOT create a flowchart (no decision trees, no step-by-step processes). 
        Create a radial, topic-based mind map with a central root node, branching out into sub-topics.
        Assign a highly relevant single emoji to the 'icon' field of each node.
        Keep labels concise (1-4 words)."""),
        ("user", "Extract a mind map from the following text:\n\n{text}")
    ])
    
    chain = prompt | structured_llm
    mind_map: MindMap = await chain.ainvoke({"text": document_text})
    
    # Run through our lightweight utility to catch any missing icons
    mind_map.nodes = enrich_nodes_with_icons(mind_map.nodes)
    
    return mind_map