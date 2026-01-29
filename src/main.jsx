import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import './styles/consolidated.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import App from './App.jsx'
import { PizzeriaProvider } from './assets/contexts/PizzeriaContext.jsx'
import { BrowserRouter } from 'react-router-dom'

const AppWithRouter = () => (
  <BrowserRouter>
    <PizzeriaProvider>
      <App />
    </PizzeriaProvider>
  </BrowserRouter>
)

createRoot(document.getElementById('root')).render(
  import.meta.env.DEV ? (
    <StrictMode>
      <AppWithRouter />
    </StrictMode>
  ) : (
    <AppWithRouter />
  )
)
