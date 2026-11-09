import React, { useState } from 'react'
import './minimal-industrial.css'
import { MinimalIndustrial } from './MinimalIndustrial'
import { InquiryModal } from './components/InquiryModal'

export const App: React.FC = () => {
  const [isInquiryOpen, setIsInquiryOpen] = useState(false)
  const [defaultInquiryService, setDefaultInquiryService] = useState<string | undefined>()

  const handleOpenInquiry = (serviceName?: string) => {
    setDefaultInquiryService(serviceName)
    setIsInquiryOpen(true)
  }

  return (
    <>
      <MinimalIndustrial onOpenInquiry={handleOpenInquiry} />
      <InquiryModal isOpen={isInquiryOpen}
        defaultService={defaultInquiryService}
        onClose={() => setIsInquiryOpen(false)}
      />
    </>
  )
}

export default App
