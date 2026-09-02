import React, { useState } from 'react';
import { 
  ShieldCheck, 
  Lock, 
  User, 
  Eye, 
  EyeOff, 
  ArrowLeft, 
  Sparkles, 
  AlertCircle, 
  CheckCircle2
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

export default function LoginPage({ onLoginSuccess, onBackToPortfolio }) {
  const { login } = useAuth();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    setTimeout(() => {
      const res = login(username, password);
      setIsLoading(false);
      if (res.success) {
        if (onLoginSuccess) onLoginSuccess();
      } else {
        setError(res.message);
      }
    }, 400);
  };

  return (
    <div className="min-h-screen bg-[#080B12] text-slate-100 relative flex items-center justify-center p-4 sm:p-6 lg:p-8 overflow-hidden font-sans">
      
      {/* Background ambient lighting */}
      <div className="absolute top-1/4 left-1/3 w-[500px] h-[500px] bg-brand-purple/20 rounded-full blur-[150px] pointer-events-none animate-pulse-slow"></div>
      <div className="absolute bottom-1/4 right-1/3 w-[450px] h-[450px] bg-brand-cyan/15 rounded-full blur-[140px] pointer-events-none"></div>

      {/* Decorative Grid Pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] pointer-events-none"></div>

      <div className="w-full max-w-md relative z-10">
        
        {/* Top return link */}
        <div className="mb-6 flex items-center justify-between">
          <button
            onClick={onBackToPortfolio}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 text-xs font-medium text-slate-300 hover:text-white transition-all group"
          >
            <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-0.5 transition-transform text-brand-cyan" />
            <span>Kembali ke Portofolio</span>
          </button>

          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-purple/10 border border-brand-purple/20 text-[11px] font-semibold text-brand-violet">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
            <span>CMS Admin Panel</span>
          </div>
        </div>

        {/* Card Container */}
        <div className="p-7 sm:p-9 rounded-3xl bg-dark-900/80 backdrop-blur-2xl border border-white/10 shadow-2xl shadow-purple-950/40 relative overflow-hidden">
          
          {/* Subtle top edge glowing highlight */}
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-brand-purple to-transparent opacity-80"></div>

          {/* Header */}
          <div className="text-center mb-8">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-brand-purple/30 to-brand-cyan/20 border border-white/15 flex items-center justify-center mx-auto mb-4 shadow-lg shadow-purple-600/20">
              <ShieldCheck className="w-7 h-7 text-brand-cyan" />
            </div>
            <h1 className="text-2xl sm:text-3xl font-display font-bold text-white tracking-tight">
              Admin Login
            </h1>
            <p className="text-xs sm:text-sm text-slate-400 mt-1.5">
              Masuk untuk mengelola seluruh konten dan data portofolio
            </p>
          </div>

          {/* Error Message */}
          {error && (
            <div className="mb-6 p-3.5 rounded-2xl bg-rose-500/10 border border-rose-500/30 flex items-start gap-3 animate-fadeIn">
              <AlertCircle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
              <p className="text-xs text-rose-300 leading-relaxed font-medium">{error}</p>
            </div>
          )}

          {/* Login Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            
            {/* Username / Email */}
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5 uppercase tracking-wider">
                Username / Email
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-500">
                  <User className="w-4 h-4" />
                </div>
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="admin atau admin@portfolio.dev"
                  required
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-dark-800/80 border border-white/10 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-brand-purple focus:ring-1 focus:ring-brand-purple transition-all"
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5 uppercase tracking-wider">
                Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-500">
                  <Lock className="w-4 h-4" />
                </div>
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="admin123"
                  required
                  className="w-full pl-10 pr-10 py-2.5 rounded-xl bg-dark-800/80 border border-white/10 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-brand-purple focus:ring-1 focus:ring-brand-purple transition-all"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-slate-400 hover:text-white transition-colors"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Remember Me */}
            <div className="flex items-center justify-between pt-1">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  defaultChecked
                  className="w-3.5 h-3.5 rounded bg-dark-800 border-white/20 text-brand-purple focus:ring-0 cursor-pointer"
                />
                <span className="text-xs text-slate-400">Ingat sesi saya</span>
              </label>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full mt-2 py-3 px-4 rounded-xl text-sm font-bold text-white bg-gradient-to-r from-brand-purple via-brand-indigo to-brand-cyan hover:opacity-95 shadow-lg shadow-purple-600/30 transition-all duration-300 disabled:opacity-50 flex items-center justify-center gap-2 group cursor-pointer"
            >
              {isLoading ? (
                <>
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                  <span>Memverifikasi...</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4 group-hover:rotate-12 transition-transform" />
                  <span>Masuk ke Dashboard CMS</span>
                </>
              )}
            </button>
          </form>

          {/* Footer note */}
          <div className="mt-8 pt-6 border-t border-white/[0.08] text-center">
            <p className="text-[11px] text-slate-500">
              CMS Portofolio &bull; Muhammad Alif Ramadhani
            </p>
          </div>

        </div>

      </div>

    </div>
  );
}
