import React from 'react';
import { ArrowUp, Linkedin, Github, Mail, ShieldCheck } from 'lucide-react';
import { usePortfolio } from '../context/PortfolioContext';

export default function Footer({ onOpenCMS }) {
  const { personalInfo } = usePortfolio();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative bg-dark-950 border-t border-white/[0.08] pt-16 pb-12 overflow-hidden">
      
      {/* Background glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[200px] bg-brand-purple/10 blur-[120px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="flex flex-col md:flex-row items-center justify-between gap-8 pb-12 border-b border-white/[0.06]">
          
          {/* Brand & Tagline */}
          <div className="text-center md:text-left">
            <div className="flex items-center justify-center md:justify-start gap-2 mb-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400"></span>
              <span className="font-display font-extrabold text-xl text-white tracking-tight uppercase">
                {personalInfo.name || 'Muhammad Alif Ramadhani'}
              </span>
            </div>
            <p className="text-xs text-slate-400 max-w-sm">
              {personalInfo.role} • {personalInfo.location || 'Indonesia'}
            </p>
          </div>

          {/* Quick Nav Links */}
          <nav className="flex flex-wrap justify-center gap-6 text-xs sm:text-sm font-semibold text-slate-400">
            <a href="#home" className="hover:text-white transition-colors">Home</a>
            <a href="#services" className="hover:text-white transition-colors">Services</a>
            <a href="#experience" className="hover:text-white transition-colors">Experience</a>
            <a href="#portfolio" className="hover:text-white transition-colors">Portfolio</a>
            <a href="#about" className="hover:text-white transition-colors">About</a>
            <a href="#contact" className="hover:text-white transition-colors">Contact</a>
            {onOpenCMS && (
              <button
                onClick={onOpenCMS}
                className="text-brand-cyan hover:text-white transition-colors flex items-center gap-1 cursor-pointer font-bold"
              >
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>CMS Admin</span>
              </button>
            )}
          </nav>

          {/* Social Links & Back to Top */}
          <div className="flex items-center gap-3">
            <a
              href={personalInfo.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2.5 rounded-full bg-white/[0.05] hover:bg-white/[0.1] text-slate-400 hover:text-white border border-white/10 transition-colors"
              title="LinkedIn"
              aria-label="LinkedIn"
            >
              <Linkedin className="w-4 h-4" />
            </a>
            <a
              href={personalInfo.github}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2.5 rounded-full bg-white/[0.05] hover:bg-white/[0.1] text-slate-400 hover:text-white border border-white/10 transition-colors"
              title="GitHub"
              aria-label="GitHub"
            >
              <Github className="w-4 h-4" />
            </a>
            <a
              href={`mailto:${personalInfo.email}`}
              className="p-2.5 rounded-full bg-white/[0.05] hover:bg-white/[0.1] text-slate-400 hover:text-white border border-white/10 transition-colors"
              title="Email"
              aria-label="Email"
            >
              <Mail className="w-4 h-4" />
            </a>
            
            <button
              onClick={scrollToTop}
              className="p-2.5 rounded-full bg-brand-purple hover:bg-purple-600 text-white shadow-lg shadow-purple-600/30 transition-all hover:-translate-y-0.5 ml-2 cursor-pointer"
              title="Back to Top"
              aria-label="Back to Top"
            >
              <ArrowUp className="w-4 h-4" />
            </button>
          </div>

        </div>

        {/* Bottom Credits & Copyright */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>© {new Date().getFullYear()} {personalInfo.name}. All rights reserved.</p>
          <div className="flex items-center gap-3">
            {onOpenCMS && (
              <button
                onClick={onOpenCMS}
                className="text-slate-400 hover:text-brand-cyan transition-colors flex items-center gap-1"
              >
                <span>Login CMS Panel</span>
              </button>
            )}
            <span className="w-1 h-1 rounded-full bg-slate-700"></span>
            <div className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-brand-cyan"></span>
              <span>React.jsx & Tailwind CSS</span>
            </div>
          </div>
        </div>

      </div>

    </footer>
  );
}
