import React, { useState } from 'react'
import './minimal-industrial.css'
import { MinimalIndustrial } from './MinimalIndustrial'
import { InfoModal } from './components/InfoModal'
import { InquiryModal } from './components/InquiryModal'
import type { ServiceItem } from './types'

export const App: React.FC = () => {
  const [selectedService, setSelectedService] = useState<ServiceItem | null>(null)
  const [isInquiryOpen, setIsInquiryOpen] = useState(false)
  const [defaultInquiryService, setDefaultInquiryService] = useState<string | undefined>()

  const handleOpenInquiry = (serviceName?: string) => {
    setDefaultInquiryService(serviceName)
    setIsInquiryOpen(true)
  }

  return (
    <>
      <MinimalIndustrial
        onSelectService={setSelectedService}
        onOpenInquiry={handleOpenInquiry}
      />
      <InfoModal service={selectedService}
        onClose={() => setSelectedService(null)}
        onDiscuss={(serviceName) => {
          setSelectedService(null)
          handleOpenInquiry(serviceName)
        }}
      />
      <InquiryModal isOpen={isInquiryOpen}
        defaultService={defaultInquiryService}
        onClose={() => setIsInquiryOpen(false)}
      />
    </>
  )
}

export default App
