import React, { useState } from 'react';
import { 
  Save, 
  User, 
  Sparkles, 
  Briefcase, 
  MapPin, 
  FileText, 
  Image as ImageIcon, 
  FileDown, 
  BarChart2,
  CheckCircle2
} from 'lucide-react';
import { usePortfolio } from '../../../context/PortfolioContext';
import FileUploadField from '../common/FileUploadField';

export default function PersonalInfoEditor({ showToast }) {
  const { personalInfo, updatePersonalInfo } = usePortfolio();
  const [formData, setFormData] = useState({
    name: personalInfo.name || '',
    shortName: personalInfo.shortName || '',
    brandName: personalInfo.brandName || '',
    role: personalInfo.role || '',
    tagline: personalInfo.tagline || '',
    about: personalInfo.about || '',
    location: personalInfo.location || '',
    avatarUrl: personalInfo.avatarUrl || '',
    cvUrl: personalInfo.cvUrl || '',
    stats: {
      yearsExperience: personalInfo.stats?.yearsExperience || '1+',
      completedProjects: personalInfo.stats?.completedProjects || '12+',
      happyClients: personalInfo.stats?.happyClients || '10+',
      techSkillsCount: personalInfo.stats?.techSkillsCount || '8+'
    }
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name.startsWith('stats.')) {
      const statKey = name.split('.')[1];
      setFormData(prev => ({
        ...prev,
        stats: {
          ...prev.stats,
          [statKey]: value
        }
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    updatePersonalInfo(formData);
    showToast('Profil & Data Hero berhasil diperbarui!', 'success');
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8 animate-fadeIn">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-white/10">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-purple/10 border border-brand-purple/30 text-brand-violet text-xs font-semibold uppercase tracking-wider mb-2">
            <User className="w-3.5 h-3.5" />
            <span>Section 1</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-display font-black text-white tracking-tight">
            Hero & Profil Pengembang
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Ubah identitas, judul pekerjaan, bio pengantar, statistik angka hero, dan foto profil.
          </p>
        </div>

        <button
          type="submit"
          className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-brand-purple to-brand-indigo hover:opacity-95 text-xs font-bold text-white shadow-lg shadow-purple-600/30 flex items-center justify-center gap-2 transition-all shrink-0 cursor-pointer"
        >
          <Save className="w-4 h-4" />
          <span>Simpan Perubahan</span>
        </button>
      </div>

      {/* Main Info Card */}
      <div className="p-6 sm:p-8 rounded-3xl bg-dark-900/70 border border-white/10 space-y-6">
        <h2 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-brand-cyan" />
          <span>Informasi Utama & Hero</span>
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          
          {/* Full Name */}
          <div className="sm:col-span-2 lg:col-span-1">
            <label className="block text-xs font-semibold text-slate-300 mb-1.5">
              Nama Lengkap
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full px-4 py-2.5 rounded-xl bg-dark-800/90 border border-white/10 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-brand-purple transition-all"
            />
          </div>

          {/* Short Name / Display Name */}
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5">
              Nama Panggilan / Short Name
            </label>
            <input
              type="text"
              name="shortName"
              value={formData.shortName}
              onChange={handleChange}
              placeholder="Stefan Alif"
              className="w-full px-4 py-2.5 rounded-xl bg-dark-800/90 border border-white/10 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-brand-purple transition-all"
            />
          </div>

          {/* Brand Logo Text */}
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5">
              Brand Logo Text
            </label>
            <input
              type="text"
              name="brandName"
              value={formData.brandName}
              onChange={handleChange}
              placeholder="ALIF."
              className="w-full px-4 py-2.5 rounded-xl bg-dark-800/90 border border-white/10 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-brand-purple transition-all"
            />
          </div>

          {/* Role / Job Title */}
          <div className="sm:col-span-2">
            <label className="block text-xs font-semibold text-slate-300 mb-1.5">
              Role / Profesi (Hero Subtitle)
            </label>
            <input
              type="text"
              name="role"
              value={formData.role}
              onChange={handleChange}
              required
              placeholder="Front-End & Mobile Developer"
              className="w-full px-4 py-2.5 rounded-xl bg-dark-800/90 border border-white/10 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-brand-purple transition-all"
            />
          </div>

          {/* Location */}
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5">
              Lokasi Domisili
            </label>
            <input
              type="text"
              name="location"
              value={formData.location}
              onChange={handleChange}
              placeholder="Tangerang, Indonesia"
              className="w-full px-4 py-2.5 rounded-xl bg-dark-800/90 border border-white/10 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-brand-purple transition-all"
            />
          </div>

        </div>

        {/* Tagline */}
        <div>
          <label className="block text-xs font-semibold text-slate-300 mb-1.5">
            Tagline Singkat
          </label>
          <input
            type="text"
            name="tagline"
            value={formData.tagline}
            onChange={handleChange}
            placeholder="Building scalable web diagrams, high-performance mobile apps..."
            className="w-full px-4 py-2.5 rounded-xl bg-dark-800/90 border border-white/10 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-brand-purple transition-all"
          />
        </div>

        {/* About Bio */}
        <div>
          <label className="block text-xs font-semibold text-slate-300 mb-1.5">
            Deskripsi Biografi (About Section & Hero)
          </label>
          <textarea
            rows={4}
            name="about"
            value={formData.about}
            onChange={handleChange}
            placeholder="Tuliskan latar belakang pendidikan, keahlian utama, dan pengalaman kerja..."
            className="w-full px-4 py-3 rounded-xl bg-dark-800/90 border border-white/10 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-brand-purple transition-all leading-relaxed"
          ></textarea>
        </div>

      </div>

      {/* Hero Stats Card */}
      <div className="p-6 sm:p-8 rounded-3xl bg-dark-900/70 border border-white/10 space-y-6">
        <h2 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
          <BarChart2 className="w-4 h-4 text-emerald-400" />
          <span>Statistik Angka di Hero & Profil</span>
        </h2>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5">
              Pengalaman (Tahun)
            </label>
            <input
              type="text"
              name="stats.yearsExperience"
              value={formData.stats.yearsExperience}
              onChange={handleChange}
              placeholder="1+"
              className="w-full px-4 py-2.5 rounded-xl bg-dark-800/90 border border-white/10 text-white text-sm font-bold text-center focus:border-brand-purple"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5">
              Proyek Selesai
            </label>
            <input
              type="text"
              name="stats.completedProjects"
              value={formData.stats.completedProjects}
              onChange={handleChange}
              placeholder="12+"
              className="w-full px-4 py-2.5 rounded-xl bg-dark-800/90 border border-white/10 text-white text-sm font-bold text-center focus:border-brand-purple"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5">
              Klien / Mitra
            </label>
            <input
              type="text"
              name="stats.happyClients"
              value={formData.stats.happyClients}
              onChange={handleChange}
              placeholder="10+"
              className="w-full px-4 py-2.5 rounded-xl bg-dark-800/90 border border-white/10 text-white text-sm font-bold text-center focus:border-brand-purple"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5">
              Tech Skills
            </label>
            <input
              type="text"
              name="stats.techSkillsCount"
              value={formData.stats.techSkillsCount}
              onChange={handleChange}
              placeholder="8+"
              className="w-full px-4 py-2.5 rounded-xl bg-dark-800/90 border border-white/10 text-white text-sm font-bold text-center focus:border-brand-purple"
            />
          </div>

        </div>
      </div>

      {/* Media & Files */}
      <div className="p-6 sm:p-8 rounded-3xl bg-dark-900/70 border border-white/10 space-y-6">
        <h2 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
          <ImageIcon className="w-4 h-4 text-brand-violet" />
          <span>Upload Foto Profil & Dokumen CV (PDF)</span>
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          
          {/* Avatar Profile Photo Upload */}
          <FileUploadField
            label="Foto Profil / Avatar Pengembang"
            type="image"
            accept="image/*"
            value={formData.avatarUrl}
            onChange={(val) => setFormData(prev => ({ ...prev, avatarUrl: val }))}
            helperText="Pilih foto profil langsung dari folder komputer Anda. Format JPG, PNG, WEBP."
            presetOptions={[
              { label: 'Foto Utama', url: '/assets/alip-real-photo.jpg' },
              { label: 'Foto Portrait', url: '/assets/alif-portrait.jpg' }
            ]}
            showToast={showToast}
          />

          {/* CV Document (PDF) Upload */}
          <FileUploadField
            label="Dokumen Resume / CV (Format PDF)"
            type="document"
            accept=".pdf,application/pdf"
            value={formData.cvUrl}
            onChange={(val) => setFormData(prev => ({ ...prev, cvUrl: val }))}
            helperText="Pilih file PDF CV langsung dari folder komputer Anda. Digunakan saat pengunjung mengklik tombol 'Download CV'."
            presetOptions={[
              { label: 'CV Default', url: '/CV - Muhammad Alif Ramadhani.pdf' }
            ]}
            showToast={showToast}
          />

        </div>
      </div>

      {/* Bottom Save Bar */}
      <div className="flex items-center justify-end gap-4 pt-4">
        <button
          type="submit"
          className="px-6 py-3 rounded-xl bg-gradient-to-r from-brand-purple to-brand-indigo hover:opacity-95 text-sm font-bold text-white shadow-lg shadow-purple-600/30 flex items-center gap-2 transition-all cursor-pointer"
        >
          <Save className="w-4 h-4" />
          <span>Simpan Perubahan Hero & Profil</span>
        </button>
      </div>

    </form>
  );
}
