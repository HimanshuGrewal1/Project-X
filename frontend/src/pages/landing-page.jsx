import React from "react";
import { motion } from "framer-motion";
import { FaProjectDiagram, FaRocket, FaSyncAlt } from "react-icons/fa";

// ─── Configuration ───────────────────────────────────────────────
const features = [
  {
    title: "Notebook-style projects",
    description:
      "Organize prompts, outputs, and notes for each project in one place.",
    icon: <FaProjectDiagram className="text-2xl text-blue-500" />,
  },
  {
    title: "Fast iteration",
    description:
      "Tweak prompts and instantly see results without leaving your workspace.",
    icon: <FaRocket className="text-2xl text-blue-500" />,
  },
  {
    title: "Everything in sync",
    description:
      "Your projects stay saved and accessible whenever you come back.",
    icon: <FaSyncAlt className="text-2xl text-blue-500" />,
  },
];

// ─── Animation Variants ──────────────────────────────────────────
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: { y: 0, opacity: 1, transition: { type: "spring", stiffness: 100 } },
};

// ─── Component ────────────────────────────────────────────────────
export default function Landing() {
  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-slate-900 font-sans text-white antialiased select-none">
      {/* ─── Animated Background ────────────────────────────────── */}
      <motion.div
        className="absolute inset-0 -z-10"
        animate={{
          background: [
            "radial-gradient(circle at 20% 20%, #1e3a8a, #0f172a)",
            "radial-gradient(circle at 80% 80%, #2563eb, #0f172a)",
            "radial-gradient(circle at 20% 80%, #1e3a8a, #0f172a)",
            "radial-gradient(circle at 80% 20%, #2563eb, #0f172a)",
          ],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          repeatType: "mirror",
          ease: "linear",
        }}
      />

      {/* ─── Content ──────────────────────────────────────────────── */}
      <motion.div
        className="relative z-10 flex min-h-screen flex-col"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        {/* ─── Nav ────────────────────────────────────────────────── */}
        <motion.nav
          variants={itemVariants}
          className="flex items-center justify-between max-w-6xl mx-auto w-full px-6 py-5"
        >
          <div className="flex items-center gap-2 text-2xl font-semibold tracking-tight">
            <span className="inline-block h-8 w-8 rounded-full bg-gradient-to-br from-blue-400 to-sky-500" />
            MMcon
          </div>
          <div className="flex items-center gap-4">
            <a
              href="/login"
              className="text-sm text-slate-300 transition-colors hover:text-white hover:underline"
            >
              Log in
            </a>
            <motion.a
              href="/signup"
              className="relative overflow-hidden rounded-md bg-white px-5 py-2 text-sm font-medium text-slate-900 shadow-md transition-shadow hover:shadow-lg"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Sign up
            </motion.a>
          </div>
        </motion.nav>

        {/* ─── Hero ────────────────────────────────────────────────── */}
        <motion.section
          variants={itemVariants}
          className="flex flex-1 flex-col items-center justify-center px-6 py-20 text-center"
        >
          <motion.h1
            className="max-w-3xl text-4xl font-bold leading-tight sm:text-5xl md:text-6xl"
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            Build with LLMs in a notebook that just works
          </motion.h1>
          <motion.p
            className="mt-4 max-w-2xl text-base text-slate-300 sm:text-lg"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.5 }}
          >
            MMcon lets you prototype, test, and organize LLM‑powered projects
            side by side, all in one clean workspace.
          </motion.p>

          <motion.a
            href="/signup"
            className="group relative mt-8 inline-flex h-12 w-48 items-center justify-center overflow-hidden rounded-md font-medium text-white"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
          >
            <span className="absolute inset-0 -translate-x-full transition-transform duration-500 ease-out group-hover:translate-x-0 bg-gradient-to-r from-slate-800 via-blue-600 to-slate-800" />
            <span className="relative z-10 flex items-center gap-2">
              Get Started
              <motion.span
                animate={{ x: [0, 6, 0] }}
                transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
              >
                →
              </motion.span>
            </span>
          </motion.a>
        </motion.section>

        {/* ─── Feature Cards ──────────────────────────────────────── */}
        <motion.section
          variants={containerVariants}
          className="max-w-6xl mx-auto w-full px-6 pb-20"
        >
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                whileHover={{
                  y: -8,
                  boxShadow: "0 20px 30px -10px rgba(37, 99, 235, 0.3)",
                }}
                whileInView={{ opacity: 1, y: 0 }}
                initial={{ opacity: 0, y: 30 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ type: "spring", stiffness: 200 }}
                className="rounded-xl bg-white/10 backdrop-blur-sm p-6 shadow-lg ring-1 ring-white/10 transition-all hover:ring-blue-400/50"
              >
                <div className="mb-3 flex items-center gap-3">
                  {feature.icon}
                  <h3 className="text-lg font-semibold text-white">
                    {feature.title}
                  </h3>
                </div>
                <p className="text-sm text-slate-300 leading-relaxed">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* ─── Footer ────────────────────────────────────────────── */}
        <motion.footer
          variants={itemVariants}
          className="mt-auto text-center text-sm text-slate-400 pb-6"
        >
          &copy; {new Date().getFullYear()} MMcon. All rights reserved.
        </motion.footer>
      </motion.div>
    </div>
  );
}