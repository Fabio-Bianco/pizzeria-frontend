import { useState, useMemo } from 'react'
import { usePizzeria } from '../contexts/PizzeriaContext'
import './AllergenFilter.css'

// Mapping degli allergeni con le loro icone
const ALLERGEN_ICONS = {
  // 'Glutine': '🌾',
  'Lattosio': '🥛', 
  'Noci': '🥜',
  'Uova': '🥚',
  'Pesce': '🐟',
  'Crostacei': '🦐',
  'Soia': '🫘',
  'Sesamo': '🌰',
  'Senape': '🌿',
  'Sedano': '🥬',
  'Lupini': '🫘',
  'Molluschi': '🦪',
  'Anidride solforosa': '⚠️',
  'Arachidi': '🥜'
}

export default function AllergenFilter({ selectedAllergens, onSelectionChange, className = '' }) {
  const { allergens, loading } = usePizzeria()
  const [isOpen, setIsOpen] = useState(false)

  // Ottenere l'icona per un allergene, con fallback
  const getIcon = (allergenName) => {
    return ALLERGEN_ICONS[allergenName] || '⚠️'
  }

  // Conteggio degli allergeni selezionati
  const selectedCount = selectedAllergens.length

  // Toggle selezione allergene
  const toggleAllergen = (allergenId) => {
    const newSelection = selectedAllergens.includes(allergenId)
      ? selectedAllergens.filter(id => id !== allergenId)
      : [...selectedAllergens, allergenId]
    
    onSelectionChange(newSelection)
  }

  // Cancella tutti i filtri
  const clearAllFilters = () => {
    onSelectionChange([])
  }

  // Toggle apertura/chiusura del filtro
  const toggleOpen = () => {
    setIsOpen(!isOpen)
  }

  // Preparazione lista allergeni con icone
  const allergensWithIcons = useMemo(() => {
    return allergens.map(allergen => ({
      ...allergen,
      icon: getIcon(allergen.name)
    }))
  }, [allergens])

  if (loading.allergens) {
    return (
      <div className={`allergen-filter ${className}`}>
        <button className="allergen-filter-trigger" disabled>
          <span className="allergen-filter-icon">🔍</span>
          <span className="allergen-filter-label">Caricamento allergeni...</span>
        </button>
      </div>
    )
  }

  return (
    <div className={`allergen-filter ${className} ${isOpen ? 'is-open' : ''}`}>
      {/* Pulsante trigger per aprire/chiudere il filtro */}
      <button 
        className={`allergen-filter-trigger ${selectedCount > 0 ? 'has-active-filters' : ''}`}
        onClick={toggleOpen}
        aria-expanded={isOpen}
        aria-label={`Filtro allergeni${selectedCount > 0 ? `, ${selectedCount} attivi` : ''}`}
      >
        <span className="allergen-filter-icon">🔍</span>
        <span className="allergen-filter-label">
          Allergeni
          {selectedCount > 0 && (
            <span className="allergen-filter-count">({selectedCount} attivi)</span>
          )}
        </span>
        <span className={`allergen-filter-arrow ${isOpen ? 'is-rotated' : ''}`}>▼</span>
      </button>

      {/* Pannello collassabile con griglia degli allergeni */}
      {isOpen && (
        <div className="allergen-filter-panel">
          <div className="allergen-filter-header">
            <h3 className="allergen-filter-title">Seleziona allergeni da escludere</h3>
            {selectedCount > 0 && (
              <button 
                className="allergen-filter-clear"
                onClick={clearAllFilters}
                aria-label="Cancella tutti i filtri"
              >
                Cancella filtri
              </button>
            )}
          </div>

          <div className="allergen-filter-grid">
            {allergensWithIcons.map((allergen) => {
              const isSelected = selectedAllergens.includes(allergen.id)
              return (
                <button
                  key={allergen.id}
                  className={`allergen-filter-item ${isSelected ? 'is-selected' : ''}`}
                  onClick={() => toggleAllergen(allergen.id)}
                  aria-pressed={isSelected}
                  aria-label={`${isSelected ? 'Rimuovi' : 'Aggiungi'} filtro per ${allergen.name}`}
                >
                  <span className="allergen-filter-item-icon">{allergen.icon}</span>
                  <span className="allergen-filter-item-name">{allergen.name}</span>
                  {isSelected && (
                    <span className="allergen-filter-item-check" aria-hidden="true">✓</span>
                  )}
                </button>
              )
            })}
          </div>

          {/* Info sulla logica del filtro */}
          <div className="allergen-filter-info">
            <p>💡 I piatti contenenti gli allergeni selezionati verranno nascosti dal menu</p>
          </div>

          <div className="allergen-filter-actions">
            <button 
              className="allergen-filter-close"
              onClick={() => setIsOpen(false)}
            >
              Chiudi
            </button>
          </div>
        </div>
      )}
    </div>
  )
}