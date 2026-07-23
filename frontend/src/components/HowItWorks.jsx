import { motion } from "framer-motion";
import { UploadCloud, Cpu, Share2 } from "lucide-react";

export default function HowItWorks() {
  const steps = [
    {
      icon: <UploadCloud size={40} />,
      title: "Upload PDF",
      description:
        "Simply upload your PDF securely — no sign-in required. Supports files up to 20MB.",
    },
    {
      icon: <Cpu size={40} />,
      title: "Process & Extract",
      description:
        "Our AI engine reads and extracts key ideas, concepts, and relationships instantly.",
    },
    {
      icon: <Share2 size={40} />,
      title: "View & Share",
      description:
        "Explore your auto-generated mind map and share it seamlessly with anyone.",
    },
  ];

  return (
    <section className="py-24 bg-gradient-to-br from-[#f9fafb] to-[#edf2f6] relative overflow-hidden text-center text-gray-800">
      {/* Subtle background glow accents */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(100,180,255,0.15),transparent_70%)] pointer-events-none"></div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_right,rgba(45,212,191,0.15),transparent_70%)] pointer-events-none"></div>

      <div className="relative max-w-7xl mx-auto px-6 z-10">
        {/* Section Title */}
        <h2 className="text-4xl md:text-5xl font-bold mb-16">
          <span className="bg-gradient-to-r from-[#2dd4bf] to-[#0ea5e9] bg-clip-text text-transparent">
            How It Works
          </span>
        </h2>

        {/* Steps Grid */}
        <div className="grid gap-10 md:grid-cols-3">
          {steps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              whileHover={{ scale: 1.03, y: -5 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="bg-white/80 backdrop-blur-md border border-gray-200 rounded-2xl p-8 shadow-[0_10px_30px_rgba(0,0,0,0.05)] 
                         hover:shadow-[0_10px_40px_rgba(0,0,0,0.1)] transition-all duration-300"
            >
              <div className="flex flex-col items-center space-y-4">
                <div className="text-[#0ea5e9]">{step.icon}</div>
                <h3 className="text-xl font-semibold">{step.title}</h3>
                <p className="text-gray-600 leading-relaxed">{step.description}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="mt-16"
        >
          <a
            href="/signup"
            className="px-8 py-4 rounded-full font-semibold 
                       bg-gradient-to-r from-[#2dd4bf] to-[#0ea5e9] text-white
                       shadow-md hover:shadow-xl hover:scale-105 
                       transition-all duration-300"
          >
            Start Now
          </a>
        </motion.div>
      </div>
    </section>
  );
}
