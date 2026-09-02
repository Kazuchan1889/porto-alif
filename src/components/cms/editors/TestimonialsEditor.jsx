import React, { useState, useEffect } from 'react';
import { 
  Save, 
  MessageSquare, 
  Star, 
  User, 
  Building2, 
  Sparkles, 
  Quote,
  CheckCircle2,
  Eye,
  EyeOff,
  ToggleLeft,
  ToggleRight
} from 'lucide-react';
import { usePortfolio } from '../../../context/PortfolioContext';
import FileUploadField from '../common/FileUploadField';

export default function TestimonialsEditor({ showToast }) {
  const { testimonial, updateTestimonial } = usePortfolio();

  const [formData, setFormData] = useState({
    quote: testimonial?.quote || '',
    author: testimonial?.author || '',
    role: testimonial?.role || '',
    company: testimonial?.company || '',
    avatar: testimonial?.avatar || '/assets/testimonial-avatar.jpg',
    rating: testimonial?.rating || 5,
    isActive: testimonial?.isActive !== undefined ? testimonial.isActive : true
  });

  useEffect(() => {
    if (testimonial) {
      setFormData({
        quote: testimonial.quote || '',
        author: testimonial.author || '',
        role: testimonial.role || '',
        company: testimonial.company || '',
        avatar: testimonial.avatar || '/assets/testimonial-avatar.jpg',
        rating: testimonial.rating || 5,
        isActive: testimonial.isActive !== undefined ? testimonial.isActive : true
      });
    }
  }, [testimonial]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'rating' ? parseInt(value, 10) : value
    }));
  };

  const handleToggleActive = () => {
    const newActive = !formData.isActive;
    setFormData(prev => ({ ...prev, isActive: newActive }));
    updateTestimonial({ ...formData, isActive: newActive });
    showToast(
      newActive 
        ? 'Bagian testimoni diaktifkan (muncul di halaman portofolio)!' 
        : 'Bagian testimoni dinonaktifkan (disembunyikan dari portofolio)!',
      newActive ? 'success' : 'info'
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    updateTestimonial(formData);
    showToast('Testimoni klien berhasil diperbarui!', 'success');
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8 animate-fadeIn">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-white/10">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-violet/10 border border-brand-violet/30 text-brand-violet text-xs font-semibold uppercase tracking-wider mb-2">
            <MessageSquare className="w-3.5 h-3.5" />
            <span>Section 9</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-display font-black text-white tracking-tight">
            Testimoni & Rekomendasi
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Ubah kutipan rekomendasi dari mentor teknologi atau sembunyikan bagian ini dari halaman utama.
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

      {/* Visibility / Active Status Toggle Card */}
      <div className={`p-5 sm:p-6 rounded-3xl border transition-all ${
        formData.isActive 
          ? 'bg-emerald-500/10 border-emerald-500/30 shadow-lg shadow-emerald-950/20' 
          : 'bg-dark-900/80 border-white/10'
      }`}>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-start sm:items-center gap-3.5">
            <div className={`w-10 h-10 rounded-2xl flex items-center justify-center shrink-0 ${
              formData.isActive 
                ? 'bg-emerald-500 text-white shadow-md shadow-emerald-500/30' 
                : 'bg-white/10 text-slate-400'
            }`}>
              {formData.isActive ? <Eye className="w-5 h-5" /> : <EyeOff className="w-5 h-5" />}
            </div>
            <div>
              <div className="flex items-center gap-2.5">
                <h3 className="text-sm sm:text-base font-bold text-white">
                  Status Tampilan di Halaman Utama
                </h3>
                <span className={`text-[11px] font-bold px-2.5 py-0.5 rounded-full ${
                  formData.isActive 
                    ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30' 
                    : 'bg-rose-500/10 text-rose-400 border border-rose-500/20'
                }`}>
                  {formData.isActive ? '🟢 Aktif (Muncul di Web)' : '⚪ Nonaktif (Disembunyikan)'}
                </span>
              </div>
              <p className="text-xs text-slate-400 mt-1">
                {formData.isActive 
                  ? 'Bagian ulasan testimoni klien saat ini aktif dan dapat dilihat oleh pengunjung di halaman depan portofolio.'
                  : 'Bagian testimoni saat ini disembunyikan dan tidak akan dirender di halaman utama portofolio.'}
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={handleToggleActive}
            className={`px-4 py-2.5 rounded-2xl text-xs font-bold transition-all flex items-center justify-center gap-2 cursor-pointer shrink-0 border ${
              formData.isActive
                ? 'bg-emerald-500 hover:bg-emerald-600 text-white border-emerald-400 shadow-md shadow-emerald-600/30'
                : 'bg-white/10 hover:bg-white/20 text-slate-200 border-white/15'
            }`}
          >
            {formData.isActive ? (
              <>
                <ToggleRight className="w-4 h-4" />
                <span>Klik untuk Nonaktifkan</span>
              </>
            ) : (
              <>
                <ToggleLeft className="w-4 h-4 text-slate-400" />
                <span>Klik untuk Aktifkan</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Main Card */}
      <div className="p-6 sm:p-8 rounded-3xl bg-dark-900/70 border border-white/10 space-y-6">
        <h2 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
          <Quote className="w-4 h-4 text-brand-cyan" />
          <span>Isi Kutipan & Rekomendasi Klien</span>
        </h2>

        {/* Quote Text */}
        <div>
          <label className="block text-xs font-semibold text-slate-300 mb-1.5">
            Kutipan Rekomendasi (Quote)
          </label>
          <textarea
            rows={4}
            name="quote"
            value={formData.quote}
            onChange={handleChange}
            required
            placeholder="Tuliskan ulasan atau testimoni positif..."
            className="w-full px-4 py-3 rounded-xl bg-dark-800/90 border border-white/10 text-white text-sm focus:border-brand-purple focus:outline-none leading-relaxed"
          ></textarea>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          
          {/* Author Name */}
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5">
              Nama Pemberi Rekomendasi
            </label>
            <input
              type="text"
              name="author"
              value={formData.author}
              onChange={handleChange}
              required
              placeholder="Lead Project Collaborator"
              className="w-full px-4 py-2.5 rounded-xl bg-dark-800/90 border border-white/10 text-white text-sm focus:border-brand-purple focus:outline-none"
            />
          </div>

          {/* Role */}
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5">
              Jabatan / Posisi
            </label>
            <input
              type="text"
              name="role"
              value={formData.role}
              onChange={handleChange}
              placeholder="Engineering Lead & Tech Mentor"
              className="w-full px-4 py-2.5 rounded-xl bg-dark-800/90 border border-white/10 text-white text-sm focus:border-brand-purple focus:outline-none"
            />
          </div>

          {/* Company */}
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5">
              Perusahaan / Organisasi
            </label>
            <input
              type="text"
              name="company"
              value={formData.company}
              onChange={handleChange}
              placeholder="Enterprise Software Division"
              className="w-full px-4 py-2.5 rounded-xl bg-dark-800/90 border border-white/10 text-white text-sm focus:border-brand-purple focus:outline-none"
            />
          </div>

          {/* Avatar Upload from Folder */}
          <div className="sm:col-span-2">
            <FileUploadField
              label="Foto Avatar Pemberi Rekomendasi"
              type="image"
              accept="image/*"
              value={formData.avatar}
              onChange={(val) => setFormData(prev => ({ ...prev, avatar: val }))}
              presetOptions={[
                { label: 'Avatar Default', url: '/assets/testimonial-avatar.jpg' }
              ]}
              helperText="Unggah foto avatar mentor atau rekan kolaborator dari folder komputer Anda."
              showToast={showToast}
            />
          </div>

          {/* Rating */}
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5">
              Rating Bintang (1 - 5)
            </label>
            <select
              name="rating"
              value={formData.rating}
              onChange={handleChange}
              className="w-full px-4 py-2.5 rounded-xl bg-dark-800/90 border border-white/10 text-white text-sm focus:border-brand-purple focus:outline-none cursor-pointer"
            >
              <option value={5}>⭐⭐⭐⭐⭐ (5 Bintang)</option>
              <option value={4}>⭐⭐⭐⭐ (4 Bintang)</option>
              <option value={3}>⭐⭐⭐ (3 Bintang)</option>
            </select>
          </div>

        </div>

      </div>

      {/* Save Button */}
      <div className="flex items-center justify-end">
        <button
          type="submit"
          className="px-6 py-3 rounded-xl bg-gradient-to-r from-brand-purple to-brand-indigo hover:opacity-95 text-sm font-bold text-white shadow-lg shadow-purple-600/30 flex items-center gap-2 transition-all cursor-pointer"
        >
          <Save className="w-4 h-4" />
          <span>Simpan Testimoni</span>
        </button>
      </div>

    </form>
  );
}
