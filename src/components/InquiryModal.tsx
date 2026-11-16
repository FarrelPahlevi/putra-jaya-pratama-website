import React, { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { ArrowUpRight, X } from 'lucide-react'
import { SERVICES_LIST } from '../data/mockData'
import { getWhatsAppUrl } from '../config/contact'
import { keepDialogFocus } from '../utils/focus'
import { buildInquiryMessage, INQUIRY_LIMITS, UNKNOWN_SERVICE, validateInquiry } from '../utils/inquiry'
import type { InquiryErrors, InquiryFields } from '../utils/inquiry'

interface InquiryModalProps {
  isOpen: boolean
  defaultService?: string
  onClose: () => void
}

const serviceChoices = [UNKNOWN_SERVICE, ...SERVICES_LIST.map(service => service.title)]

export const InquiryModal: React.FC<InquiryModalProps> = ({ isOpen, defaultService, onClose }) => {
  const [fields, setFields] = useState<InquiryFields>({ name: '', service: UNKNOWN_SERVICE, location: '', area: '', timing: '', details: '' })
  const [errors, setErrors] = useState<InquiryErrors>({})
  const [summaryText, setSummaryText] = useState('')
  const [status, setStatus] = useState('')
  const [copyAttempted, setCopyAttempted] = useState(false)
  const [isCopying, setIsCopying] = useState(false)
  const dialogRef = useRef<HTMLDialogElement>(null)
  const textareaRef = useRef<HTMLTextAreaElement>(null)
  const outputRef = useRef<HTMLDivElement>(null)
  const copyRequest = useRef(0)

  useLayoutEffect(() => {
    if (!isOpen) return
    copyRequest.current++
    setIsCopying(false)
    setSummaryText('')
    setErrors({})
    setStatus('')
    setCopyAttempted(false)
    if (defaultService && serviceChoices.includes(defaultService)) {
      setFields(previous => ({ ...previous, service: defaultService }))
    }
  }, [isOpen, defaultService])

  useEffect(() => {
    const dialog = dialogRef.current
    if (!dialog || !isOpen) return
    const trigger = document.activeElement instanceof HTMLElement ? document.activeElement : null
    const previousOverflow = document.body.style.overflow
    dialog.showModal()
    document.body.style.overflow = 'hidden'
    return () => {
      copyRequest.current++
      dialog.close()
      document.body.style.overflow = previousOverflow
      const toggle = document.querySelector<HTMLElement>('.minimal-mobile-toggle')
      const returnTarget = trigger?.isConnected && trigger !== document.body
        ? trigger
        : toggle?.getClientRects().length ? toggle : document.querySelector<HTMLElement>('.minimal-brand[href]')
      returnTarget?.focus({ preventScroll: true })
    }
  }, [isOpen, defaultService])

  const changeField = (key: keyof InquiryFields, value: string) => {
    copyRequest.current++
    setIsCopying(false)
    setFields(previous => ({ ...previous, [key]: value }))
    setErrors(previous => ({ ...previous, [key]: undefined }))
    setSummaryText('')
    setStatus('')
    setCopyAttempted(false)
  }

  const prepareMessage = () => {
    const nextErrors = validateInquiry(fields, serviceChoices)
    setErrors(nextErrors)
    const firstInvalid = (['name', 'service', 'location'] as const).find(key => nextErrors[key])
    if (firstInvalid) {
      const control = dialogRef.current?.querySelector<HTMLElement>(`[name="${firstInvalid}"]`)
      control?.focus({ preventScroll: true })
      requestAnimationFrame(() => {
        const dialog = dialogRef.current
        const field = control?.closest('.inquiry-field')
        if (!dialog?.open || !field) return
        const top = field.getBoundingClientRect().top - dialog.getBoundingClientRect().top + dialog.scrollTop - 24
        dialog.scrollTo({ top: Math.max(0, top), behavior: 'instant' })
      })
      return null
    }
    const message = buildInquiryMessage(fields)
    setSummaryText(message)
    return message
  }

  const revealSummary = () => requestAnimationFrame(() => outputRef.current?.scrollIntoView({ block: 'nearest', behavior: 'auto' }))

  const copyToClipboard = async (text: string) => {
    const request = ++copyRequest.current
    setIsCopying(true)
    setCopyAttempted(true)
    try {
      if (!navigator.clipboard?.writeText) throw new Error('Clipboard unavailable')
      await navigator.clipboard.writeText(text)
      if (request === copyRequest.current) setStatus('Ringkasan sudah disalin. Anda bisa menempelkannya di WhatsApp PJP.')
    } catch {
      if (request === copyRequest.current) {
        setStatus('Penyalinan otomatis belum berhasil. Pilih teks ringkasan, lalu salin lewat menu perangkat atau tekan Ctrl+C.')
        requestAnimationFrame(() => {
          textareaRef.current?.focus()
          textareaRef.current?.select()
        })
      }
    } finally {
      if (request === copyRequest.current) setIsCopying(false)
    }
  }

  const handleCopy = async () => {
    if (isCopying) return
    const message = prepareMessage()
    if (!message) return
    revealSummary()
    await copyToClipboard(message)
  }

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault()
    if (isCopying) return
    const message = prepareMessage()
    if (!message) return
    setCopyAttempted(false)
    setStatus('Pesan sudah disiapkan. Periksa dan kirim di WhatsApp. Jika WhatsApp tidak terbuka, pilih Buka WhatsApp atau Salin Ringkasan.')
    // Keep the handoff synchronous with the user's submit gesture.
    try { window.open(getWhatsAppUrl(message), '_blank', 'noopener,noreferrer') } catch { /* The native link below remains available. */ }
    revealSummary()
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
            <p className="inquiry-dialog__eyebrow">Konsultasi proyek</p>
            <h2 id="inquiryTitle">Ceritakan kebutuhan Anda.</h2>
          </div>
          <button type="button" className="inquiry-dialog__close" onClick={onClose} aria-label="Tutup formulir"><X size={22} aria-hidden="true" /></button>
        </div>
        <p id="inquiryDescription" className="inquiry-dialog__description">
          Isi kebutuhan pekerjaan, lalu lanjutkan ke WhatsApp PJP.{' '}
          <strong>Anda tetap memeriksa dan mengirim pesannya di WhatsApp.</strong>
        </p>

        <form onSubmit={handleSubmit} className="inquiry-form" noValidate>
          <div className="inquiry-form__row">
            <div className="inquiry-field">
              <label htmlFor="inquiry-name">Nama atau penanggung jawab <span className="inquiry-field__required">(wajib)</span></label>
              <input id="inquiry-name" name="name" type="text" autoComplete="name" autoFocus required
                maxLength={INQUIRY_LIMITS.name} placeholder="Nama Anda" value={fields.name} onChange={event => changeField('name', event.target.value)}
                aria-invalid={errors.name ? true : undefined} aria-describedby={errors.name ? 'inquiry-name-error' : undefined} />
              {errors.name && <p id="inquiry-name-error" className="inquiry-field__error" role="alert">{errors.name}</p>}
            </div>
            <div className="inquiry-field">
              <label htmlFor="inquiry-service">Jenis pekerjaan <span className="inquiry-field__required">(wajib)</span></label>
              <select id="inquiry-service" name="service" required value={fields.service} onChange={event => changeField('service', event.target.value)}
                aria-invalid={errors.service ? true : undefined} aria-describedby={errors.service ? 'inquiry-service-error' : undefined}>
                <option value={UNKNOWN_SERVICE}>{UNKNOWN_SERVICE}</option>
                {SERVICES_LIST.map(item => <option key={item.id} value={item.title}>{item.title}</option>)}
              </select>
              {errors.service && <p id="inquiry-service-error" className="inquiry-field__error" role="alert">{errors.service}</p>}
            </div>
          </div>
          <div className="inquiry-field">
            <label htmlFor="inquiry-location">Lokasi pekerjaan <span className="inquiry-field__required">(wajib)</span></label>
            <input id="inquiry-location" name="location" type="text" required maxLength={INQUIRY_LIMITS.location}
              placeholder="Kawasan atau kota" value={fields.location} onChange={event => changeField('location', event.target.value)}
              aria-invalid={errors.location ? true : undefined} aria-describedby={errors.location ? 'inquiry-location-error' : undefined} />
            {errors.location && <p id="inquiry-location-error" className="inquiry-field__error" role="alert">{errors.location}</p>}
          </div>
          <div className="inquiry-form__row">
            <div className="inquiry-field">
              <label htmlFor="inquiry-area">Perkiraan luas atau ukuran <span>(opsional)</span></label>
              <input id="inquiry-area" name="area" type="text" maxLength={INQUIRY_LIMITS.area}
                placeholder="Contoh: 500 m²" value={fields.area} onChange={event => changeField('area', event.target.value)} />
            </div>
            <div className="inquiry-field">
              <label htmlFor="inquiry-timing">Rencana waktu pengerjaan <span>(opsional)</span></label>
              <input id="inquiry-timing" name="timing" type="text" maxLength={INQUIRY_LIMITS.timing}
                placeholder="Contoh: bulan depan" value={fields.timing} onChange={event => changeField('timing', event.target.value)} />
            </div>
          </div>
          <div className="inquiry-field">
            <label htmlFor="inquiry-details">Keterangan tambahan <span>(opsional)</span></label>
            <textarea id="inquiry-details" name="details" rows={3} maxLength={INQUIRY_LIMITS.details}
              placeholder="Contoh: jalan akses gudang untuk kendaraan berat."
              value={fields.details} onChange={event => changeField('details', event.target.value)} />
          </div>
          <div className="inquiry-form__actions">
            <button type="submit" className="inquiry-button inquiry-button--primary" disabled={isCopying}>
              Kirim via WhatsApp <ArrowUpRight size={17} aria-hidden="true" />
            </button>
            <button type="button" className="inquiry-button inquiry-button--secondary" disabled={isCopying} aria-busy={isCopying} onClick={handleCopy}>
              {isCopying ? 'Menyalin ringkasan...' : 'Salin Ringkasan'}
            </button>
            <button type="button" className="inquiry-button inquiry-button--secondary" onClick={onClose}>Batal</button>
          </div>
          <p className="inquiry-form__status" role="status" aria-atomic="true">{status}</p>
          {summaryText && (
            <div ref={outputRef} className="inquiry-output">
              <h3>Ringkasan konsultasi Anda</h3>
              <div className="inquiry-field">
                <label htmlFor="inquiry-summary">Ringkasan untuk konsultasi</label>
                <textarea ref={textareaRef} id="inquiry-summary" rows={6} readOnly value={summaryText} />
              </div>
              <a className="inquiry-button inquiry-button--primary" href={getWhatsAppUrl(summaryText)} target="_blank" rel="noopener noreferrer">
                Buka WhatsApp <ArrowUpRight size={17} aria-hidden="true" />
              </a>
              {copyAttempted && <button type="button" className="inquiry-button inquiry-button--secondary" disabled={isCopying}
                onClick={() => copyToClipboard(summaryText)}>Salin lagi</button>}
            </div>
          )}
        </form>
      </div>
    </dialog>
  )
}
