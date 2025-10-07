import { useEffect } from 'react'
import { usePizzeria } from '../contexts/PizzeriaContext'
import CollapsibleMenuSection from '../components/CollapsibleMenuSection'
import { GridSkeleton } from '../components/SkeletonLoaders'
import { useMenuSections } from '../../hooks/useMenuSections'
import { useAllergeni, useLanguage } from '../../hooks/useMenuFeatures'

export default function MenuPage() {
	const { categories, pizzas, appetizers, beverages, desserts, loading, error, initialized, refetch } = usePizzeria()
	const { showAllergensModal, openAllergensModal, closeAllergensModal } = useAllergeni()
	const { currentLanguage, toggleLanguage } = useLanguage()

	useEffect(() => {
		// Il caricamento è già gestito automaticamente dal PizzeriaContext
		// I dati vengono caricati automaticamente dal context al mount
	}, [])

	// Prepara le sezioni del menu usando il hook
	const menuSections = useMenuSections(pizzas, appetizers, beverages, desserts, loading, initialized)

	const handleAllergensClick = () => {
		openAllergensModal()
	}

	const handleLanguageClick = () => {
		toggleLanguage()
	}

	return (
		<div className="qodeup-layout">{/* Sezione richiami rapidi */}
			<div className="qodeup-quick-access">
				<button className="qodeup-quick-btn" onClick={handleAllergensClick}>
					<div className="qodeup-quick-icon">⚠️</div>
					<span className="qodeup-quick-label">Allergeni</span>
				</button>
				
				<button className="qodeup-quick-btn" onClick={handleLanguageClick}>
					<div className="qodeup-quick-icon">{currentLanguage === 'it' ? '🇮🇹' : '🇬🇧'}</div>
					<span className="qodeup-quick-label">Language</span>
				</button>
			</div>

			{/* Header FOOD */}
			<div className="qodeup-food-header">
				<h1 className="qodeup-food-title">FOOD</h1>
			</div>

			{/* Sezioni menu collassabili */}
			<div className="qodeup-menu-sections">
				{menuSections.map((section) => (
					<div key={section.id}>
						{section.loading && !section.initialized ? (
							<GridSkeleton type={section.id} count={3} />
						) : (
							<CollapsibleMenuSection
								title={section.title}
								items={section.items}
								icon={section.icon}
								isExpanded={section.id === 'appetizers'} // Prima sezione espansa di default
							/>
						)}
					</div>
				))}
			</div>

			{/* TODO: Modal Allergeni */}
			{showAllergensModal && (
				<div className="modal-backdrop" onClick={closeAllergensModal}>
					<div className="modal-content" onClick={(e) => e.stopPropagation()}>
						<h3>Allergeni</h3>
						<p>Modal degli allergeni da implementare</p>
						<button onClick={closeAllergensModal}>Chiudi</button>
					</div>
				</div>
			)}
		</div>
	)
}
