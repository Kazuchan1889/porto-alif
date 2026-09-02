import React, { useState } from 'react';
import { 
  Plus, 
  Trash2, 
  Edit3, 
  Layers, 
  Sparkles, 
  Search, 
  Check, 
  X, 
  Code2, 
  Database, 
  Terminal, 
  Smartphone,
  Palette,
  FileCode2,
  Network,
  GitBranch,
  BarChart3,
  Atom
} from 'lucide-react';
import { usePortfolio } from '../../../context/PortfolioContext';

const ICON_MAP = {
  Code2,
  Atom,
  Palette,
  FileCode2,
  Terminal,
  Smartphone,
  Database,
  Network,
  GitBranch,
  BarChart3,
  Layers,
  Sparkles
};

const CATEGORIES = [
  'Frontend',
  'Styling',
  'Language',
  'Backend/Data',
  'Mobile',
  'Database',
  'Architecture',
  'Tools',
  'Analytics',
  'Other'
];

const LEVELS = ['Beginner', 'Intermediate', 'Advanced', 'Expert'];

export default function TechStackEditor({ showToast }) {
  const { techStack, addTechStack, updateTechStack, deleteTechStack } = usePortfolio();
  
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  
  // Modal state
  const [modalOpen, setModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState(null); // null means adding new
  const [formData, setFormData] = useState({
    name: '',
    category: 'Frontend',
    level: 'Advanced',
    icon: 'Code2'
  });

  const filteredTech = techStack.filter(item => {
    const matchCat = activeCategory === 'all' || item.category === activeCategory;
    const matchSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                        item.category.toLowerCase().includes(searchQuery.toLowerCase());
    return matchCat && matchSearch;
  });

  const handleOpenAdd = () => {
    setEditingItem(null);
    setFormData({
      name: '',
      category: 'Frontend',
      level: 'Advanced',
      icon: 'Code2'
    });
    setModalOpen(true);
  };

  const handleOpenEdit = (item) => {
    setEditingItem(item);
    setFormData({
      name: item.name,
      category: item.category || 'Frontend',
      level: item.level || 'Intermediate',
      icon: item.icon || 'Code2'
    });
    setModalOpen(true);
  };

  const handleDelete = (item) => {
    if (window.confirm(`Hapus skill "${item.name}" dari tech stack?`)) {
      deleteTechStack(item.id || item.name);
      showToast(`Skill "${item.name}" berhasil dihapus!`, 'info');
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name.trim()) return;

    if (editingItem) {
      updateTechStack(editingItem.id || editingItem.name, formData);
      showToast(`Skill "${formData.name}" berhasil diperbarui!`, 'success');
    } else {
      addTechStack(formData);
      showToast(`Skill "${formData.name}" berhasil ditambahkan!`, 'success');
    }
    setModalOpen(false);
  };

  return (
    <div className="space-y-8 animate-fadeIn">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-white/10">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-cyan/10 border border-brand-cyan/30 text-brand-cyan text-xs font-semibold uppercase tracking-wider mb-2">
            <Layers className="w-3.5 h-3.5" />
            <span>Section 2</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-display font-black text-white tracking-tight">
            Tech Stack & Keterampilan Teknis
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Kelola daftar teknologi, framework, database, dan level kemahiran yang tampil di portofolio.
          </p>
        </div>

        <button
          onClick={handleOpenAdd}
          className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-brand-purple to-brand-indigo hover:opacity-95 text-xs font-bold text-white shadow-lg shadow-purple-600/30 flex items-center justify-center gap-2 transition-all shrink-0 cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          <span>Tambah Skill Baru</span>
        </button>
      </div>

      {/* Filter & Search Toolbar */}
      <div className="flex flex-col sm:flex-row gap-4 justify-between items-stretch sm:items-center">
        
        {/* Search Input */}
        <div className="relative flex-1 max-w-sm">
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Cari teknologi atau kategori..."
            className="w-full pl-10 pr-4 py-2 rounded-xl bg-dark-800/80 border border-white/10 text-white placeholder-slate-500 text-xs focus:outline-none focus:border-brand-purple"
          />
        </div>

        {/* Category Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0 text-xs">
          {['all', 'Frontend', 'Backend/Data', 'Mobile', 'Database', 'Tools'].map(cat => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-3 py-1.5 rounded-lg font-medium whitespace-nowrap transition-all ${
                activeCategory === cat
                  ? 'bg-brand-purple text-white shadow-md shadow-purple-600/20'
                  : 'bg-white/[0.04] text-slate-400 hover:text-white hover:bg-white/[0.08]'
              }`}
            >
              {cat === 'all' ? 'Semua' : cat}
            </button>
          ))}
        </div>

      </div>

      {/* Skills Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {filteredTech.map((item, index) => {
          const IconComponent = ICON_MAP[item.icon] || Code2;
          return (
            <div
              key={item.id || item.name + index}
              className="p-4 rounded-2xl bg-dark-900/70 border border-white/10 hover:border-white/20 transition-all flex flex-col justify-between group"
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-white/[0.05] border border-white/10 flex items-center justify-center text-brand-cyan group-hover:scale-105 transition-transform">
                    <IconComponent className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-white group-hover:text-brand-violet transition-colors">
                      {item.name}
                    </h3>
                    <span className="text-[11px] text-slate-400 font-medium">
                      {item.category}
                    </span>
                  </div>
                </div>

                <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${
                  item.level === 'Advanced' || item.level === 'Expert'
                    ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30'
                    : 'bg-brand-cyan/10 text-brand-cyan border-brand-cyan/30'
                }`}>
                  {item.level}
                </span>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center justify-end gap-1.5 mt-4 pt-3 border-t border-white/[0.06]">
                <button
                  onClick={() => handleOpenEdit(item)}
                  className="p-1.5 rounded-lg bg-white/[0.04] hover:bg-white/[0.1] text-slate-300 hover:text-white transition-colors"
                  title="Edit Skill"
                >
                  <Edit3 className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => handleDelete(item)}
                  className="p-1.5 rounded-lg bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 hover:text-rose-300 transition-colors"
                  title="Hapus Skill"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {filteredTech.length === 0 && (
        <div className="text-center py-12 p-6 rounded-3xl bg-dark-900/40 border border-dashed border-white/10">
          <Layers className="w-8 h-8 text-slate-600 mx-auto mb-2" />
          <p className="text-sm text-slate-400">Tidak ada skill yang cocok dengan pencarian.</p>
        </div>
      )}

      {/* Add / Edit Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fadeIn">
          <div className="w-full max-w-md rounded-3xl bg-dark-900 border border-white/15 p-6 shadow-2xl relative">
            
            <button
              onClick={() => setModalOpen(false)}
              className="absolute top-5 right-5 p-1.5 rounded-full bg-white/[0.05] hover:bg-white/10 text-slate-400 hover:text-white transition-colors"
            >
              <X className="w-4 h-4" />
            </button>

            <h2 className="text-lg font-bold text-white mb-1">
              {editingItem ? 'Edit Tech Skill' : 'Tambah Tech Skill Baru'}
            </h2>
            <p className="text-xs text-slate-400 mb-5">
              Isi detail nama teknologi dan kategori kemahiran.
            </p>

            <form onSubmit={handleSubmit} className="space-y-4">
              
              {/* Skill Name */}
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Nama Teknologi / Skill
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                  placeholder="Contoh: Next.js, Docker, TypeScript"
                  className="w-full px-3.5 py-2 rounded-xl bg-dark-800 border border-white/10 text-white text-sm focus:border-brand-purple focus:outline-none"
                />
              </div>

              {/* Category */}
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Kategori
                </label>
                <select
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  className="w-full px-3.5 py-2 rounded-xl bg-dark-800 border border-white/10 text-white text-sm focus:border-brand-purple focus:outline-none cursor-pointer"
                >
                  {CATEGORIES.map(cat => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
              </div>

              {/* Level */}
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Tingkat Kemahiran (Level)
                </label>
                <select
                  value={formData.level}
                  onChange={(e) => setFormData({ ...formData, level: e.target.value })}
                  className="w-full px-3.5 py-2 rounded-xl bg-dark-800 border border-white/10 text-white text-sm focus:border-brand-purple focus:outline-none cursor-pointer"
                >
                  {LEVELS.map(lvl => (
                    <option key={lvl} value={lvl}>{lvl}</option>
                  ))}
                </select>
              </div>

              {/* Icon Selection */}
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Pilihan Ikon
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
