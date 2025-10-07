import './App.css'
import { Routes, Route, Link } from 'react-router-dom'
import MenuPage from './assets/pages/MenuPage.jsx'

function App() {
  return (
    <div className="container py-4">
      <nav className="qodeup-header">
        <div className="container-fluid">
          <Link className="qodeup-logo" to="/">
            🍕 Pizzeria Bella Vista
          </Link>
          <div className="qodeup-header-icons">
            <button className="qodeup-icon-btn qodeup-icon-allergeni" title="Allergeni">
              ⚠️
            </button>
            <button className="qodeup-icon-btn qodeup-icon-language" title="Lingua">
              🇮🇹
            </button>
          </div>
        </div>
      </nav>

      <Routes>
        <Route path="/" element={<MenuPage />} />
      </Routes>
    </div>
  )
}

export default App
