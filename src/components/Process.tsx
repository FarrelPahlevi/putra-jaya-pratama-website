import React from 'react'
import { ArrowUpRight } from 'lucide-react'
import { PROCESS_STEPS } from '../data/mockData'

export const Process: React.FC = () => {
  return (
    <section className="pjp-process pjp-section" id="proses" aria-labelledby="process-title">
      <div className="site-container pjp-process__layout">
        <div className="pjp-process__intro">
          <div className="pjp-eyebrow pjp-eyebrow--light">02 / Cara bekerja</div>
          <h2 className="pjp-h2" id="process-title" style={{ marginTop: 20 }}>Dimulai dari<br />rencana.<br /><span style={{ color: '#e58a2a' }}>Bukan tebakan.</span></h2>
          <p className="pjp-copy" style={{ marginTop: 23 }}>
            Setiap lokasi punya kebutuhan berbeda. Alur awal ini membantu menyamakan ekspektasi sebelum pelaksanaan.
          </p>
          <div className="pjp-process__tag"><span>DISKUSI</span><b>→</b><span>RENCANA</span><b>→</b><span>HASIL</span></div>
        </div>
        <div className="pjp-steps">
          {PROCESS_STEPS.map((step) => (
            <div className="pjp-step" key={step.number}>
              <span className="pjp-step__number">{step.number}</span>
              <div><h3>{step.title}</h3><p>{step.description}</p></div>
              <ArrowUpRight className="pjp-step__arrow" aria-hidden="true" />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
