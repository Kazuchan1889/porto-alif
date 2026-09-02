import React, { useState } from 'react';
import { 
  Save, 
  Mail, 
  Phone, 
  MessageCircle, 
  Linkedin, 
  Github, 
  MapPin, 
  Sparkles,
  Share2,
  CheckCircle2,
  Inbox,
  Clock,
  Trash2,
  Eye,
  Send,
  Search,
  Filter,
  AlertCircle,
  X,
  ExternalLink,
  Settings
} from 'lucide-react';
import { usePortfolio } from '../../../context/PortfolioContext';

export default function ContactEditor({ showToast }) {
  const { 
    personalInfo, 
    updatePersonalInfo, 
    contactMessages = [], 
    unreadMessagesCount = 0,
    toggleMessageRead,
    deleteContactMessage
  } = usePortfolio();

  const [activeTab, setActiveTab] = useState('inbox'); // 'inbox' | 'settings'
  const [filterType, setFilterType] = useState('all'); // 'all' | 'unread' | 'read'
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedMessage, setSelectedMessage] = useState(null);

  const [formData, setFormData] = useState({
    email: personalInfo?.email || '',
    contactReceiverEmail: personalInfo?.contactReceiverEmail || personalInfo?.email || 'aliframadhani575@gmail.com',
    phone: personalInfo?.phone || '',
    whatsapp: personalInfo?.whatsapp || '',
    linkedin: personalInfo?.linkedin || '',
    github: personalInfo?.github || '',
    location: personalInfo?.location || ''
  });

  useEffect(() => {
    if (personalInfo) {
      setFormData({
        email: personalInfo.email || '',
        contactReceiverEmail: personalInfo.contactReceiverEmail || personalInfo.email || 'aliframadhani575@gmail.com',
        phone: personalInfo.phone || '',
        whatsapp: personalInfo.whatsapp || '',
        linkedin: personalInfo.linkedin || '',
        github: personalInfo.github || '',
        location: personalInfo.location || ''
      });
    }
  }, [personalInfo]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSaveSettings = (e) => {
    e.preventDefault();
    updatePersonalInfo(formData);
    showToast('Pengaturan kontak & email penerima berhasil disimpan!', 'success');
  };

  const handleDelete = (id, e) => {
    if (e) e.stopPropagation();
    if (window.confirm('Yakin ingin menghapus pesan ini dari database?')) {
      deleteContactMessage(id);
      if (selectedMessage?.id === id) setSelectedMessage(null);
      showToast('Pesan berhasil dihapus dari database', 'info');
    }
  };

  const handleToggleRead = (id, currentStatus, e) => {
    if (e) e.stopPropagation();
    toggleMessageRead(id, currentStatus);
    if (selectedMessage?.id === id) {
      setSelectedMessage(prev => prev ? { ...prev, read: !currentStatus } : null);
    }
    showToast(currentStatus ? 'Ditandai belum dibaca' : 'Ditandai sudah dibaca', 'success');
  };

  const handleOpenDetail = (msg) => {
    setSelectedMessage(msg);
    if (!msg.read) {
      toggleMessageRead(msg.id, false);
    }
  };

  // Filter & search messages
  const filteredMessages = (contactMessages || []).filter(msg => {
    if (filterType === 'unread') return !msg.read;
    if (filterType === 'read') return msg.read;
    return true;
  }).filter(msg => {
    if (!searchQuery.trim()) return true;
    const q = searchQuery.toLowerCase();
    return (
      (msg.name && msg.name.toLowerCase().includes(q)) ||
      (msg.email && msg.email.toLowerCase().includes(q)) ||
      (msg.subject && msg.subject.toLowerCase().includes(q)) ||
      (msg.message && msg.message.toLowerCase().includes(q))
    );
  });

  return (
    <div className="space-y-8 animate-fadeIn">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-white/10">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-cyan/10 border border-brand-cyan/30 text-brand-cyan text-xs font-semibold uppercase tracking-wider mb-2">
            <Inbox className="w-3.5 h-3.5" />
            <span>Pusat Komunikasi</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-display font-black text-white tracking-tight">
            Pesan Masuk & Pengaturan Kontak
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Kelola pesan masuk dari pengunjung dan atur alamat email penerima notifikasi otomatis.
          </p>
        </div>

        {/* Tab Switcher Buttons */}
        <div className="flex items-center gap-2 p-1.5 rounded-2xl bg-dark-900 border border-white/10 shrink-0">
          <button
            type="button"
            onClick={() => setActiveTab('inbox')}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              activeTab === 'inbox'
                ? 'bg-gradient-to-r from-brand-purple to-brand-indigo text-white shadow-md shadow-purple-600/30'
                : 'text-slate-400 hover:text-white hover:bg-white/[0.04]'
            }`}
          >
            <Inbox className="w-4 h-4" />
            <span>Pesan Masuk</span>
            {unreadMessagesCount > 0 && (
              <span className="px-1.5 py-0.5 rounded-full bg-rose-500 text-white text-[10px] font-extrabold animate-pulse">
                {unreadMessagesCount}
              </span>
            )}
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('settings')}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              activeTab === 'settings'
                ? 'bg-gradient-to-r from-brand-purple to-brand-indigo text-white shadow-md shadow-purple-600/30'
                : 'text-slate-400 hover:text-white hover:bg-white/[0.04]'
            }`}
          >
            <Settings className="w-4 h-4" />
            <span>Pengaturan Email & Kontak</span>
          </button>
        </div>
      </div>

      {/* ======================= TAB 1: INBOX (PESAN MASUK) ======================= */}
      {activeTab === 'inbox' && (
        <div className="space-y-6">
          
          {/* Controls Bar: Search & Filter Tabs */}
          <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 p-4 rounded-2xl bg-dark-900/80 border border-white/10">
            
            {/* Search Input */}
            <div className="relative flex-1 max-w-md">
              <Search className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Cari nama, email, perihal, atau isi pesan..."
                className="w-full pl-10 pr-4 py-2 rounded-xl bg-dark-800/90 border border-white/10 text-white placeholder-slate-500 text-xs focus:outline-none focus:border-brand-purple"
              />
            </div>

            {/* Filter Buttons */}
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setFilterType('all')}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                  filterType === 'all'
                    ? 'bg-white/15 text-white border border-white/20'
                    : 'text-slate-400 hover:text-white bg-dark-800/60 border border-white/5'
                }`}
              >
                Semua ({contactMessages.length})
              </button>

              <button
                type="button"
                onClick={() => setFilterType('unread')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                  filterType === 'unread'
                    ? 'bg-rose-500/20 text-rose-300 border border-rose-500/40'
                    : 'text-slate-400 hover:text-white bg-dark-800/60 border border-white/5'
                }`}
              >
                <span className="w-1.5 h-1.5 rounded-full bg-rose-400"></span>
                <span>Belum Dibaca ({unreadMessagesCount})</span>
              </button>

              <button
                type="button"
                onClick={() => setFilterType('read')}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                  filterType === 'read'
                    ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                    : 'text-slate-400 hover:text-white bg-dark-800/60 border border-white/5'
                }`}
              >
                Sudah Dibaca ({contactMessages.length - unreadMessagesCount})
              </button>
            </div>

          </div>

          {/* Messages List Container */}
          {filteredMessages.length === 0 ? (
            <div className="p-12 text-center rounded-3xl bg-dark-900/50 border border-white/10 space-y-3">
              <div className="w-14 h-14 rounded-2xl bg-white/[0.04] border border-white/10 flex items-center justify-center mx-auto text-slate-500">
                <Inbox className="w-7 h-7" />
              </div>
              <h3 className="text-base font-bold text-slate-200">
                {searchQuery ? 'Tidak ada pesan yang cocok dengan pencarian' : 'Belum ada pesan masuk'}
              </h3>
              <p className="text-xs text-slate-500 max-w-md mx-auto">
                Setiap kali ada pengunjung yang mengirim pesan melalui form Kontak di halaman utama, pesan akan otomatis masuk ke sini dan diteruskan ke email Anda.
              </p>
            </div>
          ) : (
            <div className="space-y-3">
              {filteredMessages.map((msg) => (
                <div
                  key={msg.id}
                  onClick={() => handleOpenDetail(msg)}
                  className={`p-5 rounded-2xl border transition-all duration-300 flex flex-col md:flex-row md:items-center justify-between gap-4 cursor-pointer group ${
                    !msg.read
                      ? 'bg-gradient-to-r from-brand-purple/15 via-dark-900/90 to-dark-850/90 border-brand-purple/40 shadow-lg shadow-purple-950/20 hover:border-brand-purple/60'
                      : 'bg-dark-900/60 border-white/10 hover:bg-dark-850/80 hover:border-white/20'
                  }`}
                >
                  {/* Left: Sender info & snippet */}
                  <div className="flex items-start gap-3.5 flex-1 min-w-0">
                    
                    {/* Status Indicator */}
                    <div className="pt-1 shrink-0">
                      {!msg.read ? (
                        <div className="w-3 h-3 rounded-full bg-brand-cyan shadow-md shadow-cyan-400/50 animate-pulse" title="Pesan Belum Dibaca"></div>
                      ) : (
                        <div className="w-3 h-3 rounded-full bg-slate-600" title="Pesan Sudah Dibaca"></div>
                      )}
                    </div>

                    <div className="min-w-0 flex-1 space-y-1">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className={`text-sm font-bold truncate ${!msg.read ? 'text-white' : 'text-slate-300'}`}>
                          {msg.name}
                        </span>
                        <span className="text-xs text-slate-400 font-mono">
                          &lt;{msg.email}&gt;
                        </span>
                        {!msg.read && (
                          <span className="px-2 py-0.5 rounded-full bg-brand-purple/30 border border-brand-purple/50 text-[10px] font-bold text-brand-cyan">
                            BARU
                          </span>
                        )}
                      </div>

                      <p className="text-xs font-semibold text-slate-200 truncate">
                        {msg.subject || 'Pesan Baru dari Portofolio'}
                      </p>

                      <p className="text-xs text-slate-400 line-clamp-1 leading-relaxed">
                        {msg.message}
                      </p>
                    </div>

                  </div>

                  {/* Right: Timestamp & Actions */}
                  <div className="flex items-center gap-3 shrink-0 self-end md:self-center">
                    <div className="text-right text-[11px] text-slate-400 font-mono flex items-center gap-1.5">
                      <Clock className="w-3 h-3 text-slate-500" />
                      <span>
                        {new Date(msg.createdAt).toLocaleDateString('id-ID', {
                          day: 'numeric',
                          month: 'short',
                          year: 'numeric',
                          hour: '2-digit',
                          minute: '2-digit'
                        })}
                      </span>
                    </div>

                    <div className="flex items-center gap-1.5 pl-2 border-l border-white/10">
                      <button
                        type="button"
                        onClick={(e) => handleToggleRead(msg.id, msg.read, e)}
                        className={`p-2 rounded-xl border text-xs transition-colors cursor-pointer ${
                          msg.read 
                            ? 'bg-white/[0.04] hover:bg-white/[0.08] border-white/10 text-slate-400 hover:text-white' 
                            : 'bg-emerald-500/10 hover:bg-emerald-500/20 border-emerald-500/30 text-emerald-300'
                        }`}
                        title={msg.read ? 'Tandai belum dibaca' : 'Tandai sudah dibaca'}
                      >
                        <CheckCircle2 className="w-4 h-4" />
                      </button>

                      <a
                        href={`mailto:${msg.email}?subject=${encodeURIComponent(`Re: ${msg.subject || 'Inquiry'}`)}`}
                        onClick={(e) => e.stopPropagation()}
                        className="p-2 rounded-xl bg-white/[0.04] hover:bg-brand-cyan/20 border border-white/10 hover:border-brand-cyan/40 text-slate-300 hover:text-brand-cyan text-xs transition-colors"
                        title="Balas via Email"
                      >
                        <Send className="w-4 h-4" />
                      </a>

                      <button
                        type="button"
                        onClick={(e) => handleDelete(msg.id, e)}
                        className="p-2 rounded-xl bg-white/[0.04] hover:bg-rose-500/20 border border-white/10 hover:border-rose-500/40 text-slate-400 hover:text-rose-400 text-xs transition-colors cursor-pointer"
                        title="Hapus Pesan"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>

                  </div>

                </div>
              ))}
            </div>
          )}

        </div>
      )}

      {/* ======================= TAB 2: SETTINGS (PENGATURAN EMAIL & KONTAK) ======================= */}
      {activeTab === 'settings' && (
        <form onSubmit={handleSaveSettings} className="space-y-8 animate-fadeIn">
          
          {/* Email Destination Setting Card */}
          <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-tr from-brand-purple/10 via-dark-900/90 to-brand-cyan/10 border border-brand-purple/30 space-y-4">
            <div className="flex items-center gap-2.5 text-brand-cyan">
              <Mail className="w-5 h-5 text-brand-cyan" />
              <h2 className="text-base font-bold text-white">
                Email Penerima Notifikasi Contact Form
              </h2>
            </div>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              Tentukan alamat email tujuan. Setiap kali ada pengunjung yang mengisi form <strong>Hubungi Saya (Contact Us)</strong> di portofolio, pesan akan otomatis masuk ke database PostgreSQL ini dan diteruskan secara instan ke email di bawah ini.
            </p>

            <div className="max-w-xl pt-2">
              <label className="block text-xs font-semibold text-slate-200 mb-1.5 flex items-center gap-1.5">
                <Send className="w-3.5 h-3.5 text-brand-cyan" />
                <span>Email Tujuan Notifikasi</span>
              </label>
              <input
                type="email"
                name="contactReceiverEmail"
                value={formData.contactReceiverEmail}
                onChange={handleChange}
                required
                placeholder="aliframadhani575@gmail.com atau email aktif Anda"
                className="w-full px-4 py-3 rounded-xl bg-dark-800/90 border border-white/20 text-white font-mono text-sm focus:border-brand-cyan focus:outline-none focus:ring-1 focus:ring-brand-cyan"
              />
              <p className="text-[11px] text-slate-400 mt-1.5 flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                <span>Pesan pengunjung akan otomatis terkirim ke alamat email ini.</span>
              </p>
            </div>
          </div>

          {/* Social Links & Public Contacts Card */}
          <div className="p-6 sm:p-8 rounded-3xl bg-dark-900/70 border border-white/10 space-y-6">
            <h2 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
              <Share2 className="w-4 h-4 text-brand-purple" />
              <span>Kontak Publik & Tautan Media Sosial</span>
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              
              {/* Public Display Email */}
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5 flex items-center gap-1.5">
                  <Mail className="w-3.5 h-3.5 text-brand-cyan" />
                  <span>Email Publik (Tampil di Footer)</span>
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  placeholder="aliframadhani575@gmail.com"
                  className="w-full px-4 py-2.5 rounded-xl bg-dark-800/90 border border-white/10 text-white text-sm focus:border-brand-purple focus:outline-none"
                />
              </div>

              {/* Phone */}
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5 flex items-center gap-1.5">
                  <Phone className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Nomor Telepon</span>
                </label>
                <input
                  type="text"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="+6281511851621"
                  className="w-full px-4 py-2.5 rounded-xl bg-dark-800/90 border border-white/10 text-white text-sm focus:border-brand-purple focus:outline-none"
                />
              </div>

              {/* WhatsApp URL */}
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5 flex items-center gap-1.5">
                  <MessageCircle className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Tautan WhatsApp (wa.me)</span>
                </label>
                <input
                  type="text"
                  name="whatsapp"
                  value={formData.whatsapp}
                  onChange={handleChange}
                  placeholder="https://wa.me/6281511851621"
                  className="w-full px-4 py-2.5 rounded-xl bg-dark-800/90 border border-white/10 text-white text-sm focus:border-brand-purple focus:outline-none"
                />
              </div>

              {/* Location */}
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5 flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-rose-400" />
                  <span>Lokasi Domisili</span>
                </label>
                <input
                  type="text"
                  name="location"
                  value={formData.location}
                  onChange={handleChange}
                  placeholder="Tangerang, Indonesia"
                  className="w-full px-4 py-2.5 rounded-xl bg-dark-800/90 border border-white/10 text-white text-sm focus:border-brand-purple focus:outline-none"
                />
              </div>

              {/* LinkedIn URL */}
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5 flex items-center gap-1.5">
                  <Linkedin className="w-3.5 h-3.5 text-blue-400" />
                  <span>URL Profil LinkedIn</span>
                </label>
                <input
                  type="text"
                  name="linkedin"
                  value={formData.linkedin}
                  onChange={handleChange}
                  placeholder="https://www.linkedin.com/in/..."
                  className="w-full px-4 py-2.5 rounded-xl bg-dark-800/90 border border-white/10 text-white text-sm focus:border-brand-purple focus:outline-none"
                />
              </div>

              {/* GitHub URL */}
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5 flex items-center gap-1.5">
                  <Github className="w-3.5 h-3.5 text-slate-300" />
                  <span>URL Profil GitHub</span>
                </label>
                <input
                  type="text"
                  name="github"
                  value={formData.github}
                  onChange={handleChange}
                  placeholder="https://github.com/..."
                  className="w-full px-4 py-2.5 rounded-xl bg-dark-800/90 border border-white/10 text-white text-sm focus:border-brand-purple focus:outline-none"
                />
              </div>

            </div>

          </div>

          {/* Submit Button */}
          <div className="flex items-center justify-end">
            <button
              type="submit"
              className="px-6 py-3 rounded-xl bg-gradient-to-r from-brand-purple to-brand-indigo hover:opacity-95 text-sm font-bold text-white shadow-lg shadow-purple-600/30 flex items-center gap-2 transition-all cursor-pointer"
            >
              <Save className="w-4 h-4" />
              <span>Simpan Pengaturan Kontak & Email</span>
            </button>
          </div>

        </form>
      )}

      {/* ======================= DETAIL MODAL PESAN ======================= */}
      {selectedMessage && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
          <div
            className="fixed inset-0 bg-dark-950/80 backdrop-blur-xl transition-opacity animate-fadeIn"
            onClick={() => setSelectedMessage(null)}
          ></div>

          <div className="relative w-full max-w-2xl bg-dark-900 border border-white/15 rounded-3xl overflow-hidden shadow-2xl shadow-purple-950/50 z-10 animate-scaleUp p-6 sm:p-8 space-y-6">
            
            {/* Modal Header */}
            <div className="flex items-center justify-between pb-4 border-b border-white/10">
              <div className="flex items-center gap-2.5">
                <div className="w-10 h-10 rounded-xl bg-brand-purple/20 border border-brand-purple/40 flex items-center justify-center text-brand-cyan">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white">Detail Pesan Masuk</h3>
                  <p className="text-xs text-slate-400 font-mono">
                    {new Date(selectedMessage.createdAt).toLocaleString('id-ID', {
                      dateStyle: 'full',
                      timeStyle: 'short'
                    })}
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setSelectedMessage(null)}
                className="p-2 rounded-full bg-dark-800 hover:bg-dark-750 text-slate-400 hover:text-white transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Sender Details */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-4 rounded-2xl bg-dark-850/80 border border-white/10 text-xs">
              <div>
                <span className="text-slate-400 block mb-0.5 font-medium">Nama Pengirim:</span>
                <span className="text-white font-bold text-sm">{selectedMessage.name}</span>
              </div>
              <div>
                <span className="text-slate-400 block mb-0.5 font-medium">Alamat Email:</span>
                <span className="text-brand-cyan font-mono">{selectedMessage.email}</span>
              </div>
              <div className="sm:col-span-2 pt-2 border-t border-white/5">
                <span className="text-slate-400 block mb-0.5 font-medium">Perihal (Subject):</span>
                <span className="text-slate-200 font-semibold">{selectedMessage.subject || 'Pesan Baru dari Portofolio'}</span>
              </div>
            </div>

            {/* Message Body */}
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
                Isi Pesan:
              </h4>
              <div className="p-5 rounded-2xl bg-dark-950/80 border border-white/10 text-sm text-slate-200 leading-relaxed whitespace-pre-wrap font-sans min-h-[140px]">
                {selectedMessage.message}
              </div>
            </div>

            {/* Modal Actions */}
            <div className="flex flex-wrap items-center justify-between gap-3 pt-4 border-t border-white/10">
              <button
                type="button"
                onClick={() => handleDelete(selectedMessage.id)}
                className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-rose-500/10 hover:bg-rose-500/20 border border-rose-500/30 text-rose-300 text-xs font-bold transition-colors cursor-pointer"
              >
                <Trash2 className="w-4 h-4" />
                <span>Hapus Pesan</span>
              </button>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => handleToggleRead(selectedMessage.id, selectedMessage.read)}
                  className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white/[0.05] hover:bg-white/[0.1] border border-white/10 text-slate-200 text-xs font-bold transition-colors cursor-pointer"
                >
                  <CheckCircle2 className="w-4 h-4" />
                  <span>{selectedMessage.read ? 'Tandai Belum Dibaca' : 'Tandai Sudah Dibaca'}</span>
                </button>

                <a
                  href={`mailto:${selectedMessage.email}?subject=${encodeURIComponent(`Re: ${selectedMessage.subject || 'Inquiry'}`)}`}
                  className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-brand-purple to-brand-indigo hover:opacity-95 text-white text-xs font-bold shadow-lg shadow-purple-600/30 transition-all"
                >
                  <Send className="w-4 h-4" />
                  <span>Balas Email</span>
                </a>
              </div>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}
