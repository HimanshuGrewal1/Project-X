from langchain_openai import ChatOpenAI
from langchain_core.prompts import ChatPromptTemplate
from models import MindMap
from utils.icon_mapper import enrich_nodes_with_icons
from config import MODAL_QWEN_BASE_URL

llm = ChatOpenAI(
    model="Qwen/Qwen2.5-7B-Instruct",
    temperature=0.1,
    api_key="EMPTY",
    base_url=MODAL_QWEN_BASE_URL,
).with_structured_output(MindMap, method="json_schema")   # <-- this line is the fix

async def generate_initial_mindmap(document_text: str) -> MindMap:
    prompt = ChatPromptTemplate.from_messages([
        ("system", """You are an expert knowledge graph extraction AI. 
        Your task is to read the provided document and extract a MIND MAP.
        Do NOT create a flowchart. Create a radial, topic-based mind map with a central root node, branching out into sub-topics.
        Assign a highly relevant single emoji to the 'icon' field of each node.
        Keep labels concise (1-4 words). Response must strictly match the JSON schema."""),
        ("user", "Extract a mind map from the following text:\n\n{text}")
    ])

    chain = prompt | llm
    mind_map = await chain.ainvoke({"text": document_text})   # already a MindMap, no .content needed
    print(mind_map)   # will print a MindMap object, not an AIMessage

    mind_map.nodes = enrich_nodes_with_icons(mind_map.nodes)
    return mind_map