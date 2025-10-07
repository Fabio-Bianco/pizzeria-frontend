import { useState } from 'react'
import { usePizzeria } from '../contexts/PizzeriaContext'
import './AllergenDebugPanel.css'

/**
 * Componente di debug per visualizzare informazioni sui filtri allergeni
 * Visibile solo in modalità sviluppo
 */
export default function AllergenDebugPanel({ 
  selectedAllergens, 
  filterStats, 
  menuStats,
  className = '' 
}) {
  const { allergens } = usePizzeria()
  const [isOpen, setIsOpen] = useState(false)

  // Non mostrare in produzione
  if (import.meta.env.PROD) {
    return null
  }

  const toggleOpen = () => setIsOpen(!isOpen)

  const selectedAllergensDetails = allergens.filter(allergen => 
    selectedAllergens.includes(allergen.id)
  )

  return (
    <div className={`allergen-debug-panel ${className} ${isOpen ? 'is-open' : ''}`}>
      <button 
        className="allergen-debug-toggle"
        onClick={toggleOpen}
        title="Debug Panel - Filtro Allergeni"
      >
        🔧 Debug Allergeni
      </button>

      {isOpen && (
        <div className="allergen-debug-content">
          <div className="allergen-debug-section">
            <h4>🎯 Filtri Attivi</h4>
            <div className="debug-info">
              <p><strong>Allergeni selezionati:</strong> {selectedAllergens.length}</p>
              {selectedAllergensDetails.map(allergen => (
                <span key={allergen.id} className="debug-allergen-tag">
                  {allergen.name} (ID: {allergen.id})
                </span>
              ))}
              {selectedAllergens.length === 0 && (
                <span className="debug-no-filters">Nessun filtro attivo</span>
              )}
            </div>
          </div>

          <div className="allergen-debug-section">
            <h4>📊 Statistiche Menu</h4>
            <div className="debug-stats-grid">
              <div className="debug-stat">
                <span className="debug-stat-label">Pizze:</span>
                <span className="debug-stat-value">
                  {menuStats.filteredCounts.pizzas} / {menuStats.originalCounts.pizzas}
                </span>
              </div>
              <div className="debug-stat">
                <span className="debug-stat-label">Antipasti:</span>
                <span className="debug-stat-value">
                  {menuStats.filteredCounts.appetizers} / {menuStats.originalCounts.appetizers}
                </span>
              </div>
              <div className="debug-stat">
                <span className="debug-stat-label">Dessert:</span>
                <span className="debug-stat-value">
                  {menuStats.filteredCounts.desserts} / {menuStats.originalCounts.desserts}
                </span>
              </div>
              <div className="debug-stat">
                <span className="debug-stat-label">Bevande:</span>
                <span className="debug-stat-value">
                  {menuStats.filteredCounts.beverages} / {menuStats.originalCounts.beverages}
                </span>
              </div>
            </div>
          </div>

          <div className="allergen-debug-section">
            <h4>🔬 Tutti gli Allergeni Disponibili</h4>
            <div className="debug-allergens-list">
              {allergens.map(allergen => (
                <div key={allergen.id} className="debug-allergen-item">
                  <span className="debug-allergen-name">{allergen.name}</span>
                  <span className="debug-allergen-id">ID: {allergen.id}</span>
                  {selectedAllergens.includes(allergen.id) && (
                    <span className="debug-selected-indicator">✓ SELEZIONATO</span>
                  )}
                </div>
              ))}
            </div>
          </div>

          <div className="allergen-debug-section">
            <h4>🔍 Logica di Filtro</h4>
            <div className="debug-logic">
              <p><strong>Regola applicata:</strong></p>
              <code>
                {selectedAllergens.length === 0 
                  ? "NESSUN FILTRO → Mostra TUTTI i piatti"
                  : `FILTRI ATTIVI → Nascondi piatti che contengono ${selectedAllergensDetails.map(a => a.name).join(' O ')}`
                }
              </code>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}