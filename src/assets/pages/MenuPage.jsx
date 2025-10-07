import { useEffect } from 'react'
import { usePizzeria } from '../contexts/PizzeriaContext'
import CollapsibleMenuSection from '../components/CollapsibleMenuSection'
import AllergenModal from '../components/AllergenModal'
import { GridSkeleton } from '../components/SkeletonLoaders'
import { VeganBadgeIcon, AllergenIcon } from '../components/Icons'
import { useMenuSections } from '../../hooks/useMenuSections'
import { useAllergeni, useLanguage } from '../../hooks/useMenuFeatures'
import { useAllergenFilter } from '../../hooks/useAllergenFilter'

export default function MenuPage() {
	const { pizzas, appetizers, beverages, desserts, allergens, loading, initialized } = usePizzeria()
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



	return (
		<div className="qodeup-layout">
			{/* Header principale con logo e icone */}
			<header className="qodeup-header-main">
				<div className="qodeup-header-container">
					{/* Logo Qodeup a sinistra */}
					<div className="qodeup-header-logo">
						<span className="qodeup-logo-text">b_bot</span>
					</div>
					
					{/* Icone a destra */}
					<div className="qodeup-header-icons">
						{/* Icona Veggie */}
						<button className="qodeup-header-icon-btn" title="Veggie">
							<VeganBadgeIcon size={28} color="#777777" withLabel={false} />
						</button>
						
						{/* Icona Allergeni */}
						<button className="qodeup-header-icon-btn" onClick={handleAllergensClick} title="Allergeni">
							<AllergenIcon size={28} color="#777777" />
							{filterStats.hasActiveFilters && (
								<span className="qodeup-header-badge">{filterStats.activeFilterCount}</span>
							)}
						</button>
						
						{/* TODO: Feature futura - Ordini/Carrello */}
						{/* <button className="qodeup-header-icon-btn" title="Ordina">
							<span className="material-symbols-outlined">shopping_cart</span>
						</button> */}
						
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
						<AllergenIcon size={40} color="#777777" />
					</div>
					<span className="qodeup-quick-label">ALLERGENI</span>
					{filterStats.hasActiveFilters && (
						<span className="qodeup-quick-badge">{filterStats.activeFilterCount}</span>
					)}
				</button>
				
				{/* TODO: Feature futura - Ordini/Carrello */}
				{/* <button className="qodeup-quick-btn" title="Ordina">
					<div className="qodeup-quick-icon">
						<span className="material-symbols-outlined">shopping_cart</span>
					</div>
					<span className="qodeup-quick-label">ORDINA</span>
				</button> */}
				
				<button className="qodeup-quick-btn" onClick={handleLanguageClick} title="Language">
					<div className="qodeup-quick-icon">
						<span className="qodeup-flag-icon">{currentLanguage === 'it' ? '🇮🇹' : '🇬🇧'}</span>
					</div>
					<span className="qodeup-quick-label">LINGUA</span>
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
							Filtri attivi: {allergens.filter(a => selectedAllergens.includes(a.id)).map(a => a.name).join(', ')}
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
