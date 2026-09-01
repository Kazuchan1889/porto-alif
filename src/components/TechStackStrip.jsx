import React from 'react';
import { 
  Code2, 
  Layers, 
  Terminal, 
  Smartphone, 
  Database, 
  GitBranch, 
  Sparkles,
  Building2,
  GraduationCap
} from 'lucide-react';

export default function TechStackStrip() {
  const brands = [
    { name: "Vue.js", desc: "Front-End Framework", icon: Code2, color: "text-emerald-400" },
    { name: "React.js", desc: "UI Library", icon: Layers, color: "text-sky-400" },
    { name: "Tailwind CSS", desc: "Utility-First CSS", icon: Sparkles, color: "text-cyan-400" },
    { name: "Flutter", desc: "Mobile Cross-Platform", icon: Smartphone, color: "text-blue-400" },
    { name: "Python", desc: "OCR & Analytics", icon: Terminal, color: "text-amber-400" },
    { name: "PostgreSQL", desc: "Relational DB", icon: Database, color: "text-indigo-400" },
    { name: "PT PLN Icon Plus", desc: "Work Experience", icon: Building2, color: "text-blue-300" },
    { name: "BINUS University", desc: "Computer Science", icon: GraduationCap, color: "text-purple-300" },
  ];

  return (
    <section className="relative py-8 sm:py-10 bg-dark-950/60 border-y border-white/[0.07] backdrop-blur-md overflow-hidden">
      
      {/* Ambient background accent */}
      <div className="absolute inset-0 bg-gradient-to-r from-brand-purple/5 via-brand-cyan/5 to-brand-purple/5 pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Strip Grid / Marquee Container */}
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-4 sm:gap-6 items-center justify-center">
          {brands.map((item, index) => {
            const Icon = item.icon;
            return (
              <div
                key={index}
                className="group flex flex-col items-center justify-center p-3 rounded-2xl bg-white/[0.02] hover:bg-white/[0.06] border border-white/[0.04] hover:border-white/20 transition-all duration-300 transform hover:-translate-y-0.5"
              >
                <div className="flex items-center gap-2 mb-1">
                  <Icon className={`w-4 h-4 ${item.color} group-hover:scale-110 transition-transform`} />
                  <span className="text-sm font-bold text-slate-300 group-hover:text-white transition-colors tracking-tight">
                    {item.name}
                  </span>
                </div>
                <span className="text-[10px] text-slate-500 group-hover:text-slate-400 text-center font-medium">
                  {item.desc}
                </span>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
