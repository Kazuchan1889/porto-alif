import React from 'react';
import { Sun, Moon } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

export default function ThemeToggle({ className = '', variant = 'navbar' }) {
  const { theme, toggleTheme, isDark } = useTheme();

  if (variant === 'compact') {
    return (
      <button
        onClick={toggleTheme}
        className={`p-2 rounded-xl transition-all duration-300 border flex items-center justify-center cursor-pointer ${
          isDark
            ? 'bg-white/[0.05] hover:bg-white/[0.1] border-white/10 text-amber-400 hover:text-amber-300'
            : 'bg-slate-100 hover:bg-slate-200 border-slate-300/80 text-indigo-600 hover:text-indigo-700'
        } ${className}`}
        title={isDark ? 'Ganti ke Day / Light Mode' : 'Ganti ke Dark Mode'}
        aria-label="Toggle Theme"
      >
        {isDark ? (
          <Sun className="w-4 h-4 transition-transform hover:rotate-45" />
        ) : (
          <Moon className="w-4 h-4 transition-transform hover:-rotate-12" />
        )}
      </button>
    );
  }

  return (
    <button
      onClick={toggleTheme}
      className={`relative inline-flex items-center gap-2 px-3 py-1.5 rounded-full transition-all duration-300 border text-xs font-semibold cursor-pointer group ${
        isDark
          ? 'bg-dark-900/80 hover:bg-dark-850 border-white/15 text-slate-300 hover:text-white shadow-sm'
          : 'bg-white/90 hover:bg-slate-50 border-slate-200 text-slate-700 hover:text-slate-900 shadow-sm'
      } ${className}`}
      title={isDark ? 'Beralih ke Day Mode' : 'Beralih ke Dark Mode'}
      aria-label="Toggle Theme"
    >
      <div className={`p-1 rounded-full transition-colors ${
        isDark ? 'bg-amber-400/20 text-amber-400' : 'bg-indigo-600/10 text-indigo-600'
      }`}>
        {isDark ? (
          <Sun className="w-3.5 h-3.5 group-hover:rotate-45 transition-transform" />
        ) : (
          <Moon className="w-3.5 h-3.5 group-hover:-rotate-12 transition-transform" />
        )}
      </div>
      <span className="hidden sm:inline-block">
        {isDark ? 'Day Mode' : 'Dark Mode'}
      </span>
    </button>
  );
}
