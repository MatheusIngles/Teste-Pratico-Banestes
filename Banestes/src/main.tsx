import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import Carrossel from './components/Carrossel'
import './index.css'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Carrossel />
  </StrictMode>,
)
