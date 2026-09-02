import React, { useState } from 'react';
import { 
  Plus, 
  Trash2, 
  Edit3, 
  Layout, 
  Sparkles, 
  Check, 
  X, 
  Smartphone, 
  Database, 
  Cpu, 
  Code2, 
  Server, 
  Globe
} from 'lucide-react';
import { usePortfolio } from '../../../context/PortfolioContext';

const ICON_MAP = {
  Layout,
  Smartphone,
  Database,
  Cpu,
  Code2,
  Server,
  Globe,
  Sparkles
};

export default function ServicesEditor({ showToast }) {
  const { services, addService, updateService, deleteService } = usePortfolio();

  // Modal State
  const [modalOpen, setModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    subtitle: '',
    description: '',
    icon: 'Layout',
    skillsInput: '',
    projectCount: '5+ Projects'
  });

  const handleOpenAdd = () => {
    setEditingItem(null);
    setFormData({
      title: '',
      subtitle: '',
      description: '',
      icon: 'Layout',
      skillsInput: 'Vue.js, React, Tailwind CSS',
      projectCount: '5+ Projects'
    });
    setModalOpen(true);
  };

  const handleOpenEdit = (item) => {
    setEditingItem(item);
    setFormData({
      title: item.title,
      subtitle: item.subtitle || '',
      description: item.description || '',
      icon: item.icon || 'Layout',
      skillsInput: (item.skills || []).join(', '),
      projectCount: item.projectCount || ''
    });
    setModalOpen(true);
  };

  const handleDelete = (item) => {
    if (window.confirm(`Hapus layanan "${item.title}"?`)) {
      deleteService(item.id);
      showToast(`Layanan "${item.title}" berhasil dihapus!`, 'info');
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.title.trim()) return;

    const skillsArray = formData.skillsInput
      .split(',')
      .map(s => s.trim())
      .filter(Boolean);

    const payload = {
      title: formData.title,
      subtitle: formData.subtitle,
      description: formData.description,
      icon: formData.icon,
      skills: skillsArray,
      projectCount: formData.projectCount
    };

    if (editingItem) {
      updateService(editingItem.id, payload);
      showToast(`Layanan "${formData.title}" berhasil diperbarui!`, 'success');
    } else {
      addService(payload);
      showToast(`Layanan "${formData.title}" berhasil ditambahkan!`, 'success');
    }
    setModalOpen(false);
  };

  return (
    <div className="space-y-8 animate-fadeIn">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-white/10">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-indigo/10 border border-brand-indigo/30 text-brand-indigo text-xs font-semibold uppercase tracking-wider mb-2">
            <Layout className="w-3.5 h-3.5" />
            <span>Section 3</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-display font-black text-white tracking-tight">
            Layanan & Keahlian Solusi
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Kelola penawaran layanan yang Anda sediakan untuk klien atau perusahaan.
          </p>
        </div>

        <button
          onClick={handleOpenAdd}
          className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-brand-purple to-brand-indigo hover:opacity-95 text-xs font-bold text-white shadow-lg shadow-purple-600/30 flex items-center justify-center gap-2 transition-all shrink-0 cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          <span>Tambah Layanan Baru</span>
        </button>
      </div>

      {/* Services Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {services.map((item) => {
          const IconComponent = ICON_MAP[item.icon] || Layout;
          return (
            <div
              key={item.id}
              className="p-6 rounded-3xl bg-dark-900/70 border border-white/10 hover:border-white/20 transition-all flex flex-col justify-between group"
            >
              <div>
                <div className="flex items-start justify-between gap-4 mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-2xl bg-white/[0.05] border border-white/10 flex items-center justify-center text-brand-violet group-hover:scale-105 transition-transform">
                      <IconComponent className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="text-base font-bold text-white group-hover:text-brand-violet transition-colors">
                        {item.title}
                      </h3>
                      <p className="text-xs text-brand-cyan font-medium">
                        {item.subtitle || item.projectCount}
                      </p>
                    </div>
                  </div>

                  <span className="text-[11px] font-bold px-2.5 py-1 rounded-full bg-white/[0.04] border border-white/10 text-slate-300">
                    {item.projectCount}
                  </span>
                </div>

                <p className="text-xs text-slate-400 leading-relaxed mb-4">
                  {item.description}
                </p>

                {/* Skills tags */}
                <div className="flex flex-wrap gap-1.5 mb-2">
                  {(item.skills || []).map((skill, idx) => (
                    <span
                      key={idx}
                      className="px-2 py-0.5 rounded-md bg-white/[0.04] text-[10px] text-slate-300 font-medium"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
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

      {/* Add / Edit Modal */}
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
              {editingItem ? 'Edit Layanan' : 'Tambah Layanan Baru'}
            </h2>
            <p className="text-xs text-slate-400 mb-5">
              Tentukan detail penawaran jasa pengembangan Anda.
            </p>

            <form onSubmit={handleSubmit} className="space-y-4">
              
              {/* Title */}
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Judul Layanan
                </label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  required
                  placeholder="Contoh: Front-End Web Development"
                  className="w-full px-3.5 py-2 rounded-xl bg-dark-800 border border-white/10 text-white text-sm focus:border-brand-purple focus:outline-none"
                />
              </div>

              {/* Subtitle & Project Count */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Sub Judul
                  </label>
                  <input
                    type="text"
                    value={formData.subtitle}
                    onChange={(e) => setFormData({ ...formData, subtitle: e.target.value })}
                    placeholder="Contoh: 8+ Projects Delivered"
                    className="w-full px-3.5 py-2 rounded-xl bg-dark-800 border border-white/10 text-white text-sm focus:border-brand-purple focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Label Jumlah Proyek
                  </label>
                  <input
                    type="text"
                    value={formData.projectCount}
                    onChange={(e) => setFormData({ ...formData, projectCount: e.target.value })}
                    placeholder="Contoh: 8+ Projects"
                    className="w-full px-3.5 py-2 rounded-xl bg-dark-800 border border-white/10 text-white text-sm focus:border-brand-purple focus:outline-none"
                  />
                </div>
              </div>

              {/* Description */}
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Deskripsi Lengkap
                </label>
                <textarea
                  rows={3}
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Jelaskan spesialisasi dan nilai tambah dari layanan ini..."
                  className="w-full px-3.5 py-2 rounded-xl bg-dark-800 border border-white/10 text-white text-sm focus:border-brand-purple focus:outline-none leading-relaxed"
                ></textarea>
              </div>

              {/* Skills Tags Input */}
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Skill Terkait (Pisahkan dengan koma)
                </label>
                <input
                  type="text"
                  value={formData.skillsInput}
                  onChange={(e) => setFormData({ ...formData, skillsInput: e.target.value })}
                  placeholder="Vue.js, React, Tailwind CSS, Vite"
                  className="w-full px-3.5 py-2 rounded-xl bg-dark-800 border border-white/10 text-white text-sm focus:border-brand-purple focus:outline-none"
                />
              </div>

              {/* Icon Selection */}
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Ikon Layanan
                </label>
                <div className="grid grid-cols-4 gap-2">
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
                            ? 'bg-brand-purple/20 border-brand-purple text-brand-cyan' 
                            : 'bg-dark-800 border-white/10 text-slate-400 hover:text-white'
                        }`}
                      >
                        <Icon className="w-4 h-4" />
                        <span className="text-[10px] truncate max-w-full">{iconKey}</span>
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
