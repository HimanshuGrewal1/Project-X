import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useProjectStore } from "../store//mapstore"; 

;

// ─── Component ────────────────────────────────────────────────────
export default function Dashboard() {
  const navigate = useNavigate();

  const {
  projects,
  isLoading,
  error,
  getProjects,
  createProject,
} = useProjectStore();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newTitle, setNewTitle] = useState("");
  const [newDescription, setNewDescription] = useState("");
  

  // ─── Load projects ──────────────────────────────────────────────
 
    useEffect(() => {
  getProjects();
}, []);
  

 

  // ─── Create new project ─────────────────────────────────────────
  const handleCreateProject = async (e: React.FormEvent) => {
  e.preventDefault();

  if (!newTitle.trim()) return;

  try {
    await createProject({
      title: newTitle,
      description: newDescription,
    });

    setNewTitle("");
    setNewDescription("");
    setIsModalOpen(false);

    // Refresh projects
    await getProjects();
  } catch (err) {
    console.error(err);
  }
};
console.log(projects, "projects in dashboard");
  // ─── Render ──────────────────────────────────────────────────────
  return (
    <div className="min-h-screen bg-gray-50 font-sans text-gray-900 p-6">
      <div className="max-w-4xl mx-auto">

        {/* ─── Header ────────────────────────────────────────────── */}
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold tracking-tight">MMcon</h1>
          <button
            onClick={() => setIsModalOpen(true)}
            className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-lg shadow-sm transition-all hover:shadow-md text-sm font-medium"
          >
            + New Notebook
          </button>
        </div>
{error && (
  <div className="mb-4 rounded-md bg-red-50 border border-red-200 p-3 text-red-600">
    {error}
  </div>
)}
        {/* ─── Projects List ────────────────────────────────────── */}
        <h2 className="text-xl font-semibold mb-4">Your Projects</h2>

        {isLoading ? (
          <div className="flex justify-center py-12">
            <div className="h-8 w-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin" />
          </div>
        ) : projects.length === 0 ? (
          <div className="text-center py-12 text-gray-500 border-2 border-dashed border-gray-300 rounded-xl">
            <p className="text-lg">No projects yet</p>
            <p className="text-sm">Click “New Notebook” to get started.</p>
          </div>
        ) : (
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 divide-y divide-gray-100 overflow-hidden">
            {projects.map((project) => (
              <div
                key={project._id}
                onClick={() => navigate(`/project/${project._id}`)}
                className="flex items-center justify-between p-5 hover:bg-gray-50 cursor-pointer transition-colors"
              >
                <div>
                  <span className="font-medium text-gray-800">{project.name}</span>
                  {project.description && (
                    <p className="text-sm text-gray-500 mt-0.5">{project.description}</p>
                  )}
                </div>
                <svg
                  className="w-5 h-5 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* ─── Modal ────────────────────────────────────────────────── */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl shadow-xl max-w-md w-full p-6">
            <h3 className="text-xl font-semibold mb-4">Create New Notebook</h3>

            <form onSubmit={handleCreateProject}>
              <div className="mb-4">
                <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
                  Title *
                </label>
                <input
                  id="title"
                  type="text"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="e.g., Customer Support Bot"
                  required
                  autoFocus
                />
              </div>

              <div className="mb-6">
                <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
                  Description (optional)
                </label>
                <textarea
                  id="description"
                  value={newDescription}
                  onChange={(e) => setNewDescription(e.target.value)}
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="What's this project about?"
                />
              </div>

              <div className="flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 text-sm font-medium text-gray-600 hover:text-gray-800"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                disabled={isLoading || !newTitle.trim()}
                  className="px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isLoading ? "Creating..." : "Create"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}