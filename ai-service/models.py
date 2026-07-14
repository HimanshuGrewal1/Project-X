from pydantic import BaseModel, Field
from typing import List, Optional

class Node(BaseModel):
    id: str = Field(description="Unique identifier for the node (e.g., '1', '2')")
    label: str = Field(description="The core topic or concept extracted")
    icon: Optional[str] = Field(None, description="An emoji representing the node's concept")

class Edge(BaseModel):
    source: str = Field(description="ID of the source node")
    target: str = Field(description="ID of the target node")
    label: Optional[str] = Field(None, description="Relationship description (e.g., 'includes', 'causes')")

class MindMap(BaseModel):
    nodes: List[Node] = Field(description="List of mind map nodes. Must form a radial or tree-like structure.")
    edges: List[Edge] = Field(description="List of relationships connecting the nodes.")

class ChatUpdateRequest(BaseModel):
    current_map: MindMap
    user_prompt: str