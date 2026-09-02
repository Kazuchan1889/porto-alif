import React, { useState } from 'react';
import { 
  Briefcase, 
  GraduationCap, 
  Award, 
  HeartHandshake, 
  Calendar, 
  MapPin, 
  CheckCircle2, 
  ExternalLink,
  ChevronRight,
  Database,
  BarChart3
} from 'lucide-react';
import { usePortfolio } from '../context/PortfolioContext';

export default function ExperienceSection() {
  const { experiences, education, volunteering, certifications } = usePortfolio();
  const [activeTab, setActiveTab] = useState('work');

  const tabs = [
    { id: 'work', label: 'Work Experience', icon: Briefcase, count: experiences.length },
    { id: 'education', label: 'Education Level', icon: GraduationCap, count: education.length },
    { id: 'certs', label: 'Skills & Certifications', icon: Award, count: certifications.length },
    { id: 'volunteer', label: 'Organisational & Community', icon: HeartHandshake, count: volunteering.length },
  ];

  return (
    <section id="experience" className="relative py-20 lg:py-28 bg-dark-950/40 border-t border-white/[0.06] overflow-hidden">
      
      {/* Glow backdrop */}
      <div className="absolute top-1/3 right-0 w-[500px] h-[500px] bg-brand-violet/10 rounded-full blur-[150px] pointer-events-none -z-10"></div>
      <div className="absolute bottom-10 left-10 w-[400px] h-[400px] bg-brand-cyan/10 rounded-full blur-[140px] pointer-events-none -z-10"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-brand-purple/10 border border-brand-purple/30 text-brand-violet text-xs font-semibold uppercase tracking-wider mb-4">
            <Briefcase className="w-3.5 h-3.5" />
            <span>Professional Career Journey</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-black text-white tracking-tight leading-tight mb-4">
            Experience & <span className="text-gradient-purple">Education</span>
          </h2>
          <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
            Detailed timeline of enterprise engineering positions, university computer science studies, and industry certifications.
          </p>
        </div>

        {/* Tab Navigation Controls */}
        <div className="flex justify-center mb-10 overflow-x-auto pb-2 scrollbar-none">
          <div className="inline-flex p-1.5 rounded-2xl bg-white/[0.04] border border-white/[0.08] backdrop-blur-xl">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 px-4 sm:px-5 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all duration-300 whitespace-nowrap ${
                    isActive
                      ? 'bg-gradient-to-r from-brand-purple to-brand-indigo text-white shadow-lg shadow-purple-600/30'
                      : 'text-slate-400 hover:text-slate-200 hover:bg-white/[0.04]'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{tab.label}</span>
                  <span className={`text-[10px] px-1.5 py-0.5 rounded-full ${
                    isActive ? 'bg-white/20 text-white' : 'bg-white/[0.08] text-slate-400'
                  }`}>
                    {tab.count}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Tab Contents */}
        <div className="max-w-4xl mx-auto">
          
          {/* TAB 1: Work Experience */}
          {activeTab === 'work' && (
            <div className="space-y-8 animate-fadeIn">
              {experiences.map((exp, idx) => (
                <div
                  key={exp.id}
                  className="relative p-6 sm:p-8 rounded-3xl bg-dark-850/80 border border-white/[0.08] hover:border-brand-purple/40 backdrop-blur-xl transition-all duration-300 shadow-xl group"
                >
                  {/* Top Metadata */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4 pb-4 border-b border-white/[0.06]">
                    <div>
                      <div className="flex items-center gap-3 flex-wrap">
                        <h3 className="text-xl sm:text-2xl font-display font-bold text-white group-hover:text-brand-violet transition-colors">
                          {exp.role}
                        </h3>
                        <span className="text-xs font-semibold px-3 py-1 rounded-full bg-brand-purple/20 text-brand-violet border border-brand-purple/30">
                          {exp.company}
                        </span>
                      </div>
                      <div className="flex items-center gap-4 text-xs text-slate-400 mt-2">
                        <span className="flex items-center gap-1.5">
                          <MapPin className="w-3.5 h-3.5 text-slate-500" />
                          {exp.location}
                        </span>
                        <span className="w-1 h-1 rounded-full bg-slate-600"></span>
                        <span className="flex items-center gap-1.5 text-brand-cyan">
                          <Calendar className="w-3.5 h-3.5" />
                          {exp.period}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Company Summary */}
                  <p className="text-xs sm:text-sm text-slate-300/90 italic mb-5 leading-relaxed bg-white/[0.02] p-3 rounded-xl border border-white/[0.04]">
                    "{exp.summary}"
                  </p>

                  {/* Key Responsibilities & Achievements */}
                  <div className="space-y-3 mb-6">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                      Key Contributions & Engineering Highlights:
                    </h4>
                    {exp.achievements.map((item, aIdx) => (
                      <div key={aIdx} className="flex items-start gap-3 text-xs sm:text-sm text-slate-300 leading-relaxed">
                        <div className="w-5 h-5 rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center shrink-0 mt-0.5">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                        </div>
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>

                  {/* Tech stack used */}
                  <div className="flex flex-wrap gap-2 pt-4 border-t border-white/[0.06]">
                    <span className="text-xs font-semibold text-slate-400 self-center mr-1">Technologies:</span>
                    {exp.tech.map((t, tIdx) => (
                      <span
                        key={tIdx}
                        className="text-xs font-medium px-3 py-1 rounded-lg bg-white/[0.05] border border-white/[0.08] text-slate-200"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* TAB 2: Education */}
          {activeTab === 'education' && (
            <div className="space-y-6 animate-fadeIn">
              {education.map((edu) => (
                <div
                  key={edu.id}
                  className="relative p-6 sm:p-8 rounded-3xl bg-dark-850/80 border border-white/[0.08] hover:border-brand-cyan/40 backdrop-blur-xl transition-all duration-300 shadow-xl"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-3">
                    <div>
                      <h3 className="text-xl font-display font-bold text-white">
                        {edu.institution}
                      </h3>
                      <p className="text-sm font-semibold text-brand-cyan mt-0.5">
                        {edu.degree}
                      </p>
                    </div>
                    {edu.gpa && (
                      <div className="self-start sm:self-auto px-3.5 py-1.5 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 text-xs font-bold">
                        {edu.gpa}
                      </div>
                    )}
                  </div>

                  <div className="flex items-center gap-4 text-xs text-slate-400 mb-4 pb-3 border-b border-white/[0.06]">
                    <span className="flex items-center gap-1.5">
                      <MapPin className="w-3.5 h-3.5 text-slate-500" />
                      {edu.location}
                    </span>
                    <span className="w-1 h-1 rounded-full bg-slate-600"></span>
                    <span className="flex items-center gap-1.5 text-brand-violet">
                      <Calendar className="w-3.5 h-3.5" />
                      {edu.period}
                    </span>
                  </div>

                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-3">
                    {edu.description}
                  </p>

                  <div className="text-xs text-slate-400 bg-white/[0.02] p-3 rounded-xl border border-white/[0.04]">
                    <span className="text-brand-violet font-semibold">Highlight: </span>
                    {edu.highlight}
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* TAB 3: Certifications */}
          {activeTab === 'certs' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-fadeIn">
              {certifications.map((cert) => {
                const Icon = cert.icon === 'Database' ? Database : BarChart3;
                return (
                  <div
                    key={cert.id}
                    className="p-6 sm:p-7 rounded-3xl bg-dark-850/80 border border-white/[0.08] hover:border-amber-400/40 backdrop-blur-xl transition-all duration-300 shadow-xl flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-center justify-between mb-4">
                        <div className="p-3 rounded-2xl bg-amber-400/10 border border-amber-400/30 text-amber-400">
                          <Icon className="w-6 h-6" />
                        </div>
                        <span className="text-xs font-bold px-3 py-1 rounded-full bg-white/[0.05] border border-white/10 text-amber-300">
                          {cert.year}
                        </span>
                      </div>

                      <h3 className="text-lg font-display font-bold text-white mb-2 leading-snug">
                        {cert.title}
                      </h3>

                      <p className="text-xs font-medium text-slate-400 mb-4">
                        {cert.issuer}
                      </p>

                      <div className="space-y-2 mb-4">
                        {cert.topics.map((topic, tIdx) => (
                          <div key={tIdx} className="flex items-center gap-2 text-xs text-slate-300">
                            <span className="w-1.5 h-1.5 rounded-full bg-amber-400"></span>
                            <span>{topic}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="pt-4 border-t border-white/[0.06] flex items-center justify-between">
                      <span className="text-[11px] font-semibold text-emerald-400 flex items-center gap-1.5">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        Verified Completed
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {/* TAB 4: Volunteering */}
          {activeTab === 'volunteer' && (
            <div className="space-y-6 animate-fadeIn">
              {volunteering.map((vol) => (
                <div
                  key={vol.id}
                  className="p-6 sm:p-8 rounded-3xl bg-dark-850/80 border border-white/[0.08] hover:border-brand-violet/40 backdrop-blur-xl transition-all duration-300 shadow-xl"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-3">
                    <div>
                      <h3 className="text-xl font-display font-bold text-white">
                        {vol.organization}
                      </h3>
                      <p className="text-sm font-semibold text-brand-violet mt-0.5">
                        {vol.role}
                      </p>
                    </div>
                    <span className="self-start sm:self-auto text-xs font-semibold px-3 py-1 rounded-full bg-brand-purple/20 text-brand-violet border border-brand-purple/30">
                      {vol.period}
                    </span>
                  </div>

                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-4">
                    {vol.description}
                  </p>

                  <div className="space-y-2">
                    {vol.contributions.map((item, idx) => (
                      <div key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-300">
                        <CheckCircle2 className="w-4 h-4 text-brand-cyan shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}

        </div>

      </div>
    </section>
  );
}
