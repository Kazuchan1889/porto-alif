import React, { useState } from 'react';
import { 
  Save, 
  MessageSquare, 
  Star, 
  User, 
  Building2, 
  Sparkles, 
  Quote,
  CheckCircle2
} from 'lucide-react';
import { usePortfolio } from '../../../context/PortfolioContext';

export default function TestimonialsEditor({ showToast }) {
  const { testimonial, updateTestimonial } = usePortfolio();

  const [formData, setFormData] = useState({
    quote: testimonial?.quote || '',
    author: testimonial?.author || '',
    role: testimonial?.role || '',
    company: testimonial?.company || '',
    avatar: testimonial?.avatar || '/assets/testimonial-avatar.jpg',
    rating: testimonial?.rating || 5
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'rating' ? parseInt(value, 10) : value
    }));
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
            Ubah kutipan rekomendasi dari mentor teknologi atau kolaborator proyek perusahaan.
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

          {/* Avatar URL */}
          <div className="sm:col-span-2">
            <label className="block text-xs font-semibold text-slate-300 mb-1.5">
              URL Foto Avatar
            </label>
            <input
              type="text"
              name="avatar"
              value={formData.avatar}
              onChange={handleChange}
              placeholder="/assets/testimonial-avatar.jpg"
              className="w-full px-4 py-2.5 rounded-xl bg-dark-800/90 border border-white/10 text-white text-sm focus:border-brand-purple focus:outline-none"
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
