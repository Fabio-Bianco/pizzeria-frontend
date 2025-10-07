import { useState } from 'react'
import { AllergenIcon } from './Icons'
import './AllergenModal.css'

// Mapping degli allergeni con l'icona AllergenIcon unificata nel colore #e5ad3e
const ALLERGEN_CONFIG = [
  { id: 1, name: 'GLUTINE' },
  { id: 2, name: 'LATTOSIO' },
  { id: 3, name: 'FRUTTA A GUSCIO' },
  { id: 4, name: 'UOVA' },
  { id: 5, name: 'PESCE' },
  { id: 6, name: 'ARACHIDI' },
  { id: 7, name: 'SOIA' },
  { id: 8, name: 'CROSTACEI' },
  { id: 9, name: 'SEDANO' },
  { id: 10, name: 'SENAPE' },
  { id: 11, name: 'SESAMO' },
  { id: 12, name: 'SOLFITI' },
  { id: 13, name: 'LUPINI' },
  { id: 14, name: 'MOLLUSCHI' }
]

/**
 * Modal degli allergeni che replica esattamente il design dello screenshot
 */
export default function AllergenModal({ 
  isOpen, 
  onClose, 
  selectedAllergens, 
  onSelectionChange,
  availableAllergens = []
}) {
  const [localSelection, setLocalSelection] = useState([...selectedAllergens])

  if (!isOpen) return null

  // Toggle selezione allergene
  const toggleAllergen = (allergenId) => {
    setLocalSelection(prev => {
      if (prev.includes(allergenId)) {
        return prev.filter(id => id !== allergenId)
      } else {
        return [...prev, allergenId]
      }
    })
  }

  // Conferma selezione e chiudi
  const handleOK = () => {
    onSelectionChange(localSelection)
    onClose()
  }

  // Prepara la lista degli allergeni da mostrare
  const displayAllergens = ALLERGEN_CONFIG.map(config => {
    // Trova l'allergene corrispondente dai dati del backend
    const backendAllergen = availableAllergens.find(a => 
      a.name.toUpperCase().includes(config.name) || 
      config.name.includes(a.name.toUpperCase())
    )
    
    return {
      ...config,
      backendId: backendAllergen?.id,
      available: !!backendAllergen
    }
  })

  return (
    <div className="allergen-modal-overlay" onClick={onClose}>
      <div className="allergen-modal-content" onClick={(e) => e.stopPropagation()}>
        {/* Header con titolo */}
        <div className="allergen-modal-header">
          <h2 className="allergen-modal-title">ALLERGICO?</h2>
        </div>

        {/* Disclaimer text */}
        <div className="allergen-modal-disclaimer">
          <p>Applica i filtri allergeni. Se hai dubbi chiedi al nostro staff!</p>
        </div>

        {/* Griglia degli allergeni */}
        <div className="allergen-modal-grid">
          {displayAllergens.map((allergen) => {
            const isSelected = allergen.backendId && localSelection.includes(allergen.backendId)
            const isAvailable = allergen.available
            
            return (
              <button
                key={allergen.id}
                className={`allergen-modal-item ${isSelected ? 'selected' : ''} ${!isAvailable ? 'disabled' : ''}`}
                onClick={() => isAvailable && toggleAllergen(allergen.backendId)}
                disabled={!isAvailable}
              >
                <div className="allergen-modal-item-icon">
                  <AllergenIcon size={32} color="#e5ad3e" />
                </div>
                <div className="allergen-modal-item-name">
                  {allergen.name}
                </div>
                {isSelected && (
                  <div className="allergen-modal-item-check">✓</div>
                )}
              </button>
            )
          })}
        </div>

        {/* Pulsante OK */}
        <div className="allergen-modal-actions">
          <button className="allergen-modal-ok-btn" onClick={handleOK}>
            OK
          </button>
        </div>
      </div>
    </div>
  )
}