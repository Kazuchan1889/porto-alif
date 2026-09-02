import React, { useEffect } from 'react';
import { X, ExternalLink, Github, CheckCircle2, Calendar, Building, Sparkles, Code2 } from 'lucide-react';

export default function ProjectModal({ project, onClose }) {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  if (!project) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
      
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-dark-950/80 backdrop-blur-xl transition-opacity animate-fadeIn"
        onClick={onClose}
      ></div>

      {/* Modal Card */}
      <div className="relative w-full max-w-3xl bg-dark-900 border border-white/15 rounded-3xl overflow-hidden shadow-2xl shadow-purple-950/50 z-10 my-8 animate-scaleUp">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 p-2.5 rounded-full bg-dark-950/70 border border-white/10 text-slate-300 hover:text-white hover:bg-dark-800 transition-colors"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Project Image Banner */}
        <div className="relative aspect-video sm:aspect-[21/9] w-full overflow-hidden bg-dark-850">
          <img
            src={project.image || '/assets/project-network.jpg'}
            alt={project.title}
            className="w-full h-full object-cover"
            onError={(e) => {
              e.target.src = '/assets/project-network.jpg';
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-dark-900 via-dark-900/30 to-transparent"></div>
          
          <div className="absolute bottom-4 left-6 right-6 flex items-center justify-between">
            <span className="text-xs font-bold px-3 py-1 rounded-full bg-brand-purple/80 backdrop-blur-md text-white border border-white/20">
              {project.category}
            </span>
            <span className="text-xs font-semibold text-slate-300 bg-dark-950/60 px-3 py-1 rounded-full border border-white/10">
              {project.period}
            </span>
          </div>
        </div>

        {/* Content Body */}
        <div className="p-6 sm:p-8 space-y-6">
          
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold text-brand-cyan mb-1">
              <Building className="w-3.5 h-3.5" />
              <span>{project.client}</span>
            </div>
            <h3 className="text-2xl sm:text-3xl font-display font-black text-white">
              {project.title}
            </h3>
          </div>

          <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
            {project.fullDescription || project.shortDescription}
          </p>

          {/* Key Features */}
          {project.features && project.features.length > 0 && (
            <div className="space-y-3">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                Key Features & Architectural Highlights:
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {project.features.map((feature, idx) => (
                  <div key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-300">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <span>{feature}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Tech Stack */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2.5">
              Technologies Used:
            </h4>
            <div className="flex flex-wrap gap-2">
              {(project.tech || []).map((t, idx) => (
                <span
                  key={idx}
                  className="text-xs font-semibold px-3 py-1 rounded-lg bg-white/[0.05] border border-white/10 text-slate-200"
                >
                  {t}
                </span>
              ))}
            </div>
          </div>

          {/* Modal Action Buttons */}
          <div className="flex flex-wrap items-center gap-3 pt-4 border-t border-white/10">
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-bold text-slate-200 bg-white/[0.05] hover:bg-white/[0.1] border border-white/10 transition-colors"
              >
                <Github className="w-4 h-4 text-slate-300" />
                <span>View Source Code</span>
              </a>
            )}
            {project.demoUrl && project.demoUrl !== '#' && (
              <a
                href={project.demoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-bold text-white bg-gradient-to-r from-brand-purple to-brand-indigo hover:from-purple-600 hover:to-indigo-600 shadow-md shadow-purple-600/30 transition-all"
              >
                <span>Live Project Demo</span>
                <ExternalLink className="w-4 h-4" />
              </a>
            )}
          </div>

        </div>

      </div>
    </div>
  );
}
