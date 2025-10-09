import { useEffect } from 'react';
import { usePizzeria } from '../contexts/PizzeriaContext';
import { useAllergeni, useLanguage } from '../../hooks/useMenuFeatures';
import { useAllergenFilter } from '../../hooks/useAllergenFilter';
import { useVeggieFilter } from '../../hooks/useVeggieFilter';
import { useMenuSections } from '../../hooks/useMenuSections';
import { VeganBadgeIcon, AllergenIcon } from '../components/Icons';
import CollapsibleMenuSection from '../components/CollapsibleMenuSection';
import AllergenModal from '../components/AllergenModal';
import { GridSkeleton } from '../components/SkeletonLoaders';

export default function MenuPage() {
	const { pizzas, appetizers, beverages, desserts, allergens, loading, initialized, error } = usePizzeria()
	if (typeof window !== 'undefined') {
		console.log('[MenuPage] pizzas:', pizzas)
		console.log('[MenuPage] appetizers:', appetizers)
		console.log('[MenuPage] beverages:', beverages)
		console.log('[MenuPage] desserts:', desserts)
	}
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

  // Hook per la gestione del filtro veggie
  const {
    veggieFilterActive,
    toggleVeggieFilter,
    resetVeggieFilter,
    filterItems: filterVeggieItems,
    filterStats: veggieFilterStats
  } = useVeggieFilter()

  useEffect(() => {
    // Il caricamento è già gestito automaticamente dal PizzeriaContext
    // I dati vengono caricati automaticamente dal context al mount
  }, [])

  // Funzione combinata per applicare entrambi i filtri
	const applyCombinedFilters = (items) => {
		// LOG: cosa arriva a applyCombinedFilters
		if (typeof window !== 'undefined') {
			console.log('[MenuPage] Items in ingresso:', items);
		}
		let filteredItems = veggieFilterActive ? filterVeggieItems(items) : items
		filteredItems = filterItems(filteredItems)
		// LOG: cosa esce da applyCombinedFilters
		if (typeof window !== 'undefined') {
			console.log('[MenuPage] Items dopo filtri:', filteredItems);
		}
		return filteredItems
	}

  // Prepara le sezioni del menu usando il hook con filtri combinati
	const menuSections = useMenuSections(
		pizzas, 
		appetizers, 
		beverages, 
		desserts, 
		loading, 
		applyCombinedFilters // Usa la funzione combinata per i filtri
	)

  const handleAllergensClick = () => {
		openAllergensModal()
	}

	const handleVeggieClick = () => {
		toggleVeggieFilter()
	}

	const handleLanguageClick = () => {
		toggleLanguage()
	}

	const handleResetFilters = () => {
		resetSelection()
		resetVeggieFilter()
	}

	const handleAllergenSelection = (newSelection) => {
		updateSelection(newSelection)
	}



	// Mostra errore se almeno una fetch ha fallito
	const hasAnyError = Object.values(error).some(e => !!e);

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
							className={`qodeup-header-icon-btn ${veggieFilterActive ? 'active' : ''}`}
							onClick={handleVeggieClick}
							title={veggieFilterActive ? "Rimuovi filtro veggie" : "Filtra prodotti vegani"}
							aria-label={veggieFilterActive ? "Rimuovi filtro prodotti vegani" : "Filtra prodotti vegani"}
							aria-pressed={veggieFilterActive}
						>
							<VeganBadgeIcon size={28} color={veggieFilterActive ? "#22c55e" : "#777777"} withLabel={false} />
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
					className={`qodeup-quick-btn ${veggieFilterActive ? 'active' : ''}`}
					onClick={handleVeggieClick}
					title={veggieFilterActive ? "Rimuovi filtro veggie" : "Visualizza prodotti vegani"}
					aria-label={veggieFilterActive ? "Rimuovi filtro prodotti vegani" : "Visualizza solo prodotti vegani"}
					aria-pressed={veggieFilterActive}
				>
					<div className="qodeup-quick-icon">
						<VeganBadgeIcon size={40} color={veggieFilterActive ? "#22c55e" : "#777777"} withLabel={false} />
					</div>
					<span className="qodeup-quick-label">VEGGIE</span>
					{veggieFilterActive && (
						<span className="qodeup-quick-badge" aria-label="Filtro veggie attivo">
							✓
						</span>
					)}
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
			{(filterStats.hasActiveFilters || veggieFilterActive) && (
				<section className="qodeup-filter-reset-bar" role="status" aria-live="polite">
					<div className="qodeup-filter-info">
						<span className="qodeup-filter-icon" aria-hidden="true">
							<span className="material-symbols-outlined">filter_alt</span>
						</span>
						<span className="qodeup-filter-text">
							Filtri attivi: {[
								veggieFilterActive && "Veggie",
								filterStats.hasActiveFilters && `Allergeni (${allergens.filter(a => selectedAllergens.includes(a.id)).map(a => a.name).join(', ')})`
							].filter(Boolean).join(', ')}
						</span>
					</div>
					<button 
						className="qodeup-filter-reset-btn"
						onClick={handleResetFilters}
						title="Rimuovi tutti i filtri attivi"
						aria-label="Rimuovi tutti i filtri attivi"
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

				{/* Avviso errori globali */}
				{hasAnyError && (
					<div className="qodeup-mock-warning" role="alert" style={{background:'#fffbe6',color:'#b45309',padding:'1em',border:'1px solid #facc15',borderRadius:'8px',margin:'1em 0',fontWeight:'bold'}}>
						Attenzione: alcuni dati del menu non sono disponibili. Controlla la connessione o la configurazione dell'API.
					</div>
				)}

				{/* Sezioni menu collassabili - WCAG Enhanced */}
				<main className="qodeup-menu-sections" role="main" aria-label="Menu del ristorante">
					{menuSections.map((section) => (
						<section key={section.id} aria-label={`Sezione ${section.title}`}>
							{error[section.id] ? (
								<div className="qodeup-section-error" role="alert" style={{background:'#fef2f2',color:'#b91c1c',padding:'1em',border:'1px solid #fca5a5',borderRadius:'8px',margin:'1em 0',fontWeight:'bold'}}>
									Errore nel caricamento della sezione "{section.title}". Riprova più tardi.
								</div>
							) : section.loading && !section.initialized ? (
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
