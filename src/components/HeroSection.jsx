import React from 'react';
import { ArrowRight, Sparkles, Download, Code2, MapPin, ExternalLink, Smartphone, Database } from 'lucide-react';
import { usePortfolio } from '../context/PortfolioContext';

export default function HeroSection({ onDownloadCV, onCopyContact }) {
  const { personalInfo } = usePortfolio();

  const handleScrollTo = (e, id) => {
    e.preventDefault();
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  // Name splitting for stylish first & last name rendering
  const nameParts = (personalInfo.name || 'Muhammad Alif Ramadhani').split(' ');
  const firstName = nameParts[0] || 'Muhammad';
  const restName = nameParts.slice(1).join(' ') || 'Alif Ramadhani';

  return (
    <section id="home" className="relative min-h-[90vh] lg:min-h-screen pt-28 pb-16 flex items-center justify-center overflow-hidden">
      
      {/* Ambient background glows matching reference design */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[500px] bg-brand-purple/20 dark:bg-brand-purple/20 rounded-full blur-[140px] pointer-events-none -z-10 animate-pulse-slow"></div>
      <div className="absolute top-1/3 left-1/4 w-[400px] h-[400px] bg-brand-blue/15 dark:bg-brand-blue/15 rounded-full blur-[120px] pointer-events-none -z-10"></div>
      <div className="absolute bottom-10 right-10 w-[450px] h-[450px] bg-brand-violet/15 dark:bg-brand-violet/15 rounded-full blur-[130px] pointer-events-none -z-10"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-6 items-center">
          
          {/* LEFT COLUMN: Intro & Typography */}
          <div className="lg:col-span-4 flex flex-col justify-center text-center lg:text-left order-2 lg:order-1">
            
            {/* Role Subtitle */}
            <div className="inline-flex items-center justify-center lg:justify-start gap-2 mb-3">
              <span className="text-sm sm:text-base font-semibold tracking-wide text-brand-purple dark:text-slate-300 uppercase">
                {personalInfo.role}
              </span>
            </div>

            {/* Name with stylish styling */}
            <h1 className="text-3xl sm:text-4xl xl:text-5xl font-display font-black tracking-tight text-slate-900 dark:text-white leading-tight mb-4">
              {firstName} <br className="hidden sm:inline" />
              <span className="relative inline-block text-slate-900 dark:text-white">
                {restName}
                {/* Yellow/gold accent bar */}
                <span className="absolute -bottom-2 left-0 w-24 h-1 bg-amber-400 rounded-full"></span>
              </span>
            </h1>

            {/* Description from CV / Bio */}
            <p className="text-slate-600 dark:text-slate-400 text-sm sm:text-base leading-relaxed mb-8 max-w-lg mx-auto lg:mx-0 mt-4">
              {personalInfo.about || 'Computer Science student at Universitas Bina Nusantara. Skilled in Vue.js, React, Tailwind CSS, Python, Flutter, and PostgreSQL, delivering enterprise web tools and high-performance mobile apps.'}
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4">
              <a
                href="#contact"
                onClick={(e) => handleScrollTo(e, 'contact')}
                className="inline-flex items-center gap-2 text-sm font-bold text-slate-900 dark:text-white group hover:text-brand-purple dark:hover:text-brand-cyan transition-colors"
              >
                <span className="underline underline-offset-8 decoration-slate-400 dark:decoration-white/40 group-hover:decoration-brand-purple dark:group-hover:decoration-brand-cyan transition-colors">
                  Let's talk
                </span>
                <div className="w-8 h-8 rounded-full bg-slate-200 dark:bg-white/10 flex items-center justify-center group-hover:bg-brand-purple/20 dark:group-hover:bg-brand-cyan/20 transition-all group-hover:translate-x-1">
                  <ArrowRight className="w-4 h-4 text-slate-700 dark:text-slate-200 group-hover:text-brand-purple dark:group-hover:text-brand-cyan transition-colors" />
                </div>
              </a>

              <button
                onClick={onDownloadCV}
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full text-xs font-semibold text-slate-700 dark:text-slate-300 bg-white dark:bg-white/[0.04] hover:bg-slate-100 dark:hover:bg-white/[0.08] border border-slate-200 dark:border-white/10 hover:border-brand-purple/40 transition-all duration-300 shadow-sm"
              >
                <Download className="w-3.5 h-3.5 text-brand-purple dark:text-brand-cyan" />
                <span>Get CV (PDF)</span>
              </button>
            </div>

            {/* Location & Quick Meta */}
            <div className="mt-8 pt-6 border-t border-slate-200 dark:border-white/[0.06] flex items-center justify-center lg:justify-start gap-4 text-xs text-slate-500 dark:text-slate-400">
              <div className="flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-rose-500" />
                <span>{personalInfo.location || 'Tangerang, Indonesia'}</span>
              </div>
              <span className="w-1 h-1 rounded-full bg-slate-300 dark:bg-slate-600"></span>
              <div className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-500 dark:bg-emerald-400 animate-ping"></span>
                <span className="text-emerald-600 dark:text-emerald-300 font-semibold">Open for Work</span>
              </div>
            </div>

          </div>

          {/* CENTER COLUMN: Featured Developer Portrait */}
          <div className="lg:col-span-5 flex justify-center items-center order-1 lg:order-2">
            <div className="relative group w-full max-w-[340px] sm:max-w-[380px]">
              
              {/* Outer Glow Halo */}
              <div className="absolute inset-0 bg-gradient-to-t from-brand-purple/30 via-indigo-600/20 to-brand-cyan/20 dark:from-brand-purple/40 dark:via-indigo-600/30 dark:to-brand-cyan/30 rounded-3xl blur-2xl opacity-60 group-hover:opacity-90 transition-opacity duration-500 transform group-hover:scale-105"></div>
              
              {/* Portrait Container */}
              <div className="relative rounded-3xl overflow-hidden border border-slate-200 dark:border-white/15 bg-white/70 dark:bg-gradient-to-b dark:from-white/10 dark:to-white/[0.02] backdrop-blur-md shadow-2xl p-2 sm:p-2.5">
                <div className="relative aspect-[3/4] rounded-2xl overflow-hidden bg-slate-100 dark:bg-dark-850">
                  <img
                    src={personalInfo.avatarUrl || '/assets/alip-real-photo.jpg'}
                    alt={personalInfo.name}
                    className="w-full h-full object-cover object-center transform group-hover:scale-102 transition-transform duration-500 filter brightness-95 contrast-105"
                    onError={(e) => {
                      e.target.src = '/alip photo.jpg';
                    }}
                    loading="eager"
                  />
                  
                  {/* Subtle Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 dark:from-dark-950/80 via-transparent to-transparent"></div>

                  {/* Floating Micro-Badge */}
                  <div className="absolute bottom-4 left-4 right-4 bg-white/90 dark:bg-dark-900/80 backdrop-blur-xl border border-slate-200 dark:border-white/15 p-3 rounded-xl flex items-center justify-between shadow-xl">
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-lg bg-brand-purple/20 border border-brand-purple/40 flex items-center justify-center text-brand-purple dark:text-brand-violet">
                        <Code2 className="w-4 h-4" />
                      </div>
                      <div>
                        <p className="text-xs font-bold text-slate-900 dark:text-white leading-none">Vue.js & Flutter</p>
                        <p className="text-[10px] text-slate-500 dark:text-slate-400 mt-0.5">{personalInfo.role}</p>
                      </div>
                    </div>
                    <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-700 dark:text-emerald-300 border border-emerald-500/30">
                      Active
                    </span>
                  </div>

                </div>
              </div>

            </div>
          </div>

          {/* RIGHT COLUMN: Floating Stacked Stats */}
          <div className="lg:col-span-3 flex flex-row lg:flex-col justify-around lg:justify-center items-center lg:items-start gap-6 sm:gap-8 order-3">
            
            {/* Stat 1 */}
            <div className="text-center lg:text-left group">
              <span className="text-xs sm:text-sm font-medium text-slate-500 dark:text-slate-400 block mb-1">
                Years of <br className="hidden lg:inline" />Experience
              </span>
              <div className="text-4xl sm:text-5xl xl:text-6xl font-display font-black text-slate-900 dark:text-white group-hover:text-brand-purple dark:group-hover:text-brand-cyan transition-colors">
                {personalInfo.stats?.yearsExperience || '1+'}
              </div>
            </div>

            {/* Stat 2 */}
            <div className="text-center lg:text-left group">
              <span className="text-xs sm:text-sm font-medium text-slate-500 dark:text-slate-400 block mb-1">
                Complete <br className="hidden lg:inline" />Projects
              </span>
              <div className="text-4xl sm:text-5xl xl:text-6xl font-display font-black text-slate-900 dark:text-white group-hover:text-brand-indigo dark:group-hover:text-brand-violet transition-colors">
                {personalInfo.stats?.completedProjects || '12+'}
              </div>
            </div>

            {/* Stat 3 */}
            <div className="text-center lg:text-left group">
              <span className="text-xs sm:text-sm font-medium text-slate-500 dark:text-slate-400 block mb-1">
                Tech Stack <br className="hidden lg:inline" />Mastery
              </span>
              <div className="text-4xl sm:text-5xl xl:text-6xl font-display font-black text-slate-900 dark:text-white group-hover:text-amber-500 dark:group-hover:text-amber-400 transition-colors">
                {personalInfo.stats?.techSkillsCount || '8+'}
              </div>
            </div>

          </div>

        </div>
      </div>

    </section>
  );
}
