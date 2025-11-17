import { useEffect } from 'react';
import { usePizzeria } from '../contexts/PizzeriaContext';
import { useAllergeni } from '../../hooks/useMenuFeatures';
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
		if (typeof window !== 'undefined') {
			console.log('[MenuPage] Items in ingresso:', items);
		}
		// Se tutti gli item hanno il campo 'formato' o 'tipologia', considera la lista come bevande e NON applicare il filtro veggie
		const isBeverageList = Array.isArray(items) && items.length > 0 && items.every(item => 'formato' in item || 'tipologia' in item);
		let filteredItems = items;
		if (!isBeverageList && veggieFilterActive) {
			filteredItems = filterVeggieItems(items);
		}
		filteredItems = filterItems(filteredItems);
		if (typeof window !== 'undefined') {
			console.log('[MenuPage] Items dopo filtri:', filteredItems);
		}
		return filteredItems;
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
			{/* Header principale con logo e icone - Modern 2025 Design */}
			<header className="qodeup-header-main glass-style dark-mode-ready" role="banner">
				<div className="qodeup-header-container">
					{/* Logo a sinistra */}
					<div className="qodeup-header-logo" aria-label="Logo b_bot" tabIndex={-1}>
						<h1 className="qodeup-logo-text" style={{fontFamily: 'Roboto, Arial, sans-serif', fontWeight: 800, letterSpacing: '-0.5px'}} aria-label="b_bot logo">b_bot</h1>
					</div>
					
					{/* Icone azioni rapide a destra */}
					<div className="qodeup-header-icons">
						{/* Search */}
						<div className="qodeup-header-action">
							<button 
								className="qodeup-header-icon-btn" 
								aria-label="Cerca nel menu"
								title="Cerca pizza o prodotto"
								onClick={() => {/* TODO: Implementa ricerca */}}
							>
								<span className="material-symbols-outlined">search</span>
							</button>
							<span className="qodeup-header-label">Cerca</span>
						</div>
						
						{/* Filtro Veggie */}
						<div className="qodeup-header-action">
							<button 
								className={`qodeup-header-icon-btn ${veggieFilterActive ? 'active' : ''}`}
								onClick={handleVeggieClick}
								title={veggieFilterActive ? "Rimuovi filtro veggie" : "Solo prodotti vegani"}
								aria-label={veggieFilterActive ? "Rimuovi filtro veggie" : "Filtra prodotti vegani"}
								aria-pressed={veggieFilterActive}
							>
								<VeganBadgeIcon size={20} color={veggieFilterActive ? "#22c55e" : "#bdbdbd"} withLabel={false} />
								{veggieFilterActive && (
									<span className="qodeup-header-badge">✓</span>
								)}
							</button>
							<span className="qodeup-header-label">Veggie</span>
						</div>
						
						{/* Filtro Allergeni */}
						<div className="qodeup-header-action">
							<button 
								className={`qodeup-header-icon-btn ${filterStats.hasActiveFilters ? 'active' : ''}`}
								onClick={() => {
									if (filterStats.hasActiveFilters) {
										resetSelection();
									} else {
										openAllergensModal();
									}
								}}
								title={filterStats.hasActiveFilters ? `Allergeni attivi (${filterStats.activeFilterCount})` : "Filtra allergeni"}
								aria-label={filterStats.hasActiveFilters ? `Allergeni attivi (${filterStats.activeFilterCount})` : "Filtra per allergeni"}
								aria-pressed={filterStats.hasActiveFilters}
							>
								<AllergenIcon size={20} color={filterStats.hasActiveFilters ? "#fbbf24" : "#bdbdbd"} />
								{filterStats.hasActiveFilters && (
									<span className="qodeup-header-badge">{filterStats.activeFilterCount}</span>
								)}
							</button>
							<span className="qodeup-header-label">Allergeni</span>
						</div>
						
						{/* Language Selector */}
						<div className="qodeup-header-action">
							<button 
								className="qodeup-header-icon-btn" 
								aria-label="Cambia lingua"
								title="Lingua: Italiano"
								onClick={() => {/* TODO: Implementa cambio lingua */}}
							>
								<span className="qodeup-flag-icon">🇮🇹</span>
							</button>
							<span className="qodeup-header-label">Lingua</span>
						</div>
					</div>
				</div>
			</header>

			   {/* Titolo sezione menu */}
			   <div style={{display:'flex',alignItems:'center',gap:'1.2em',margin:'2em 0 1.2em 0'}}>
				   <hr
					   style={{
						   flex:1,
						   border:'none',
						   borderTop:'4px dashed #10b981',
						   margin:0,
						   opacity:1,
						   boxShadow:'0 2px 8px #a7f3d0',
					   }}
					   aria-hidden="true"
				   />
				   <h1
					   style={{
						   margin:0,
						   fontSize:'2.2rem',
						   fontWeight:900,
						   letterSpacing:'0.18em',
						   color:'var(--accent-green)',
						   fontFamily:'inherit',
						   textTransform:'uppercase',
						   textShadow:'0 2px 8px #e6fbe6, 0 1px 0 #fff',
						   lineHeight:1.1
					   }}
					   aria-label="Titolo menu"
				   >MENU</h1>
				   <hr
					   style={{
						   flex:1,
						   border:'none',
						   borderTop:'4px dashed #10b981',
						   margin:0,
						   opacity:1,
						   boxShadow:'0 2px 8px #a7f3d0',
					   }}
					   aria-hidden="true"
				   />
			   </div>

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
