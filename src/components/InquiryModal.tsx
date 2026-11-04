import React, { useState, useEffect, useRef } from 'react'

interface InquiryModalProps {
  isOpen: boolean
  defaultService?: string
  onClose: () => void
}

export const InquiryModal: React.FC<InquiryModalProps> = ({
  isOpen,
  defaultService,
  onClose,
}) => {
  const [name, setName] = useState('')
  const [service, setService] = useState('Belum yakin / perlu konsultasi')
  const [location, setLocation] = useState('')
  const [details, setDetails] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [summaryText, setSummaryText] = useState('')
  const [copyStatus, setCopyStatus] = useState('')
  const [isOutputVisible, setIsOutputVisible] = useState(false)
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  useEffect(() => {
    if (defaultService) {
      setService(defaultService)
    }
  }, [defaultService])

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose()
      }
    }
    if (isOpen) {
      document.body.style.overflow = 'hidden'
      window.addEventListener('keydown', handleKeyDown)
    } else {
      document.body.style.overflow = ''
      setIsOutputVisible(false)
      setError(null)
    }
    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [isOpen, onClose])

  const copyToClipboard = async (text: string) => {
    try {
      if (!navigator.clipboard?.writeText) {
        throw new Error('Clipboard API unavailable')
      }
      await navigator.clipboard.writeText(text)
      setCopyStatus('Teks tersalin ke clipboard. Kirimkan melalui kontak resmi PJP setelah tersedia.')
    } catch {
      if (textareaRef.current) {
        textareaRef.current.focus()
        textareaRef.current.select()
      }
      setCopyStatus('Clipboard otomatis tidak tersedia pada browser ini. Pilih teks di bawah lalu salin secara manual (Ctrl+C).')
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const trimmedDetails = details.trim()

    if (trimmedDetails.length < 12) {
      setError('Tulis kebutuhan proyek minimal 12 karakter agar ringkasannya berguna.')
      return
    }

    setError(null)
    const formatted = [
      'Halo Putra Jaya Pratama, saya ingin berkonsultasi mengenai pekerjaan konstruksi jalan.',
      '',
      `Nama: ${name.trim() || '(belum diisi)'}`,
      `Layanan: ${service}`,
      `Lokasi pekerjaan: ${location.trim() || '(belum diisi)'}`,
      `Kebutuhan: ${trimmedDetails}`,
      '',
      'Mohon informasi tahapan konsultasi dan kebutuhan data awal. Terima kasih.',
    ].join('\n')

    setSummaryText(formatted)
    setIsOutputVisible(true)
    await copyToClipboard(formatted)
  }

  if (!isOpen) return null

  return (
    <div
      className="pjp-modal fixed inset-0 z-[200] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm overflow-y-auto"
      role="dialog"
      aria-modal="true"
      aria-labelledby="inquiryTitle"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-xl rounded-[28px] border border-[#DED8CE] bg-[#F5F3EE] text-[#0C0D0E] p-7 sm:p-9 shadow-2xl my-8 animate-in fade-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          className="absolute top-6 right-6 w-9 h-9 rounded-full bg-[#E9E1D7] text-[#0C0D0E] flex items-center justify-center font-bold text-lg hover:bg-[#DDD1C3] transition-colors cursor-pointer"
          aria-label="Tutup formulir"
        >
          ×
        </button>

        {/* Form Header */}
        <p className="text-[10px] font-extrabold font-mono uppercase tracking-[0.16em] text-[#737A71] mb-2">
          KONSULTASI PROYEK · DEMO
        </p>

        <h2 id="inquiryTitle" className="text-3xl font-extrabold tracking-[-0.04em] text-[#0C0D0E]">
          Ceritakan kebutuhan Anda.
        </h2>

        <p className="mt-2 text-xs sm:text-sm text-[#5C645D] leading-relaxed">
          Form ini hanya membuat teks ringkasan untuk disalin.{' '}
          <strong className="text-[#0C0D0E]">Belum terhubung ke WhatsApp atau sistem pengiriman.</strong>
        </p>

        {/* Inquiry Form */}
        <form onSubmit={handleSubmit} className="mt-6 space-y-4" noValidate>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-extrabold text-[#353A35] mb-1.5">
                Nama / penanggung jawab <span className="font-normal text-[#757D74]">(opsional)</span>
              </label>
              <input
                type="text"
                maxLength={80}
                placeholder="Nama Anda"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full h-12 rounded-[14px] border border-[#C8CCC3] bg-white px-3.5 text-sm text-[#0C0D0E] focus:border-[#C96A1B] focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-extrabold text-[#353A35] mb-1.5">
                Jenis pekerjaan
              </label>
              <select
                value={service}
                onChange={(e) => setService(e.target.value)}
                className="w-full h-12 rounded-[14px] border border-[#C8CCC3] bg-white px-3 text-sm text-[#0C0D0E] focus:border-[#C96A1B] focus:outline-none"
              >
                <option value="Belum yakin / perlu konsultasi">Belum yakin / perlu konsultasi</option>
                <option value="Asphalt Hotmix">Asphalt Hotmix</option>
                <option value="Paving Block">Paving Block</option>
                <option value="Cut and Fill">Cut and Fill</option>
                <option value="Cor Beton">Cor Beton</option>
                <option value="Saluran U-Ditch">Saluran U-Ditch</option>
                <option value="Resapan Air">Resapan Air</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs font-extrabold text-[#353A35] mb-1.5">
              Lokasi area pekerjaan <span className="font-normal text-[#757D74]">(opsional)</span>
            </label>
            <input
              type="text"
              maxLength={120}
              placeholder="Mis. kawasan industri / kota"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="w-full h-12 rounded-[14px] border border-[#C8CCC3] bg-white px-3.5 text-sm text-[#0C0D0E] focus:border-[#C96A1B] focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-extrabold text-[#353A35] mb-1.5">
              Gambaran kebutuhan <span className="text-[#C02424]">*</span>
            </label>
            <textarea
              required
              rows={3}
              maxLength={900}
              placeholder="Mis. pengaspalan area parkir, perkiraan luas, kondisi lokasi saat ini..."
              value={details}
              onChange={(e) => setDetails(e.target.value)}
              className="w-full rounded-[14px] border border-[#C8CCC3] bg-white p-3.5 text-sm text-[#0C0D0E] focus:border-[#C96A1B] focus:outline-none"
            />
          </div>

          {error && (
            <p className="text-xs font-bold text-[#C02424] bg-red-100/60 p-3 rounded-xl border border-red-200">
              {error}
            </p>
          )}

          <div className="flex flex-wrap items-center justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-3 rounded-full text-xs font-extrabold text-[#525953] hover:text-[#0C0D0E] transition-colors cursor-pointer"
            >
              Batal
            </button>

            <button
              type="submit"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#0C0D0E] text-white hover:bg-[#292422] font-extrabold text-xs transition-colors cursor-pointer"
            >
              <span>Buat & Salin Ringkasan</span>
              <span aria-hidden="true">↗</span>
            </button>
          </div>

          {/* Form Output Area */}
          {isOutputVisible && (
            <div className="mt-6 pt-5 border-t border-[#DED8CE] space-y-3">
              <strong className="block text-sm font-extrabold text-[#0C0D0E]">
                Ringkasan berhasil disiapkan.
              </strong>
              <p className="text-xs text-[#525953] leading-relaxed">{copyStatus}</p>

              <textarea
                ref={textareaRef}
                rows={6}
                readOnly
                value={summaryText}
                aria-label="Ringkasan permintaan konsultasi"
                className="w-full rounded-[14px] border border-[#C8CCC3] bg-[#F3EEE7] p-3 text-xs font-mono text-[#0C0D0E] focus:outline-none"
              />

              <div className="flex justify-end">
                <button
                  type="button"
                  onClick={() => copyToClipboard(summaryText)}
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full border border-[#B5BAB0] bg-white text-xs font-extrabold text-[#0C0D0E] hover:bg-[#F5E6D9] transition-colors cursor-pointer"
                >
                  <span>Salin lagi</span>
                  <span aria-hidden="true">↗</span>
                </button>
              </div>
            </div>
          )}
        </form>
      </div>
    </div>
  )
}
