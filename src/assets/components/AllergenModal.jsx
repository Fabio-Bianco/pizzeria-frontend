import { useState } from 'react'
import { AllergenIcon } from './Icons'
import './AllergenModal.css'

// Mapping degli allergeni con icona personalizzata (Material Symbols)
// Il glutine NON è più presente tra gli allergeni filtrabili: gestito solo come badge separato nei piatti
const ALLERGEN_ICON_MAP = {
  'LATTOSIO': 'icecream',
  'FRUTTA A GUSCIO': 'nutrition',
  'UOVA': 'egg',
  'PESCE': 'set_meal',
  'FISH': 'set_meal',
  'ARACHIDI': 'spa',
  'SOIA': 'eco',
  'CROSTACEI': 'cruelty_free',
  'SEDANO': 'grass',
  'SENAPE': 'science',
  'SESAMO': 'restaurant',
  'SOLFITI': 'local_drink',
  'LUPINI': 'spa',
  'MOLLUSCHI': 'waves',
  'ANIDRIDE SOLFOROSA': 'air',
};
const ALLERGEN_CONFIG = [
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
  { id: 14, name: 'MOLLUSCHI' },
  { id: 15, name: 'ANIDRIDE SOLFOROSA' }
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
  // Selezione locale rimossa: la selezione è gestita dal parent

  if (!isOpen) return null

  // Toggle selezione allergene: aggiorna subito la selezione parent
  // Questo gestisce SOLO allergeni, non il gluten free
  const toggleAllergen = (allergenId) => {
    let newSelection;
    if (selectedAllergens.includes(allergenId)) {
      newSelection = selectedAllergens.filter(id => id !== allergenId);
    } else {
      newSelection = [...selectedAllergens, allergenId];
    }
    onSelectionChange(newSelection);
  }

  // Pulsante OK: chiude la modale
  const handleOK = () => {
    onClose();
  }


  // Mostra tutti gli allergeni del backend, ordinati come ALLERGEN_CONFIG se possibile
  let displayAllergens = [];
  if (availableAllergens && availableAllergens.length > 0) {
    // Ordina secondo ALLERGEN_CONFIG se matcha, poi aggiungi gli altri
    const configNames = ALLERGEN_CONFIG.map(a => a.name.toUpperCase());
    const mapped = availableAllergens.map(a => {
      const configIdx = configNames.indexOf(a.name.toUpperCase());
      return {
        ...a,
        id: a.id,
        name: a.name,
        configOrder: configIdx === -1 ? 999 : configIdx
      };
    });
    displayAllergens = mapped.sort((a, b) => a.configOrder - b.configOrder);
  } else {
    // fallback: mostra config
    displayAllergens = ALLERGEN_CONFIG;
  }

  return (
    <div className="allergen-modal-overlay glass-overlay" onClick={onClose}>
      <div className="allergen-modal-content glass-style" onClick={(e) => e.stopPropagation()}>
        {/* Header con titolo */}
        <div className="allergen-modal-header" style={{display:'flex',alignItems:'center',justifyContent:'space-between'}}>
          <h2 className="allergen-modal-title">ALLERGICO?</h2>
          <button
            className="allergen-modal-close-btn"
            onClick={onClose}
            aria-label="Chiudi finestra allergeni"
            style={{background:'none',border:'none',fontSize:'1.7rem',cursor:'pointer',color:'#888',marginLeft:'1rem',lineHeight:1}}
          >
            ×
          </button>
        </div>

        {/* Disclaimer text */}
        <div className="allergen-modal-disclaimer">
          <p>Applica i filtri allergeni. Se hai dubbi chiedi al nostro staff!</p>
        </div>

        {/* Griglia degli allergeni */}
        <div className="allergen-modal-grid">
          {displayAllergens.map((allergen) => {
            const isSelected = selectedAllergens.includes(allergen.id)
            return (
              <button
                key={allergen.id}
                className={`allergen-modal-item${isSelected ? ' selected' : ''}`}
                onClick={() => toggleAllergen(allergen.id)}
                type="button"
              >
                <div className="allergen-modal-item-icon">
                  <span className="material-symbols-outlined" style={{fontSize:32,color:'#777'}}>
                    {ALLERGEN_ICON_MAP[allergen.name?.toUpperCase?.()] || 'warning'}
                  </span>
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

        <div className="allergen-modal-actions">
          <button className="allergen-modal-ok-btn ripple" style={{background:'#fde047',color:'#333',fontWeight:'bold',border:'none',borderRadius:'8px',padding:'0.7em 2.5em',fontSize:'1.1rem',marginTop:'1.2em',boxShadow:'0 1px 4px #0001',cursor:'pointer'}} onClick={handleOK}>
            OK
          </button>
        </div>
      </div>
    </div>
  )
}