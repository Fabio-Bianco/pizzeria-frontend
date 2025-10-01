import './App.css'
import { Routes, Route, Link } from 'react-router-dom'
import HomePage from './assets/pages/HomePage.jsx'
import MenuPage from './assets/pages/MenuPage.jsx'
import PizzaDetailPage from './assets/pages/PizzaDetailPage.jsx'

function App() {
  return (
    <div className="container py-4">
      <nav className="navbar navbar-expand-lg navbar-light bg-light mb-4 rounded">
        <div className="container-fluid">
          <Link className="navbar-brand" to="/">🍕 Pizzeria</Link>
          <div className="navbar-nav">
            <Link className="nav-link" to="/">Home</Link>
            <Link className="nav-link" to="/menu">Menu Completo</Link>
          </div>
        </div>
      </nav>

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/menu" element={<MenuPage />} />
        <Route path="/pizzas/:id" element={<PizzaDetailPage />} />
      </Routes>
    </div>
  )
}

export default App
