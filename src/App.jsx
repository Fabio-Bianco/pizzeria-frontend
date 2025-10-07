import './App.css'
import { Routes, Route } from 'react-router-dom'
import MenuPage from './assets/pages/MenuPage.jsx'

function App() {
  return (
    <div className="app-container">
      <Routes>
        <Route path="/" element={<MenuPage />} />
      </Routes>
    </div>
  )
}

export default App
