import FeatureCard from "./FeatureCard";
import { FileText, Cpu, Share2 } from "lucide-react";

export default function Features() {
  const features = [
    {
      icon: <FileText size={36} />,
      title: "AI-Powered Extraction",
      description:
        "Intelligently captures core ideas from any document with precision.",
    },
    {
      icon: <Cpu size={36} />,
      title: "Smart Mind Mapping",
      description:
        "Transforms structured content into beautiful, dynamic visuals automatically.",
    },
    {
      icon: <Share2 size={36} />,
      title: "Effortless Collaboration",
      description:
        "Share your mind maps securely or collaborate in real-time.",
    },
  ];

  return (
    <section className="relative py-24 bg-gradient-to-br from-[#f9fafb] to-[#edf2f6] text-gray-800 overflow-hidden">
      <div className="relative max-w-7xl mx-auto px-6 z-10">
        <h2 className="text-4xl font-bold text-center mb-12">
          <span className="bg-gradient-to-r from-[#2dd4bf] to-[#0ea5e9] text-transparent bg-clip-text">
            Features
          </span>
        </h2>

        <div className="grid gap-10 md:grid-cols-3 place-items-center">
          {features.map((feature, index) => (
            <FeatureCard key={index} {...feature} />
          ))}
        </div>
      </div>
    </section>
  );
}
