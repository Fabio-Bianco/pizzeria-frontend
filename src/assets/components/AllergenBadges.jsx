import './AllergenBadges.css'

// Mapping degli allergeni con le loro icone (condiviso con AllergenFilter)
const ALLERGEN_ICONS = {
  'Glutine': '🌾',
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

/**
 * Componente per mostrare i badge degli allergeni per un piatto
 */
export default function AllergenBadges({ 
  allergens, 
  className = '', 
  size = 'small',
  showLabels = false,
  maxVisible = null 
}) {
  // Se non ci sono allergeni, non renderizzare nulla
  if (!allergens || !Array.isArray(allergens) || allergens.length === 0) {
    return null
  }

  // Funzione per ottenere l'icona dell'allergene
  const getIcon = (allergenName) => {
    return ALLERGEN_ICONS[allergenName] || '⚠️'
  }

  // Preparare la lista degli allergeni da mostrare
  const visibleAllergens = maxVisible ? allergens.slice(0, maxVisible) : allergens
  const hiddenCount = maxVisible && allergens.length > maxVisible ? allergens.length - maxVisible : 0

  return (
    <div className={`allergen-badges ${className} size-${size}`}>
      {visibleAllergens.map((allergen, index) => (
        <span 
          key={allergen.id || index}
          className="allergen-badge"
          title={allergen.name}
          aria-label={`Contiene ${allergen.name}`}
        >
          <span className="allergen-badge-icon" aria-hidden="true">
            {getIcon(allergen.name)}
          </span>
          {showLabels && (
            <span className="allergen-badge-label">
              {allergen.name}
            </span>
          )}
        </span>
      ))}
      
      {hiddenCount > 0 && (
        <span 
          className="allergen-badge allergen-badge-more"
          title={`+${hiddenCount} altri allergeni`}
          aria-label={`e altri ${hiddenCount} allergeni`}
        >
          <span className="allergen-badge-icon" aria-hidden="true">+{hiddenCount}</span>
        </span>
      )}
    </div>
  )
}

/**
 * Variante compatta per spazi ristretti
 */
export function AllergenBadgesCompact({ allergens, className = '' }) {
  return (
    <AllergenBadges 
      allergens={allergens}
      className={`allergen-badges-compact ${className}`}
      size="xsmall"
      showLabels={false}
      maxVisible={3}
    />
  )
}

/**
 * Variante estesa con etichette
 */
export function AllergenBadgesDetailed({ allergens, className = '' }) {
  return (
    <AllergenBadges 
      allergens={allergens}
      className={`allergen-badges-detailed ${className}`}
      size="medium"
      showLabels={true}
    />
  )
}