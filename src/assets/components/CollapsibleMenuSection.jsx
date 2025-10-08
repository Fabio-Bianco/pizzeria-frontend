import { useState } from 'react'
import LazyImage from './LazyImage'
import { AllergenBadgesCompact } from './AllergenBadges'

export default function CollapsibleMenuSection({ 
  title, 
  items = [], 
  icon = '🍕', 
  isExpanded = false,
  count
}) {
  const [expanded, setExpanded] = useState(isExpanded)

  const toggleExpanded = () => {
    setExpanded(!expanded)
  }

  // Determina il conteggio da mostrare
  const displayCount = count !== undefined ? count : items.length

  const getProductIcon = () => {
    // Determina l'icona in base al tipo di prodotto
    if (title.toLowerCase().includes('pizza')) return '🍕'
    if (title.toLowerCase().includes('antipast') || title.toLowerCase().includes('fritti')) return '🍤'
    if (title.toLowerCase().includes('bevand') || title.toLowerCase().includes('drink')) return '🥤'
    if (title.toLowerCase().includes('dessert') || title.toLowerCase().includes('dolc')) return '🍰'
    return '🍽️'
  }

  // Funzione per estrarre allergeni, semplificata per usare direttamente quelli dal backend
  const extractAllergens = (item) => {
    // Se il piatto ha già una proprietà allergens, usala
    if (item.allergens && Array.isArray(item.allergens)) {
      return item.allergens
    }
    
    // Altrimenti estrai dagli ingredienti se disponibili
    if (item.ingredients && Array.isArray(item.ingredients)) {
      const allergens = []
      item.ingredients.forEach(ingredient => {
        if (ingredient.allergens && Array.isArray(ingredient.allergens)) {
          allergens.push(...ingredient.allergens)
        }
      })
      
      // Rimuovi duplicati
      const uniqueAllergens = allergens.filter((allergen, index, self) =>
        index === self.findIndex(a => a.id === allergen.id)
      )
      
      return uniqueAllergens
    }
    
    return []
  }

  return (
    <div className="qodeup-menu-section">
      {/* Header sezione con gestione toggle originale */}
      <button
        className={`qodeup-section-header ${expanded ? 'expanded' : ''}`}
        onClick={toggleExpanded}
        aria-expanded={expanded}
        aria-controls={`section-${title.replace(/\s+/g, '-').toLowerCase()}`}
        aria-label={`${expanded ? 'Chiudi' : 'Apri'} sezione ${title} (${displayCount} prodotti)`}
      >
        <div className="qodeup-section-title">
          <span aria-hidden="true">{getProductIcon()}</span>
          <span>{title}</span>
        </div>
        <div className="d-flex align-items-center gap-2">
          <span className="qodeup-section-count" aria-label={`${displayCount} prodotti disponibili`}>
            ({displayCount})
          </span>
          <span 
            className="qodeup-section-chevron"
            aria-hidden="true"
          >
            ▼
          </span>
        </div>
      </button>

      {/* Content sezione con logica collassabile originale */}
      <div 
        className={`qodeup-section-content ${expanded ? 'expanded' : 'collapsed'}`}
        id={`section-${title.replace(/\s+/g, '-').toLowerCase()}`}
        role="region"
        aria-labelledby={`header-${title.replace(/\s+/g, '-').toLowerCase()}`}
      >
        {items.map((item) => {
          const allergens = extractAllergens(item)
          const description = item.description || item.notes || ''
          const ingredients = item.ingredients ? item.ingredients.map(i => i.name).join(', ') : ''
          
          return (
            <div key={item.id} className="qodeup-product-card">
              {item.image_url ? (
                <LazyImage
                  src={item.image_url}
                  alt={item.name}
                  className="qodeup-product-image"
                  placeholder={getProductIcon()}
                />
              ) : (
                <div className="qodeup-product-placeholder">
                  {getProductIcon()}
                </div>
              )}
              
              <div className="qodeup-product-info">
                <div className="qodeup-product-header">
                  <h3 className="qodeup-product-name">{item.name}</h3>
                  {item.price && (
                    <div className="d-flex align-items-center gap-2">
                      <span className="qodeup-product-price">€{Number(item.price).toFixed(2)}</span>
                    </div>
                  )}
                </div>
                
                {description && (
                  <p className="qodeup-product-description">{description}</p>
                )}
                
                {ingredients && (
                  <p className="qodeup-product-description">
                    <strong>Ingredienti:</strong> {ingredients}
                  </p>
                )}
                
                {/* Usa il nuovo componente AllergenBadges */}
                <AllergenBadgesCompact 
                  allergens={allergens}
                  className="qodeup-product-allergens"
                />
              </div>
            </div>
          )
        })}
        
        {items.length === 0 && (
          <div className="text-center text-muted p-4">
            Nessun prodotto disponibile in questa sezione
          </div>
        )}
      </div>
    </div>
  )
}