import React, { useState, useEffect } from 'react';
import { Menu, X, FileDown, ArrowUpRight, Sparkles, ShieldCheck } from 'lucide-react';
import { usePortfolio } from '../context/PortfolioContext';
import ThemeToggle from './ThemeToggle';

export default function Navbar({ onDownloadCV, onOpenCMS }) {
  const { personalInfo } = usePortfolio();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  const navLinks = [
    { name: 'Services', href: '#services' },
    { name: 'Experience', href: '#experience' },
    { name: 'Portfolio', href: '#portfolio' },
    { name: 'About', href: '#about' },
    { name: 'Contact', href: '#contact' },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);

      const sections = ['home', 'services', 'experience', 'portfolio', 'about', 'contact'];
      const scrollPosition = window.scrollY + 200;

      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (e, href) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        isScrolled
          ? 'bg-white/85 dark:bg-dark-950/80 backdrop-blur-xl border-b border-slate-200/80 dark:border-white/10 py-3.5 shadow-lg dark:shadow-2xl shadow-slate-200/40 dark:shadow-black/40'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          
          {/* Brand Logo matching reference pill badge aesthetic */}
          <a
            href="#home"
            className="flex items-center gap-3 group focus:outline-none"
            onClick={(e) => handleNavClick(e, '#home')}
          >
            <div className="flex items-center bg-slate-100/90 dark:bg-white/[0.07] border border-slate-300/80 dark:border-white/15 px-3 py-1.5 rounded-full backdrop-blur-md transition-all duration-300 group-hover:border-brand-purple/50 group-hover:bg-slate-200/80 dark:group-hover:bg-white/[0.1]">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 dark:bg-emerald-400 animate-pulse mr-2"></span>
              <span className="text-xs font-semibold uppercase tracking-wider text-slate-700 dark:text-slate-300">Portfolio</span>
            </div>
            <div className="flex flex-col">
              <span className="font-display font-extrabold text-lg sm:text-xl tracking-tight text-slate-900 dark:text-white group-hover:text-brand-purple dark:group-hover:text-brand-violet transition-colors">
                {personalInfo.brandName ? (
                  <>
                    {personalInfo.brandName.replace('.', '')}
                    <span className="text-brand-purple dark:text-brand-cyan">.</span>
                  </>
                ) : (
                  <>ALIF<span className="text-brand-purple dark:text-brand-cyan">.</span></>
                )}
              </span>
            </div>
          </a>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center space-x-1 lg:space-x-2 bg-slate-100/80 dark:bg-white/[0.03] border border-slate-200 dark:border-white/[0.06] px-4 py-1.5 rounded-full backdrop-blur-md shadow-sm dark:shadow-none">
            {navLinks.map((link) => {
              const isActive = activeSection === link.href.replace('#', '');
              return (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href)}
                  className={`px-3.5 py-1.5 rounded-full text-sm font-medium transition-all duration-200 ${
                    isActive
                      ? 'text-brand-purple dark:text-white bg-white dark:bg-white/10 shadow-sm shadow-purple-500/20 font-bold'
                      : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100 hover:bg-white/50 dark:hover:bg-white/[0.05]'
                  }`}
                >
                  {link.name}
                </a>
              );
            })}
          </nav>

          {/* Action CTAs */}
          <div className="hidden sm:flex items-center gap-2.5">
            
            {/* Theme Toggle (Day / Dark Mode) */}
            <ThemeToggle />

            {/* CMS Admin Link */}
            <button
              onClick={onOpenCMS}
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-full text-xs font-semibold text-brand-purple dark:text-brand-cyan bg-brand-purple/10 dark:bg-brand-cyan/10 hover:bg-brand-purple/20 dark:hover:bg-brand-cyan/20 border border-brand-purple/30 dark:border-brand-cyan/30 transition-all duration-300 group shadow-sm cursor-pointer"
              title="Masuk ke Panel CMS Admin"
            >
              <ShieldCheck className="w-3.5 h-3.5 text-brand-purple dark:text-brand-cyan group-hover:rotate-12 transition-transform" />
              <span>CMS Admin</span>
            </button>

            <button
              onClick={onDownloadCV}
              className="flex items-center gap-2 px-3.5 py-2 rounded-full text-xs font-semibold text-slate-700 dark:text-slate-200 bg-slate-100 hover:bg-slate-200 dark:bg-white/[0.05] dark:hover:bg-white/[0.1] border border-slate-300/80 dark:border-white/10 hover:border-brand-purple/40 transition-all duration-300 group shadow-sm"
              title="Download Resume CV"
            >
              <FileDown className="w-3.5 h-3.5 text-slate-500 dark:text-slate-400 group-hover:text-brand-purple dark:group-hover:text-brand-cyan group-hover:translate-y-0.5 transition-transform" />
              <span>Resume PDF</span>
            </button>

            <a
              href="#contact"
              onClick={(e) => handleNavClick(e, '#contact')}
              className="flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-semibold text-white bg-gradient-to-r from-brand-purple to-brand-indigo hover:from-purple-600 hover:to-indigo-600 shadow-md shadow-purple-600/30 hover:shadow-purple-600/50 transition-all duration-300 group"
            >
              <span>Let's Talk</span>
              <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </a>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center gap-2 md:hidden">
            <ThemeToggle variant="compact" />
            <button
              onClick={onOpenCMS}
              className="p-2 rounded-xl bg-brand-purple/10 dark:bg-brand-cyan/10 border border-brand-purple/30 dark:border-brand-cyan/30 text-brand-purple dark:text-brand-cyan"
              title="CMS Admin"
            >
              <ShieldCheck className="w-4 h-4" />
            </button>
            <button
              onClick={onDownloadCV}
              className="p-2 rounded-xl bg-slate-100 dark:bg-white/[0.05] border border-slate-300/80 dark:border-white/10 text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white"
              title="Download CV"
            >
              <FileDown className="w-4 h-4 text-brand-purple dark:text-brand-cyan" />
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-xl bg-slate-100 dark:bg-white/[0.05] border border-slate-300/80 dark:border-white/10 text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white focus:outline-none"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Dropdown Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-slate-200 dark:border-white/10 bg-white/95 dark:bg-dark-900/95 backdrop-blur-2xl px-4 pt-3 pb-6 animate-fadeIn shadow-xl">
          <div className="flex flex-col space-y-2">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className="px-4 py-2.5 rounded-xl text-base font-medium text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-white/[0.06] transition-colors"
              >
                {link.name}
              </a>
            ))}
            <div className="pt-3 border-t border-slate-200 dark:border-white/10 flex flex-col gap-2">
              <div className="flex items-center justify-between p-2 rounded-xl bg-slate-50 dark:bg-dark-850 border border-slate-200 dark:border-white/10">
                <span className="text-xs font-semibold text-slate-700 dark:text-slate-300">Ganti Tampilan</span>
                <ThemeToggle />
              </div>
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenCMS();
                }}
                className="flex items-center justify-center gap-2 w-full py-2.5 rounded-xl text-sm font-semibold text-brand-purple dark:text-brand-cyan bg-brand-purple/10 dark:bg-brand-cyan/10 border border-brand-purple/30 dark:border-brand-cyan/30"
              >
                <ShieldCheck className="w-4 h-4" />
                <span>Buka Panel CMS Admin</span>
              </button>
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onDownloadCV();
                }}
                className="flex items-center justify-center gap-2 w-full py-2.5 rounded-xl text-sm font-semibold text-slate-700 dark:text-slate-200 bg-slate-100 dark:bg-white/[0.05] border border-slate-300 dark:border-white/10"
              >
                <FileDown className="w-4 h-4 text-brand-purple dark:text-brand-cyan" />
                <span>Download CV (PDF)</span>
              </button>
              <a
                href="#contact"
                onClick={(e) => handleNavClick(e, '#contact')}
                className="flex items-center justify-center gap-2 w-full py-2.5 rounded-xl text-sm font-semibold text-white bg-gradient-to-r from-brand-purple to-brand-indigo"
              >
                <span>Let's Talk</span>
                <ArrowUpRight className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
