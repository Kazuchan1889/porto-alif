import React, { useState } from 'react';
import { 
  Plus, 
  Trash2, 
  Edit3, 
  Briefcase, 
  Sparkles, 
  MapPin, 
  Calendar, 
  Building2, 
  X, 
  ListPlus,
  CheckCircle2
} from 'lucide-react';
import { usePortfolio } from '../../../context/PortfolioContext';

export default function ExperienceEditor({ showToast }) {
  const { experiences, addExperience, updateExperience, deleteExperience } = usePortfolio();

  const [modalOpen, setModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [formData, setFormData] = useState({
    role: '',
    company: '',
    location: 'Indonesia',
    period: '',
    summary: '',
    achievements: [''],
    techInput: ''
  });

  const handleOpenAdd = () => {
    setEditingItem(null);
    setFormData({
      role: '',
      company: '',
      location: 'Jakarta, Indonesia',
      period: '2025 - 2026',
      summary: '',
      achievements: [''],
      techInput: 'Vue.js, React, Tailwind CSS, PostgreSQL'
    });
    setModalOpen(true);
  };

  const handleOpenEdit = (item) => {
    setEditingItem(item);
    setFormData({
      role: item.role,
      company: item.company,
      location: item.location || '',
      period: item.period || '',
      summary: item.summary || '',
      achievements: (item.achievements && item.achievements.length > 0) ? [...item.achievements] : [''],
      techInput: (item.tech || []).join(', ')
    });
    setModalOpen(true);
  };

  const handleDelete = (item) => {
    if (window.confirm(`Hapus riwayat pengalaman "${item.role} di ${item.company}"?`)) {
      deleteExperience(item.id);
      showToast(`Pengalaman di ${item.company} berhasil dihapus!`, 'info');
    }
  };

  const handleAchievementChange = (index, val) => {
    const next = [...formData.achievements];
    next[index] = val;
    setFormData({ ...formData, achievements: next });
  };

  const handleAddAchievementLine = () => {
    setFormData({ ...formData, achievements: [...formData.achievements, ''] });
  };

  const handleRemoveAchievementLine = (index) => {
    const next = formData.achievements.filter((_, i) => i !== index);
    setFormData({ ...formData, achievements: next.length > 0 ? next : [''] });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.role.trim() || !formData.company.trim()) return;

    const techArray = formData.techInput
      .split(',')
      .map(t => t.trim())
      .filter(Boolean);

    const filteredAchievements = formData.achievements
      .map(a => a.trim())
      .filter(Boolean);

    const payload = {
      type: 'work',
      role: formData.role,
      company: formData.company,
      location: formData.location,
      period: formData.period,
      summary: formData.summary,
      achievements: filteredAchievements,
      tech: techArray
    };

    if (editingItem) {
      updateExperience(editingItem.id, payload);
      showToast(`Pengalaman di ${formData.company} berhasil diperbarui!`, 'success');
    } else {
      addExperience(payload);
      showToast(`Pengalaman baru di ${formData.company} berhasil ditambahkan!`, 'success');
    }
    setModalOpen(false);
  };

  return (
    <div className="space-y-8 animate-fadeIn">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-white/10">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-semibold uppercase tracking-wider mb-2">
            <Briefcase className="w-3.5 h-3.5" />
            <span>Section 4</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-display font-black text-white tracking-tight">
            Riwayat Pengalaman Kerja
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Kelola rekam jejak karier, perusahaan tempat bekerja, durasi kerja, dan poin pencapaian proyek.
          </p>
        </div>

        <button
          onClick={handleOpenAdd}
          className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-brand-purple to-brand-indigo hover:opacity-95 text-xs font-bold text-white shadow-lg shadow-purple-600/30 flex items-center justify-center gap-2 transition-all shrink-0 cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          <span>Tambah Pengalaman Kerja</span>
        </button>
      </div>

      {/* Experience List */}
      <div className="space-y-6">
        {experiences.map((item) => (
          <div
            key={item.id}
            className="p-6 sm:p-7 rounded-3xl bg-dark-900/70 border border-white/10 hover:border-white/20 transition-all group relative"
          >
            <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 mb-4">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-xs font-bold text-emerald-400 uppercase tracking-wide">
                    {item.company}
                  </span>
                  <span className="text-slate-600">&bull;</span>
                  <span className="text-xs text-slate-400 flex items-center gap-1">
                    <MapPin className="w-3 h-3" />
                    {item.location}
                  </span>
                </div>
                <h3 className="text-lg font-bold text-white group-hover:text-brand-violet transition-colors">
                  {item.role}
                </h3>
              </div>

              <div className="flex items-center gap-2">
                <span className="px-3 py-1 rounded-full bg-white/[0.05] border border-white/10 text-xs text-slate-300 font-medium whitespace-nowrap">
                  {item.period}
                </span>

                <button
                  onClick={() => handleOpenEdit(item)}
                  className="p-1.5 rounded-lg bg-white/[0.04] hover:bg-white/[0.1] text-slate-300 hover:text-white transition-colors"
                  title="Edit"
                >
                  <Edit3 className="w-4 h-4" />
                </button>
                <button
                  onClick={() => handleDelete(item)}
                  className="p-1.5 rounded-lg bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 hover:text-rose-300 transition-colors"
                  title="Hapus"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>

            {item.summary && (
              <p className="text-xs text-slate-400 leading-relaxed mb-4">
                {item.summary}
              </p>
            )}

            {/* Achievements Bullet List */}
            {item.achievements && item.achievements.length > 0 && (
              <div className="space-y-2 mb-5">
                <p className="text-xs font-semibold text-slate-300 uppercase tracking-wider">
                  Pencapaian Utama:
                </p>
                <ul className="space-y-1.5">
                  {item.achievements.map((ach, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-xs text-slate-300">
                      <span className="text-brand-cyan shrink-0 mt-0.5">&bull;</span>
                      <span>{ach}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Tech Tags */}
            <div className="flex flex-wrap gap-1.5 pt-3 border-t border-white/[0.06]">
              {(item.tech || []).map((t, idx) => (
                <span
                  key={idx}
                  className="px-2.5 py-1 rounded-lg bg-white/[0.04] text-[11px] text-slate-300 font-mono"
                >
                  {t}
                </span>
              ))}
            </div>

          </div>
        ))}
      </div>

      {/* Add / Edit Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fadeIn">
          <div className="w-full max-w-xl rounded-3xl bg-dark-900 border border-white/15 p-6 sm:p-7 shadow-2xl relative max-h-[90vh] overflow-y-auto">
            
            <button
              onClick={() => setModalOpen(false)}
              className="absolute top-5 right-5 p-1.5 rounded-full bg-white/[0.05] hover:bg-white/10 text-slate-400 hover:text-white transition-colors"
            >
              <X className="w-4 h-4" />
            </button>

            <h2 className="text-lg font-bold text-white mb-1">
              {editingItem ? 'Edit Pengalaman Kerja' : 'Tambah Pengalaman Kerja'}
            </h2>
            <p className="text-xs text-slate-400 mb-5">
              Isi data posisi, perusahaan, durasi, dan rincian kontribusi.
            </p>

            <form onSubmit={handleSubmit} className="space-y-4">
              
              {/* Role & Company */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Posisi / Role
                  </label>
                  <input
                    type="text"
                    value={formData.role}
                    onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                    required
                    placeholder="Contoh: Front-End Developer"
                    className="w-full px-3.5 py-2 rounded-xl bg-dark-800 border border-white/10 text-white text-sm focus:border-brand-purple focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Nama Perusahaan / Organisasi
                  </label>
                  <input
                    type="text"
                    value={formData.company}
                    onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                    required
                    placeholder="Contoh: PT PLN Icon Plus"
                    className="w-full px-3.5 py-2 rounded-xl bg-dark-800 border border-white/10 text-white text-sm focus:border-brand-purple focus:outline-none"
                  />
                </div>
              </div>

              {/* Period & Location */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Periode / Rentang Waktu
                  </label>
                  <input
                    type="text"
                    value={formData.period}
                    onChange={(e) => setFormData({ ...formData, period: e.target.value })}
                    placeholder="Feb 2025 - Feb 2026"
                    className="w-full px-3.5 py-2 rounded-xl bg-dark-800 border border-white/10 text-white text-sm focus:border-brand-purple focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Lokasi
                  </label>
                  <input
                    type="text"
                    value={formData.location}
                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                    placeholder="Jakarta Selatan, Indonesia"
                    className="w-full px-3.5 py-2 rounded-xl bg-dark-800 border border-white/10 text-white text-sm focus:border-brand-purple focus:outline-none"
                  />
                </div>
              </div>

              {/* Summary */}
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Deskripsi Singkat Perusahaan / Tim
                </label>
                <textarea
                  rows={2}
                  value={formData.summary}
                  onChange={(e) => setFormData({ ...formData, summary: e.target.value })}
                  placeholder="Deskripsi singkat profil divisi / proyek perusahaan..."
                  className="w-full px-3.5 py-2 rounded-xl bg-dark-800 border border-white/10 text-white text-sm focus:border-brand-purple focus:outline-none"
                ></textarea>
              </div>

              {/* Achievements dynamic list */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="block text-xs font-semibold text-slate-300">
                    Poin Pencapaian & Tanggung Jawab
                  </label>
                  <button
                    type="button"
                    onClick={handleAddAchievementLine}
                    className="text-xs font-semibold text-brand-cyan hover:underline flex items-center gap-1"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Tambah Poin</span>
                  </button>
                </div>
                <div className="space-y-2">
                  {formData.achievements.map((ach, idx) => (
                    <div key={idx} className="flex items-center gap-2">
                      <span className="text-xs text-slate-500 font-mono w-4">{idx + 1}.</span>
                      <input
                        type="text"
                        value={ach}
                        onChange={(e) => handleAchievementChange(idx, e.target.value)}
                        placeholder={`Pencapaian ${idx + 1}...`}
                        className="flex-1 px-3 py-1.5 rounded-lg bg-dark-800 border border-white/10 text-white text-xs focus:border-brand-purple focus:outline-none"
                      />
                      {formData.achievements.length > 1 && (
                        <button
                          type="button"
                          onClick={() => handleRemoveAchievementLine(idx)}
                          className="p-1.5 text-slate-400 hover:text-rose-400"
                        >
                          <X className="w-3.5 h-3.5" />
                        </button>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Tech Stack Input */}
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Teknologi yang Digunakan (Pisahkan dengan koma)
                </label>
                <input
                  type="text"
                  value={formData.techInput}
                  onChange={(e) => setFormData({ ...formData, techInput: e.target.value })}
                  placeholder="Vue.js, JavaScript, Tailwind CSS, PostgreSQL, REST APIs"
                  className="w-full px-3.5 py-2 rounded-xl bg-dark-800 border border-white/10 text-white text-sm focus:border-brand-purple focus:outline-none"
                />
              </div>

              {/* Actions */}
              <div className="flex items-center justify-end gap-3 pt-4 border-t border-white/10">
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="px-4 py-2 rounded-xl bg-white/[0.05] hover:bg-white/10 text-xs font-semibold text-slate-300 transition-colors"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-gradient-to-r from-brand-purple to-brand-indigo text-xs font-bold text-white shadow-md shadow-purple-600/30 transition-all cursor-pointer"
                >
                  {editingItem ? 'Simpan Perubahan' : 'Tambahkan'}
                </button>
              </div>

            </form>

          </div>
        </div>
      )}

    </div>
  );
}
