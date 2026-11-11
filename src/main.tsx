import { StrictMode } from 'react'
import { createRoot, hydrateRoot } from 'react-dom/client'
import './index.css'
import App from './App'

const rootElement = document.getElementById('root')

if (rootElement) {
  const application = (
    <StrictMode>
      <App />
    </StrictMode>
  )
  if (rootElement.hasChildNodes()) hydrateRoot(rootElement, application)
  else createRoot(rootElement).render(application)
}
