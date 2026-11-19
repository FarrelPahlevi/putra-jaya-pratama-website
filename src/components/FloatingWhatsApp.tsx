import { useEffect, useState } from 'react'
import { getWhatsAppUrl } from '../config/contact'
import './floating-whatsapp.css'

const BLOCKING_OVERLAYS = 'dialog[open], [aria-modal="true"]:not(dialog), .minimal-header--menu-open'

export function FloatingWhatsApp({ isInquiryOpen = false }: { isInquiryOpen?: boolean }) {
  const [overlayOpen, setOverlayOpen] = useState(false)

  useEffect(() => {
    const updateOverlayState = () => {
      setOverlayOpen(Boolean(document.querySelector(BLOCKING_OVERLAYS)))
    }

    updateOverlayState()
    if (typeof MutationObserver === 'undefined') return
    const observer = new MutationObserver(updateOverlayState)
    observer.observe(document.body, {
      subtree: true,
      attributes: true,
      attributeFilter: ['open', 'aria-modal', 'class'],
    })

    return () => observer.disconnect()
  }, [])

  // Ordinary sections and their containers must not hide a persistent contact shortcut.
  // Only actual blocking UI (modal dialogs and open navigation) suppresses interaction.
  const blocked = isInquiryOpen || overlayOpen

  return (
    <div className="pjp-floating-contact" data-visible={!blocked} data-blocked={blocked} inert={blocked}>
      <a className="pjp-floating-contact__link" href={getWhatsAppUrl()} target="_blank" rel="noopener noreferrer"
        aria-label="Chat WhatsApp Putra Jaya Pratama (buka tab baru)">
        <img src="/assets/whatsapp.svg" width="28" height="28" alt="" aria-hidden="true" />
        <span>Chat WhatsApp</span>
      </a>
    </div>
  )
}
