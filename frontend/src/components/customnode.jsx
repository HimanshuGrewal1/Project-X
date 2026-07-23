import { Handle, Position } from "@xyflow/react";

export default function CustomNode({ data, selected }) {
  return (
    <div
      style={{
        background: "#1e293b",
        color: "#f1f5f9",
        border: selected ? "2px solid #3b82f6" : "1px solid rgba(255,255,255,0.1)",
        padding: 10,
        borderRadius: "10px",
        width: 170,
        textAlign: "center",
        fontSize: 13,
        boxShadow: selected ? "0 0 0 3px rgba(59,130,246,0.25)" : "none",
      }}
    >
      <Handle type="target" position={Position.Top} />
      <div className="flex items-center justify-center gap-1.5">
        {data.icon && <span>{data.icon}</span>}
        <span className="font-medium truncate">{data.label}</span>
      </div>
      {data.description && (
        <div className="text-[11px] opacity-70 mt-1 line-clamp-2">
          {data.description}
        </div>
      )}
      <Handle type="source" position={Position.Bottom} />
    </div>
  );
}