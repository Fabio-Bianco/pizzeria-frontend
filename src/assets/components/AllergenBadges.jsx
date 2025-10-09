import './AllergenBadges.css'


// Mapping icone Material Symbols come nella modale
const ALLERGEN_ICON_MAP = {
  'LATTOSIO': 'icecream',
  'FRUTTA A GUSCIO': 'nutrition',
  'NOCI': 'nutrition',
  'UOVA': 'egg',
  'PESCE': 'fish',
  'ARACHIDI': 'spa',
  'SOIA': 'eco',
  'CROSTACEI': 'cruelty_free',
  'SEDANO': 'grass',
  'SENAPE': 'science',
  'SESAMO': 'restaurant',
  'SOLFITI': 'local_drink',
  'ANIDRIDE SOLFOROSA': 'local_drink',
  'LUPINI': 'spa',
  'MOLLUSCHI': 'waves',
};

/**
 * Componente per mostrare i badge degli allergeni per un piatto
 */
export default function AllergenBadges({ 
  allergens, 
  className = '', 
  size = 'small',
  showLabels = false, // forzato a false per mostrare solo icone
  maxVisible = null 
}) {
  // Se non ci sono allergeni, non renderizzare nulla
  if (!allergens || !Array.isArray(allergens) || allergens.length === 0) {
    return null
  }

  // Funzione per ottenere l'icona Material Symbols (come nella modale)
  const getIcon = (allergenName) => {
    if (!allergenName) return 'warning';
    // Normalizza maiuscole/minuscole e sinonimi
    const key = allergenName.trim().toUpperCase();
    return ALLERGEN_ICON_MAP[key] || 'warning';
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
          style={{padding:'0.18em 0.38em', background:'linear-gradient(90deg,#fffbe6 60%,#fff7d1 100%)', border:'1.5px solid #efca1a', boxShadow:'0 1px 4px #efca1a22'}}
        >
          <span className="allergen-badge-icon material-symbols-outlined" aria-hidden="true" style={{fontSize:'1.25em',color:'#efca1a',display:'flex',alignItems:'center',justifyContent:'center',fontVariationSettings:"'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24"}}>
            {getIcon(allergen.name)}
          </span>
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