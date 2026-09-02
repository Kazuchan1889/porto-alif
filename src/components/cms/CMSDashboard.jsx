import React, { useState } from 'react';
import { 
  LayoutDashboard, 
  User, 
  Layers, 
  Layout, 
  Briefcase, 
  GraduationCap, 
  Award, 
  HeartHandshake, 
  FolderGit2, 
  MessageSquare, 
  Share2, 
  ExternalLink, 
  LogOut, 
  Menu, 
  X, 
  Sparkles, 
  RotateCcw, 
  Download, 
  ChevronRight,
  ShieldCheck,
  PanelLeftClose,
  PanelLeft
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { usePortfolio } from '../../context/PortfolioContext';

// Import Section Editors
import OverviewEditor from './editors/OverviewEditor';
import PersonalInfoEditor from './editors/PersonalInfoEditor';
import TechStackEditor from './editors/TechStackEditor';
import ServicesEditor from './editors/ServicesEditor';
import ExperienceEditor from './editors/ExperienceEditor';
import EducationEditor from './editors/EducationEditor';
import CertificationsEditor from './editors/CertificationsEditor';
import VolunteeringEditor from './editors/VolunteeringEditor';
import ProjectsEditor from './editors/ProjectsEditor';
import TestimonialsEditor from './editors/TestimonialsEditor';
import ContactEditor from './editors/ContactEditor';
import { Inbox } from 'lucide-react';

export default function CMSDashboard({ onNavigateToPortfolio }) {
  const { currentUser, logout } = useAuth();
  const { 
    personalInfo, 
    techStack, 
    services, 
    experiences, 
    education, 
    certifications, 
    volunteering, 
    projects,
    contactMessages = [],
    unreadMessagesCount = 0,
    resetToDefaults,
    exportData
  } = usePortfolio();

  const [activeTab, setActiveTab] = useState('overview');
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [cmsToast, setCmsToast] = useState(null);

  const showToast = (message, type = 'success') => {
    setCmsToast({ message, type });
    setTimeout(() => {
      setCmsToast(null);
    }, 4000);
  };

  const navMenuItems = [
    { id: 'overview', label: 'Dashboard Overview', icon: LayoutDashboard, category: 'Main' },
    { id: 'personalInfo', label: 'Hero & Profil', icon: User, category: 'Section' },
    { id: 'techStack', label: 'Tech Stack & Skills', icon: Layers, count: techStack.length, category: 'Section' },
    { id: 'services', label: 'Layanan & Solusi', icon: Layout, count: services.length, category: 'Section' },
    { id: 'experiences', label: 'Pengalaman Kerja', icon: Briefcase, count: experiences.length, category: 'Section' },
    { id: 'education', label: 'Pendidikan', icon: GraduationCap, count: education.length, category: 'Section' },
    { id: 'certifications', label: 'Sertifikasi', icon: Award, count: certifications.length, category: 'Section' },
    { id: 'volunteering', label: 'Organisasi & Volunteer', icon: HeartHandshake, count: volunteering.length, category: 'Section' },
    { id: 'projects', label: 'Proyek Portofolio', icon: FolderGit2, count: projects.length, category: 'Section' },
    { id: 'testimonials', label: 'Testimoni Klien', icon: MessageSquare, category: 'Section' },
    { 
      id: 'contact', 
      label: 'Pesan Masuk & Kontak', 
      icon: Inbox, 
      count: unreadMessagesCount > 0 ? `${unreadMessagesCount} baru` : (contactMessages.length > 0 ? contactMessages.length : undefined),
      isAlert: unreadMessagesCount > 0,
      category: 'Section' 
    },
  ];

  const handleNavClick = (id) => {
    setActiveTab(id);
    setMobileMenuOpen(false);
  };

  const handleQuickReset = () => {
    if (window.confirm('Reset seluruh data CMS ke data demo awal?')) {
      resetToDefaults();
      showToast('Seluruh data berhasil dikembalikan ke default!', 'info');
    }
  };

  const renderActiveEditor = () => {
    switch (activeTab) {
      case 'overview':
        return <OverviewEditor onNavigate={setActiveTab} showToast={showToast} />;
      case 'personalInfo':
        return <PersonalInfoEditor showToast={showToast} />;
      case 'techStack':
        return <TechStackEditor showToast={showToast} />;
      case 'services':
        return <ServicesEditor showToast={showToast} />;
      case 'experiences':
        return <ExperienceEditor showToast={showToast} />;
      case 'education':
        return <EducationEditor showToast={showToast} />;
      case 'certifications':
        return <CertificationsEditor showToast={showToast} />;
      case 'volunteering':
        return <VolunteeringEditor showToast={showToast} />;
      case 'projects':
        return <ProjectsEditor showToast={showToast} />;
      case 'testimonials':
        return <TestimonialsEditor showToast={showToast} />;
      case 'contact':
        return <ContactEditor showToast={showToast} />;
      default:
        return <OverviewEditor onNavigate={setActiveTab} showToast={showToast} />;
    }
  };

  const activeItemObj = navMenuItems.find(i => i.id === activeTab) || navMenuItems[0];

  return (
    <div className="min-h-screen bg-[#080B12] text-slate-100 flex overflow-hidden font-sans">
      
      {/* ===================== SIDEBAR (Desktop) ===================== */}
      <aside
        className={`hidden lg:flex flex-col bg-dark-950/90 border-r border-white/10 backdrop-blur-2xl transition-all duration-300 z-30 ${
          sidebarCollapsed ? 'w-20' : 'w-72'
        }`}
      >
        {/* Sidebar Brand Header */}
        <div className="p-5 border-b border-white/10 flex items-center justify-between">
          {!sidebarCollapsed ? (
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-brand-purple to-brand-cyan flex items-center justify-center shadow-md shadow-purple-600/30">
                <ShieldCheck className="w-5 h-5 text-white" />
              </div>
              <div>
                <span className="font-display font-extrabold text-base tracking-tight text-white">
                  ALIF<span className="text-brand-cyan">.</span> <span className="text-xs text-brand-violet font-mono font-semibold">CMS</span>
                </span>
                <p className="text-[10px] text-slate-500 font-medium">Panel Kontrol Konten</p>
              </div>
            </div>
          ) : (
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-brand-purple to-brand-cyan flex items-center justify-center mx-auto shadow-md shadow-purple-600/30">
              <ShieldCheck className="w-5 h-5 text-white" />
            </div>
          )}

          <button
            onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
            className="p-1.5 rounded-lg bg-white/[0.04] hover:bg-white/10 text-slate-400 hover:text-white transition-colors"
            title={sidebarCollapsed ? 'Perluas Sidebar' : 'Ciutkan Sidebar'}
          >
            {sidebarCollapsed ? <PanelLeft className="w-4 h-4" /> : <PanelLeftClose className="w-4 h-4" />}
          </button>
        </div>

        {/* Sidebar Navigation Items */}
        <div className="flex-1 overflow-y-auto py-4 px-3 space-y-1.5 custom-scrollbar">
          {navMenuItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                title={sidebarCollapsed ? item.label : undefined}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-semibold transition-all duration-200 group cursor-pointer ${
                  isActive
                    ? 'bg-gradient-to-r from-brand-purple/90 to-brand-indigo/90 text-white shadow-md shadow-purple-600/20'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-white/[0.05]'
                } ${sidebarCollapsed ? 'justify-center px-0' : ''}`}
              >
                <Icon className={`w-4 h-4 shrink-0 transition-transform ${
                  isActive ? 'text-white' : 'text-slate-400 group-hover:text-brand-cyan group-hover:scale-110'
                }`} />

                {!sidebarCollapsed && (
                  <div className="flex-1 flex items-center justify-between truncate text-left">
                    <span className="truncate">{item.label}</span>
                    {item.count !== undefined && (
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full transition-all ${
                        item.isAlert
                          ? 'bg-rose-500 text-white shadow-sm shadow-rose-500/50 animate-pulse'
                          : isActive 
                            ? 'bg-white/20 text-white' 
                            : 'bg-white/[0.05] text-slate-400 group-hover:bg-white/10'
                      }`}>
                        {item.count}
                      </span>
                    )}
                  </div>
                )}
              </button>
            );
          })}
        </div>

        {/* Sidebar Footer User Card */}
        <div className="p-3.5 border-t border-white/10 bg-dark-900/60">
          {!sidebarCollapsed ? (
            <div className="flex items-center justify-between gap-3">
              <div className="flex items-center gap-2.5 min-w-0">
                <div className="w-8 h-8 rounded-full bg-brand-purple/20 border border-brand-purple/30 flex items-center justify-center text-xs font-bold text-white shrink-0">
                  A
                </div>
                <div className="truncate">
                  <p className="text-xs font-bold text-white truncate">
                    {currentUser?.displayName || 'Admin'}
                  </p>
                  <p className="text-[10px] text-emerald-400 font-medium">Logged in</p>
                </div>
              </div>

              <button
                onClick={logout}
                className="p-1.5 rounded-lg bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 hover:text-rose-300 transition-colors"
                title="Logout dari CMS"
              >
                <LogOut className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <button
              onClick={logout}
              className="w-full py-2 flex items-center justify-center rounded-lg bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 hover:text-rose-300 transition-colors"
              title="Logout"
            >
              <LogOut className="w-4 h-4" />
            </button>
          )}
        </div>
      </aside>

      {/* ===================== MOBILE SIDEBAR DRAWER ===================== */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 lg:hidden bg-black/80 backdrop-blur-md animate-fadeIn flex">
          <div className="w-72 bg-dark-950 border-r border-white/10 flex flex-col h-full p-4">
            
            <div className="flex items-center justify-between pb-4 mb-4 border-b border-white/10">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-brand-purple to-brand-cyan flex items-center justify-center">
                  <ShieldCheck className="w-4 h-4 text-white" />
                </div>
                <span className="font-display font-extrabold text-base text-white">ALIF. CMS</span>
              </div>
              <button
                onClick={() => setMobileMenuOpen(false)}
                className="p-1.5 rounded-lg bg-white/[0.05] text-slate-400 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto space-y-1.5">
              {navMenuItems.map((item) => {
                const Icon = item.icon;
                const isActive = activeTab === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => handleNavClick(item.id)}
                    className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold ${
                      isActive
                        ? 'bg-brand-purple text-white shadow-md'
                        : 'text-slate-400 hover:text-white hover:bg-white/[0.05]'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <Icon className="w-4 h-4" />
                      <span>{item.label}</span>
                    </div>
                    {item.count !== undefined && (
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                        item.isAlert
                          ? 'bg-rose-500 text-white animate-pulse'
                          : 'bg-white/10 text-slate-300'
                      }`}>
                        {item.count}
                      </span>
                    )}
                  </button>
                );
              })}
            </div>

            <div className="pt-4 mt-4 border-t border-white/10 flex items-center justify-between">
              <button
                onClick={onNavigateToPortfolio}
                className="text-xs font-semibold text-brand-cyan hover:underline flex items-center gap-1.5"
              >
                <ExternalLink className="w-3.5 h-3.5" />
                <span>Lihat Portofolio</span>
              </button>
              <button
                onClick={logout}
                className="text-xs font-semibold text-rose-400 hover:underline flex items-center gap-1.5"
              >
                <LogOut className="w-3.5 h-3.5" />
                <span>Logout</span>
              </button>
            </div>

          </div>
          <div className="flex-1" onClick={() => setMobileMenuOpen(false)}></div>
        </div>
      )}

      {/* ===================== MAIN CONTENT WRAPPER ===================== */}
      <div className="flex-1 flex flex-col min-w-0 h-screen overflow-hidden">
        
        {/* Top App Header */}
        <header className="h-16 px-4 sm:px-8 border-b border-white/10 bg-dark-950/60 backdrop-blur-xl flex items-center justify-between shrink-0 z-20">
          
          <div className="flex items-center gap-3">
            {/* Mobile menu trigger */}
            <button
              onClick={() => setMobileMenuOpen(true)}
              className="lg:hidden p-2 rounded-xl bg-white/[0.05] border border-white/10 text-slate-300 hover:text-white"
            >
              <Menu className="w-4 h-4" />
            </button>

            {/* Breadcrumb path */}
            <div className="flex items-center gap-2 text-xs">
              <span className="text-slate-500 hidden sm:inline">CMS Dashboard</span>
              <ChevronRight className="w-3.5 h-3.5 text-slate-600 hidden sm:inline" />
              <span className="font-bold text-white flex items-center gap-1.5">
                <activeItemObj.icon className="w-3.5 h-3.5 text-brand-cyan" />
                <span>{activeItemObj.label}</span>
              </span>
            </div>
          </div>

          {/* Header Action Tools */}
          <div className="flex items-center gap-2.5">
            
            {/* Quick Export Data */}
            <button
              onClick={() => {
                exportData();
                showToast('Data portofolio berhasil diekspor ke JSON!', 'success');
              }}
              className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 text-xs font-medium text-slate-300 hover:text-white transition-all"
              title="Ekspor Backup JSON"
            >
              <Download className="w-3.5 h-3.5 text-brand-violet" />
              <span>Backup Data</span>
            </button>

            {/* Quick Reset Defaults */}
            <button
              onClick={handleQuickReset}
              className="hidden md:flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 text-xs font-medium text-slate-300 hover:text-white transition-all"
              title="Reset ke Default Data"
            >
              <RotateCcw className="w-3.5 h-3.5 text-amber-400" />
              <span>Reset Default</span>
            </button>

            {/* Primary Action: View Live Portfolio */}
            <button
              onClick={onNavigateToPortfolio}
              className="flex items-center gap-1.5 px-4 py-1.5 rounded-xl bg-gradient-to-r from-brand-purple to-brand-indigo hover:opacity-95 text-xs font-bold text-white shadow-md shadow-purple-600/30 transition-all group cursor-pointer"
            >
              <span>Lihat Portofolio</span>
              <ExternalLink className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </button>

            {/* Logout on desktop */}
            <button
              onClick={logout}
              className="p-2 rounded-xl bg-white/[0.04] hover:bg-rose-500/20 text-slate-400 hover:text-rose-300 border border-white/10 transition-colors ml-1"
              title="Logout"
            >
              <LogOut className="w-4 h-4" />
            </button>

          </div>

        </header>

        {/* Dynamic Editor Content Scroll Area */}
        <main className="flex-1 overflow-y-auto p-4 sm:p-8 lg:p-10 max-w-7xl w-full mx-auto custom-scrollbar">
          {renderActiveEditor()}
        </main>

      </div>

      {/* Floating Toast Notification */}
      {cmsToast && (
        <div className="fixed bottom-6 right-6 z-50 animate-bounce-short">
          <div className={`px-4 py-3 rounded-2xl shadow-2xl backdrop-blur-xl border flex items-center gap-3 ${
            cmsToast.type === 'error'
              ? 'bg-rose-950/90 border-rose-500/40 text-rose-200'
              : cmsToast.type === 'info'
              ? 'bg-sky-950/90 border-sky-500/40 text-sky-200'
              : 'bg-emerald-950/90 border-emerald-500/40 text-emerald-200'
          }`}>
            <Sparkles className="w-4 h-4 text-brand-cyan shrink-0" />
            <span className="text-xs font-semibold">{cmsToast.message}</span>
            <button
              onClick={() => setCmsToast(null)}
              className="p-1 rounded-md hover:bg-white/10 text-slate-400 hover:text-white"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      )}

    </div>
  );
}
