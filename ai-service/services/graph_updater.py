from langchain_google_genai import ChatGoogleGenerativeAI
from langchain_core.prompts import ChatPromptTemplate
from models import MindMap
from utils.icon_mapper import enrich_nodes_with_icons
from config import GOOGLE_API_KEY

# Initialize Gemini 3.5 Flash
llm = ChatGoogleGenerativeAI(
    model="gemini-3.5-flash", 
    temperature=0.2, 
    google_api_key=GOOGLE_API_KEY
)
structured_llm = llm.with_structured_output(MindMap)

async def update_mindmap_state(current_map: MindMap, user_prompt: str) -> MindMap:
    prompt = ChatPromptTemplate.from_messages([
        ("system", """You are a conversational mind-map editing assistant.
        You are provided with the current JSON state of a user's mind map.
        The user will give you an instruction (e.g., 'expand on topic X', 'delete topic Y', 'change to Spanish').
        Modify the JSON by selectively adding, editing, or deleting nodes and edges to fulfill the prompt.
        Maintain a valid tree/radial mind-map structure (no flowcharts).
        Ensure all new nodes have an appropriate emoji in the 'icon' field."""),
        ("user", "Current Mind Map State:\n{current_state}\n\nUser Instruction: {instruction}")
    ])
    
    chain = prompt | structured_llm
    
    updated_map: MindMap = await chain.ainvoke({
        "current_state": current_map.model_dump_json(),
        "instruction": user_prompt
    })
    
    # Ensure any newly appended nodes have icons
    updated_map.nodes = enrich_nodes_with_icons(updated_map.nodes)
    
    return updated_map