import React, { useState } from 'react';
import confetti from 'canvas-confetti';
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
import { personalInfo } from './data/portfolioData';

export default function App() {
  const [selectedProject, setSelectedProject] = useState(null);
  const [toast, setToast] = useState(null);

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

    // Create an invisible link to trigger the download of Muhammad Alif Ramadhani's CV
    const link = document.createElement('a');
    link.href = personalInfo.cvUrl;
    link.download = 'CV - Muhammad Alif Ramadhani.pdf';
    link.target = '_blank';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    showToast('Downloading Muhammad Alif Ramadhani CV (PDF)...', 'info');
  };

  return (
    <div className="min-h-screen bg-[#080B12] text-slate-100 selection:bg-brand-purple selection:text-white relative font-sans">
      
      {/* Fixed Navigation */}
      <Navbar onDownloadCV={handleDownloadCV} />

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
      <Footer />

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
