import React from 'react';
import { 
  GraduationCap, 
  Code, 
  Sparkles, 
  Award, 
  CheckCircle2, 
  Download, 
  ExternalLink,
  MapPin,
  Laptop
} from 'lucide-react';
import { usePortfolio } from '../context/PortfolioContext';

export default function AboutSection({ onDownloadCV }) {
  const { personalInfo, techStack } = usePortfolio();
  return (
    <section id="about" className="relative py-20 lg:py-28 bg-dark-950/50 border-t border-white/[0.06] overflow-hidden">
      
      {/* Background Orbs */}
      <div className="absolute top-1/2 right-10 w-[450px] h-[450px] bg-brand-purple/15 rounded-full blur-[140px] pointer-events-none -z-10"></div>
      <div className="absolute bottom-10 left-10 w-[400px] h-[400px] bg-brand-cyan/10 rounded-full blur-[130px] pointer-events-none -z-10"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* LEFT: Info & Biography */}
          <div className="lg:col-span-7">
            
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-brand-purple/10 border border-brand-purple/30 text-brand-violet text-xs font-semibold uppercase tracking-wider mb-4">
              <Sparkles className="w-3.5 h-3.5" />
              <span>About Developer</span>
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-black text-white tracking-tight leading-tight mb-6">
              Engineering intuitive, <br />
              <span className="text-gradient-purple">scalable digital systems</span>
            </h2>

            <div className="space-y-4 text-slate-300 text-sm sm:text-base leading-relaxed mb-8">
              <p>
                Hello! I'm <strong className="text-white">Muhammad Alif Ramadhani</strong>, a Computer Science student at <span className="text-brand-cyan">Universitas Bina Nusantara (BINUS)</span> with a GPA of 3.23. I specialize in front-end web development, mobile application engineering, and data processing architectures.
              </p>
              <p className="text-slate-400">
                During my tenure at <strong className="text-slate-200">PT PLN Icon Plus</strong>, I developed the mission-critical Network Model Management application using Vue.js for managing complex power grid topological diagrams, alongside an automated OCR table extraction web tool and PostgreSQL data schemas. At <strong className="text-slate-200">Antreless</strong>, I engineered seamless mobile food ordering screen routing and REST API integrations with Flutter.
              </p>
            </div>

            {/* Value Highlights */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
              <div className="p-4 rounded-2xl bg-dark-850/80 border border-white/[0.08]">
                <div className="flex items-center gap-2.5 text-white font-bold text-sm mb-1">
                  <Laptop className="w-4 h-4 text-brand-cyan" />
                  <span>Modern Tech Stack</span>
                </div>
                <p className="text-xs text-slate-400">Vue.js, React.js, Tailwind CSS, Flutter, Python, PostgreSQL</p>
              </div>

              <div className="p-4 rounded-2xl bg-dark-850/80 border border-white/[0.08]">
                <div className="flex items-center gap-2.5 text-white font-bold text-sm mb-1">
                  <GraduationCap className="w-4 h-4 text-brand-violet" />
                  <span>Academic Excellence</span>
                </div>
                <p className="text-xs text-slate-400">Computer Science BINUS University (2022 - 2026 Expected)</p>
              </div>
            </div>

            {/* Actions */}
            <div className="flex flex-wrap items-center gap-4">
              <button
                onClick={onDownloadCV}
                className="flex items-center gap-2 px-6 py-3 rounded-full text-xs sm:text-sm font-bold text-white bg-gradient-to-r from-brand-purple to-brand-indigo hover:from-purple-600 hover:to-indigo-600 shadow-lg shadow-purple-600/30 transition-all"
              >
                <Download className="w-4 h-4" />
                <span>Download Complete CV (PDF)</span>
              </button>

              <a
                href={personalInfo.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-5 py-3 rounded-full text-xs sm:text-sm font-semibold text-slate-200 bg-white/[0.05] hover:bg-white/[0.1] border border-white/10 transition-colors"
              >
                <span>LinkedIn Profile</span>
                <ExternalLink className="w-3.5 h-3.5 text-brand-cyan" />
              </a>
            </div>

          </div>

          {/* RIGHT: Tech Stack Badges Matrix */}
          <div className="lg:col-span-5">
            <div className="p-6 sm:p-8 rounded-3xl bg-dark-850/90 border border-white/10 backdrop-blur-xl shadow-2xl">
              <h3 className="text-lg font-display font-bold text-white mb-1">
                Core Technical Competencies
              </h3>
              <p className="text-xs text-slate-400 mb-6">
                Hands-on development proficiency and frameworks
              </p>

              <div className="grid grid-cols-2 gap-3">
                {techStack.map((tech, idx) => (
                  <div
                    key={idx}
                    className="p-3 rounded-2xl bg-dark-900/80 border border-white/[0.06] hover:border-brand-purple/40 transition-colors"
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs font-bold text-slate-200">{tech.name}</span>
                      <span className="text-[10px] font-semibold text-brand-cyan px-1.5 py-0.5 rounded bg-brand-cyan/10">
                        {tech.category}
                      </span>
                    </div>
                    <div className="w-full bg-white/[0.08] h-1.5 rounded-full overflow-hidden mt-2">
                      <div
                        className="h-full bg-gradient-to-r from-brand-purple to-brand-cyan rounded-full"
                        style={{ width: tech.level === 'Advanced' ? '92%' : '80%' }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

        </div>

      </div>

    </section>
  );
}
