import React, { useState } from 'react';
import { ArrowRight, ExternalLink, Sparkles, FolderGit2, Eye } from 'lucide-react';
import { projects } from '../data/portfolioData';

export default function PortfolioSection({ onSelectProject }) {
  const [activeFilter, setActiveFilter] = useState('all');

  const categories = [
    { key: 'all', label: 'All Projects' },
    { key: 'web', label: 'Web Applications' },
    { key: 'mobile', label: 'Mobile Apps' },
    { key: 'data', label: 'Data & Tools' },
  ];

  const filteredProjects = activeFilter === 'all'
    ? projects
    : projects.filter(p => p.categoryKey === activeFilter);

  return (
    <section id="portfolio" className="relative py-20 lg:py-28 overflow-hidden">
      
      {/* Ambient background glows */}
      <div className="absolute top-1/4 right-1/4 w-[500px] h-[500px] bg-brand-purple/15 rounded-full blur-[160px] pointer-events-none -z-10"></div>
      <div className="absolute bottom-10 left-10 w-[450px] h-[450px] bg-brand-blue/15 rounded-full blur-[140px] pointer-events-none -z-10"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header (matches reference header "Our Portofolio" and "See All ->") */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10 sm:mb-12">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-brand-purple/10 border border-brand-purple/30 text-brand-violet text-xs font-semibold uppercase tracking-wider mb-3">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Selected Works</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-black text-white tracking-tight">
              Our <span className="text-gradient-purple">Portfolio</span>
            </h2>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs font-medium text-slate-400">Total Projects: {projects.length}</span>
          </div>
        </div>

        {/* Filter Tabs */}
        <div className="flex flex-wrap items-center gap-2 mb-10">
          {categories.map((cat) => (
            <button
              key={cat.key}
              onClick={() => setActiveFilter(cat.key)}
              className={`px-4 py-2 rounded-full text-xs sm:text-sm font-semibold transition-all duration-300 ${
                activeFilter === cat.key
                  ? 'bg-gradient-to-r from-brand-purple to-brand-indigo text-white shadow-lg shadow-purple-600/30'
                  : 'bg-white/[0.04] text-slate-400 hover:text-slate-200 hover:bg-white/[0.08] border border-white/[0.06]'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Portfolio Grid (matches reference 3 columns grid) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {filteredProjects.map((project) => (
            <div
              key={project.id}
              onClick={() => onSelectProject(project)}
              className="group relative rounded-3xl overflow-hidden bg-dark-850/80 border border-white/[0.08] hover:border-brand-purple/50 transition-all duration-300 hover:-translate-y-1.5 shadow-xl hover:shadow-2xl hover:shadow-purple-950/40 cursor-pointer flex flex-col justify-between"
            >
              <div>
                {/* Thumbnail Container */}
                <div className="relative aspect-[16/10] w-full overflow-hidden bg-dark-900">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                  
                  {/* Overlay on hover */}
                  <div className="absolute inset-0 bg-dark-950/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center backdrop-blur-xs">
                    <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-brand-purple/90 text-white text-xs font-bold shadow-lg shadow-purple-900/50">
                      <Eye className="w-4 h-4" />
                      <span>Inspect Details</span>
                    </div>
                  </div>

                  {/* Category Pill */}
                  <div className="absolute top-3 left-3">
                    <span className="text-[11px] font-bold px-3 py-1 rounded-full bg-dark-950/80 backdrop-blur-md text-slate-200 border border-white/10">
                      {project.category}
                    </span>
                  </div>
                </div>

                {/* Card Content */}
                <div className="p-5 sm:p-6">
                  <p className="text-[11px] font-semibold text-brand-cyan uppercase tracking-wider mb-1">
                    {project.client}
                  </p>
                  <h3 className="text-lg sm:text-xl font-display font-bold text-white group-hover:text-brand-violet transition-colors leading-snug mb-2">
                    {project.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-400 line-clamp-2 leading-relaxed mb-4">
                    {project.shortDescription}
                  </p>
                </div>
              </div>

              {/* Card Footer: Tech tags & Action */}
              <div className="px-5 sm:px-6 pb-5 pt-3 border-t border-white/[0.05] flex items-center justify-between">
                <div className="flex flex-wrap gap-1.5 max-w-[70%]">
                  {project.tech.slice(0, 3).map((t, idx) => (
                    <span
                      key={idx}
                      className="text-[10px] font-medium px-2 py-0.5 rounded-md bg-white/[0.04] text-slate-400"
                    >
                      {t}
                    </span>
                  ))}
                  {project.tech.length > 3 && (
                    <span className="text-[10px] text-slate-500 font-medium self-center">
                      +{project.tech.length - 3}
                    </span>
                  )}
                </div>

                <div className="w-8 h-8 rounded-full bg-white/[0.04] group-hover:bg-brand-purple border border-white/10 group-hover:border-transparent flex items-center justify-center text-slate-300 group-hover:text-white transition-all group-hover:translate-x-0.5">
                  <ArrowRight className="w-3.5 h-3.5" />
                </div>
              </div>

            </div>
          ))}
        </div>

      </div>

    </section>
  );
}
