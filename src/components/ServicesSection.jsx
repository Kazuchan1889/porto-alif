import React, { useState } from 'react';
import { ArrowRight, Layout, Smartphone, Database, Cpu, CheckCircle, Sparkles, Code2, Server, Globe } from 'lucide-react';
import { usePortfolio } from '../context/PortfolioContext';

export default function ServicesSection({ onSelectService }) {
  const { services } = usePortfolio();
  const [activeCard, setActiveCard] = useState(null);

  const getServiceIcon = (iconName) => {
    switch (iconName) {
      case 'Layout':
        return <Layout className="w-6 h-6 text-brand-cyan" />;
      case 'Smartphone':
        return <Smartphone className="w-6 h-6 text-brand-violet" />;
      case 'Database':
        return <Database className="w-6 h-6 text-indigo-400" />;
      case 'Cpu':
        return <Cpu className="w-6 h-6 text-amber-400" />;
      case 'Code2':
        return <Code2 className="w-6 h-6 text-emerald-400" />;
      case 'Server':
        return <Server className="w-6 h-6 text-sky-400" />;
      case 'Globe':
        return <Globe className="w-6 h-6 text-pink-400" />;
      default:
        return <Sparkles className="w-6 h-6 text-brand-cyan" />;
    }
  };

  return (
    <section id="services" className="relative py-20 lg:py-28 overflow-hidden">
      
      {/* Background glow accents */}
      <div className="absolute top-1/2 left-0 w-[450px] h-[450px] bg-brand-purple/15 rounded-full blur-[140px] pointer-events-none -z-10"></div>
      <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-brand-cyan/10 rounded-full blur-[130px] pointer-events-none -z-10"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
          
          {/* LEFT COLUMN: Section Title & Pitch */}
          <div className="lg:col-span-5 lg:sticky lg:top-28">
            
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-brand-purple/10 border border-brand-purple/30 text-brand-violet text-xs font-semibold uppercase tracking-wider mb-4">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Specialized Capabilities</span>
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-black text-white tracking-tight leading-tight mb-5">
              My Awesome <br />
              <span className="text-gradient-purple">Services</span>
            </h2>

            <p className="text-slate-400 text-sm sm:text-base leading-relaxed mb-8">
              Transforming complex engineering problems into refined, high-performance web systems and mobile interfaces. Leveraging proven enterprise experience from PLN Icon Plus and agile startup environments.
            </p>

            {/* Feature bullets */}
            <div className="space-y-3 mb-8">
              {[
                "Enterprise-Grade Vue.js & React Architectures",
                "Cross-Platform Flutter Mobile Apps (iOS & Android)",
                "Robust PostgreSQL Database Structuring & REST APIs",
                "Automated Python OCR & Data Processing Tools"
              ].map((item, idx) => (
                <div key={idx} className="flex items-center gap-3 text-sm text-slate-300">
                  <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>{item}</span>
                </div>
              ))}
            </div>

            <a
              href="#portfolio"
              className="inline-flex items-center gap-2 text-sm font-bold text-slate-200 hover:text-brand-cyan transition-colors group"
            >
              <span>Explore full project gallery</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </a>

          </div>

          {/* RIGHT COLUMN: Service Cards */}
          <div className="lg:col-span-7 space-y-4 sm:space-y-5">
            {services.map((service) => {
              const isHovered = activeCard === service.id;
              return (
                <div
                  key={service.id}
                  onMouseEnter={() => setActiveCard(service.id)}
                  onMouseLeave={() => setActiveCard(null)}
                  className={`group relative p-5 sm:p-6 rounded-3xl transition-all duration-300 border backdrop-blur-xl ${
                    isHovered
                      ? 'bg-gradient-to-r from-slate-900/90 via-purple-950/40 to-slate-900/90 border-brand-purple/50 shadow-2xl shadow-purple-950/50 -translate-y-1'
                      : 'bg-dark-850/60 border-white/[0.08] hover:border-white/20'
                  }`}
                >
                  <div className="flex items-start sm:items-center justify-between gap-4">
                    
                    {/* Icon & Title Info */}
                    <div className="flex items-start sm:items-center gap-4 sm:gap-5">
                      <div className={`p-3.5 rounded-2xl border transition-all duration-300 ${
                        isHovered 
                          ? 'bg-brand-purple/20 border-brand-purple/40 scale-110' 
                          : 'bg-white/[0.04] border-white/10'
                      }`}>
                        {getServiceIcon(service.icon)}
                      </div>

                      <div>
                        <h3 className="text-lg sm:text-xl font-display font-bold text-white group-hover:text-brand-cyan transition-colors">
                          {service.title}
                        </h3>
                        <p className="text-xs sm:text-sm font-semibold text-brand-violet mt-0.5">
                          {service.subtitle || service.projectCount}
                        </p>
                      </div>
                    </div>

                    {/* Arrow Button */}
                    <div className={`w-10 h-10 rounded-2xl border flex items-center justify-center shrink-0 transition-all duration-300 ${
                      isHovered
                        ? 'bg-brand-purple text-white border-transparent translate-x-1 shadow-lg shadow-purple-600/40'
                        : 'bg-white/[0.04] border-white/10 text-slate-400 group-hover:text-white'
                    }`}>
                      <ArrowRight className="w-4 h-4" />
                    </div>

                  </div>

                  {/* Description & Skill Tags */}
                  <p className="mt-4 text-xs sm:text-sm text-slate-400 leading-relaxed">
                    {service.description}
                  </p>

                  <div className="mt-4 flex flex-wrap gap-2 pt-3 border-t border-white/[0.05]">
                    {(service.skills || []).map((skill, idx) => (
                      <span
                        key={idx}
                        className="text-[11px] font-medium px-2.5 py-1 rounded-lg bg-white/[0.04] border border-white/[0.06] text-slate-300"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>

                </div>
              );
            })}
          </div>

        </div>
      </div>

    </section>
  );
}
