from langchain_openai import ChatOpenAI
from langchain_core.prompts import ChatPromptTemplate
from models import MindMap
from utils.icon_mapper import enrich_nodes_with_icons
# Import from config instead of os
from config import MODAL_QWEN_BASE_URL

# Fix: Use 'base_url' instead of 'openai_api_base'
llm = ChatOpenAI(
    model="Qwen/Qwen2.5-7B-Instruct",  # <-- Change this from "qwen-2.5-7b" to "/model"
    temperature=0.1, 
    api_key="EMPTY",  
    base_url=MODAL_QWEN_BASE_URL, 
    model_kwargs={
        "extra_body": {
            "guided_json": MindMap.model_json_schema()
        }
    }
)
async def update_mindmap_state(current_map: MindMap, user_prompt: str) -> MindMap:
    prompt = ChatPromptTemplate.from_messages([
        ("system", """You are a conversational mind-map editing assistant.
        You are provided with the current JSON state of a user's mind map.
        The user will give you an instruction (e.g., 'expand on topic X', 'delete topic Y').
        Modify the JSON by selectively adding, editing, or deleting nodes and edges to fulfill the prompt.
        Maintain a valid tree/radial mind-map structure (no flowcharts).
        Ensure all new nodes have an appropriate emoji in the 'icon' field."""),
        ("user", "Current Mind Map State:\n{current_state}\n\nUser Instruction: {instruction}")
    ])
    
    chain = prompt | llm
    response = await chain.ainvoke({
        "current_state": current_map.model_dump_json(),
        "instruction": user_prompt
    })
    
    updated_map = MindMap.model_validate_json(response.content)
    updated_map.nodes = enrich_nodes_with_icons(updated_map.nodes)
    return updated_map