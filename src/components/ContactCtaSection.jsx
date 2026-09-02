import React, { useState } from 'react';
import { 
  Mail, 
  Phone, 
  MapPin, 
  Send, 
  Copy, 
  Check, 
  MessageSquare, 
  Linkedin, 
  Github, 
  ArrowRight,
  Sparkles,
  Smartphone,
  Loader2,
  CheckCircle2
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { usePortfolio } from '../context/PortfolioContext';

export default function ContactCtaSection({ showToast }) {
  const { personalInfo, sendContactMessage } = usePortfolio();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [copiedField, setCopiedField] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSentSuccess, setIsSentSuccess] = useState(false);

  const targetEmail = personalInfo?.contactReceiverEmail || personalInfo?.email || 'aliframadhani575@gmail.com';

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleCopy = (text, fieldName) => {
    navigator.clipboard.writeText(text);
    setCopiedField(fieldName);
    showToast(`Berhasil menyalin ${fieldName}!`, 'success');
    setTimeout(() => setCopiedField(null), 2500);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      showToast('Mohon lengkapi semua kolom yang bertanda bintang (*).', 'error');
      return;
    }

    setIsSubmitting(true);

    try {
      // 1. Send & Store to PostgreSQL Database & Auto-Email Dispatch
      const result = await sendContactMessage({
        name: formData.name.trim(),
        email: formData.email.trim(),
        subject: formData.subject.trim(),
        message: formData.message.trim()
      });

      // Trigger celebratory confetti
      confetti({
        particleCount: 100,
        spread: 75,
        origin: { y: 0.6 }
      });

      setIsSentSuccess(true);
      const recipient = result.targetEmail || targetEmail;
      showToast(`Pesan berhasil tersimpan di CMS & diteruskan ke ${recipient}!`, 'success');
      setFormData({ name: '', email: '', subject: '', message: '' });

      setTimeout(() => {
        setIsSentSuccess(false);
      }, 6000);

    } catch (err) {
      console.warn("Contact submission fallback:", err);
      const mailtoUrl = `mailto:${targetEmail}?subject=${encodeURIComponent(
        formData.subject || `Inquiry from ${formData.name}`
      )}&body=${encodeURIComponent(
        `Nama: ${formData.name}\nEmail: ${formData.email}\n\nPesan:\n${formData.message}`
      )}`;
      window.open(mailtoUrl, '_blank');
      showToast(`Membuka email client untuk mengirim pesan ke ${targetEmail}`, 'info');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="relative py-20 lg:py-28 overflow-hidden">
      
      {/* Background Glows */}
      <div className="absolute bottom-0 left-1/4 w-[600px] h-[600px] bg-brand-purple/15 rounded-full blur-[170px] pointer-events-none -z-10"></div>
      <div className="absolute top-1/3 right-10 w-[450px] h-[450px] bg-brand-cyan/10 rounded-full blur-[150px] pointer-events-none -z-10"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* LEFT COLUMN: Title & Interactive Contact Form */}
          <div className="lg:col-span-7">
            
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-brand-purple/10 border border-brand-purple/30 text-brand-violet text-xs font-semibold uppercase tracking-wider mb-4">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Let's Connect & Collaborate</span>
            </div>

            {/* Headline */}
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-black text-white tracking-tight leading-tight mb-5">
              Want to make awesome and <br className="hidden sm:inline" />
              <span className="text-gradient-purple">impactful Product?</span>
            </h2>

            <p className="text-slate-400 text-sm sm:text-base leading-relaxed mb-8 max-w-xl">
              Tertarik bekerja sama untuk proyek web, aplikasi mobile, atau rekrutmen? Kirimkan pesan melalui formulir di bawah ini — pesan akan langsung terkirim ke email <strong className="text-brand-cyan">aliframadhani575@gmail.com</strong>.
            </p>

            {/* Quick Contact Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8">
              
              {/* Email Card */}
              <div className="p-4 rounded-2xl bg-dark-850/80 border border-white/[0.08] flex items-center justify-between group hover:border-brand-purple/40 transition-colors">
                <div className="flex items-center gap-3 overflow-hidden">
                  <div className="p-2.5 rounded-xl bg-brand-purple/10 text-brand-violet shrink-0">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div className="overflow-hidden">
                    <p className="text-[11px] text-slate-400 font-medium">Email Langsung</p>
                    <p className="text-xs font-bold text-slate-200 truncate">{personalInfo.email}</p>
                  </div>
                </div>
                <button
                  onClick={() => handleCopy(personalInfo.email, 'Email')}
                  className="p-2 rounded-lg bg-white/[0.04] hover:bg-white/[0.1] text-slate-400 hover:text-white transition-colors"
                  title="Salin alamat email"
                  aria-label="Copy email"
                >
                  {copiedField === 'Email' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                </button>
              </div>

              {/* Phone / WhatsApp Card */}
              <div className="p-4 rounded-2xl bg-dark-850/80 border border-white/[0.08] flex items-center justify-between group hover:border-brand-cyan/40 transition-colors">
                <div className="flex items-center gap-3 overflow-hidden">
                  <div className="p-2.5 rounded-xl bg-emerald-500/10 text-emerald-400 shrink-0">
                    <Phone className="w-4 h-4" />
                  </div>
                  <div className="overflow-hidden">
                    <p className="text-[11px] text-slate-400 font-medium">WhatsApp / Telepon</p>
                    <p className="text-xs font-bold text-slate-200 truncate">{personalInfo.phone}</p>
                  </div>
                </div>
                <a
                  href={personalInfo.whatsapp}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-lg bg-white/[0.04] hover:bg-emerald-500/20 text-slate-400 hover:text-emerald-400 transition-colors"
                  title="Chat via WhatsApp"
                  aria-label="Chat on WhatsApp"
                >
                  <ArrowRight className="w-3.5 h-3.5" />
                </a>
              </div>

            </div>

            {/* Contact Form */}
            <form onSubmit={handleSubmit} className="p-6 sm:p-8 rounded-3xl bg-dark-850/90 border border-white/10 backdrop-blur-xl space-y-4 shadow-xl">
              
              {isSentSuccess && (
                <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 flex items-center gap-3 text-emerald-300 text-sm animate-fadeIn">
                  <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
                  <span>Terima kasih! Pesan Anda telah terkirim langsung ke inbox <strong>aliframadhani575@gmail.com</strong>.</span>
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                    Nama Anda <span className="text-rose-400">*</span>
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Contoh: John Doe"
                    required
                    className="w-full px-4 py-3 rounded-xl bg-dark-900/90 border border-white/10 text-slate-100 text-sm placeholder-slate-500 focus:outline-none focus:border-brand-purple focus:ring-1 focus:ring-brand-purple transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                    Email Anda <span className="text-rose-400">*</span>
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Contoh: john@example.com"
                    required
                    className="w-full px-4 py-3 rounded-xl bg-dark-900/90 border border-white/10 text-slate-100 text-sm placeholder-slate-500 focus:outline-none focus:border-brand-purple focus:ring-1 focus:ring-brand-purple transition-colors"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                  Subjek / Kategori Proyek
                </label>
                <input
                  type="text"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  placeholder="Contoh: Tawaran Project Frontend Web / Mobile App"
                  className="w-full px-4 py-3 rounded-xl bg-dark-900/90 border border-white/10 text-slate-100 text-sm placeholder-slate-500 focus:outline-none focus:border-brand-purple focus:ring-1 focus:ring-brand-purple transition-colors"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                  Pesan Anda <span className="text-rose-400">*</span>
                </label>
                <textarea
                  name="message"
                  rows="4"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Tuliskan detail project, pertanyaan, atau pesan Anda di sini..."
                  required
                  className="w-full px-4 py-3 rounded-xl bg-dark-900/90 border border-white/10 text-slate-100 text-sm placeholder-slate-500 focus:outline-none focus:border-brand-purple focus:ring-1 focus:ring-brand-purple transition-colors resize-none"
                ></textarea>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full flex items-center justify-center gap-2 py-3.5 px-6 rounded-xl text-sm font-bold text-white bg-gradient-to-r from-brand-purple via-indigo-600 to-brand-cyan hover:from-purple-600 hover:to-cyan-600 shadow-lg shadow-purple-600/30 hover:shadow-purple-600/50 transition-all duration-300 disabled:opacity-50 cursor-pointer"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Sedang Mengirim ke aliframadhani575@gmail.com...</span>
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    <span>Kirim Pesan Sekarang</span>
                  </>
                )}
              </button>

            </form>

          </div>

          {/* RIGHT COLUMN: Alif Photo Card */}
          <div className="lg:col-span-5 flex flex-col items-center">
            
            <div className="relative w-full max-w-[400px] group">
              
              {/* Glowing halo */}
              <div className="absolute inset-0 bg-gradient-to-tr from-brand-purple/40 to-brand-cyan/30 rounded-3xl blur-2xl opacity-70 group-hover:opacity-100 transition-opacity"></div>

              {/* Photo Container */}
              <div className="relative rounded-3xl overflow-hidden border border-white/15 bg-dark-850 p-2 sm:p-2.5 shadow-2xl">
                <div className="relative aspect-square rounded-2xl overflow-hidden bg-dark-900">
                  <img
                    src={personalInfo.workspaceUrl}
                    alt={personalInfo.name}
                    className="w-full h-full object-cover object-center group-hover:scale-103 transition-transform duration-500"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-dark-950/70 via-transparent to-transparent"></div>
                  
                  {/* Floating Overlay Badge */}
                  <div className="absolute bottom-3.5 left-3.5 right-3.5 bg-dark-900/90 backdrop-blur-xl border border-white/15 p-3 rounded-xl">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-xs font-bold text-white">Muhammad Alif Ramadhani</p>
                        <p className="text-[10px] text-slate-400">Front-End & Mobile Developer • Tangerang, ID</p>
                      </div>
                      <div className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse"></div>
                    </div>
                  </div>
                </div>
              </div>

            </div>

            {/* Social Channels Strip */}
            <div className="mt-8 flex items-center gap-4">
              <span className="text-xs font-semibold text-slate-400">Connect:</span>
              <a
                href={personalInfo.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 rounded-xl bg-white/[0.05] hover:bg-brand-purple/20 border border-white/10 text-slate-300 hover:text-white transition-colors"
                title="LinkedIn Profile"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-4 h-4" />
              </a>
              <a
                href={personalInfo.github}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 rounded-xl bg-white/[0.05] hover:bg-brand-purple/20 border border-white/10 text-slate-300 hover:text-white transition-colors"
                title="GitHub Profile"
                aria-label="GitHub"
              >
                <Github className="w-4 h-4" />
              </a>
              <a
                href={`mailto:${personalInfo.email}`}
                className="p-2.5 rounded-xl bg-white/[0.05] hover:bg-brand-purple/20 border border-white/10 text-slate-300 hover:text-white transition-colors"
                title="Kirim Email Langsung"
                aria-label="Email"
              >
                <Mail className="w-4 h-4" />
              </a>
              <a
                href={personalInfo.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 rounded-xl bg-white/[0.05] hover:bg-emerald-500/20 border border-white/10 text-slate-300 hover:text-emerald-400 transition-colors"
                title="WhatsApp"
                aria-label="WhatsApp"
              >
                <Smartphone className="w-4 h-4" />
              </a>
            </div>

          </div>

        </div>

      </div>

    </section>
  );
}
