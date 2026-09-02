import React, { useState } from 'react';
import { 
  Plus, 
  Trash2, 
  Edit3, 
  HeartHandshake, 
  Sparkles, 
  MapPin, 
  Calendar, 
  X,
  ListPlus
} from 'lucide-react';
import { usePortfolio } from '../../../context/PortfolioContext';

export default function VolunteeringEditor({ showToast }) {
  const { volunteering, addVolunteering, updateVolunteering, deleteVolunteering } = usePortfolio();

  const [modalOpen, setModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [formData, setFormData] = useState({
    role: '',
    organization: '',
    location: '',
    period: '',
    description: '',
    contributions: ['']
  });

  const handleOpenAdd = () => {
    setEditingItem(null);
    setFormData({
      role: '',
      organization: '',
      location: 'Tangerang Selatan, Indonesia',
      period: '2026',
      description: '',
      contributions: ['']
    });
    setModalOpen(true);
  };

  const handleOpenEdit = (item) => {
    setEditingItem(item);
    setFormData({
      role: item.role,
      organization: item.organization,
      location: item.location || '',
      period: item.period || '',
      description: item.description || '',
      contributions: (item.contributions && item.contributions.length > 0) ? [...item.contributions] : ['']
    });
    setModalOpen(true);
  };

  const handleDelete = (item) => {
    if (window.confirm(`Hapus kegiatan sukarelawan "${item.role} di ${item.organization}"?`)) {
      deleteVolunteering(item.id);
      showToast(`Kegiatan di ${item.organization} berhasil dihapus!`, 'info');
    }
  };

  const handleContributionChange = (index, val) => {
    const next = [...formData.contributions];
    next[index] = val;
    setFormData({ ...formData, contributions: next });
  };

  const handleAddContributionLine = () => {
    setFormData({ ...formData, contributions: [...formData.contributions, ''] });
  };

  const handleRemoveContributionLine = (index) => {
    const next = formData.contributions.filter((_, i) => i !== index);
    setFormData({ ...formData, contributions: next.length > 0 ? next : [''] });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.role.trim() || !formData.organization.trim()) return;

    const filteredContributions = formData.contributions
      .map(c => c.trim())
      .filter(Boolean);

    const payload = {
      role: formData.role,
      organization: formData.organization,
      location: formData.location,
      period: formData.period,
      description: formData.description,
      contributions: filteredContributions
    };

    if (editingItem) {
      updateVolunteering(editingItem.id, payload);
      showToast(`Kegiatan di ${formData.organization} berhasil diperbarui!`, 'success');
    } else {
      addVolunteering(payload);
      showToast(`Kegiatan baru di ${formData.organization} berhasil ditambahkan!`, 'success');
    }
    setModalOpen(false);
  };

  return (
    <div className="space-y-8 animate-fadeIn">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-white/10">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-500/10 border border-rose-500/30 text-rose-400 text-xs font-semibold uppercase tracking-wider mb-2">
            <HeartHandshake className="w-3.5 h-3.5" />
            <span>Section 7</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-display font-black text-white tracking-tight">
            Kegiatan Organisasi & Komunitas
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Kelola aktivitas kerelawanan (volunteering), kepanitiaan, dan pengabdian masyarakat.
          </p>
        </div>

        <button
          onClick={handleOpenAdd}
          className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-brand-purple to-brand-indigo hover:opacity-95 text-xs font-bold text-white shadow-lg shadow-purple-600/30 flex items-center justify-center gap-2 transition-all shrink-0 cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          <span>Tambah Kegiatan</span>
        </button>
      </div>

      {/* Volunteering List */}
      <div className="space-y-6">
        {volunteering.map((item) => (
          <div
            key={item.id}
            className="p-6 sm:p-7 rounded-3xl bg-dark-900/70 border border-white/10 hover:border-white/20 transition-all group"
          >
            <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 mb-3">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-xs font-bold text-rose-400 uppercase tracking-wide">
                    {item.organization}
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

            {item.description && (
              <p className="text-xs text-slate-400 leading-relaxed mb-4">
                {item.description}
              </p>
            )}

            {/* Contributions List */}
            {item.contributions && item.contributions.length > 0 && (
              <div className="space-y-1.5 pt-3 border-t border-white/[0.06]">
                {item.contributions.map((cnt, idx) => (
                  <div key={idx} className="flex items-start gap-2 text-xs text-slate-300">
                    <span className="text-rose-400 shrink-0 mt-0.5">&bull;</span>
                    <span>{cnt}</span>
                  </div>
                ))}
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
              {editingItem ? 'Edit Kegiatan Komunitas' : 'Tambah Kegiatan Komunitas'}
            </h2>
            <p className="text-xs text-slate-400 mb-5">
              Isi data peran, organisasi/kegiatan, periode, dan kontribusi nyata Anda.
            </p>

            <form onSubmit={handleSubmit} className="space-y-4">
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Peran / Posisi
                  </label>
                  <input
                    type="text"
                    value={formData.role}
                    onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                    required
                    placeholder="Volunteer & Event Coordinator"
                    className="w-full px-3.5 py-2 rounded-xl bg-dark-800 border border-white/10 text-white text-sm focus:border-brand-purple focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Nama Organisasi / Acara
                  </label>
                  <input
                    type="text"
                    value={formData.organization}
                    onChange={(e) => setFormData({ ...formData, organization: e.target.value })}
                    required
                    placeholder="BLiTS (BINUS Untuk Literasi)"
                    className="w-full px-3.5 py-2 rounded-xl bg-dark-800 border border-white/10 text-white text-sm focus:border-brand-purple focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Periode Waktu
                  </label>
                  <input
                    type="text"
                    value={formData.period}
                    onChange={(e) => setFormData({ ...formData, period: e.target.value })}
                    placeholder="Jun 2026"
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
                    placeholder="Tangerang Selatan, Indonesia"
                    className="w-full px-3.5 py-2 rounded-xl bg-dark-800 border border-white/10 text-white text-sm focus:border-brand-purple focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Deskripsi Singkat Program
                </label>
                <textarea
                  rows={2}
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Program jangkauan komunitas mahasiswa untuk memfasilitasi donasi literasi..."
                  className="w-full px-3.5 py-2 rounded-xl bg-dark-800 border border-white/10 text-white text-sm focus:border-brand-purple focus:outline-none"
                ></textarea>
              </div>

              {/* Contributions Dynamic List */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="block text-xs font-semibold text-slate-300">
                    Poin Kontribusi
                  </label>
                  <button
                    type="button"
                    onClick={handleAddContributionLine}
                    className="text-xs font-semibold text-brand-cyan hover:underline flex items-center gap-1"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Tambah Poin</span>
                  </button>
                </div>
                <div className="space-y-2">
                  {formData.contributions.map((cnt, idx) => (
                    <div key={idx} className="flex items-center gap-2">
                      <span className="text-xs text-slate-500 font-mono w-4">{idx + 1}.</span>
                      <input
                        type="text"
                        value={cnt}
                        onChange={(e) => handleContributionChange(idx, e.target.value)}
                        placeholder={`Kontribusi ${idx + 1}...`}
                        className="flex-1 px-3 py-1.5 rounded-lg bg-dark-800 border border-white/10 text-white text-xs focus:border-brand-purple focus:outline-none"
                      />
                      {formData.contributions.length > 1 && (
                        <button
                          type="button"
                          onClick={() => handleRemoveContributionLine(idx)}
                          className="p-1.5 text-slate-400 hover:text-rose-400"
                        >
                          <X className="w-3.5 h-3.5" />
                        </button>
                      )}
                    </div>
                  ))}
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
