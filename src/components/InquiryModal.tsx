import React, { useEffect, useRef, useState } from 'react'
import { ArrowUpRight, X } from 'lucide-react'
import { SERVICES_LIST } from '../data/mockData'
import { keepDialogFocus } from '../utils/focus'

interface InquiryModalProps {
  isOpen: boolean
  defaultService?: string
  onClose: () => void
}

export const InquiryModal: React.FC<InquiryModalProps> = ({ isOpen, defaultService, onClose }) => {
  const [name, setName] = useState('')
  const [service, setService] = useState('Belum yakin / perlu konsultasi')
  const [location, setLocation] = useState('')
  const [details, setDetails] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [summaryText, setSummaryText] = useState('')
  const [copyStatus, setCopyStatus] = useState('')
  const [isOutputVisible, setIsOutputVisible] = useState(false)
  const [isCopying, setIsCopying] = useState(false)
  const dialogRef = useRef<HTMLDialogElement>(null)
  const detailsRef = useRef<HTMLTextAreaElement>(null)
  const textareaRef = useRef<HTMLTextAreaElement>(null)
  const outputRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (defaultService) setService(defaultService)
  }, [defaultService])

  useEffect(() => {
    const dialog = dialogRef.current
    if (!dialog || !isOpen) return
    const trigger = document.activeElement instanceof HTMLElement ? document.activeElement : null
    const previousOverflow = document.body.style.overflow
    setIsOutputVisible(false)
    setError(null)
    setCopyStatus('')
    dialog.showModal()
    document.body.style.overflow = 'hidden'
    return () => {
      dialog.close()
      document.body.style.overflow = previousOverflow
      trigger?.focus({ preventScroll: true })
    }
  }, [isOpen])

  const copyToClipboard = async (text: string) => {
    setIsCopying(true)
    try {
      if (!navigator.clipboard?.writeText) throw new Error('Clipboard unavailable')
      await navigator.clipboard.writeText(text)
      setCopyStatus('Ringkasan sudah disalin. Anda bisa mengirimkannya saat kontak resmi PJP tersedia.')
    } catch {
      setCopyStatus('Penyalinan otomatis belum berhasil. Pilih teks ringkasan, lalu salin lewat menu perangkat atau tekan Ctrl+C.')
      requestAnimationFrame(() => {
        textareaRef.current?.focus()
        textareaRef.current?.select()
      })
    } finally {
      setIsCopying(false)
    }
  }

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault()
    if (isCopying) return
    const trimmedDetails = details.trim()
    if (trimmedDetails.length < 12) {
      setError('Ceritakan rencana pekerjaan Anda dalam minimal 12 karakter.')
      detailsRef.current?.focus()
      return
    }
    setError(null)
    const formatted = [
      'Halo Putra Jaya Pratama, saya ingin membahas rencana pekerjaan berikut.',
      '',
      `Nama: ${name.trim() || '(belum diisi)'}`,
      `Layanan: ${service}`,
      `Lokasi pekerjaan: ${location.trim() || '(belum diisi)'}`,
      `Rencana pekerjaan: ${trimmedDetails}`,
      '',
      'Mohon arahan untuk langkah berikutnya dan informasi yang perlu saya siapkan. Terima kasih.',
    ].join('\n')
    setSummaryText(formatted)
    setIsOutputVisible(true)
    await copyToClipboard(formatted)
    requestAnimationFrame(() => outputRef.current?.scrollIntoView({ block: 'nearest', behavior: 'auto' }))
  }

  return (
    <dialog ref={dialogRef} className="pjp-modal inquiry-dialog"
      aria-labelledby="inquiryTitle" aria-describedby="inquiryDescription"
      onKeyDown={keepDialogFocus}
      onCancel={event => { event.preventDefault(); onClose() }}
      onClick={event => { if (event.target === event.currentTarget) onClose() }}>
      <div className="inquiry-dialog__inner">
        <div className="inquiry-dialog__heading">
          <div>
            <p className="inquiry-dialog__eyebrow">Persiapan konsultasi · Pratinjau</p>
            <h2 id="inquiryTitle">Ceritakan kebutuhan Anda.</h2>
          </div>
          <button type="button" className="inquiry-dialog__close" onClick={onClose} aria-label="Tutup formulir">
            <X size={22} aria-hidden="true" />
          </button>
        </div>
        <p id="inquiryDescription" className="inquiry-dialog__description">
          Isi rencana pekerjaan Anda, lalu salin ringkasannya.{' '}
          <strong>Formulir ini tidak mengirim pesan ke PJP atau WhatsApp.</strong>
        </p>

        <form onSubmit={handleSubmit} className="inquiry-form" noValidate>
          <div className="inquiry-form__row">
            <div className="inquiry-field">
              <label htmlFor="inquiry-name">Nama atau penanggung jawab <span>(opsional)</span></label>
              <input id="inquiry-name" name="name" type="text" autoComplete="name" autoFocus
                maxLength={80} placeholder="Nama Anda" value={name} onChange={event => setName(event.target.value)} />
            </div>
            <div className="inquiry-field">
              <label htmlFor="inquiry-service">Jenis pekerjaan</label>
              <select id="inquiry-service" name="service" value={service} onChange={event => setService(event.target.value)}>
                <option value="Belum yakin / perlu konsultasi">Belum yakin / perlu konsultasi</option>
                {SERVICES_LIST.map(item => <option key={item.id} value={item.title}>{item.title}</option>)}
              </select>
            </div>
          </div>
          <div className="inquiry-field">
            <label htmlFor="inquiry-location">Lokasi pekerjaan <span>(opsional)</span></label>
            <input id="inquiry-location" name="location" type="text" maxLength={120}
              placeholder="Kawasan industri atau kota" value={location} onChange={event => setLocation(event.target.value)} />
          </div>
          <div className="inquiry-field">
            <label htmlFor="inquiry-details">Rencana pekerjaan <span className="inquiry-field__required">(wajib)</span></label>
            <textarea ref={detailsRef} id="inquiry-details" name="details" required rows={3} minLength={12} maxLength={900}
              aria-invalid={error ? true : undefined} aria-describedby={error ? 'inquiry-hint inquiry-error' : 'inquiry-hint'}
              placeholder="Contoh: pengaspalan area parkir. Sertakan perkiraan luas dan kondisi lokasi saat ini."
              value={details} onChange={event => {
                setDetails(event.target.value)
                if (error && event.target.value.trim().length >= 12) setError(null)
              }} />
            <p id="inquiry-hint" className="inquiry-field__hint">Tulis minimal 12 karakter. Ceritakan kondisi lokasi dan pekerjaan yang Anda butuhkan.</p>
            {error && <p id="inquiry-error" className="inquiry-field__error" role="alert">{error}</p>}
          </div>
          <div className="inquiry-form__actions">
            <button type="button" className="inquiry-button inquiry-button--secondary" onClick={onClose}>Batal</button>
            <button type="submit" className="inquiry-button inquiry-button--primary" disabled={isCopying} aria-busy={isCopying}>
              {isCopying ? 'Menyalin ringkasan...' : 'Buat dan salin ringkasan'} <ArrowUpRight size={17} aria-hidden="true" />
            </button>
          </div>
          <p className="inquiry-form__status" role="status" aria-atomic="true">{copyStatus}</p>
          {isOutputVisible && (
            <div ref={outputRef} className="inquiry-output">
              <h3>Ringkasan Anda sudah siap.</h3>
              <div className="inquiry-field">
                <label htmlFor="inquiry-summary">Ringkasan untuk konsultasi</label>
                <textarea ref={textareaRef} id="inquiry-summary" rows={6} readOnly value={summaryText} />
              </div>
              <button type="button" className="inquiry-button inquiry-button--secondary" disabled={isCopying}
                onClick={() => copyToClipboard(summaryText)}>Salin lagi <ArrowUpRight size={17} aria-hidden="true" /></button>
            </div>
          )}
        </form>
      </div>
    </dialog>
  )
}
