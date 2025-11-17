import './App.css'
import { Routes, Route } from 'react-router-dom'
import MenuPage from './assets/pages/MenuPage.jsx'
import { ToastProvider } from './contexts/ToastContext.jsx'
import ErrorBoundary from './assets/components/ErrorBoundary.jsx'

function App() {
  return (
    <ErrorBoundary>
      <ToastProvider>
        <div className="app-container dark-mode-ready">
          {/* ♿ Skip to content link - WCAG AAA requirement */}
          <a href="#main-content" className="skip-to-content">
            Salta al contenuto principale
          </a>
          
          {/* 🎯 Main application content */}
          <main id="main-content" className="app-main" role="main">
            <Routes>
              <Route path="/" element={<MenuPage />} />
            </Routes>
          </main>
        </div>
      </ToastProvider>
    </ErrorBoundary>
  )
}

export default App
