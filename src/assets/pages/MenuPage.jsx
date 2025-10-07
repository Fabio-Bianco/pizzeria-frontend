import { useEffect, useMemo } from 'react'
import { usePizzeria } from '../contexts/PizzeriaContext'
import CollapsibleMenuSection from '../components/CollapsibleMenuSection'
import AllergenModal from '../components/AllergenModal'
import { GridSkeleton } from '../components/SkeletonLoaders'
import { VeganBadgeIcon, AllergenIcon } from '../components/Icons'
import { useMenuSections } from '../../hooks/useMenuSections'
import { useAllergeni, useLanguage } from '../../hooks/useMenuFeatures'
import { useAllergenFilter } from '../../hooks/useAllergenFilter'

export default function MenuPage() {
	const { categories, pizzas, appetizers, beverages, desserts, allergens, loading, error, initialized, refetch } = usePizzeria()
	const { showAllergensModal, openAllergensModal, closeAllergensModal } = useAllergeni()
	const { currentLanguage, toggleLanguage } = useLanguage()

	// Hook per la gestione del filtro allergeni
	const {
		selectedAllergens,
		updateSelection,
		resetSelection,
		filterItems,
		filterStats,
		getSelectedAllergensDetails
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
			pizzas: menuSections.find(s => s.id === 'pizzas')?.count || 0,
			appetizers: menuSections.find(s => s.id === 'appetizers')?.count || 0,
			beverages: menuSections.find(s => s.id === 'beverages')?.count || 0,
			desserts: menuSections.find(s => s.id === 'desserts')?.count || 0
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

	const handleAllergenSelection = (newSelection) => {
		updateSelection(newSelection)
	}

	// Ottieni dettagli degli allergeni selezionati per mostrare nel reset
	const selectedAllergensDetails = useMemo(() => {
		return allergens.filter(allergen => selectedAllergens.includes(allergen.id))
	}, [allergens, selectedAllergens])

	return (
		<div className="qodeup-layout">
			{/* Header principale con logo e icone */}
			<header className="qodeup-header-main">
				<div className="qodeup-header-container">
					{/* Logo Qodeup a sinistra */}
					<div className="qodeup-header-logo">
						<span className="qodeup-logo-text">qodeup</span>
					</div>
					
					{/* Icone a destra */}
					<div className="qodeup-header-icons">
						{/* Icona Veggie */}
						<button className="qodeup-header-icon-btn" title="Veggie">
							<VeganBadgeIcon size={28} color="#777777" withLabel={false} />
						</button>
						
						{/* Icona Allergeni */}
						<button className="qodeup-header-icon-btn" onClick={handleAllergensClick} title="Allergeni">
							<AllergenIcon size={28} color="#e5ad3e" />
							{filterStats.hasActiveFilters && (
								<span className="qodeup-header-badge">{filterStats.activeFilterCount}</span>
							)}
						</button>
						
						{/* Icona Ordina (carrello) */}
						<button className="qodeup-header-icon-btn" title="Ordina">
							<span className="material-symbols-outlined">shopping_cart</span>
						</button>
						
						{/* Icona Lingua */}
						<button className="qodeup-header-icon-btn" onClick={handleLanguageClick} title="Language">
							<span className="qodeup-flag-icon">{currentLanguage === 'it' ? '🇮🇹' : '🇬🇧'}</span>
						</button>
					</div>
				</div>
			</header>

			{/* Sezione icone intermedie come nell'immagine */}
			<div className="qodeup-quick-access">
				<button className="qodeup-quick-btn" title="Veggie">
					<div className="qodeup-quick-icon">
						<VeganBadgeIcon size={40} color="#777777" withLabel={false} />
					</div>
					<span className="qodeup-quick-label">VEGGIE</span>
				</button>
				
				<button className="qodeup-quick-btn" onClick={handleAllergensClick} title="Allergeni">
					<div className="qodeup-quick-icon">
						<AllergenIcon size={40} color="#e5ad3e" />
					</div>
					<span className="qodeup-quick-label">ALLERGENI</span>
					{filterStats.hasActiveFilters && (
						<span className="qodeup-quick-badge">{filterStats.activeFilterCount}</span>
					)}
				</button>
				
				<button className="qodeup-quick-btn" title="Ordina">
					<div className="qodeup-quick-icon">
						<span className="material-symbols-outlined">shopping_cart</span>
					</div>
					<span className="qodeup-quick-label">ORDINA</span>
				</button>
				
				<button className="qodeup-quick-btn" onClick={handleLanguageClick} title="Language">
					<div className="qodeup-quick-icon">
						<span className="qodeup-flag-icon">{currentLanguage === 'it' ? '🇮🇹' : '🇬🇧'}</span>
					</div>
					<span className="qodeup-quick-label">LANGUAGE</span>
				</button>
			</div>

			{/* Barra di reset filtri - visibile solo quando ci sono filtri attivi */}
			{filterStats.hasActiveFilters && (
				<div className="qodeup-filter-reset-bar">
					<div className="qodeup-filter-info">
						<span className="qodeup-filter-icon">
							<span className="material-symbols-outlined">filter_alt</span>
						</span>
						<span className="qodeup-filter-text">
							Filtri attivi: {selectedAllergensDetails.map(a => a.name).join(', ')}
						</span>
					</div>
					<button 
						className="qodeup-filter-reset-btn"
						onClick={handleResetFilters}
						title="Rimuovi tutti i filtri"
					>
						<span className="qodeup-reset-icon">
							<span className="material-symbols-outlined">close</span>
						</span>
						<span className="qodeup-reset-text">Rimuovi filtri</span>
					</button>
				</div>
			)}

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
								count={section.count}
								originalCount={section.originalCount}
								isExpanded={false} // Tutte le sezioni chiuse di default
							/>
						)}
					</div>
				))}
			</div>

			{/* Modal Allergeni */}
			<AllergenModal
				isOpen={showAllergensModal}
				onClose={closeAllergensModal}
				selectedAllergens={selectedAllergens}
				onSelectionChange={handleAllergenSelection}
				availableAllergens={allergens}
			/>
		</div>
	)
}
