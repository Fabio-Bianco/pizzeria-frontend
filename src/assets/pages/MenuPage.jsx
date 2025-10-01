import { useEffect, useMemo, useState } from 'react'
import { usePizzeria } from '../contexts/PizzeriaContext'
import PizzaCard from '../components/PizzaCard'
import AppetizerCard from '../components/AppetizerCard'
import BeverageCard from '../components/BeverageCard'

export default function MenuPage() {
	const { categories, pizzas, appetizers, beverages, loading, error, initialized, refetch } = usePizzeria()
	const [activeCategory, setActiveCategory] = useState('all')
	const [activeSection, setActiveSection] = useState('pizzas') // pizzas, appetizers, beverages

	useEffect(() => {
		// Solo fetch se non sono ancora stati inizializzati
		if (activeSection === 'pizzas' && !initialized.pizzas) {
			refetch.pizzas()
		} else if (activeSection === 'appetizers' && !initialized.appetizers) {
			refetch.appetizers()
		} else if (activeSection === 'beverages' && !initialized.beverages) {
			refetch.beverages()
		}
	}, [activeSection, initialized.pizzas, initialized.appetizers, initialized.beverages, refetch])

	// Effetto separato per i filtri delle pizze
	useEffect(() => {
		if (activeSection === 'pizzas' && activeCategory !== 'all') {
			// Per ora filtriamo lato client, in futuro si può implementare filtro server-side
			// refetch.pizzas({ category: activeCategory }, true)
		}
	}, [activeCategory, activeSection])

	const filtered = useMemo(() => {
		if (activeSection === 'pizzas') {
			if (activeCategory === 'all') return pizzas
			// fallback filtro client per pizze
			return (pizzas || []).filter((p) => (p.categories || []).some((c) => String(c.id) === String(activeCategory)))
		} else if (activeSection === 'appetizers') {
			return appetizers || []
		} else if (activeSection === 'beverages') {
			return beverages || []
		}
		return []
	}, [pizzas, appetizers, beverages, activeCategory, activeSection])

	return (
		<div className="menu-page">
			{/* Sezioni del menu */}
			<div className="d-flex align-items-center gap-2 mb-4 flex-wrap">
				<button className={`btn ${activeSection === 'pizzas' ? 'btn-primary' : 'btn-outline-primary'}`} onClick={() => setActiveSection('pizzas')}>
					Pizze
				</button>
				<button className={`btn ${activeSection === 'appetizers' ? 'btn-primary' : 'btn-outline-primary'}`} onClick={() => setActiveSection('appetizers')}>
					Antipasti
				</button>
				<button className={`btn ${activeSection === 'beverages' ? 'btn-primary' : 'btn-outline-primary'}`} onClick={() => setActiveSection('beverages')}>
					Bevande
				</button>
			</div>

			{/* Filtri per categorie (solo per le pizze) */}
			{activeSection === 'pizzas' && (
				<div className="d-flex align-items-center gap-2 mb-3 flex-wrap">
					<button className={`btn btn-sm ${activeCategory === 'all' ? 'btn-primary' : 'btn-outline-primary'}`} onClick={() => setActiveCategory('all')}>Tutte</button>
					{categories?.map((c) => (
						<button key={c.id} className={`btn btn-sm ${String(activeCategory) === String(c.id) ? 'btn-primary' : 'btn-outline-primary'}`} onClick={() => setActiveCategory(c.id)}>{c.name}</button>
					))}
				</div>
			)}

			{/* Loading e errori */}
			{loading[activeSection] && !initialized[activeSection] && (
				<div className="alert alert-info">
					Caricamento {activeSection === 'pizzas' ? 'pizze' : activeSection === 'appetizers' ? 'antipasti' : 'bevande'}...
				</div>
			)}
			{error[activeSection] && <div className="alert alert-danger">Errore nel caricamento {activeSection === 'pizzas' ? 'pizze' : activeSection === 'appetizers' ? 'antipasti' : 'bevande'}</div>}

			{/* Griglia dei prodotti */}
			<div className="row g-3">
				{filtered?.map((item) => (
					<div key={item.id} className="col-12 col-md-6 col-lg-4">
						{activeSection === 'pizzas' && <PizzaCard pizza={item} />}
						{activeSection === 'appetizers' && <AppetizerCard appetizer={item} />}
						{activeSection === 'beverages' && <BeverageCard beverage={item} />}
					</div>
				))}
				{initialized[activeSection] && filtered?.length === 0 && (
					<div className="col-12">
						<div className="alert alert-light">Nessun elemento trovato in questa sezione.</div>
					</div>
				)}
			</div>
		</div>
	)
}
