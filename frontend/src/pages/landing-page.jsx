import React from "react";

const features = [
  {
    title: "Notebook-style projects",
    description: "Organize prompts, outputs, and notes for each project in one place.",
  },
  {
    title: "Fast iteration",
    description: "Tweak prompts and instantly see results without leaving your workspace.",
  },
  {
    title: "Everything in sync",
    description: "Your projects stay saved and accessible whenever you come back.",
  },
];

export default function Landing() {
  return (
    <div className="bg-gradient-to-right from-slate-900 to-blue-600 h-full w-full min-h-screen font-sans text-white select-none">
      
      {/* Nav */}
      <nav className="flex items-center justify-between max-w-[1000px] mx-auto px-[20px] py-[25px]">
        <div className="text-[22px] font-semibold">MMcon</div>
        <div className="flex items-center gap-[20px]">
          <a href="/login" className="text-white text-[15px] no-underline hover:underline">Log in</a>
          <a href="/signup" className="bg-white text-slate-900 text-[15px] font-medium px-[18px] py-[8px] rounded-[5px] no-underline">Sign up</a>
        </div>
      </nav>

      {/* Hero */}
      <div className="max-w-[700px] mx-auto text-center px-[20px] pt-[60px] pb-[80px]">
        <h1 className="text-[40px] font-semibold leading-tight mb-[20px]">Build with LLMs in a notebook that just works</h1>
        <p className="text-slate-300 text-[16px] mb-[35px]">MMcon lets you prototype, test, and organize LLM-powered projects side by side, all in one clean workspace.</p>
        
        <a href="/signup" className="group inline-block relative overflow-hidden rounded-[5px] h-[50px] w-[200px]">
          <div 
            className="h-full w-[300%] absolute left-[-100%] rounded-[5px] transition-all duration-400 ease-[ease] group-hover:left-0" 
            style={{ background: "linear-gradient(to right, #0f172a, #2563eb, #0f172a, #2563eb)" }}
          />
          <span className="h-full w-full z-[1] relative flex items-center justify-center text-white text-[17px] font-medium">Get Started</span>
        </a>
      </div>

      {/* Feature cards */}
      <div className="max-w-[1000px] mx-auto px-[20px] pb-[80px]">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-[20px]">
          {features.map((feature, index) => (
            <div key={index} className="bg-white text-gray-900 rounded-[5px] p-[25px] shadow-[0px_15px_20px_rgba(0,0,0,0.1)]">
              <div className="text-[18px] font-semibold mb-[8px]">{feature.title}</div>
              <p className="text-gray-500 text-[14px]">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Footer */}
      <footer className="text-center text-slate-400 text-[13px] pb-[30px]">
        &copy; {new Date().getFullYear()} MMcon. All rights reserved.
      </footer>

    </div>
  );
}