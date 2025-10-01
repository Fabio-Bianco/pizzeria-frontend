import { useEffect, useMemo, useState } from 'react'
import { usePizzeria } from '../contexts/PizzeriaContext'
import PizzaCard from '../components/PizzaCard'

export default function MenuPage() {
	const { categories, pizzas, loading, error, refetch } = usePizzeria()
	const [activeCategory, setActiveCategory] = useState('all')

		useEffect(() => {
		// assicurati che le pizze siano aggiornate quando cambia il filtro (se il backend supporta filtro server side, passare params)
			if (activeCategory === 'all') refetch.pizzas()
			else refetch.pizzas({ category: activeCategory })
		}, [activeCategory, refetch])

	const filtered = useMemo(() => {
		if (activeCategory === 'all') return pizzas
		// fallback filtro client
		return (pizzas || []).filter((p) => (p.categories || []).some((c) => String(c.id) === String(activeCategory)))
	}, [pizzas, activeCategory])

	return (
		<div className="menu-page">
			<div className="d-flex align-items-center gap-2 mb-3 flex-wrap">
				<button className={`btn btn-sm ${activeCategory === 'all' ? 'btn-primary' : 'btn-outline-primary'}`} onClick={() => setActiveCategory('all')}>Tutte</button>
				{categories?.map((c) => (
					<button key={c.id} className={`btn btn-sm ${String(activeCategory) === String(c.id) ? 'btn-primary' : 'btn-outline-primary'}`} onClick={() => setActiveCategory(c.id)}>{c.name}</button>
				))}
			</div>

			{loading.pizzas && <div className="alert alert-info">Caricamento pizze...</div>}
			{error.pizzas && <div className="alert alert-danger">Errore nel caricamento pizze</div>}

			<div className="row g-3">
				{filtered?.map((pizza) => (
					<div key={pizza.id} className="col-12 col-md-6 col-lg-4">
						<PizzaCard pizza={pizza} />
					</div>
				))}
			</div>
		</div>
	)
}
