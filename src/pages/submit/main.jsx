import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import '../../index.css'
import SubmitForm from './SubmitForm.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <SubmitForm />
  </StrictMode>,
)
