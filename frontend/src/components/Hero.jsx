import { motion } from "framer-motion";
import { Link } from "react-router-dom";

export default function Hero() {
  return (
    <section className="relative h-[600px] bg-gradient-to-br from-[#f8f9fb] via-[#e9eef2] to-[#dce3eb] text-[#1b1f23] overflow-hidden">
      {/* Subtle floating gradients */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(100,150,255,0.2),transparent_70%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_right,rgba(150,220,200,0.2),transparent_70%)]" />

      <div className="relative max-w-7xl mx-auto px-6 py-24 flex flex-col md:flex-row items-center gap-10 z-10">
        {/* Text */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="flex-1 space-y-6"
        >
          <h1 className="text-4xl md:text-6xl font-bold leading-tight mt-10 tracking-tight">
            Turn Your PDFs Into{" "}
            <span className="bg-gradient-to-r from-[#2dd4bf] to-[#0ea5e9] text-transparent bg-clip-text">
              Dynamic Mind Maps
            </span>
          </h1>

          <p className="text-lg md:text-xl text-gray-700 max-w-xl">
            Simplify complex ideas. Visualize knowledge instantly. Study smarter with auto-generated mind maps.
          </p>

          <div className="flex gap-4">
            <Link
              to="/signup"
              className="px-6 py-3 rounded-xl bg-gradient-to-r from-[#2dd4bf] to-[#0ea5e9] text-white font-semibold shadow-md hover:shadow-lg hover:scale-105 transition-all duration-300"
            >
              Get Started
            </Link>
          </div>
        </motion.div>

        {/* Illustration */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="flex-1 flex justify-center"
        >
          <img
            src="./mindmap.png"
            alt="Mind Map Illustration"
            className="rounded-2xl shadow-[0_10px_30px_rgba(0,0,0,0.1)] hover:scale-105 transition-all duration-700 ease-out"
          />
        </motion.div>
      </div>
    </section>
  );
}
