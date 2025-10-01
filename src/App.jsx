import './App.css'
import { Routes, Route } from 'react-router-dom'
import HomePage from './assets/pages/HomePage.jsx'
import PizzaDetailPage from './assets/pages/PizzaDetailPage.jsx'

function App() {
  return (
    <div className="container py-4">
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/pizzas/:id" element={<PizzaDetailPage />} />
      </Routes>
    </div>
  )
}

export default App
