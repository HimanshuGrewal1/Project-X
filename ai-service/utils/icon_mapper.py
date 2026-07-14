# A lightweight dictionary for common categories to save LLM tokens/processing
EMOJI_MAP = {
    "marketing": "📈", "business": "💼", "technology": "💻", "ai": "🤖",
    "finance": "💰", "health": "⚕️", "education": "🎓", "user": "👤",
    "database": "🗄️", "security": "🔒", "cloud": "☁️", "server": "🖥️"
}

def enrich_nodes_with_icons(nodes: list) -> list:
    """
    Utility function to map node keywords to an emoji if the LLM missed it.
    """
    for node in nodes:
        if not node.icon:
            # Fallback logic: check if any keyword is in the label
            label_lower = node.label.lower()
            assigned = False
            for key, emoji in EMOJI_MAP.items():
                if key in label_lower:
                    node.icon = emoji
                    assigned = True
                    break
            if not assigned:
                node.icon = "🔹" # Default mind-map node icon
    return nodes