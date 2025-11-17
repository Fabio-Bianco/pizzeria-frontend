import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import 'bootstrap/dist/css/bootstrap.min.css'
import { PizzeriaProvider } from './assets/contexts/PizzeriaContext.jsx'
import { BrowserRouter } from 'react-router-dom'
import './styles/modern-redesign-2025.css'
import './styles/header-labels.css'
import './styles/menu-uniform-modern.css'
import './styles/micro-interactions.css'
import './styles/modern-badges.css'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <PizzeriaProvider>
        <App />
      </PizzeriaProvider>
    </BrowserRouter>
  </StrictMode>,
)
