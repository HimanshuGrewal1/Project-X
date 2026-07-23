import { useState, useCallback } from "react";
import { useProjectStore } from "../store/mapstore";
import { FileUp, Loader2 } from "lucide-react";

export default function PdfUploadScreen({ projectId }) {
  const { uploadPdf, error, clearError } = useProjectStore();
  const [progress, setProgress] = useState(0);
  const [uploading, setUploading] = useState(false);
  const [dragOver, setDragOver] = useState(false);

  const handleFile = useCallback(
    async (file) => {
      if (!file || file.type !== "application/pdf") return;
      clearError();
      setUploading(true);
      setProgress(0);
      try {
        await uploadPdf(projectId, file, setProgress);
      } catch {
        // error already set in store
      } finally {
        setUploading(false);
      }
    },
    [projectId]
  );

  return (
    <div className="w-full h-full flex items-center justify-center">
      <div
        onDragOver={(e) => {
          e.preventDefault();
          setDragOver(true);
        }}
        onDragLeave={() => setDragOver(false)}
        onDrop={(e) => {
          e.preventDefault();
          setDragOver(false);
          handleFile(e.dataTransfer.files?.[0]);
        }}
        className={`w-[420px] rounded-2xl border-2 border-dashed p-10 text-center transition-colors
          ${dragOver ? "border-blue-500 bg-blue-500/5" : "border-slate-700 bg-slate-900"}`}
      >
        {uploading ? (
          <div className="flex flex-col items-center gap-3">
            <Loader2 className="w-8 h-8 text-blue-500 animate-spin" />
            <p className="text-slate-300 text-sm">Generating mind map… {progress}%</p>
            <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden">
              <div
                className="h-full bg-blue-500 transition-all"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
        ) : (
          <>
            <FileUp className="w-10 h-10 text-slate-500 mx-auto mb-4" />
            <h2 className="text-slate-100 font-semibold text-lg mb-1">
              Upload a PDF to build your mind map
            </h2>
            <p className="text-slate-500 text-sm mb-6">
              Drag & drop a file here, or click to browse
            </p>
            <label className="inline-block px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-500 text-white text-sm font-medium cursor-pointer transition-colors">
              Choose PDF
              <input
                type="file"
                accept="application/pdf"
                className="hidden"
                onChange={(e) => handleFile(e.target.files?.[0])}
              />
            </label>
            {error && <p className="text-red-400 text-xs mt-4">{error}</p>}
          </>
        )}
      </div>
    </div>
  );
}