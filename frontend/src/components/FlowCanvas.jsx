// import { useCallback, useMemo, useRef, useState } from "react";
// import {
//   ReactFlow,
//   MiniMap,
//   Controls,
//   Background,
//   useNodesState,
//   useEdgesState,
//   addEdge,
//   ReactFlowProvider,
//   useReactFlow,
// } from "@xyflow/react";
// import "@xyflow/react/dist/style.css";
// import { useProjectStore } from "../store/mapstore";
// import CustomNode from "./customnode";
// import Inspector from "./Inspector";
// import { Plus } from "lucide-react";

// const nodeTypes = { default: CustomNode };

// // DB (flat) -> ReactFlow (data-wrapped) — RF requires label/description/icon
// // to live under `data` so CustomNode can receive them as props.
// function toRFNode(n) {
//   return {
//     id: n.id,
//     type: "default",
//     position: n.position,
//     data: {
//       label: n.label,
//       description: n.description,
//       icon: n.icon,
//     },
//   };
// }

// function toRFEdge(e) {
//   return {
//     id: e._id,
//     source: e.source,
//     target: e.target,
//     label: e.label,
//     type: "smoothstep", // purely visual, not persisted — schema has no `type` field
//     animated: true,
//   };
// }

// function Canvas({ projectId, initialNodes, initialEdges }) {
//   const { createNode, createEdge, editNode } = useProjectStore();
//   const { screenToFlowPosition } = useReactFlow();

//   const [nodes, setNodes, onNodesChange] = useNodesState(
//     useMemo(() => initialNodes.map(toRFNode), [])
//   );
//   const [edges, setEdges, onEdgesChange] = useEdgesState(
//     useMemo(() => initialEdges.map(toRFEdge), [])
//   );
//   const [selected, setSelected] = useState(null); // { kind: 'node'|'edge', el }
//   const wrapperRef = useRef(null);

//   // Persist position after drag
//   const onNodeDragStop = useCallback(
//     (_, node) => {
//       editNode(projectId, { label:node.data.label, id: node.id, position: node.position ,description: node.data.description, icon: node.data.icon});
//     },
//     [projectId]
//   );

//   // New connection -> persist edge (only source/target/label exist on the schema)
//   const onConnect = useCallback(
//     async (params) => {
//       const tempId = `${params.source}-${params.target}-${Date.now()}`;
//       const newEdge = { ...params, id: tempId, type: "smoothstep", animated: true };
//       setEdges((eds) => addEdge(newEdge, eds));
//       try {
//         const res = await createEdge(projectId, {
//           source: params.source,
//           target: params.target,
//         });
//       if (res?.edge?._id) {                 // was: res?.edge?.id
//   setEdges((eds) =>
//     eds.map((e) => (e.id === tempId ? { ...e, id: res.edge._id } : e))
//   );
// }
//       } catch {
//         setEdges((eds) => eds.filter((e) => e.id !== tempId));
//       }
//     },
//     [projectId]
//   );

//   const handleAddNode = useCallback(async () => {
//     const bounds = wrapperRef.current?.getBoundingClientRect();
//     const center = bounds
//       ? screenToFlowPosition({
//           x: bounds.left + bounds.width / 2,
//           y: bounds.top + bounds.height / 2,
//         })
//       : { x: 250, y: 250 };

//     const payload = {
//       label: "New node",
//       description: "",
//       icon: "💡",
//       position: center,
//     };

//     const res = await createNode(projectId, payload);
//     const id = res?.node?.id || `temp-${Date.now()}`;
//     setNodes((ns) => [...ns, toRFNode({ id, ...payload })]);
//   }, [projectId]);

//   const onNodeClick = useCallback((_, node) => {
//     setSelected({ kind: "node", el: node });
//   }, []);

//   const onEdgeClick = useCallback((_, edge) => {
//     setSelected({ kind: "edge", el: edge });
//   }, []);

//   const onPaneClick = useCallback(() => setSelected(null), []);

//   const handleLocalUpdate = useCallback((kind, payload) => {
//     if (kind === "node") {
//       setNodes((ns) =>
//         ns.map((n) =>
//           n.id === payload.id
//             ? {
//                 ...n,
//                 data: {
//                   label: payload.label,
//                   description: payload.description,
//                   icon: payload.icon,
//                 },
//               }
//             : n
//         )
//       );
//     } else {
//       setEdges((es) =>
//         es.map((e) => (e.id === payload.id ? { ...e, label: payload.label } : e))
//       );
//     }
//   }, []);

//   const handleLocalDelete = useCallback((kind, id) => {
//     if (kind === "node") {
//       setNodes((ns) => ns.filter((n) => n.id !== id));
//       setEdges((es) => es.filter((e) => e.source !== id && e.target !== id));
//     } else {
//       setEdges((es) => es.filter((e) => e.id !== id));
//     }
//   }, []);

