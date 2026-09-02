import React, { useRef } from 'react';
import { 
  FolderGit2, 
  Layers, 
  Briefcase, 
  GraduationCap, 
  Award, 
  HeartHandshake, 
  Layout, 
  RotateCcw, 
  Download, 
  Upload, 
  ExternalLink, 
  CheckCircle2, 
  Sparkles,
  ArrowRight,
  ShieldCheck,
  UserCheck,
  Inbox
} from 'lucide-react';
import { usePortfolio } from '../../../context/PortfolioContext';

export default function OverviewEditor({ onNavigate, showToast }) {
  const { 
    personalInfo, 
    projects, 
    techStack, 
    services, 
    experiences, 
    education, 
    certifications, 
    volunteering,
    contactMessages = [],
    unreadMessagesCount = 0,
    resetToDefaults,
    exportData,
    importData
  } = usePortfolio();

  const fileInputRef = useRef(null);

  const handleReset = () => {
    if (window.confirm('Apakah Anda yakin ingin mengembalikan seluruh data portofolio ke dummy data awal? Semua perubahan kustom Anda akan direset.')) {
      resetToDefaults();
      showToast('Data portofolio telah direset ke default!', 'info');
    }
  };

  const handleExport = () => {
    exportData();
    showToast('File JSON backup portofolio berhasil diunduh!', 'success');
  };

  const handleImportClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const json = JSON.parse(event.target.result);
        const res = importData(json);
        if (res.success) {
          showToast('Data portofolio berhasil diimpor dari file JSON!', 'success');
        } else {
          showToast(`Gagal mengimpor file: ${res.error}`, 'error');
        }
      } catch (err) {
        showToast('Format file JSON tidak valid.', 'error');
      }
    };
    reader.readAsText(file);
    e.target.value = '';
  };

  const quickStats = [
    { id: 'projects', label: 'Total Proyek', count: projects.length, icon: FolderGit2, color: 'text-brand-purple', bg: 'bg-brand-purple/10', border: 'border-brand-purple/20' },
    { id: 'techStack', label: 'Tech Skills', count: techStack.length, icon: Layers, color: 'text-brand-cyan', bg: 'bg-brand-cyan/10', border: 'border-brand-cyan/20' },
    { id: 'services', label: 'Layanan', count: services.length, icon: Layout, color: 'text-brand-indigo', bg: 'bg-brand-indigo/10', border: 'border-brand-indigo/20' },
    { id: 'experiences', label: 'Pengalaman', count: experiences.length, icon: Briefcase, color: 'text-emerald-400', bg: 'bg-emerald-400/10', border: 'border-emerald-400/20' },
    { id: 'contact', label: unreadMessagesCount > 0 ? `Pesan (${unreadMessagesCount} baru)` : 'Pesan Masuk', count: contactMessages.length, icon: Inbox, color: unreadMessagesCount > 0 ? 'text-rose-400' : 'text-amber-400', bg: unreadMessagesCount > 0 ? 'bg-rose-500/10' : 'bg-amber-400/10', border: unreadMessagesCount > 0 ? 'border-rose-500/30' : 'border-amber-400/20' },
    { id: 'certifications', label: 'Sertifikasi', count: certifications.length, icon: Award, color: 'text-pink-400', bg: 'bg-pink-400/10', border: 'border-pink-400/20' },
  ];

  return (
    <div className="space-y-8 animate-fadeIn">
      
      {/* Welcome Banner */}
      <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-dark-850 via-dark-900 to-dark-850 border border-white/10 relative overflow-hidden shadow-2xl">
        <div className="absolute top-0 right-0 w-96 h-96 bg-brand-purple/15 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20"></div>
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-semibold uppercase tracking-wider mb-3">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              <span>CMS Active & Synced</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-display font-black text-white tracking-tight">
              Selamat Datang, <span className="text-gradient-purple">{personalInfo.shortName || personalInfo.name}</span>
            </h1>
            <p className="text-sm text-slate-400 mt-2 max-w-2xl leading-relaxed">
              Ini adalah panel kontrol CMS lengkap untuk mengedit teks, proyek, keterampilan teknis, layanan, riwayat karier, dan kontak pada portofolio Anda secara real-time.
            </p>
          </div>

          {/* Quick Actions in Banner */}
          <div className="flex flex-wrap items-center gap-3 shrink-0">
            <button
              onClick={() => onNavigate('personalInfo')}
              className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-brand-purple to-brand-indigo hover:opacity-95 text-xs font-bold text-white shadow-lg shadow-purple-600/30 flex items-center gap-2 transition-all"
            >
              <UserCheck className="w-4 h-4" />
              <span>Edit Profil Hero</span>
            </button>
            <button
              onClick={() => onNavigate('projects')}
              className="px-4 py-2.5 rounded-xl bg-white/[0.05] hover:bg-white/[0.1] border border-white/15 text-xs font-bold text-slate-200 flex items-center gap-2 transition-all"
            >
              <FolderGit2 className="w-4 h-4 text-brand-cyan" />
              <span>Kelola Proyek</span>
            </button>
          </div>
        </div>
      </div>

      {/* Metric Cards Grid */}
      <div>
        <h2 className="text-base font-bold text-white mb-4 flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-brand-cyan" />
          <span>Statistik Konten Portofolio</span>
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
          {quickStats.map((stat) => {
            const Icon = stat.icon;
            return (
              <button
                key={stat.id}
                onClick={() => onNavigate(stat.id)}
                className={`p-4 rounded-2xl bg-dark-900/60 hover:bg-dark-850 border ${stat.border} transition-all duration-300 text-left group hover:scale-[1.02] shadow-sm`}
              >
                <div className={`w-9 h-9 rounded-xl ${stat.bg} flex items-center justify-center mb-3 group-hover:scale-110 transition-transform`}>
                  <Icon className={`w-5 h-5 ${stat.color}`} />
                </div>
                <div className="text-2xl font-black text-white font-display">{stat.count}</div>
                <div className="text-xs text-slate-400 font-medium mt-0.5 group-hover:text-slate-200 transition-colors flex items-center justify-between">
                  <span>{stat.label}</span>
                  <ArrowRight className="w-3 h-3 opacity-0 group-hover:opacity-100 -translate-x-1 group-hover:translate-x-0 transition-all text-slate-400" />
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Quick Navigation Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Section Management Links */}
        <div className="p-6 rounded-3xl bg-dark-900/60 border border-white/10 space-y-4">
          <h3 className="text-sm font-bold text-white flex items-center gap-2 uppercase tracking-wider">
            <Layout className="w-4 h-4 text-brand-purple" />
            <span>Pintasan Bagian Portofolio</span>
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            {[
              { id: 'personalInfo', label: '1. Hero & Profil', desc: 'Nama, bio, statistik hero' },
              { id: 'techStack', label: '2. Tech Stack & Skills', desc: 'Daftar badge keahlian' },
              { id: 'services', label: '3. Layanan & Jasa', desc: 'Kartu penawaran jasa' },
              { id: 'experiences', label: '4. Pengalaman Kerja', desc: 'Riwayat PT PLN, dsb' },
              { id: 'education', label: '5. Pendidikan', desc: 'BINUS University, SMA' },
              { id: 'certifications', label: '6. Sertifikasi', desc: 'SQL, Data Analytics' },
              { id: 'projects', label: '7. Proyek Portofolio', desc: 'Katalog karya & link' },
              { id: 'testimonials', label: '8. Testimoni Klien', desc: 'Review & rekomendasi' },
              { id: 'contact', label: '9. Kontak & Sosmed', desc: 'Email, WhatsApp, LinkedIn' },
            ].map(item => (
              <button
                key={item.id}
                onClick={() => onNavigate(item.id)}
                className="p-3 rounded-xl bg-white/[0.03] hover:bg-white/[0.08] border border-white/[0.06] text-left transition-all group flex flex-col"
              >
                <span className="text-xs font-bold text-slate-200 group-hover:text-brand-violet transition-colors">
                  {item.label}
                </span>
                <span className="text-[11px] text-slate-500 mt-0.5">{item.desc}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Data Persistence & Backup Tools */}
        <div className="p-6 rounded-3xl bg-dark-900/60 border border-white/10 flex flex-col justify-between space-y-6">
          <div>
            <h3 className="text-sm font-bold text-white flex items-center gap-2 uppercase tracking-wider mb-2">
              <ShieldCheck className="w-4 h-4 text-brand-cyan" />
              <span>Manajemen Data & Backup</span>
            </h3>
            <p className="text-xs text-slate-400 leading-relaxed mb-6">
              Data portofolio Anda disimpan secara lokal (localStorage). Anda dapat mengekspor data ke file JSON untuk backup, mengimpor kembali kapan saja, atau mengembalikan ke dummy data awal.
            </p>

            <div className="space-y-3">
              <button
                onClick={handleExport}
                className="w-full py-3 px-4 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 text-xs font-semibold text-slate-200 hover:text-white flex items-center justify-between transition-all"
              >
                <div className="flex items-center gap-2.5">
                  <Download className="w-4 h-4 text-brand-cyan" />
                  <span>Ekspor Backup Data (JSON)</span>
                </div>
                <span className="text-[10px] text-slate-500 font-mono">.json</span>
              </button>

              <button
                onClick={handleImportClick}
                className="w-full py-3 px-4 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 text-xs font-semibold text-slate-200 hover:text-white flex items-center justify-between transition-all"
              >
                <div className="flex items-center gap-2.5">
                  <Upload className="w-4 h-4 text-brand-violet" />
                  <span>Impor Data dari File JSON</span>
                </div>
                <span className="text-[10px] text-slate-500 font-mono">Upload</span>
              </button>
              <input
                ref={fileInputRef}
                type="file"
                accept=".json"
                onChange={handleFileChange}
                className="hidden"
              />
            </div>
          </div>

          {/* Reset button box */}
          <div className="pt-4 border-t border-white/10">
            <button
              onClick={handleReset}
              className="w-full py-2.5 px-4 rounded-xl bg-rose-500/10 hover:bg-rose-500/20 border border-rose-500/30 text-xs font-bold text-rose-300 hover:text-rose-200 flex items-center justify-center gap-2 transition-all"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset Seluruh Data ke Dummy Default</span>
            </button>
          </div>
        </div>

      </div>

    </div>
  );
}
