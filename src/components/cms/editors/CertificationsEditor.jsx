import React, { useState } from 'react';
import { 
  Plus, 
  Trash2, 
  Edit3, 
  Award, 
  Sparkles, 
  Database, 
  BarChart3, 
  X, 
  Code2, 
  ShieldCheck,
  CheckCircle2
} from 'lucide-react';
import { usePortfolio } from '../../../context/PortfolioContext';

const ICON_MAP = {
  Database,
  BarChart3,
  Award,
  Code2,
  ShieldCheck
};

export default function CertificationsEditor({ showToast }) {
  const { certifications, addCertification, updateCertification, deleteCertification } = usePortfolio();

  const [modalOpen, setModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    issuer: '',
    year: '2025',
    topicsInput: '',
    icon: 'Database'
  });

  const handleOpenAdd = () => {
    setEditingItem(null);
    setFormData({
      title: '',
      issuer: 'Modules Taken / Certified',
      year: new Date().getFullYear().toString(),
      topicsInput: 'PostgreSQL, Database Optimization, Indexing, Schema Design',
      icon: 'Database'
    });
    setModalOpen(true);
  };

  const handleOpenEdit = (item) => {
    setEditingItem(item);
    setFormData({
      title: item.title,
      issuer: item.issuer || '',
      year: item.year || '',
      topicsInput: (item.topics || []).join(', '),
      icon: item.icon || 'Award'
    });
    setModalOpen(true);
  };

  const handleDelete = (item) => {
    if (window.confirm(`Hapus sertifikasi "${item.title}"?`)) {
      deleteCertification(item.id);
      showToast(`Sertifikasi "${item.title}" berhasil dihapus!`, 'info');
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.title.trim()) return;

    const topicsArray = formData.topicsInput
      .split(',')
      .map(t => t.trim())
      .filter(Boolean);

    const payload = {
      title: formData.title,
      issuer: formData.issuer,
      year: formData.year,
      topics: topicsArray,
      icon: formData.icon
    };

    if (editingItem) {
      updateCertification(editingItem.id, payload);
      showToast(`Sertifikasi "${formData.title}" berhasil diperbarui!`, 'success');
    } else {
      addCertification(payload);
      showToast(`Sertifikasi baru "${formData.title}" berhasil ditambahkan!`, 'success');
    }
    setModalOpen(false);
  };

  return (
    <div className="space-y-8 animate-fadeIn">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-white/10">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-pink-500/10 border border-pink-500/30 text-pink-400 text-xs font-semibold uppercase tracking-wider mb-2">
            <Award className="w-3.5 h-3.5" />
            <span>Section 6</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-display font-black text-white tracking-tight">
            Sertifikasi & Kredensial
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Kelola sertifikat kompetensi profesional dan topik keahlian yang telah divalidasi.
          </p>
        </div>

        <button
          onClick={handleOpenAdd}
          className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-brand-purple to-brand-indigo hover:opacity-95 text-xs font-bold text-white shadow-lg shadow-purple-600/30 flex items-center justify-center gap-2 transition-all shrink-0 cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          <span>Tambah Sertifikasi</span>
        </button>
      </div>

      {/* Certifications Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {certifications.map((item) => {
          const IconComponent = ICON_MAP[item.icon] || Award;
          return (
            <div
              key={item.id}
              className="p-6 rounded-3xl bg-dark-900/70 border border-white/10 hover:border-white/20 transition-all flex flex-col justify-between group"
            >
              <div>
                <div className="flex items-start justify-between gap-3 mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-2xl bg-white/[0.05] border border-white/10 flex items-center justify-center text-pink-400 group-hover:scale-105 transition-transform">
                      <IconComponent className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="text-base font-bold text-white group-hover:text-brand-violet transition-colors">
                        {item.title}
                      </h3>
                      <p className="text-xs text-slate-400">
                        {item.issuer}
                      </p>
                    </div>
                  </div>

                  <span className="px-2.5 py-1 rounded-full bg-white/[0.04] border border-white/10 text-xs font-bold text-slate-300">
                    {item.year}
                  </span>
                </div>

                {/* Topics */}
                <div className="flex flex-wrap gap-1.5 mb-2">
                  {(item.topics || []).map((top, idx) => (
                    <span
                      key={idx}
                      className="px-2.5 py-1 rounded-lg bg-white/[0.04] text-[11px] text-slate-300 font-medium"
                    >
                      {top}
                    </span>
                  ))}
                </div>
              </div>

              {/* Actions */}
              <div className="flex items-center justify-end gap-2 mt-4 pt-4 border-t border-white/[0.06]">
                <button
                  onClick={() => handleOpenEdit(item)}
                  className="px-3 py-1.5 rounded-lg bg-white/[0.04] hover:bg-white/[0.1] text-xs font-semibold text-slate-200 flex items-center gap-1.5 transition-colors"
                >
                  <Edit3 className="w-3.5 h-3.5" />
                  <span>Edit</span>
                </button>
                <button
                  onClick={() => handleDelete(item)}
                  className="px-3 py-1.5 rounded-lg bg-rose-500/10 hover:bg-rose-500/20 text-xs font-semibold text-rose-300 flex items-center gap-1.5 transition-colors"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  <span>Hapus</span>
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fadeIn">
          <div className="w-full max-w-lg rounded-3xl bg-dark-900 border border-white/15 p-6 sm:p-7 shadow-2xl relative">
            
            <button
              onClick={() => setModalOpen(false)}
              className="absolute top-5 right-5 p-1.5 rounded-full bg-white/[0.05] hover:bg-white/10 text-slate-400 hover:text-white transition-colors"
            >
              <X className="w-4 h-4" />
            </button>

            <h2 className="text-lg font-bold text-white mb-1">
              {editingItem ? 'Edit Sertifikasi' : 'Tambah Sertifikasi Baru'}
            </h2>
            <p className="text-xs text-slate-400 mb-5">
              Isi data sertifikat, lembaga penerbit, tahun, dan topik materi.
            </p>

            <form onSubmit={handleSubmit} className="space-y-4">
              
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Nama Sertifikasi / Course
                </label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  required
                  placeholder="SQL Masterclass: From Absolute Beginner to Developer"
                  className="w-full px-3.5 py-2 rounded-xl bg-dark-800 border border-white/10 text-white text-sm focus:border-brand-purple focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Penerbit / Platform
                  </label>
                  <input
                    type="text"
                    value={formData.issuer}
                    onChange={(e) => setFormData({ ...formData, issuer: e.target.value })}
                    placeholder="Modules Taken / Certified"
                    className="w-full px-3.5 py-2 rounded-xl bg-dark-800 border border-white/10 text-white text-sm focus:border-brand-purple focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Tahun Sertifikasi
                  </label>
                  <input
                    type="text"
                    value={formData.year}
                    onChange={(e) => setFormData({ ...formData, year: e.target.value })}
                    placeholder="2025"
                    className="w-full px-3.5 py-2 rounded-xl bg-dark-800 border border-white/10 text-white text-sm focus:border-brand-purple focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Topik Materi (Pisahkan dengan koma)
                </label>
                <input
                  type="text"
                  value={formData.topicsInput}
                  onChange={(e) => setFormData({ ...formData, topicsInput: e.target.value })}
                  placeholder="Complex Joins, Stored Procedures, PostgreSQL, Indexing"
                  className="w-full px-3.5 py-2 rounded-xl bg-dark-800 border border-white/10 text-white text-sm focus:border-brand-purple focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Ikon Sertifikasi
                </label>
                <div className="grid grid-cols-5 gap-2">
                  {Object.keys(ICON_MAP).map(iconKey => {
                    const Icon = ICON_MAP[iconKey];
                    const isSelected = formData.icon === iconKey;
                    return (
                      <button
                        type="button"
                        key={iconKey}
                        onClick={() => setFormData({ ...formData, icon: iconKey })}
                        className={`p-2.5 rounded-xl border flex flex-col items-center justify-center gap-1 transition-all ${
                          isSelected 
                            ? 'bg-pink-500/20 border-pink-500 text-pink-300' 
                            : 'bg-dark-800 border-white/10 text-slate-400 hover:text-white'
                        }`}
                      >
                        <Icon className="w-4 h-4" />
                        <span className="text-[9px] truncate max-w-full">{iconKey}</span>
                      </button>
                    );
                  })}
                </div>
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
