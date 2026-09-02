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
  GraduationCap,
  Atom,
  Palette,
  FileCode2,
  Network,
  BarChart3
} from 'lucide-react';
import { usePortfolio } from '../context/PortfolioContext';

const ICON_MAP = {
  Code2,
  Atom,
  Palette,
  FileCode2,
  Terminal,
  Smartphone,
  Database,
  Network,
  GitBranch,
  BarChart3,
  Layers,
  Sparkles
};

export default function TechStackStrip() {
  const { techStack } = usePortfolio();

  return (
    <section className="relative py-8 sm:py-10 bg-dark-950/60 border-y border-white/[0.07] backdrop-blur-md overflow-hidden">
      
      {/* Ambient background accent */}
      <div className="absolute inset-0 bg-gradient-to-r from-brand-purple/5 via-brand-cyan/5 to-brand-purple/5 pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Strip Grid / Container */}
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-4 sm:gap-6 items-center justify-center">
          {techStack.slice(0, 8).map((item, index) => {
            const Icon = ICON_MAP[item.icon] || Code2;
            return (
              <div
                key={item.id || item.name + index}
                className="group flex flex-col items-center justify-center p-3 rounded-2xl bg-white/[0.02] hover:bg-white/[0.06] border border-white/[0.04] hover:border-white/20 transition-all duration-300 transform hover:-translate-y-0.5"
              >
                <div className="flex items-center gap-2 mb-1">
                  <Icon className="w-4 h-4 text-brand-cyan group-hover:scale-110 transition-transform" />
                  <span className="text-sm font-bold text-slate-300 group-hover:text-white transition-colors tracking-tight">
                    {item.name}
                  </span>
                </div>
                <span className="text-[10px] text-slate-500 group-hover:text-slate-400 text-center font-medium">
                  {item.category} &bull; {item.level}
                </span>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
