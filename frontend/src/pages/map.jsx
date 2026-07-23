import {
  ReactFlow,
  MiniMap,
  Controls,
  Background,
  useNodesState,
  useEdgesState,
  addEdge,
} from "@xyflow/react";

import "@xyflow/react/dist/style.css";

import { useCallback } from "react";

const initialNodes = [
  {
    id: "1",
    position: { x: 400, y: 250 },
    data: { label: "🧠 Mind Map" },
    style: {
      background: "#2563eb",
      color: "white",
      borderRadius: "50%",
      width: 120,
      height: 120,
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      border: "3px solid white",
      fontWeight: "bold",
      fontSize: "16px",
    },
  },

  {
    id: "2",
    position: { x: 150, y: 80 },
    data: { label: "DSA" },
  },

  {
    id: "3",
    position: { x: 650, y: 100 },
    data: { label: "React" },
  },

  {
    id: "4",
    position: { x: 120, y: 420 },
    data: { label: "System Design" },
  },

  {
    id: "5",
    position: { x: 650, y: 420 },
    data: { label: "Projects" },
  },
];

const initialEdges = [
  {
    id: "e1-2",
    source: "1",
    target: "2",
    animated: true,
  },
  {
    id: "e1-3",
    source: "1",
    target: "3",
    animated: true,
  },
  {
    id: "e1-4",
    source: "1",
    target: "4",
    animated: true,
  },
  {
    id: "e1-5",
    source: "1",
    target: "5",
    animated: true,
  },
];

export default function App() {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  const onConnect = useCallback(
    (params) =>
      setEdges((eds) =>
        addEdge(
          {
            ...params,
            animated: true,
          },
          eds
        )
      ),
    []
  );

  return (
    <div style={{ width: "100vw", height: "100vh" }}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onConnect={onConnect}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        fitView
      >
        <MiniMap />
        <Controls />
        <Background gap={20} size={1} />
      </ReactFlow>
    </div>
  );
}