import React, { useState } from 'react'
import './minimal-industrial.css'
import './project-gallery.css'
import { MinimalIndustrial } from './MinimalIndustrial'
import { GalleryPage } from './GalleryPage'
import { InquiryModal } from './components/InquiryModal'

export const App: React.FC = () => {
  const [isInquiryOpen, setIsInquiryOpen] = useState(false)
  const [defaultInquiryService, setDefaultInquiryService] = useState<string | undefined>()
  const galleryPage = window.location.pathname.replace(/\/+$/, '') === '/galeri-proyek'

  const handleOpenInquiry = (serviceName?: string) => {
    setDefaultInquiryService(serviceName)
    setIsInquiryOpen(true)
  }

  return (
    <>
      {galleryPage
        ? <GalleryPage onOpenInquiry={handleOpenInquiry} />
        : <MinimalIndustrial onOpenInquiry={handleOpenInquiry} />
      }
      <InquiryModal isOpen={isInquiryOpen}
        defaultService={defaultInquiryService}
        onClose={() => setIsInquiryOpen(false)}
      />
    </>
  )
}

export default App
