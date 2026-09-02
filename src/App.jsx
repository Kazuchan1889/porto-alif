import React, { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import { ShieldCheck, Sparkles, Settings } from 'lucide-react';

// Context Providers
import { ThemeProvider } from './context/ThemeContext';
import { AuthProvider, useAuth } from './context/AuthContext';
import { PortfolioProvider, usePortfolio } from './context/PortfolioContext';

// Public Portfolio Components
import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import TechStackStrip from './components/TechStackStrip';
import ServicesSection from './components/ServicesSection';
import ExperienceSection from './components/ExperienceSection';
import PortfolioSection from './components/PortfolioSection';
import TestimonialsSection from './components/TestimonialsSection';
import AboutSection from './components/AboutSection';
import ContactCtaSection from './components/ContactCtaSection';
import Footer from './components/Footer';
import ProjectModal from './components/ProjectModal';
import Toast from './components/Toast';

// CMS Components
import LoginPage from './components/cms/LoginPage';
import CMSDashboard from './components/cms/CMSDashboard';

function MainAppContent() {
  const { isAuthenticated } = useAuth();
  const { personalInfo } = usePortfolio();
  
  const [selectedProject, setSelectedProject] = useState(null);
  const [toast, setToast] = useState(null);

  // Route / View State: 'portfolio' | 'login' | 'cms'
  const [currentView, setCurrentView] = useState(() => {
    const hash = window.location.hash;
    if (hash === '#/login') return 'login';
    if (hash === '#/cms') return 'cms';
    return 'portfolio';
  });

  // Sync hash changes
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash;
      if (hash === '#/login') {
        setCurrentView('login');
      } else if (hash === '#/cms') {
        setCurrentView('cms');
      } else if (hash === '#/' || hash === '' || hash.startsWith('#home') || hash.startsWith('#services') || hash.startsWith('#experience') || hash.startsWith('#portfolio') || hash.startsWith('#about') || hash.startsWith('#contact')) {
        setCurrentView('portfolio');
      }
    };

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const navigateTo = (view) => {
    setCurrentView(view);
    if (view === 'login') {
      window.location.hash = '#/login';
    } else if (view === 'cms') {
      window.location.hash = '#/cms';
    } else {
      window.location.hash = '#/';
    }
  };

  const showToast = (message, type = 'success') => {
    setToast({ message, type });
  };

  const handleDownloadCV = () => {
    // Confetti celebration
    confetti({
      particleCount: 100,
      spread: 80,
      origin: { y: 0.3 }
    });

    const link = document.createElement('a');
    link.href = personalInfo.cvUrl || '/CV - Muhammad Alif Ramadhani.pdf';
    link.download = `CV - ${personalInfo.name || 'Muhammad Alif Ramadhani'}.pdf`;
    link.target = '_blank';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    showToast(`Downloading ${personalInfo.name} CV (PDF)...`, 'info');
  };

  const handleOpenCMS = () => {
    if (isAuthenticated) {
      navigateTo('cms');
    } else {
      navigateTo('login');
    }
  };

  // --- Render CMS Login Page ---
  if (currentView === 'login') {
    return (
      <LoginPage 
        onLoginSuccess={() => navigateTo('cms')}
        onBackToPortfolio={() => navigateTo('portfolio')}
      />
    );
  }

  // --- Render CMS Dashboard ---
  if (currentView === 'cms') {
    if (!isAuthenticated) {
      return (
        <LoginPage 
          onLoginSuccess={() => navigateTo('cms')}
          onBackToPortfolio={() => navigateTo('portfolio')}
        />
      );
    }
    return (
      <CMSDashboard 
        onNavigateToPortfolio={() => navigateTo('portfolio')}
      />
    );
  }

  // --- Render Public Portfolio View ---
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#080B12] text-slate-800 dark:text-slate-100 selection:bg-brand-purple selection:text-white relative font-sans transition-colors duration-300">
      
      {/* Fixed Navigation */}
      <Navbar 
        onDownloadCV={handleDownloadCV} 
        onOpenCMS={handleOpenCMS}
      />

      {/* Main Content Sections */}
      <main>
        <HeroSection 
          onDownloadCV={handleDownloadCV} 
          onCopyContact={(text, label) => showToast(`Copied ${label} to clipboard!`)}
        />
        
        <TechStackStrip />
        
        <ServicesSection 
          onSelectService={() => {
            const el = document.getElementById('portfolio');
            if (el) el.scrollIntoView({ behavior: 'smooth' });
          }}
        />
        
        <ExperienceSection />
        
        <PortfolioSection onSelectProject={(project) => setSelectedProject(project)} />
        
        <TestimonialsSection />
        
        <AboutSection onDownloadCV={handleDownloadCV} />
        
        <ContactCtaSection showToast={showToast} />
      </main>

      {/* Footer */}
      <Footer onOpenCMS={handleOpenCMS} />

      {/* Floating Quick CMS Access Button */}
      <div className="fixed bottom-5 left-5 z-40">
        <button
          onClick={handleOpenCMS}
          className="flex items-center gap-2 px-3.5 py-2 rounded-full bg-white/90 dark:bg-dark-900/90 hover:bg-slate-100 dark:hover:bg-dark-850 text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white border border-slate-200 dark:border-white/15 backdrop-blur-xl shadow-lg dark:shadow-2xl shadow-purple-950/10 dark:shadow-purple-950/50 transition-all duration-300 group hover:scale-105 hover:border-brand-purple/50 dark:hover:border-brand-cyan/50 cursor-pointer"
          title="Masuk ke Panel Kontrol CMS"
        >
          <div className="w-2 h-2 rounded-full bg-emerald-500 dark:bg-emerald-400 animate-pulse"></div>
          <ShieldCheck className="w-4 h-4 text-brand-purple dark:text-brand-cyan group-hover:rotate-12 transition-transform" />
          <span className="text-xs font-bold font-mono">
            {isAuthenticated ? 'CMS Dashboard' : 'CMS Admin'}
          </span>
        </button>
      </div>

      {/* Interactive Project Detail Modal */}
      <ProjectModal 
        project={selectedProject} 
        onClose={() => setSelectedProject(null)} 
      />

      {/* Notification Toast */}
      <Toast toast={toast} onClose={() => setToast(null)} />

    </div>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <PortfolioProvider>
          <MainAppContent />
        </PortfolioProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}
