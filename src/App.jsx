import './App.css'
import { Routes, Route, Link, NavLink } from 'react-router-dom'
import HomePage from './assets/pages/HomePage.jsx'
import MenuPage from './assets/pages/MenuPage.jsx'
import PizzaDetailPage from './assets/pages/PizzaDetailPage.jsx'

function App() {
  return (
    <>
      <nav className="navbar navbar-expand-lg bg-body-tertiary mb-4">
        <div className="container">
          <Link className="navbar-brand" to="/">Pizzeria</Link>
          <div className="collapse navbar-collapse">
            <ul className="navbar-nav me-auto">
              <li className="nav-item">
                <NavLink className="nav-link" to="/">Home</NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/menu">Menu</NavLink>
              </li>
            </ul>
          </div>
        </div>
      </nav>
      <div className="container">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/menu" element={<MenuPage />} />
          <Route path="/pizzas/:id" element={<PizzaDetailPage />} />
        </Routes>
      </div>
    </>
  )
}

export default App
