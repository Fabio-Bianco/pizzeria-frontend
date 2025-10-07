import { useEffect, useMemo } from 'react'
import { usePizzeria } from '../contexts/PizzeriaContext'
import CollapsibleMenuSection from '../components/CollapsibleMenuSection'
import AllergenFilter from '../components/AllergenFilter'
import FilterStats from '../components/FilterStats'
import { GridSkeleton } from '../components/SkeletonLoaders'
import { useMenuSections } from '../../hooks/useMenuSections'
import { useAllergeni, useLanguage } from '../../hooks/useMenuFeatures'
import { useAllergenFilter } from '../../hooks/useAllergenFilter'

export default function MenuPage() {
	const { categories, pizzas, appetizers, beverages, desserts, loading, error, initialized, refetch } = usePizzeria()
	const { showAllergensModal, openAllergensModal, closeAllergensModal } = useAllergeni()
	const { currentLanguage, toggleLanguage } = useLanguage()

	// Hook per la gestione del filtro allergeni
	const {
		selectedAllergens,
		updateSelection,
		resetSelection,
		filterItems,
		filterStats
	} = useAllergenFilter()

	useEffect(() => {
		// Il caricamento è già gestito automaticamente dal PizzeriaContext
		// I dati vengono caricati automaticamente dal context al mount
	}, [])

	// Prepara le sezioni del menu usando il hook con filtro
	const menuSections = useMenuSections(
		pizzas, 
		appetizers, 
		beverages, 
		desserts, 
		loading, 
		initialized,
		filterItems // Passa la funzione di filtro
	)

	// Calcola i conteggi per le statistiche
	const menuStats = useMemo(() => {
		const originalCounts = {
			pizzas: pizzas?.length || 0,
			appetizers: appetizers?.length || 0,
			beverages: beverages?.length || 0,
			desserts: desserts?.length || 0
		}

		const filteredCounts = {
			pizzas: menuSections.find(s => s.id === 'pizzas')?.items?.length || 0,
			appetizers: menuSections.find(s => s.id === 'appetizers')?.items?.length || 0,
			beverages: menuSections.find(s => s.id === 'beverages')?.items?.length || 0,
			desserts: menuSections.find(s => s.id === 'desserts')?.items?.length || 0
		}

		return { originalCounts, filteredCounts }
	}, [pizzas, appetizers, beverages, desserts, menuSections])

	const handleAllergensClick = () => {
		openAllergensModal()
	}

	const handleLanguageClick = () => {
		toggleLanguage()
	}

	const handleResetFilters = () => {
		resetSelection()
	}

	return (
		<div className="qodeup-layout">
			{/* Sezione richiami rapidi */}
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

			{/* Filtro Allergeni */}
			<div className="qodeup-filter-section">
				<AllergenFilter
					selectedAllergens={selectedAllergens}
					onSelectionChange={updateSelection}
					className="qodeup-allergen-filter"
				/>
				
				{filterStats.hasActiveFilters && (
					<>
						<FilterStats
							originalCounts={menuStats.originalCounts}
							filteredCounts={menuStats.filteredCounts}
							selectedAllergensCount={filterStats.activeFilterCount}
							className="qodeup-filter-stats"
						/>
						<div className="qodeup-filter-actions">
							<button 
								className="qodeup-reset-filters-btn"
								onClick={handleResetFilters}
							>
								🗑️ Cancella tutti i filtri
							</button>
						</div>
					</>
				)}
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
