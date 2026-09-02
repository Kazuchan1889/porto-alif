import React, { useState, useRef } from 'react';
import { 
  UploadCloud, 
  FolderOpen, 
  Image as ImageIcon, 
  FileText, 
  Trash2, 
  RefreshCw, 
  ExternalLink, 
  CheckCircle2, 
  AlertCircle, 
  Link as LinkIcon, 
  ChevronDown, 
  ChevronUp, 
  Loader2,
  FileDown,
  Eye
} from 'lucide-react';

export default function FileUploadField({
  label = 'Upload File',
  value = '',
  onChange = () => {},
  type = 'image', // 'image' | 'document'
  accept = 'image/*',
  placeholder = 'Pilih file dari folder komputer Anda...',
  helperText = '',
  presetOptions = [],
  maxSizeMB = 15,
  showToast
}) {
  const fileInputRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [showManualUrl, setShowManualUrl] = useState(false);
  const [uploadError, setUploadError] = useState(null);
  const [previewName, setPreviewName] = useState('');
  const [previewSize, setPreviewSize] = useState(null);

  const isDocument = type === 'document';
  const hasValue = Boolean(value && value.trim());

  // Determine displayed filename
  const getDisplayFileName = () => {
    if (previewName) return previewName;
    if (!value) return '';
    if (value.startsWith('data:')) {
      return isDocument ? 'Dokumen_CV_Uploaded.pdf' : 'Gambar_Uploaded.png';
    }
    const clean = value.split('/').pop()?.split('?')[0] || '';
    try {
      return decodeURIComponent(clean);
    } catch {
      return clean;
    }
  };

  const handleOpenPicker = () => {
    if (fileInputRef.current) {
      fileInputRef.current.value = ''; // Reset to allow re-picking same file
      fileInputRef.current.click();
    }
  };

  const processFile = async (file) => {
    if (!file) return;

    // Check size limit
    const sizeInMB = file.size / (1024 * 1024);
    if (sizeInMB > maxSizeMB) {
      const errMsg = `Ukuran file (${sizeInMB.toFixed(1)}MB) melebihi batas maksimal ${maxSizeMB}MB`;
      setUploadError(errMsg);
      if (showToast) showToast(errMsg, 'error');
      return;
    }

    setUploadError(null);
    setIsUploading(true);
    setPreviewName(file.name);
    setPreviewSize((file.size / 1024).toFixed(0) + ' KB');

    try {
      // 1. Read file as Base64 Data URL for instant live preview & offline storage
      const dataUrl = await new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = (e) => resolve(e.target.result);
        reader.onerror = () => reject(new Error('Gagal membaca file dari folder'));
        reader.readAsDataURL(file);
      });

      // 2. Attempt to upload to backend server if reachable
      let finalUrl = dataUrl;
      try {
        const response = await fetch('/api/upload', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            fileData: dataUrl,
            fileName: file.name,
            fileType: file.type
          })
        });

        if (response.ok) {
          const result = await response.json();
          if (result.url) {
            finalUrl = result.url;
          }
        }
      } catch (backendErr) {
        console.warn('Backend server offline, storing base64 locally:', backendErr.message);
      }

      // 3. Update state
      onChange(finalUrl);
      if (showToast) {
        showToast(`File "${file.name}" berhasil dipilih dan dimuat!`, 'success');
      }
    } catch (err) {
      console.error('Error processing file:', err);
      setUploadError(err.message || 'Gagal memproses file');
      if (showToast) showToast('Gagal memproses file', 'error');
    } finally {
      setIsUploading(false);
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (file) processFile(file);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);

    const file = e.dataTransfer.files?.[0];
    if (file) {
      processFile(file);
    }
  };

  const handleClear = () => {
    onChange('');
    setPreviewName('');
    setPreviewSize(null);
    setUploadError(null);
  };

  return (
    <div className="space-y-3">
      
      {/* Label and Mode Tag */}
      <div className="flex items-center justify-between">
        <label className="block text-xs font-semibold text-slate-200">
          {label}
        </label>
        <span className="text-[11px] font-mono text-slate-400">
          {isDocument ? 'Format: .PDF' : 'Format: PNG, JPG, WEBP, SVG'}
        </span>
      </div>

      {/* Hidden File Input */}
      <input
        ref={fileInputRef}
        type="file"
        accept={accept}
        onChange={handleFileChange}
        className="hidden"
      />

      {/* Main Upload / Preview Container */}
      {!hasValue ? (
        
        /* DROPZONE: When no file is selected */
        <div
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          onClick={handleOpenPicker}
          className={`relative group rounded-2xl border-2 border-dashed p-6 transition-all duration-300 cursor-pointer flex flex-col items-center justify-center text-center ${
            isDragging
              ? 'border-brand-cyan bg-brand-cyan/10 scale-[1.01] shadow-xl shadow-cyan-500/10'
              : 'border-white/15 hover:border-brand-purple/50 bg-dark-850/60 hover:bg-dark-800/80'
          }`}
        >
          {isUploading ? (
            <div className="py-6 flex flex-col items-center gap-3">
              <Loader2 className="w-8 h-8 text-brand-cyan animate-spin" />
              <p className="text-xs font-semibold text-slate-200 animate-pulse">
                Memproses dan memuat file dari folder...
              </p>
            </div>
          ) : (
            <>
              {/* Icon */}
              <div className="w-12 h-12 rounded-2xl bg-white/[0.05] border border-white/10 group-hover:border-brand-purple/40 group-hover:scale-110 flex items-center justify-center text-brand-violet group-hover:text-brand-cyan transition-all duration-300 mb-3 shadow-lg shadow-black/20">
                {isDocument ? (
                  <FileText className="w-6 h-6 text-rose-400 group-hover:text-rose-300" />
                ) : (
                  <UploadCloud className="w-6 h-6" />
                )}
              </div>

              {/* Action Texts */}
              <div className="space-y-1">
                <p className="text-sm font-bold text-white group-hover:text-brand-violet transition-colors">
                  Pilih File dari Folder Komputer
                </p>
                <p className="text-xs text-slate-400">
                  Klik untuk membuka file explorer atau tarik & lepas file ke sini
                </p>
              </div>

              {/* Badge Button */}
              <button
                type="button"
                className="mt-4 px-4 py-1.5 rounded-xl bg-gradient-to-r from-brand-purple/30 to-brand-indigo/30 hover:from-brand-purple/50 hover:to-brand-indigo/50 border border-brand-purple/40 text-brand-violet hover:text-white text-xs font-semibold flex items-center gap-1.5 transition-all shadow-sm"
              >
                <FolderOpen className="w-3.5 h-3.5" />
                <span>Telusuri Folder (Browse)</span>
              </button>
            </>
          )}
        </div>

      ) : (

        /* PREVIEW CARD: When file / image is loaded */
        <div className="p-4 rounded-2xl bg-dark-850/90 border border-white/15 hover:border-brand-purple/30 transition-all space-y-3">
          
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            
            {/* Left: Thumbnail & Info */}
            <div className="flex items-center gap-3.5 min-w-0 flex-1">
              
              {/* Thumbnail / Icon */}
              {!isDocument ? (
                <div className="w-16 h-16 rounded-xl bg-dark-950 border border-white/15 overflow-hidden shrink-0 relative group/thumb shadow-md">
                  <img
                    src={value}
                    alt="Preview"
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.target.src = '/assets/project-network.jpg';
                    }}
                  />
                  <a
                    href={value}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="absolute inset-0 bg-black/60 opacity-0 group-hover/thumb:opacity-100 flex items-center justify-center text-white transition-opacity"
                    title="Buka Gambar Resolusi Penuh"
                  >
                    <Eye className="w-4 h-4" />
                  </a>
                </div>
              ) : (
                <div className="w-14 h-14 rounded-xl bg-rose-500/10 border border-rose-500/30 flex items-center justify-center text-rose-400 shrink-0 shadow-md">
                  <FileText className="w-7 h-7" />
                </div>
              )}

              {/* Metadata details */}
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2 mb-0.5">
                  <span className="text-xs font-bold text-white truncate max-w-[200px] sm:max-w-[280px]">
                    {getDisplayFileName()}
                  </span>
                  <span className="px-2 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-[10px] font-bold flex items-center gap-1 shrink-0">
                    <CheckCircle2 className="w-2.5 h-2.5" />
                    <span>Tersimpan</span>
                  </span>
                </div>

                <p className="text-[11px] text-slate-400 truncate">
                  {previewSize ? `Ukuran: ${previewSize} • ` : ''}
                  {isDocument ? 'Dokumen PDF' : 'Gambar Media'}
                </p>

                {/* Quick Link to open file */}
                {value && (
                  <a
                    href={value}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-[11px] text-brand-cyan hover:underline mt-0.5"
                  >
                    <span>{isDocument ? 'Uji Buka File PDF' : 'Buka Gambar Penuh'}</span>
                    <ExternalLink className="w-2.5 h-2.5" />
                  </a>
                )}
              </div>

            </div>

            {/* Right: Actions */}
            <div className="flex items-center gap-2 self-end sm:self-center shrink-0">
              
              <button
                type="button"
                onClick={handleOpenPicker}
                className="px-3 py-1.5 rounded-xl bg-white/[0.05] hover:bg-white/[0.1] border border-white/10 hover:border-white/20 text-slate-200 hover:text-white text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
                title="Ganti dengan file lain dari folder"
              >
                <RefreshCw className="w-3.5 h-3.5 text-brand-cyan" />
                <span>Ganti File</span>
              </button>

              <button
                type="button"
                onClick={handleClear}
                className="p-1.5 rounded-xl bg-rose-500/10 hover:bg-rose-500/20 border border-rose-500/30 text-rose-400 hover:text-rose-300 text-xs transition-colors cursor-pointer"
                title="Hapus file"
              >
                <Trash2 className="w-4 h-4" />
              </button>

            </div>

          </div>

        </div>

      )}

      {/* Upload Error Alert */}
      {uploadError && (
        <div className="p-3 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs flex items-center gap-2 animate-fadeIn">
          <AlertCircle className="w-4 h-4 shrink-0 text-rose-400" />
          <span>{uploadError}</span>
        </div>
      )}

      {/* Preset Options (if provided) */}
      {presetOptions && presetOptions.length > 0 && (
        <div className="flex items-center gap-2 overflow-x-auto pb-1 text-[11px]">
          <span className="text-slate-500 shrink-0">Pilihan Cepat:</span>
          {presetOptions.map((opt, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => {
                onChange(opt.url);
                setPreviewName(opt.label);
              }}
              className="px-2.5 py-1 rounded-lg bg-white/[0.04] hover:bg-white/[0.1] border border-white/5 hover:border-white/15 text-slate-300 hover:text-white transition-colors whitespace-nowrap cursor-pointer"
            >
              {opt.label}
            </button>
          ))}
        </div>
      )}

      {/* Optional: Collapsible Manual URL input for power users */}
      <div className="pt-1">
        <button
          type="button"
          onClick={() => setShowManualUrl(!showManualUrl)}
          className="text-[11px] text-slate-400 hover:text-slate-200 flex items-center gap-1 transition-colors cursor-pointer"
        >
          <LinkIcon className="w-3 h-3 text-brand-violet" />
          <span>{showManualUrl ? 'Sembunyikan opsi URL manual' : 'Atau masukkan tautan web URL manual'}</span>
          {showManualUrl ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
        </button>

        {showManualUrl && (
          <div className="mt-2 space-y-1.5 animate-fadeIn">
            <input
              type="text"
              value={value}
              onChange={(e) => onChange(e.target.value)}
              placeholder="https://... atau /assets/..."
              className="w-full px-3.5 py-2 rounded-xl bg-dark-900 border border-white/10 text-white placeholder-slate-500 text-xs focus:border-brand-purple focus:outline-none font-mono"
            />
            <p className="text-[10px] text-slate-500">
              Gunakan jika Anda ingin menautkan gambar/file dari server web eksternal (CDN/Cloudinary).
            </p>
          </div>
        )}
      </div>

      {helperText && (
        <p className="text-[11px] text-slate-500">{helperText}</p>
      )}

    </div>
  );
}
