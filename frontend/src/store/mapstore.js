import { create } from "zustand";
import axios from "axios";

const API_URL = `${import.meta.env.VITE_API_URLL2}/api/project`;

axios.defaults.withCredentials = true;

// place this above the store definition (or in a utils file and import it)
function computeLayout(nodes, edges) {
  const ids = nodes.map((n, i) => n.id ?? String(i));
  const adjacency = {};
  ids.forEach((id) => (adjacency[id] = []));

  edges.forEach((e) => {
    if (adjacency[e.source]) adjacency[e.source].push(e.target);
    if (adjacency[e.target]) adjacency[e.target].push(e.source);
  });

  // root = explicit type "root", else just the first node
  const rootId =
    nodes.find((n) => (n.type ?? n.data?.type) === "root")?.id ?? ids[0];

  // BFS to assign a "ring" level to every node
  const level = { [rootId]: 0 };
  const queue = [rootId];
  while (queue.length) {
    const cur = queue.shift();
    for (const neighbor of adjacency[cur] || []) {
      if (level[neighbor] === undefined) {
        level[neighbor] = level[cur] + 1;
        queue.push(neighbor);
      }
    }
  }
  const maxLevel = Math.max(0, ...Object.values(level));
  ids.forEach((id) => {
    if (level[id] === undefined) level[id] = maxLevel + 1; // disconnected nodes
  });

  const byLevel = {};
  ids.forEach((id) => {
    (byLevel[level[id]] ??= []).push(id);
  });

  const centerX = 500;
  const centerY = 350;
  const radiusStep = 220;
  const positions = {};

  Object.entries(byLevel).forEach(([lvl, idsAtLevel]) => {
    const l = Number(lvl);
    if (l === 0) {
      positions[idsAtLevel[0]] = { x: centerX, y: centerY };
      return;
    }
    const radius = radiusStep * l;
    idsAtLevel.forEach((id, i) => {
      const angle = (2 * Math.PI * i) / idsAtLevel.length - Math.PI / 2;
      positions[id] = {
        x: centerX + radius * Math.cos(angle),
        y: centerY + radius * Math.sin(angle),
      };
    });
  });

  return positions;
}

