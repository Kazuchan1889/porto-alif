import React, { useState } from 'react';
import { 
  Plus, 
  Trash2, 
  Edit3, 
  GraduationCap, 
  Sparkles, 
  MapPin, 
  Calendar, 
  X,
  Award
} from 'lucide-react';
import { usePortfolio } from '../../../context/PortfolioContext';

export default function EducationEditor({ showToast }) {
  const { education, addEducation, updateEducation, deleteEducation } = usePortfolio();

  const [modalOpen, setModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [formData, setFormData] = useState({
    degree: '',
    institution: '',
    location: '',
    period: '',
    gpa: '',
    description: '',
    highlight: ''
  });

  const handleOpenAdd = () => {
    setEditingItem(null);
    setFormData({
      degree: 'Bachelor of Computer Science (S.Kom)',
      institution: 'Universitas Bina Nusantara (BINUS)',
      location: 'Tangerang Selatan, Indonesia',
      period: 'Sep 2022 - Dec 2026 (Expected)',
      gpa: 'GPA: 3.23 / 4.00',
      description: 'Core coursework in Software Engineering, Data Structures & Algorithms, Database Systems...',
      highlight: 'Active contributor in student tech projects and software development competitions.'
    });
    setModalOpen(true);
  };

  const handleOpenEdit = (item) => {
    setEditingItem(item);
    setFormData({
      degree: item.degree,
      institution: item.institution,
      location: item.location || '',
      period: item.period || '',
      gpa: item.gpa || '',
      description: item.description || '',
      highlight: item.highlight || ''
    });
    setModalOpen(true);
  };

  const handleDelete = (item) => {
    if (window.confirm(`Hapus data pendidikan "${item.degree} di ${item.institution}"?`)) {
      deleteEducation(item.id);
      showToast(`Pendidikan di ${item.institution} berhasil dihapus!`, 'info');
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.degree.trim() || !formData.institution.trim()) return;

    if (editingItem) {
      updateEducation(editingItem.id, formData);
      showToast(`Data pendidikan di ${formData.institution} berhasil diperbarui!`, 'success');
    } else {
      addEducation(formData);
      showToast(`Data pendidikan baru di ${formData.institution} berhasil ditambahkan!`, 'success');
    }
    setModalOpen(false);
  };

  return (
    <div className="space-y-8 animate-fadeIn">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-white/10">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-400/10 border border-amber-400/30 text-amber-400 text-xs font-semibold uppercase tracking-wider mb-2">
            <GraduationCap className="w-3.5 h-3.5" />
            <span>Section 5</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-display font-black text-white tracking-tight">
            Riwayat Pendidikan & Akademik
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Kelola data universitas, sekolah, gelar, IPK (GPA), dan mata kuliah relevan.
          </p>
        </div>

        <button
          onClick={handleOpenAdd}
          className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-brand-purple to-brand-indigo hover:opacity-95 text-xs font-bold text-white shadow-lg shadow-purple-600/30 flex items-center justify-center gap-2 transition-all shrink-0 cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          <span>Tambah Pendidikan</span>
        </button>
      </div>

      {/* Education List */}
      <div className="space-y-6">
        {education.map((item) => (
          <div
            key={item.id}
            className="p-6 sm:p-7 rounded-3xl bg-dark-900/70 border border-white/10 hover:border-white/20 transition-all group"
          >
            <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 mb-3">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-xs font-bold text-amber-400 uppercase tracking-wide">
                    {item.institution}
                  </span>
                  {item.location && (
                    <>
                      <span className="text-slate-600">&bull;</span>
                      <span className="text-xs text-slate-400 flex items-center gap-1">
                        <MapPin className="w-3 h-3" />
                        {item.location}
                      </span>
                    </>
                  )}
                </div>
                <h3 className="text-lg font-bold text-white group-hover:text-brand-violet transition-colors">
                  {item.degree}
                </h3>
              </div>

              <div className="flex items-center gap-2">
                {item.gpa && (
                  <span className="px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-xs font-bold text-emerald-400 whitespace-nowrap">
                    {item.gpa}
                  </span>
                )}
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

            {item.description && (
              <p className="text-xs text-slate-400 leading-relaxed mb-3">
                {item.description}
              </p>
            )}

            {item.highlight && (
              <div className="p-3 rounded-xl bg-white/[0.02] border border-white/[0.05] text-xs text-slate-300 flex items-center gap-2">
                <Sparkles className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                <span>{item.highlight}</span>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fadeIn">
          <div className="w-full max-w-lg rounded-3xl bg-dark-900 border border-white/15 p-6 sm:p-7 shadow-2xl relative max-h-[90vh] overflow-y-auto">
            
            <button
              onClick={() => setModalOpen(false)}
              className="absolute top-5 right-5 p-1.5 rounded-full bg-white/[0.05] hover:bg-white/10 text-slate-400 hover:text-white transition-colors"
            >
              <X className="w-4 h-4" />
            </button>

            <h2 className="text-lg font-bold text-white mb-1">
              {editingItem ? 'Edit Pendidikan' : 'Tambah Riwayat Pendidikan'}
            </h2>
            <p className="text-xs text-slate-400 mb-5">
              Isi data gelar, institusi, nilai IPK, dan deskripsi fokus studi.
            </p>

            <form onSubmit={handleSubmit} className="space-y-4">
              
              {/* Degree */}
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Nama Gelar / Jurusan
                </label>
                <input
                  type="text"
                  value={formData.degree}
                  onChange={(e) => setFormData({ ...formData, degree: e.target.value })}
                  required
                  placeholder="Bachelor of Computer Science (S.Kom)"
                  className="w-full px-3.5 py-2 rounded-xl bg-dark-800 border border-white/10 text-white text-sm focus:border-brand-purple focus:outline-none"
                />
              </div>

              {/* Institution */}
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Nama Institusi / Universitas
                </label>
                <input
                  type="text"
                  value={formData.institution}
                  onChange={(e) => setFormData({ ...formData, institution: e.target.value })}
                  required
                  placeholder="Universitas Bina Nusantara (BINUS)"
                  className="w-full px-3.5 py-2 rounded-xl bg-dark-800 border border-white/10 text-white text-sm focus:border-brand-purple focus:outline-none"
                />
              </div>

              {/* GPA & Period */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Nilai IPK (GPA)
                  </label>
                  <input
                    type="text"
                    value={formData.gpa}
                    onChange={(e) => setFormData({ ...formData, gpa: e.target.value })}
                    placeholder="GPA: 3.23 / 4.00"
                    className="w-full px-3.5 py-2 rounded-xl bg-dark-800 border border-white/10 text-white text-sm focus:border-brand-purple focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Periode Waktu
                  </label>
                  <input
                    type="text"
                    value={formData.period}
                    onChange={(e) => setFormData({ ...formData, period: e.target.value })}
                    placeholder="Sep 2022 - Dec 2026 (Expected)"
                    className="w-full px-3.5 py-2 rounded-xl bg-dark-800 border border-white/10 text-white text-sm focus:border-brand-purple focus:outline-none"
                  />
                </div>
              </div>

              {/* Location */}
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Lokasi
                </label>
                <input
                  type="text"
                  value={formData.location}
                  onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                  placeholder="Tangerang Selatan, Indonesia"
                  className="w-full px-3.5 py-2 rounded-xl bg-dark-800 border border-white/10 text-white text-sm focus:border-brand-purple focus:outline-none"
                />
              </div>

              {/* Description */}
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Mata Kuliah / Deskripsi Kurikulum
                </label>
                <textarea
                  rows={2}
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Software Engineering, Data Structures & Algorithms, Database Systems..."
                  className="w-full px-3.5 py-2 rounded-xl bg-dark-800 border border-white/10 text-white text-sm focus:border-brand-purple focus:outline-none"
                ></textarea>
              </div>

              {/* Highlight */}
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Sorotan / Prestasi Kegiatan Kampus
                </label>
                <input
                  type="text"
                  value={formData.highlight}
                  onChange={(e) => setFormData({ ...formData, highlight: e.target.value })}
                  placeholder="Active contributor in student tech projects..."
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
