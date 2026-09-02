import React, { useState } from 'react';
import { 
  Plus, 
  Trash2, 
  Edit3, 
  FolderGit2, 
  Sparkles, 
  ExternalLink, 
  Github, 
  Image as ImageIcon, 
  Search, 
  Star, 
  X,
  Eye,
  CheckCircle2,
  Calendar,
  Building2
} from 'lucide-react';
import { usePortfolio } from '../../../context/PortfolioContext';

const CATEGORY_OPTIONS = [
  { label: 'Web Application', key: 'web', category: 'Web App' },
  { label: 'Mobile Application', key: 'mobile', category: 'Mobile App' },
  { label: 'Data & Tools', key: 'data', category: 'Data & Tools' },
  { label: 'Other / Custom', key: 'other', category: 'Other' },
];

const PRESET_IMAGES = [
  { label: 'PLN Grid', url: '/assets/project-network.jpg' },
  { label: 'Antreless Food', url: '/assets/project-antreless.jpg' },
  { label: 'OCR Scanner', url: '/assets/project-ocr.jpg' },
  { label: 'SQL Analytics', url: '/assets/project-analytics.jpg' },
  { label: 'Dark Portfolio', url: '/assets/project-portfolio.png' },
];

export default function ProjectsEditor({ showToast }) {
  const { projects, addProject, updateProject, deleteProject } = usePortfolio();

  const [activeFilter, setActiveFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  // Modal State
  const [modalOpen, setModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    category: 'Web App',
    categoryKey: 'web',
    image: '/assets/project-network.jpg',
    client: '',
    period: '2026',
    featured: true,
    shortDescription: '',
    fullDescription: '',
    features: [''],
    techInput: 'Vue.js, JavaScript, Tailwind CSS, PostgreSQL, REST APIs',
    demoUrl: 'https://',
    githubUrl: 'https://github.com/'
  });

  const filteredProjects = projects.filter(p => {
    const matchCat = activeFilter === 'all' || p.categoryKey === activeFilter;
    const matchSearch = p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                        (p.shortDescription || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
                        (p.client || '').toLowerCase().includes(searchQuery.toLowerCase());
    return matchCat && matchSearch;
  });

  const handleOpenAdd = () => {
    setEditingItem(null);
    setFormData({
      title: '',
      category: 'Web App',
      categoryKey: 'web',
      image: '/assets/project-network.jpg',
      client: 'PT PLN Icon Plus / Personal',
      period: '2026',
      featured: true,
      shortDescription: '',
      fullDescription: '',
      features: ['Fitur utama 1', 'Fitur utama 2', 'Fitur utama 3'],
      techInput: 'React.js, Tailwind CSS, Vite, REST APIs',
      demoUrl: 'https://',
      githubUrl: 'https://github.com/'
    });
    setModalOpen(true);
  };

  const handleOpenEdit = (item) => {
    setEditingItem(item);
    setFormData({
      title: item.title,
      category: item.category || 'Web App',
      categoryKey: item.categoryKey || 'web',
      image: item.image || '/assets/project-network.jpg',
      client: item.client || '',
      period: item.period || '',
      featured: !!item.featured,
      shortDescription: item.shortDescription || '',
      fullDescription: item.fullDescription || '',
      features: (item.features && item.features.length > 0) ? [...item.features] : [''],
      techInput: (item.tech || []).join(', '),
      demoUrl: item.demoUrl || '',
      githubUrl: item.githubUrl || ''
    });
    setModalOpen(true);
  };

  const handleDelete = (item) => {
    if (window.confirm(`Apakah Anda yakin ingin menghapus proyek "${item.title}"?`)) {
      deleteProject(item.id);
      showToast(`Proyek "${item.title}" berhasil dihapus!`, 'info');
    }
  };

  const handleFeatureChange = (index, val) => {
    const next = [...formData.features];
    next[index] = val;
    setFormData({ ...formData, features: next });
  };

  const handleAddFeatureLine = () => {
    setFormData({ ...formData, features: [...formData.features, ''] });
  };

  const handleRemoveFeatureLine = (index) => {
    const next = formData.features.filter((_, i) => i !== index);
    setFormData({ ...formData, features: next.length > 0 ? next : [''] });
  };

  const handleCategorySelect = (opt) => {
    setFormData({
      ...formData,
      category: opt.category,
      categoryKey: opt.key
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.title.trim()) return;

    const techArray = formData.techInput
      .split(',')
      .map(t => t.trim())
      .filter(Boolean);

    const filteredFeatures = formData.features
      .map(f => f.trim())
      .filter(Boolean);

    const payload = {
      title: formData.title,
      category: formData.category,
      categoryKey: formData.categoryKey,
      image: formData.image,
      client: formData.client,
      period: formData.period,
      featured: formData.featured,
      shortDescription: formData.shortDescription,
      fullDescription: formData.fullDescription,
      features: filteredFeatures,
      tech: techArray,
      demoUrl: formData.demoUrl,
      githubUrl: formData.githubUrl
    };

    if (editingItem) {
      updateProject(editingItem.id, payload);
      showToast(`Proyek "${formData.title}" berhasil diperbarui!`, 'success');
    } else {
      addProject(payload);
      showToast(`Proyek baru "${formData.title}" berhasil ditambahkan!`, 'success');
    }
    setModalOpen(false);
  };

  return (
    <div className="space-y-8 animate-fadeIn">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-white/10">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-purple/10 border border-brand-purple/30 text-brand-violet text-xs font-semibold uppercase tracking-wider mb-2">
            <FolderGit2 className="w-3.5 h-3.5" />
            <span>Section 8</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-display font-black text-white tracking-tight">
            Katalog Proyek Portofolio
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Tambah, ubah data deskripsi, link live demo, repositori GitHub, tangkapan layar, dan status featured.
          </p>
        </div>

        <button
          onClick={handleOpenAdd}
          className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-brand-purple to-brand-indigo hover:opacity-95 text-xs font-bold text-white shadow-lg shadow-purple-600/30 flex items-center justify-center gap-2 transition-all shrink-0 cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          <span>Tambah Proyek Baru</span>
        </button>
      </div>

      {/* Filter & Search Toolbar */}
      <div className="flex flex-col sm:flex-row gap-4 justify-between items-stretch sm:items-center">
        
        {/* Search */}
        <div className="relative flex-1 max-w-sm">
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Cari judul proyek atau klien..."
            className="w-full pl-10 pr-4 py-2 rounded-xl bg-dark-800/80 border border-white/10 text-white placeholder-slate-500 text-xs focus:outline-none focus:border-brand-purple"
          />
        </div>

        {/* Category Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0 text-xs">
          {[
            { key: 'all', label: 'Semua Proyek' },
            { key: 'web', label: 'Web Apps' },
            { key: 'mobile', label: 'Mobile Apps' },
            { key: 'data', label: 'Data & Tools' },
          ].map(cat => (
            <button
              key={cat.key}
              onClick={() => setActiveFilter(cat.key)}
              className={`px-3 py-1.5 rounded-lg font-medium whitespace-nowrap transition-all ${
                activeFilter === cat.key
                  ? 'bg-brand-purple text-white shadow-md shadow-purple-600/20'
                  : 'bg-white/[0.04] text-slate-400 hover:text-white hover:bg-white/[0.08]'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProjects.map((item) => (
          <div
            key={item.id}
            className="rounded-3xl bg-dark-900/70 border border-white/10 hover:border-white/20 transition-all overflow-hidden flex flex-col justify-between group shadow-lg"
          >
            <div>
              {/* Thumbnail Header */}
              <div className="h-44 relative bg-dark-950 overflow-hidden">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  onError={(e) => {
                    e.target.src = '/assets/project-network.jpg';
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-dark-900 via-transparent to-black/40"></div>

                {/* Badges on top of image */}
                <div className="absolute top-3 left-3 right-3 flex items-center justify-between">
                  <span className="px-2.5 py-1 rounded-full bg-dark-950/80 backdrop-blur-md border border-white/10 text-[10px] font-bold text-brand-cyan">
                    {item.category}
                  </span>
                  {item.featured && (
                    <span className="px-2.5 py-1 rounded-full bg-amber-500/20 backdrop-blur-md border border-amber-500/40 text-[10px] font-bold text-amber-300 flex items-center gap-1">
                      <Star className="w-3 h-3 fill-amber-300" />
                      <span>Featured</span>
                    </span>
                  )}
                </div>

                <div className="absolute bottom-2 left-3 right-3 flex items-center justify-between text-[11px] text-slate-300">
                  <span>{item.client}</span>
                  <span className="font-mono text-slate-400">{item.period}</span>
                </div>
              </div>

              {/* Content Body */}
              <div className="p-5">
                <h3 className="text-base font-bold text-white group-hover:text-brand-violet transition-colors mb-2">
                  {item.title}
                </h3>
                <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed mb-4">
                  {item.shortDescription || item.fullDescription}
                </p>

                {/* Tech Tags */}
                <div className="flex flex-wrap gap-1 mb-2">
                  {(item.tech || []).slice(0, 4).map((t, idx) => (
                    <span
                      key={idx}
                      className="px-2 py-0.5 rounded-md bg-white/[0.04] text-[10px] text-slate-300 font-mono"
                    >
                      {t}
                    </span>
                  ))}
                  {(item.tech || []).length > 4 && (
                    <span className="px-2 py-0.5 rounded-md bg-white/[0.02] text-[10px] text-slate-500">
                      +{(item.tech || []).length - 4} more
                    </span>
                  )}
                </div>
              </div>
            </div>

            {/* Bottom Actions Bar */}
            <div className="p-4 bg-dark-950/50 border-t border-white/[0.06] flex items-center justify-between">
              <div className="flex items-center gap-2">
                {item.demoUrl && item.demoUrl !== '#' && (
                  <a
                    href={item.demoUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="p-1.5 rounded-lg bg-white/[0.04] hover:bg-white/10 text-slate-300 hover:text-brand-cyan transition-colors"
                    title="Live Demo"
                  >
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                )}
                {item.githubUrl && item.githubUrl !== '#' && (
                  <a
                    href={item.githubUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="p-1.5 rounded-lg bg-white/[0.04] hover:bg-white/10 text-slate-300 hover:text-white transition-colors"
                    title="GitHub Repository"
                  >
                    <Github className="w-3.5 h-3.5" />
                  </a>
                )}
              </div>

              <div className="flex items-center gap-1.5">
                <button
                  onClick={() => handleOpenEdit(item)}
                  className="px-3 py-1.5 rounded-lg bg-white/[0.04] hover:bg-white/[0.1] text-xs font-semibold text-slate-200 flex items-center gap-1 transition-colors"
                >
                  <Edit3 className="w-3.5 h-3.5" />
                  <span>Edit</span>
                </button>
                <button
                  onClick={() => handleDelete(item)}
                  className="p-1.5 rounded-lg bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 hover:text-rose-300 transition-colors"
                  title="Hapus"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

          </div>
        ))}
      </div>

      {filteredProjects.length === 0 && (
        <div className="text-center py-16 p-6 rounded-3xl bg-dark-900/40 border border-dashed border-white/10">
          <FolderGit2 className="w-10 h-10 text-slate-600 mx-auto mb-2" />
          <p className="text-sm text-slate-400">Tidak ada proyek yang sesuai dengan filter.</p>
        </div>
      )}

      {/* Add / Edit Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fadeIn">
          <div className="w-full max-w-2xl rounded-3xl bg-dark-900 border border-white/15 p-6 sm:p-8 shadow-2xl relative max-h-[90vh] overflow-y-auto">
            
            <button
              onClick={() => setModalOpen(false)}
              className="absolute top-5 right-5 p-1.5 rounded-full bg-white/[0.05] hover:bg-white/10 text-slate-400 hover:text-white transition-colors"
            >
              <X className="w-4 h-4" />
            </button>

            <h2 className="text-xl font-bold text-white mb-1">
              {editingItem ? 'Edit Proyek Portofolio' : 'Tambah Proyek Baru'}
            </h2>
            <p className="text-xs text-slate-400 mb-6">
              Lengkapi informasi detail portofolio karya Anda.
            </p>

            <form onSubmit={handleSubmit} className="space-y-4">
              
              {/* Title & Client */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Judul Proyek
                  </label>
                  <input
                    type="text"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    required
                    placeholder="Contoh: PLN Network Model Management"
                    className="w-full px-3.5 py-2 rounded-xl bg-dark-800 border border-white/10 text-white text-sm focus:border-brand-purple focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Klien / Proyek Organisasi
                  </label>
                  <input
                    type="text"
                    value={formData.client}
                    onChange={(e) => setFormData({ ...formData, client: e.target.value })}
                    placeholder="Contoh: PT PLN Icon Plus"
                    className="w-full px-3.5 py-2 rounded-xl bg-dark-800 border border-white/10 text-white text-sm focus:border-brand-purple focus:outline-none"
                  />
                </div>
              </div>

              {/* Category, Period & Featured */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 items-end">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Kategori Proyek
                  </label>
                  <select
                    value={formData.categoryKey}
                    onChange={(e) => {
                      const opt = CATEGORY_OPTIONS.find(o => o.key === e.target.value) || CATEGORY_OPTIONS[0];
                      handleCategorySelect(opt);
                    }}
                    className="w-full px-3.5 py-2 rounded-xl bg-dark-800 border border-white/10 text-white text-sm focus:border-brand-purple focus:outline-none cursor-pointer"
                  >
                    {CATEGORY_OPTIONS.map(opt => (
                      <option key={opt.key} value={opt.key}>{opt.label}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Tahun / Periode
                  </label>
                  <input
                    type="text"
                    value={formData.period}
                    onChange={(e) => setFormData({ ...formData, period: e.target.value })}
                    placeholder="2025 - 2026"
                    className="w-full px-3.5 py-2 rounded-xl bg-dark-800 border border-white/10 text-white text-sm focus:border-brand-purple focus:outline-none"
                  />
                </div>

                <div className="pb-2">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.featured}
                      onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
                      className="w-4 h-4 rounded bg-dark-800 border-white/20 text-brand-purple focus:ring-0 cursor-pointer"
                    />
                    <span className="text-xs font-semibold text-slate-200">Tampilkan Featured Star</span>
                  </label>
                </div>
              </div>

              {/* Image URL & Presets */}
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  URL Gambar Proyek
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={formData.image}
                    onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                    placeholder="/assets/project-network.jpg atau https://..."
                    className="flex-1 px-3.5 py-2 rounded-xl bg-dark-800 border border-white/10 text-white text-sm focus:border-brand-purple focus:outline-none"
                  />
                </div>

                {/* Preset image quick buttons */}
                <div className="flex items-center gap-2 mt-2 overflow-x-auto pb-1 text-[11px]">
                  <span className="text-slate-500">Pilihan Cepat:</span>
                  {PRESET_IMAGES.map((img, idx) => (
                    <button
                      type="button"
                      key={idx}
                      onClick={() => setFormData({ ...formData, image: img.url })}
                      className="px-2 py-0.5 rounded bg-white/[0.04] hover:bg-white/[0.1] text-slate-300 hover:text-white transition-colors whitespace-nowrap"
                    >
                      {img.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Short & Full Description */}
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Deskripsi Singkat (Ringkasan Kartu)
                </label>
                <input
                  type="text"
                  value={formData.shortDescription}
                  onChange={(e) => setFormData({ ...formData, shortDescription: e.target.value })}
                  placeholder="Ringkasan 1-2 kalimat untuk kartu portofolio..."
                  className="w-full px-3.5 py-2 rounded-xl bg-dark-800 border border-white/10 text-white text-sm focus:border-brand-purple focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Deskripsi Lengkap (Untuk Modal Detail Proyek)
                </label>
                <textarea
                  rows={3}
                  value={formData.fullDescription}
                  onChange={(e) => setFormData({ ...formData, fullDescription: e.target.value })}
                  placeholder="Penjelasan arsitektur, tantangan, dan solusi komprehensif..."
                  className="w-full px-3.5 py-2 rounded-xl bg-dark-800 border border-white/10 text-white text-sm focus:border-brand-purple focus:outline-none leading-relaxed"
                ></textarea>
              </div>

              {/* Features List */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="block text-xs font-semibold text-slate-300">
                    Daftar Fitur Unggulan Proyek
                  </label>
                  <button
                    type="button"
                    onClick={handleAddFeatureLine}
                    className="text-xs font-semibold text-brand-cyan hover:underline flex items-center gap-1"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Tambah Fitur</span>
                  </button>
                </div>
                <div className="space-y-2">
                  {formData.features.map((feat, idx) => (
                    <div key={idx} className="flex items-center gap-2">
                      <span className="text-xs text-slate-500 font-mono w-4">{idx + 1}.</span>
                      <input
                        type="text"
                        value={feat}
                        onChange={(e) => handleFeatureChange(idx, e.target.value)}
                        placeholder={`Fitur unggulan ${idx + 1}...`}
                        className="flex-1 px-3 py-1.5 rounded-lg bg-dark-800 border border-white/10 text-white text-xs focus:border-brand-purple focus:outline-none"
                      />
                      {formData.features.length > 1 && (
                        <button
                          type="button"
                          onClick={() => handleRemoveFeatureLine(idx)}
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
                  Tech Stack (Pisahkan dengan koma)
                </label>
                <input
                  type="text"
                  value={formData.techInput}
                  onChange={(e) => setFormData({ ...formData, techInput: e.target.value })}
                  placeholder="Vue.js, JavaScript, Tailwind CSS, PostgreSQL, REST APIs"
                  className="w-full px-3.5 py-2 rounded-xl bg-dark-800 border border-white/10 text-white text-sm focus:border-brand-purple focus:outline-none"
                />
              </div>

              {/* Links */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    URL Live Demo / Website
                  </label>
                  <input
                    type="text"
                    value={formData.demoUrl}
                    onChange={(e) => setFormData({ ...formData, demoUrl: e.target.value })}
                    placeholder="https://..."
                    className="w-full px-3.5 py-2 rounded-xl bg-dark-800 border border-white/10 text-white text-sm focus:border-brand-purple focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    URL Repositori GitHub
                  </label>
                  <input
                    type="text"
                    value={formData.githubUrl}
                    onChange={(e) => setFormData({ ...formData, githubUrl: e.target.value })}
                    placeholder="https://github.com/..."
                    className="w-full px-3.5 py-2 rounded-xl bg-dark-800 border border-white/10 text-white text-sm focus:border-brand-purple focus:outline-none"
                  />
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
                  {editingItem ? 'Simpan Perubahan' : 'Tambahkan Proyek'}
                </button>
              </div>

            </form>

          </div>
        </div>
      )}

    </div>
  );
}
