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
			{/* Header principale con logo e icone - WCAG AAA Enhanced */}
			<header className="qodeup-header-main" role="banner">
				<div className="qodeup-header-container">
					{/* Logo Qodeup a sinistra */}
					<div className="qodeup-header-logo">
						<h1 className="qodeup-logo-text">b_bot</h1>
					</div>
					
					{/* Icone a destra - WCAG Navigation */}
					<nav className="qodeup-header-icons" role="navigation" aria-label="Menu azioni rapide">
						{/* Icona Veggie */}
						<button 
							className="qodeup-header-icon-btn" 
							title="Filtra prodotti vegani"
							aria-label="Filtra prodotti vegani"
						>
							<VeganBadgeIcon size={28} color="#777777" withLabel={false} />
						</button>
						
						{/* Icona Allergeni */}
						<button 
							className="qodeup-header-icon-btn" 
							onClick={handleAllergensClick} 
							title="Gestione allergeni"
							aria-label="Gestione allergeni"
							aria-expanded="false"
						>
							<AllergenIcon size={28} color="#777777" />
							{filterStats.hasActiveFilters && (
								<span className="qodeup-header-badge" aria-label={`${filterStats.activeFilterCount} filtri attivi`}>
									{filterStats.activeFilterCount}
								</span>
							)}
						</button>
						
						{/* Icona Lingua */}
						<button 
							className="qodeup-header-icon-btn" 
							onClick={handleLanguageClick} 
							title={`Cambia lingua (attuale: ${currentLanguage === 'it' ? 'Italiano' : 'English'})`}
							aria-label={`Cambia lingua, attualmente ${currentLanguage === 'it' ? 'Italiano' : 'Inglese'}`}
						>
							<span className="qodeup-flag-icon">{currentLanguage === 'it' ? '🇮🇹' : '🇬🇧'}</span>
						</button>
					</nav>
				</div>
			</header>

			{/* Sezione icone intermedie - WCAG Quick Access */}
			<section className="qodeup-quick-access" role="navigation" aria-label="Accesso rapido funzioni">
				<button 
					className="qodeup-quick-btn" 
					title="Visualizza prodotti vegani"
					aria-label="Visualizza solo prodotti vegani"
				>
					<div className="qodeup-quick-icon">
						<VeganBadgeIcon size={40} color="#777777" withLabel={false} />
					</div>
					<span className="qodeup-quick-label">VEGGIE</span>
				</button>
				
				<button 
					className="qodeup-quick-btn" 
					onClick={handleAllergensClick} 
					title="Gestione allergeni"
					aria-label="Apri gestione allergeni"
					aria-expanded="false"
				>
					<div className="qodeup-quick-icon">
						<AllergenIcon size={40} color="#777777" />
					</div>
					<span className="qodeup-quick-label">ALLERGENI</span>
					{filterStats.hasActiveFilters && (
						<span className="qodeup-quick-badge" aria-label={`${filterStats.activeFilterCount} filtri allergeni attivi`}>
							{filterStats.activeFilterCount}
						</span>
					)}
				</button>
				
				<button 
					className="qodeup-quick-btn" 
					onClick={handleLanguageClick} 
					title={`Cambia lingua (${currentLanguage === 'it' ? 'Italiano' : 'English'})`}
					aria-label={`Cambia lingua da ${currentLanguage === 'it' ? 'Italiano' : 'Inglese'}`}
				>
					<div className="qodeup-quick-icon">
						<span className="qodeup-flag-icon">{currentLanguage === 'it' ? '🇮🇹' : '🇬🇧'}</span>
					</div>
					<span className="qodeup-quick-label">LINGUA</span>
				</button>
			</section>

			{/* Barra di reset filtri - WCAG Enhanced */}
			{filterStats.hasActiveFilters && (
				<section className="qodeup-filter-reset-bar" role="status" aria-live="polite">
					<div className="qodeup-filter-info">
						<span className="qodeup-filter-icon" aria-hidden="true">
							<span className="material-symbols-outlined">filter_alt</span>
						</span>
						<span className="qodeup-filter-text">
							Filtri attivi: {allergens.filter(a => selectedAllergens.includes(a.id)).map(a => a.name).join(', ')}
						</span>
					</div>
					<button 
						className="qodeup-filter-reset-btn"
						onClick={handleResetFilters}
						title="Rimuovi tutti i filtri allergeni attivi"
						aria-label="Rimuovi tutti i filtri allergeni attivi"
					>
						<span className="qodeup-reset-icon" aria-hidden="true">
							<span className="material-symbols-outlined">close</span>
						</span>
						<span className="qodeup-reset-text">Rimuovi filtri</span>
					</button>
				</section>
			)}

			{/* Header FOOD - WCAG Semantic */}
			<header className="qodeup-food-header" role="banner">
				<h1 className="qodeup-food-title">FOOD</h1>
			</header>

			{/* Sezioni menu collassabili - WCAG Enhanced */}
			<main className="qodeup-menu-sections" role="main" aria-label="Menu del ristorante">
				{menuSections.map((section) => (
					<section key={section.id} aria-label={`Sezione ${section.title}`}>
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
					</section>
				))}
			</main>

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
