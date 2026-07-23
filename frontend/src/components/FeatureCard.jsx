import { motion } from "framer-motion";

export default function FeatureCard({ icon, title, description }) {
  return (
    <motion.div
      whileHover={{ y: -6, scale: 1.02 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className="bg-white/70 backdrop-blur-md border border-gray-200 rounded-2xl p-6 
                 shadow-[0_0_20px_rgba(0,0,0,0.05)] hover:shadow-[0_10px_30px_rgba(0,0,0,0.1)]
                 text-center space-y-3 transition-all duration-300"
    >
      <div className="text-4xl text-[#0ea5e9] mb-2">{icon}</div>
      <h3 className="text-xl font-semibold text-gray-800">{title}</h3>
      <p className="text-gray-600 text-base leading-relaxed">{description}</p>
    </motion.div>
  );
}
