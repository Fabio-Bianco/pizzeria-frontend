import { useState } from 'react'
import LazyImage from './LazyImage'

export default function CollapsibleMenuSection({ title, items = [], icon = '🍕', isExpanded = false }) {
  const [expanded, setExpanded] = useState(isExpanded)

  const toggleExpanded = () => {
    setExpanded(!expanded)
  }

  const getProductIcon = (item) => {
    // Determina l'icona in base al tipo di prodotto
    if (title.toLowerCase().includes('pizza')) return '🍕'
    if (title.toLowerCase().includes('antipast') || title.toLowerCase().includes('fritti')) return '🍤'
    if (title.toLowerCase().includes('bevand') || title.toLowerCase().includes('drink')) return '🥤'
    if (title.toLowerCase().includes('dessert') || title.toLowerCase().includes('dolc')) return '🍰'
    return '🍽️'
  }

  const extractAllergens = (item) => {
    if (item.allergens) {
      return item.allergens.map(a => a.name)
    }
    if (item.ingredients) {
      return item.ingredients.flatMap(ingredient => 
        ingredient.allergens ? ingredient.allergens.map(a => a.name) : []
      )
    }
    return []
  }

  const getAllergenIcon = (allergen) => {
    const allergenMap = {
      'glutine': '🌾',
      'lattosio': '🥛', 
      'uova': '🥚',
      'frutta a guscio': '🥜',
      'pesce': '🐟',
      'soia': '🌱',
      'sedano': '🌿',
      'senape': '🌻',
      'sesamo': '🌰',
      'lupini': '🫘',
      'molluschi': '🦪',
      'crostacei': '🦐',
      'arachidi': '🥜',
      'solfiti': '⚗️'
    }
    
    const key = allergen.toLowerCase()
    return allergenMap[key] || '⚠️'
  }

  return (
    <div className="qodeup-menu-section">
      <button 
        className={`qodeup-section-header ${expanded ? 'expanded' : ''}`}
        onClick={toggleExpanded}
      >
        <div className="qodeup-section-title">
          <span>{icon}</span>
          <span>{title}</span>
        </div>
        <div className="d-flex align-items-center gap-2">
          <span className="qodeup-section-count">({items.length})</span>
          <span className="qodeup-section-chevron">▶</span>
        </div>
      </button>
      
      <div className={`qodeup-section-content ${expanded ? 'expanded' : 'collapsed'}`}>
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
                  placeholder={getProductIcon(item)}
                />
              ) : (
                <div className="qodeup-product-placeholder">
                  {getProductIcon(item)}
                </div>
              )}
              
              <div className="qodeup-product-info">
                <div className="qodeup-product-header">
                  <h3 className="qodeup-product-name">{item.name}</h3>
                  {item.price && (
                    <div className="d-flex align-items-center gap-2">
                      <span className="qodeup-product-price">€{Number(item.price).toFixed(2)}</span>
                      <button className="qodeup-add-btn" title="Aggiungi al carrello">
                        +
                      </button>
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
                
                {allergens.length > 0 && (
                  <div className="qodeup-product-allergens">
                    {allergens.map((allergen, index) => (
                      <span 
                        key={index} 
                        className="qodeup-allergen-icon"
                        title={allergen}
                      >
                        {getAllergenIcon(allergen)}
                      </span>
                    ))}
                  </div>
                )}
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