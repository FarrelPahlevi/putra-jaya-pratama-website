import React from 'react'
import { SERVICES_LIST } from '../data/mockData'

export const Ticker: React.FC = () => (
  <div className="pjp-service-strip" aria-label="Enam jenis layanan PJP">
    <div className="site-container pjp-service-strip__inner">
      {SERVICES_LIST.map((service, index) => (
        <React.Fragment key={service.id}>
          {index > 0 && <b aria-hidden="true">✳</b>}
          <span>{service.title}</span>
        </React.Fragment>
      ))}
    </div>
  </div>
)
