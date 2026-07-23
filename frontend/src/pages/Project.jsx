import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useProjectStore } from "../store/mapstore";
import PdfUploadScreen from "../components/pdfupload";
import FlowCanvas from "../components/FlowCanvas";

export default function ProjectPage() {
  const { projectId } = useParams();
  const { currentProject, getProject, isLoading, error } = useProjectStore();

  useEffect(() => {
    if (projectId) getProject(projectId);
  }, [projectId]);

  if (isLoading && !currentProject) {
    return (
      <div className="w-screen h-screen flex items-center justify-center bg-slate-950">
        <div className="flex flex-col items-center gap-3">
          <div className="w-8 h-8 border-2 border-slate-700 border-t-blue-500 rounded-full animate-spin" />
          <p className="text-slate-400 text-sm">Loading project…</p>
        </div>
      </div>
    );
  }

  if (error && !currentProject) {
    return (
      <div className="w-screen h-screen flex items-center justify-center bg-slate-950">
        <p className="text-red-400 text-sm">{error}</p>
      </div>
    );
  }

  if (!currentProject) return null;

  const hasMap =
    (currentProject.Nodes?.length ?? 0) > 0 ||
    (currentProject.Edges?.length ?? 0) > 0;

    console.log(hasMap,currentProject);

  return (
    <div className="w-screen h-screen bg-slate-950">
      {hasMap ? (
        <FlowCanvas
          projectId={projectId}
        />
      ) : (
        <PdfUploadScreen projectId={projectId} />
      )}
    </div>
  );
}