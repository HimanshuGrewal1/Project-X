# from pydantic import BaseModel, Field
# from typing import List, Optional, Literal


# class NodeData(BaseModel):
#     label: str = Field(description="Short title for the concept (2-5 words)")
#     content: str = Field(description="A brief explanation or context for the node")
#     confidence: int = Field(
#         ge=0, le=100,
#         description="Model's confidence that this concept is accurately extracted from the source, 0-100"
#     )
#     type: Literal["root", "concept", "detail"] = Field(
#         description="'root' for the single central topic, 'concept' for main branches, 'detail' for leaf-level specifics"
#     )


# class Node(BaseModel):
#     id: str = Field(description="Unique identifier for the node within this response (e.g., '1', '2')")
#     data: NodeData


# class EdgeData(BaseModel):
#     confidence: Optional[int] = Field(
#         None, ge=0, le=100,
#         description="Model's confidence in this relationship, 0-100"
#     )
#     rationale: Optional[str] = Field(
#         None, description="Brief justification for why these two nodes are connected"
#     )


# class Edge(BaseModel):
#     source: str = Field(description="ID of the source node")
#     target: str = Field(description="ID of the target node")
#     label: Optional[str] = Field(None, description="Relationship description (e.g., 'includes', 'causes')")
#     data: Optional[EdgeData] = None


# class MindMap(BaseModel):
#     nodes: List[Node] = Field(description="List of mind map nodes. Must form a radial or tree-like structure with exactly one 'root' node.")
#     edges: List[Edge] = Field(description="List of relationships connecting the nodes. Every non-root node should have a path back to the root.")


# class ChatUpdateRequest(BaseModel):
#     current_map: MindMap
#     user_prompt: str


from pydantic import BaseModel, Field
from typing import List, Optional

class Node(BaseModel):
    id: str = Field(description="Unique identifier for the node (e.g., '1', '2')")
    label: str = Field(description="The core topic or concept extracted")
    icon: Optional[str] = Field(None, description="An emoji representing the node's concept")
    description: Optional[str] = Field(None, description="A brief explanation or context for the node")

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


