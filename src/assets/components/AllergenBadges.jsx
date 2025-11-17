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
  maxVisible = null,
  modern = false, // supporto stile moderno
  iconOnly = false // solo icone circolari (per mobile)
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

  const isModern = className.includes('modern');

  return (
    <div className={`allergen-badges ${className} ${iconOnly ? 'icon-only' : ''} size-${size}`}> 
      {visibleAllergens.map((allergen, index) => (
        <span 
          key={allergen.id || index}
          className={`allergen-badge ${isModern ? 'item-badge modern allergen' : ''} ${iconOnly ? 'icon-only-badge' : ''}`}
          title={allergen.name}
          aria-label={`Contiene ${allergen.name}`}
          style={iconOnly ? {
            width: '32px',
            height: '32px',
            borderRadius: '50%',
            background: 'rgba(255, 255, 255, 0.12)',
            border: '1.5px solid rgba(239, 202, 26, 0.5)',
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: 0,
            boxShadow: '0 2px 6px rgba(0, 0, 0, 0.15)',
            cursor: 'help',
            transition: 'all 0.2s ease'
          } : (isModern ? {} : {padding:'0.18em 0.38em', background:'linear-gradient(90deg,#fffbe6 60%,#fff7d1 100%)', border:'1.5px solid #efca1a', boxShadow:'0 1px 4px #efca1a22'})}
          onMouseEnter={iconOnly ? (e) => e.currentTarget.style.transform = 'scale(1.1)' : undefined}
          onMouseLeave={iconOnly ? (e) => e.currentTarget.style.transform = 'scale(1)' : undefined}
        >
          <span className="allergen-badge-icon material-symbols-outlined" aria-hidden="true" style={iconOnly ? {
            fontSize: '20px',
            color: '#fbbf24',
            fontVariationSettings: "'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24"
          } : (isModern ? {fontSize:'1em',fontVariationSettings:"'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24"} : {fontSize:'1.25em',color:'#efca1a',display:'flex',alignItems:'center',justifyContent:'center',fontVariationSettings:"'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24"})}>
            {getIcon(allergen.name)}
          </span>
          {!iconOnly && isModern && <span style={{fontSize:'0.7em',fontWeight:600}}>{allergen.name}</span>}
        </span>
      ))}
      {hiddenCount > 0 && (
        <span 
          className={`allergen-badge allergen-badge-more ${iconOnly ? 'icon-only-badge' : ''}`}
          title={`+${hiddenCount} altri allergeni`}
          aria-label={`e altri ${hiddenCount} allergeni`}
          style={iconOnly ? {
            width: '32px',
            height: '32px',
            borderRadius: '50%',
            background: 'rgba(107, 114, 128, 0.2)',
            border: '1.5px solid rgba(107, 114, 128, 0.4)',
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '0.75rem',
            fontWeight: 700,
            color: 'rgba(255, 255, 255, 0.8)',
            padding: 0
          } : {}}
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