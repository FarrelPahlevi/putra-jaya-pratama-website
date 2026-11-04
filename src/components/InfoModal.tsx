import React, { useEffect } from 'react'
import type { ServiceItem } from '../types'

interface InfoModalProps {
  service: ServiceItem | null
  onClose: () => void
  onDiscuss: (serviceName: string) => void
}

export const InfoModal: React.FC<InfoModalProps> = ({
  service,
  onClose,
  onDiscuss,
}) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && service) {
        onClose()
      }
    }
    if (service) {
      document.body.style.overflow = 'hidden'
      window.addEventListener('keydown', handleKeyDown)
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [service, onClose])

  if (!service) return null

  return (
    <div
      className="pjp-modal fixed inset-0 z-[200] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
      aria-labelledby="infoTitle"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-lg rounded-[28px] border border-[#DED8CE] bg-[#F5F3EE] text-[#0C0D0E] p-7 sm:p-9 shadow-2xl animate-in fade-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          className="absolute top-6 right-6 w-9 h-9 rounded-full bg-[#E9E1D7] text-[#0C0D0E] flex items-center justify-center font-bold text-lg hover:bg-[#DDD1C3] transition-colors cursor-pointer"
          aria-label="Tutup panel"
        >
          ×
        </button>

        {/* Eyebrow */}
        <p className="text-[10px] font-extrabold font-mono uppercase tracking-[0.16em] text-[#737A71] mb-2">
          RINCIAN LAYANAN
        </p>

        {/* Title */}
        <h2 id="infoTitle" className="text-3xl font-extrabold tracking-[-0.04em] text-[#0C0D0E]">
          {service.title}
        </h2>

        {/* Description */}
        <p className="mt-4 text-sm sm:text-base text-[#4C534D] leading-[1.65]">
          {service.detailText}
        </p>

        {/* Callout Notice */}
        <div className="mt-6 rounded-2xl bg-[#F5E6D9] border border-[#E3CBB8] p-4 text-xs text-[#525953] leading-relaxed">
          Detail teknis, spesifikasi pekerjaan, dan foto proyek akan dilengkapi menggunakan data
          PJP yang terverifikasi.
        </div>

        {/* Actions */}
        <div className="mt-8 flex flex-wrap items-center justify-end gap-3 pt-4 border-t border-[#DED8CE]">
          <button
            type="button"
            onClick={onClose}
            className="px-5 py-3 rounded-full text-xs font-extrabold text-[#525953] hover:text-[#0C0D0E] transition-colors cursor-pointer"
          >
            Tutup
          </button>

          <button
            type="button"
            onClick={() => {
              onClose()
              onDiscuss(service.title)
            }}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#0C0D0E] text-white hover:bg-[#292422] font-extrabold text-xs transition-colors cursor-pointer"
          >
            <span>Diskusikan layanan</span>
            <span aria-hidden="true">↗</span>
          </button>
        </div>
      </div>
    </div>
  )
}
