import React from 'react';
import { ArrowRight, Sparkles, Download, Code2, MapPin, ExternalLink, Smartphone, Database } from 'lucide-react';
import { personalInfo } from '../data/portfolioData';

export default function HeroSection({ onDownloadCV, onCopyContact }) {
  const handleScrollTo = (e, id) => {
    e.preventDefault();
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="home" className="relative min-h-[90vh] lg:min-h-screen pt-28 pb-16 flex items-center justify-center overflow-hidden">
      
      {/* Ambient background glows matching reference design */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[500px] bg-brand-purple/20 rounded-full blur-[140px] pointer-events-none -z-10 animate-pulse-slow"></div>
      <div className="absolute top-1/3 left-1/4 w-[400px] h-[400px] bg-brand-blue/15 rounded-full blur-[120px] pointer-events-none -z-10"></div>
      <div className="absolute bottom-10 right-10 w-[450px] h-[450px] bg-brand-violet/15 rounded-full blur-[130px] pointer-events-none -z-10"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-6 items-center">
          
          {/* LEFT COLUMN: Intro & Typography (matches reference left side) */}
          <div className="lg:col-span-4 flex flex-col justify-center text-center lg:text-left order-2 lg:order-1">
            
            {/* Role Subtitle */}
            <div className="inline-flex items-center justify-center lg:justify-start gap-2 mb-3">
              <span className="text-sm sm:text-base font-semibold tracking-wide text-slate-300 uppercase">
                {personalInfo.role}
              </span>
            </div>

            {/* Name with stylish styling */}
            <h1 className="text-3xl sm:text-4xl xl:text-5xl font-display font-black tracking-tight text-white leading-tight mb-4">
              Muhammad <br className="hidden sm:inline" />
              <span className="relative inline-block text-white">
                Alif Ramadhani
                {/* Yellow/gold accent bar matching reference aesthetic */}
                <span className="absolute -bottom-2 left-0 w-24 h-1 bg-amber-400 rounded-full"></span>
              </span>
            </h1>

            {/* Description from CV */}
            <p className="text-slate-400 text-sm sm:text-base leading-relaxed mb-8 max-w-lg mx-auto lg:mx-0 mt-4">
              Computer Science student at Universitas Bina Nusantara. Skilled in Vue.js, React, Tailwind CSS, Python, Flutter, and PostgreSQL, delivering enterprise web tools and high-performance mobile apps.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4">
              <a
                href="#contact"
                onClick={(e) => handleScrollTo(e, 'contact')}
                className="inline-flex items-center gap-2 text-sm font-bold text-white group hover:text-brand-cyan transition-colors"
              >
                <span className="underline underline-offset-8 decoration-white/40 group-hover:decoration-brand-cyan transition-colors">
                  Let's talk
                </span>
                <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center group-hover:bg-brand-cyan/20 transition-all group-hover:translate-x-1">
                  <ArrowRight className="w-4 h-4 text-slate-200 group-hover:text-brand-cyan transition-colors" />
                </div>
              </a>

              <button
                onClick={onDownloadCV}
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full text-xs font-semibold text-slate-300 bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 hover:border-brand-purple/40 transition-all duration-300 shadow-sm"
              >
                <Download className="w-3.5 h-3.5 text-brand-cyan" />
                <span>Get CV (PDF)</span>
              </button>
            </div>

            {/* Location & Quick Meta */}
            <div className="mt-8 pt-6 border-t border-white/[0.06] flex items-center justify-center lg:justify-start gap-4 text-xs text-slate-400">
              <div className="flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-rose-400" />
                <span>Tangerang, Indonesia</span>
              </div>
              <span className="w-1 h-1 rounded-full bg-slate-600"></span>
              <div className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
                <span className="text-emerald-300">Open for Work</span>
              </div>
            </div>

          </div>

          {/* CENTER COLUMN: Featured Developer Portrait (matches reference center photo) */}
          <div className="lg:col-span-5 flex justify-center items-center order-1 lg:order-2">
            <div className="relative group w-full max-w-[340px] sm:max-w-[380px]">
              
              {/* Outer Glow Halo */}
              <div className="absolute inset-0 bg-gradient-to-t from-brand-purple/40 via-indigo-600/30 to-brand-cyan/30 rounded-3xl blur-2xl opacity-60 group-hover:opacity-90 transition-opacity duration-500 transform group-hover:scale-105"></div>
              
              {/* Portrait Container */}
              <div className="relative rounded-3xl overflow-hidden border border-white/15 bg-gradient-to-b from-white/10 to-white/[0.02] backdrop-blur-md shadow-2xl p-2 sm:p-2.5">
                <div className="relative aspect-[3/4] rounded-2xl overflow-hidden bg-dark-850">
                  <img
                    src={personalInfo.avatarUrl}
                    alt={personalInfo.name}
                    className="w-full h-full object-cover object-center transform group-hover:scale-102 transition-transform duration-500 filter brightness-95 contrast-105"
                    loading="eager"
                  />
                  
                  {/* Subtle Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-dark-950/80 via-transparent to-transparent"></div>

                  {/* Floating Micro-Badge */}
                  <div className="absolute bottom-4 left-4 right-4 bg-dark-900/80 backdrop-blur-xl border border-white/15 p-3 rounded-xl flex items-center justify-between shadow-xl">
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-lg bg-brand-purple/20 border border-brand-purple/40 flex items-center justify-center text-brand-violet">
                        <Code2 className="w-4 h-4" />
                      </div>
                      <div>
                        <p className="text-xs font-bold text-white leading-none">Vue.js & Flutter</p>
                        <p className="text-[10px] text-slate-400 mt-0.5">Front-End & Mobile Dev</p>
                      </div>
                    </div>
                    <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                      Active
                    </span>
                  </div>

                </div>
              </div>

            </div>
          </div>

          {/* RIGHT COLUMN: Floating Stacked Stats (matches reference right numbers) */}
          <div className="lg:col-span-3 flex flex-row lg:flex-col justify-around lg:justify-center items-center lg:items-start gap-6 sm:gap-8 order-3">
            
            {/* Stat 1 */}
            <div className="text-center lg:text-left group">
              <span className="text-xs sm:text-sm font-medium text-slate-400 block mb-1">
                Years of <br className="hidden lg:inline" />Experience
              </span>
              <div className="text-4xl sm:text-5xl xl:text-6xl font-display font-black text-white group-hover:text-brand-cyan transition-colors">
                {personalInfo.stats.yearsExperience}
              </div>
            </div>

            {/* Stat 2 */}
            <div className="text-center lg:text-left group">
              <span className="text-xs sm:text-sm font-medium text-slate-400 block mb-1">
                Complete <br className="hidden lg:inline" />Projects
              </span>
              <div className="text-4xl sm:text-5xl xl:text-6xl font-display font-black text-white group-hover:text-brand-violet transition-colors">
                {personalInfo.stats.completedProjects}
              </div>
            </div>

            {/* Stat 3 */}
            <div className="text-center lg:text-left group">
              <span className="text-xs sm:text-sm font-medium text-slate-400 block mb-1">
                Tech Stack <br className="hidden lg:inline" />Mastery
              </span>
              <div className="text-4xl sm:text-5xl xl:text-6xl font-display font-black text-white group-hover:text-amber-400 transition-colors">
                {personalInfo.stats.techSkillsCount}
              </div>
            </div>

          </div>

        </div>
      </div>

    </section>
  );
}