//   return (
//     <div className="w-full h-full relative" ref={wrapperRef}>
//       <ReactFlow
//         nodes={nodes}
//         edges={edges}
//         nodeTypes={nodeTypes}
//         onNodesChange={onNodesChange}
//         onEdgesChange={onEdgesChange}
//         onConnect={onConnect}
//         onNodeDragStop={onNodeDragStop}
//         onNodeClick={onNodeClick}
//         onEdgeClick={onEdgeClick}
//         onPaneClick={onPaneClick}
//         fitView
//       >
//         <MiniMap />
//         <Controls />
//         <Background gap={20} size={1} />
//       </ReactFlow>

//       <button
//         onClick={handleAddNode}
//         className="absolute top-4 left-4 flex items-center gap-2 bg-blue-600 hover:bg-blue-500 text-white text-sm px-3 py-2 rounded-lg shadow-lg transition-colors z-10"
//       >
//         <Plus size={16} /> Add node
//       </button>

//       {selected && (
//         <Inspector
//           projectId={projectId}
//           selected={selected}
//           onClose={() => setSelected(null)}
//           onLocalUpdate={handleLocalUpdate}
//           onLocalDelete={handleLocalDelete}
//         />
//       )}
//     </div>
//   );
// }

// export default function FlowCanvas(props) {
//   return (
//     <ReactFlowProvider>
//       <Canvas {...props} />
//     </ReactFlowProvider>
//   );
// }

// FlowCanvas.jsx
import { useEffect, useCallback, useRef, useState } from "react";
import {
  ReactFlow, MiniMap, Controls, Background,
  useNodesState, useEdgesState, addEdge,
  ReactFlowProvider, useReactFlow,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import { useProjectStore } from "../store/mapstore";
import CustomNode from "./customnode";
import Inspector from "./Inspector";
import { Plus } from "lucide-react";

const nodeTypes = { default: CustomNode };

function toRFNode(n) {
  return {
    id: n.id,
    type: "default",
    position: n.position,
    data: { label: n.label, description: n.description, icon: n.icon },
  };
}

function toRFEdge(e) {
  return { id: e._id, source: e.source, target: e.target, label: e.label, type: "smoothstep", animated: true };
}

function Canvas({ projectId }) {
  const { currentProject, createNode, createEdge, editNode } = useProjectStore();
  const { screenToFlowPosition } = useReactFlow();

  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const [selected, setSelected] = useState(null);
  const wrapperRef = useRef(null);

  // THE FIX: resync local RF state any time the store's data changes,
  // instead of freezing it at mount and hand-patching it forever.
  useEffect(() => {
    if (!currentProject) return;
    console.log("Syncing nodes and edges from currentProject:", currentProject);
    setNodes((currentProject.Nodes || []).map(toRFNode));
    setEdges((currentProject.Edges || []).map(toRFEdge));
  }, [currentProject]);

  const onNodeDragStop = useCallback(
    (_, node) => editNode(projectId, { id: node.id, position: node.position }),
    [projectId]
  );

  const onConnect = useCallback(
    async (params) => {
      try {
        await createEdge(projectId, { source: params.source, target: params.target });
        // no manual setEdges needed — createEdge updates currentProject,
        // which the useEffect above picks up automatically
      } catch {
        // store already sets `error`; optionally surface a toast here
      }
    },
    [projectId]
  );

  const handleAddNode = useCallback(async () => {
    const bounds = wrapperRef.current?.getBoundingClientRect();
    const center = bounds
      ? screenToFlowPosition({ x: bounds.left + bounds.width / 2, y: bounds.top + bounds.height / 2 })
      : { x: 250, y: 250 };

    await createNode(projectId, {
      id: crypto.randomUUID(),        // generate it client-side — schema has no default
      label: "New node",
      description: "",
      icon: "💡",
      position: center,
    });
    // again, no manual setNodes — the effect above syncs from currentProject
  }, [projectId]);

  const onNodeClick = useCallback((_, node) => setSelected({ kind: "node", el: node }), []);
  const onEdgeClick = useCallback((_, edge) => setSelected({ kind: "edge", el: edge }), []);
  const onPaneClick = useCallback(() => setSelected(null), []);

  return (
    <div className="w-full h-full relative" ref={wrapperRef}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        nodeTypes={nodeTypes}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        onNodeDragStop={onNodeDragStop}
        onNodeClick={onNodeClick}
        onEdgeClick={onEdgeClick}
        onPaneClick={onPaneClick}
        fitView
      >
        <MiniMap />
        <Controls />
        <Background gap={20} size={1} />
      </ReactFlow>

      <button
        onClick={handleAddNode}
        className="absolute top-4 left-4 flex items-center gap-2 bg-blue-600 hover:bg-blue-500 text-white text-sm px-3 py-2 rounded-lg shadow-lg transition-colors z-10"
      >
        <Plus size={16} /> Add node
      </button>

      {selected && (
        <Inspector
          projectId={projectId}
          selected={selected}
          onClose={() => setSelected(null)}
        />
      )}
    </div>
  );
}

export default function FlowCanvas({ projectId }) {
  return (
    <ReactFlowProvider>
      <Canvas projectId={projectId} />
    </ReactFlowProvider>
  );
}