export const useProjectStore = create((set) => ({
  projects: [],
  currentProject: null,

  error: null,
  message: null,
  isLoading: false,

  // =========================
  // Create Project
  // =========================
  createProject: async (projectData) => {
    set({ isLoading: true, error: null });

    try {
      const { data } = await axios.post(
        `${API_URL}/project`,
        projectData
      );

      set((state) => ({
        projects: [...state.projects, data.project],
        currentProject: data.project,
        isLoading: false,
      }));

      return data;
    } catch (err) {
      set({
        error: err.response?.data?.message || "Failed to create project",
        isLoading: false,
      });

      throw err;
    }
  },

  // =========================
  // Get All Projects
  // =========================
  getProjects: async () => {
    set({
      isLoading: true,
      error: null,
    });

    try {
      const { data } = await axios.get(`${API_URL}/project`);

      set({
        projects: data.projects,
        isLoading: false,
      });

      return data.projects;
    } catch (err) {
      set({
        error: err.response?.data?.message || "Failed to fetch projects",
        isLoading: false,
      });

      throw err;
    }
  },

  // =========================
  // Get Single Project
  // =========================
  getProject: async (projectId) => {
    set({
      isLoading: true,
      error: null,
    });

    try {
      const { data } = await axios.get(
        `${API_URL}/project/${projectId}`
      );

      set({
        currentProject: data.project,
        isLoading: false,
      });

      return data.project;
    } catch (err) {
      set({
        error: err.response?.data?.message || "Failed to fetch project",
        isLoading: false,
      });

      throw err;
    }
  },

  // =========================
  // Create Node
  // =========================
  // createNode: async (projectId, nodeData) => {
  //   set({
  //     isLoading: true,
  //     error: null,
  //   });

  //   try {
  //     const { data } = await axios.post(
  //       `${API_URL}/project/${projectId}/creatNode`,
  //       nodeData
  //     );

  //     set({
  //       currentProject: data.project,
  //       isLoading: false,
  //     });

  //     return data;
  //   } catch (err) {
  //     set({
  //       error: err.response?.data?.message || "Failed to create node",
  //       isLoading: false,
  //     });

  //     throw err;
  //   }
  // },

  // =========================
  // Create Edge
  // =========================
  // createEdge: async (projectId, edgeData) => {
  //   set({
  //     isLoading: true,
  //     error: null,
  //   });

  //   try {
  //     const { data } = await axios.post(
  //       `${API_URL}/project/${projectId}/creatEdge`,
  //       edgeData
  //     );

  //     set({
  //       currentProject: data.project,
  //       isLoading: false,
  //     });

  //     return data;
  //   } catch (err) {
  //     set({
  //       error: err.response?.data?.message || "Failed to create edge",
  //       isLoading: false,
  //     });

  //     throw err;
  //   }
  // },

  // =========================
  // Edit Node
  // =========================
//   editNode: async (projectId, nodeData) => {
//     set({
//       isLoading: true,
//       error: null,
//     });
//   //  console.log("Editing node with data:", nodeData); // Debugging line
//     try {
//       const { data } = await axios.post(
//         `${API_URL}/project/${projectId}/editNode`,
//         nodeData
//       );
//    //   console.log("Response from editNode:", data); // Debugging line
//       set({
//         currentProject: data.project,
//         isLoading: false,
//       });
// console.log("Updated currentProject after editNode:", data.project); // Debugging line
//       return data;
//     } catch (err) {
//       set({
//         error: err.response?.data?.message || "Failed to edit node",
//         isLoading: false,
//       });

//       throw err;
//     }
//   },

  // =========================
  // Clear Current Project
  // =========================
  // clearProject: () => {
  //   set({
  //     currentProject: null,
  //   });
  // },

  // =========================
  // Clear Errors
  // =========================
  // clearError: () => {
  //   set({
  //     error: null,
  //   });
  // },

  // =========================
  // Clear Messages
  // =========================
  // clearMessage: () => {
  //   set({
  //     message: null,
  //   });
  // },

  // =========================
 createNode: async (projectId, nodeData) => {
    set({ isLoading: true, error: null });
    try {
      const { data } = await axios.post(`${API_URL}/project/${projectId}/creatNode`, nodeData);

      set((state) => {
        const project = state.currentProject;
        if (!project) return { isLoading: false };
        return {
          currentProject: {
            ...project,
            Nodes: [...(project.Nodes || []), data.node],
          },
          isLoading: false,
        };
      });

      return data;
    } catch (err) {
      set({ error: err.response?.data?.message || "Failed to create node", isLoading: false });
      throw err;
    }
  },

  // =========================
  // Edit Node
  // =========================
  editNode: async (projectId, nodeData) => {
    set({ isLoading: true, error: null });
    try {
      const { data } = await axios.post(`${API_URL}/project/${projectId}/editNode`, nodeData);

      set((state) => {
        const project = state.currentProject;
        if (!project) return { isLoading: false };
        console.log("Updating node in currentProject:", data.node);
        console.log("Current nodes before update:", project.Nodes);
        return {
          currentProject: {
            ...project,
            Nodes: (project.Nodes || []).map((n) =>
              n.id === data.node.id ? data.node : n
            ),
          },
          isLoading: false,
        };
      });

      return data;
    } catch (err) {
      set({ error: err.response?.data?.message || "Failed to edit node", isLoading: false });
      throw err;
    }
  },

  // =========================
  // Delete Node
  // =========================
  deleteNode: async (projectId, nodeId) => {
    set({ isLoading: true, error: null });
    try {
      const { data } = await axios.post(`${API_URL}/project/${projectId}/deleteNode`, { id: nodeId });

      set((state) => {
        const project = state.currentProject;
        if (!project) return { isLoading: false };
        return {
          currentProject: {
            ...project,
            Nodes: (project.Nodes || []).filter((n) => n.id !== nodeId),
            Edges: (project.Edges || []).filter(
              (e) => e.source !== nodeId && e.target !== nodeId
            ),
          },
          isLoading: false,
        };
      });

      return data;
    } catch (err) {
      set({ error: err.response?.data?.message || "Failed to delete node", isLoading: false });
      throw err;
    }
  },

  // =========================
  // Create Edge
  // =========================
  createEdge: async (projectId, edgeData) => {
    set({ isLoading: true, error: null });
    try {
      const { data } = await axios.post(`${API_URL}/project/${projectId}/creatEdge`, edgeData);

      set((state) => {
        const project = state.currentProject;
        if (!project) return { isLoading: false };
        return {
          currentProject: {
            ...project,
            Edges: [...(project.Edges || []), data.edge],
          },
          isLoading: false,
        };
      });

      return data;
    } catch (err) {
      set({ error: err.response?.data?.message || "Failed to create edge", isLoading: false });
      throw err;
    }
  },

  // =========================
  // Edit Edge
  // =========================
  editEdge: async (projectId, edgeData) => {
    set({ isLoading: true, error: null });
    try {
      const { data } = await axios.post(`${API_URL}/project/${projectId}/editEdge`, edgeData);

      set((state) => {
        const project = state.currentProject;
        if (!project) return { isLoading: false };
        return {
          currentProject: {
            ...project,
            Edges: (project.Edges || []).map((e) =>
              e._id === data.edge._id ? data.edge : e
            ),
          },
          isLoading: false,
        };
      });

      return data;
    } catch (err) {
      set({ error: err.response?.data?.message || "Failed to edit edge", isLoading: false });
      throw err;
    }
  },

  // =========================
  // Delete Edge
  // =========================
  deleteEdge: async (projectId, edgeId) => {
    set({ isLoading: true, error: null });
    try {
      const { data } = await axios.post(`${API_URL}/project/${projectId}/deleteEdge`, { id: edgeId });

      set((state) => {
        const project = state.currentProject;
        if (!project) return { isLoading: false };
        return {
          currentProject: {
            ...project,
            Edges: (project.Edges || []).filter((e) => e._id !== edgeId),
          },
          isLoading: false,
        };
      });

      return data;
    } catch (err) {
      set({ error: err.response?.data?.message || "Failed to delete edge", isLoading: false });
      throw err;
    }
  },

  clearProject: () => set({ currentProject: null }),
  clearError: () => set({ error: null }),
  clearMessage: () => set({ message: null }),

  // =========================
  // Upload PDF -> backend generates nodes/edges
  // =========================
 // =========================
  // Upload PDF -> extract -> save to project
  // =========================
uploadPdf: async (projectId, file, onProgress) => {
    set({ isLoading: true, error: null });
    try {
      const formData = new FormData();
      formData.append("file", file);

      const { data } = await axios.post(
        "http://127.0.0.1:8000/api/v1/extract",
        formData,
        {
          onUploadProgress: (evt) => {
            if (onProgress && evt.total) {
              onProgress(Math.round((evt.loaded * 100) / evt.total));
            }
          },
        }
      );
console.log("Extracted data from PDF:", data);
      const extractedNodes = data.nodes || [];
      const extractedEdges = data.edges || [];

      // layout still has to be computed client/server-side — the LLM doesn't do coordinates
      const positions = computeLayout(extractedNodes, extractedEdges);

      const idMap = {};
      const nodesToSave = extractedNodes.map((n) => {
        const finalId = crypto.randomUUID();
        idMap[n.id] = finalId;

        return {
          id: finalId,
          projectId,
          label: n.label,
          description: n.description,
          icon: n.icon,
           // already { label, content, confidence, type } — no remapping
          position: positions[n.id] ?? { x: 0, y: 0 },
          // style:
          //   n.data.type === "root"
          //     ? { backgroundColor: "#2563eb", color: "#fff", borderRadius: "50%", width: 120 }
          //     : { backgroundColor: "#1e293b", color: "#f1f5f9", borderRadius: "10px", width: 160 },
        };
      });

      const edgesToSave = extractedEdges
        .filter((e) => idMap[e.source] && idMap[e.target])
        .map((e) => ({
          projectId,
          source: idMap[e.source],
          target: idMap[e.target],
         // type: "smoothstep",
          label: e.label,
         // animated: true,
        //  data: e.data, // already { confidence, rationale } — no remapping
        }));
console.log("Nodes to save:", nodesToSave);
console.log("Edges to save:", edgesToSave);
      await Promise.all(
        nodesToSave.map((n) => axios.post(`${API_URL}/project/${projectId}/creatNode`, n))
      );
      await Promise.all(
        edgesToSave.map((e) => axios.post(`${API_URL}/project/${projectId}/creatEdge`, e))
      );

      const { data: projectRes } = await axios.get(`${API_URL}/project/${projectId}`);
      set({ currentProject: projectRes.project, isLoading: false });
      return projectRes;
    } catch (err) {
      set({
        error: err.response?.data?.message || "Failed to process PDF",
        isLoading: false,
      });
      throw err;
    }
  },
}));