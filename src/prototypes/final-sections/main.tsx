import { StrictMode } from 'react'
import { createRoot, hydrateRoot } from 'react-dom/client'
import '../../index.css'
import '../../minimal-industrial.css'
import '../../inquiry-modal.css'
import { FinalSectionsPrototype } from './FinalSectionsPrototype'

const root = document.getElementById('root')!
const application = <StrictMode><FinalSectionsPrototype /></StrictMode>
if (root.hasChildNodes()) hydrateRoot(root, application)
else createRoot(root).render(application)
