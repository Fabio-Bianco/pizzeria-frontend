/* eslint-disable react-refresh/only-export-components */
import { useState, useRef } from 'react'

/**
 * 🏷️ Semantic Badge System - Sistema badge accessibile WCAG AAA
 * Badge allergeni, nutrizionali e informativi con design semantico
 */

/**
 * 🌾 Allergen Icons - Icone allergeni SVG semantiche
 */
const AllergenIcons = {
  gluten: (
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M12 2L15.09 8.26L22 9L17 14L18.18 21L12 17.77L5.82 21L7 14L2 9L8.91 8.26L12 2Z" 
            fill="currentColor" stroke="currentColor" strokeWidth="1"/>
      <circle cx="12" cy="12" r="3" fill="none" stroke="currentColor" strokeWidth="1.5"/>
    </svg>
  ),
  dairy: (
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M5 10V18C5 19.1046 5.89543 20 7 20H17C18.1046 20 19 19.1046 19 18V10" 
            stroke="currentColor" strokeWidth="1.5" fill="none"/>
      <path d="M4 6C4 4.89543 4.89543 4 6 4H18C19.1046 4 20 4.89543 20 6V8H4V6Z" 
            fill="currentColor"/>
    </svg>
  ),
  nuts: (
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <ellipse cx="12" cy="12" rx="6" ry="8" stroke="currentColor" strokeWidth="1.5" fill="currentColor"/>
      <ellipse cx="12" cy="12" rx="3" ry="5" fill="none" stroke="white" strokeWidth="1"/>
    </svg>
  ),
  eggs: (
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M12 21C16.4183 21 20 17.4183 20 13C20 8.58172 16.4183 3 12 3C7.58172 3 4 8.58172 4 13C4 17.4183 7.58172 21 12 21Z" 
            fill="currentColor" stroke="currentColor" strokeWidth="1"/>
    </svg>
  ),
  fish: (
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M3 12H9L11 8H15L13 12L15 16H11L9 12H3Z" fill="currentColor"/>
      <path d="M15 12H21M18 9L21 12L18 15" stroke="currentColor" strokeWidth="1.5" fill="none"/>
      <circle cx="13" cy="10" r="1" fill="white"/>
    </svg>
  ),
  soy: (
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M12 3L8 7H16L12 3Z" fill="currentColor"/>
      <rect x="7" y="7" width="10" height="10" rx="2" fill="currentColor"/>
      <path d="M9 17L12 21L15 17" stroke="currentColor" strokeWidth="1.5" fill="none"/>
    </svg>
  ),
  shellfish: (
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M12 20C16.4183 20 20 16.4183 20 12C20 7.58172 16.4183 4 12 4C7.58172 4 4 7.58172 4 12C4 16.4183 7.58172 20 12 20Z" 
            stroke="currentColor" strokeWidth="1.5" fill="currentColor"/>
      <path d="M8 12L12 8L16 12L12 16L8 12Z" fill="white"/>
    </svg>
  ),
  sesame: (
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="12" cy="12" r="8" stroke="currentColor" strokeWidth="1.5" fill="currentColor"/>
      <circle cx="10" cy="10" r="1" fill="white"/>
      <circle cx="14" cy="10" r="1" fill="white"/>
      <circle cx="12" cy="14" r="1" fill="white"/>
      <circle cx="9" cy="14" r="0.5" fill="white"/>
      <circle cx="15" cy="14" r="0.5" fill="white"/>
    </svg>
  )
}

/**
 * 🍃 Dietary Icons - Icone regime alimentare
 */
const DietaryIcons = {
  vegan: (
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M7 12C7 9.23858 9.23858 7 12 7V7C14.7614 7 17 9.23858 17 12V17H7V12Z" 
            fill="currentColor"/>
      <path d="M12 7C12 4.79086 10.2091 3 8 3H8C7.44772 3 7 3.44772 7 4V4C7 4.55228 7.44772 5 8 5C8.55228 5 9 5.44772 9 6V7H12Z" 
            fill="currentColor"/>
      <rect x="9" y="17" width="6" height="4" rx="1" fill="currentColor"/>
    </svg>
  ),
  vegetarian: (
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" 
            fill="currentColor"/>
      <path d="M8 12C8 10.8954 8.89543 10 10 10H14C15.1046 10 16 10.8954 16 12V14C16 15.1046 15.1046 16 14 16H10C8.89543 16 8 15.1046 8 14V12Z" 
            fill="white"/>
    </svg>
  ),
  glutenFree: (
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" fill="none"/>
      <path d="M8 8L16 16M16 8L8 16" stroke="currentColor" strokeWidth="2"/>
    </svg>
  ),
  organic: (
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M12 2L14.09 8.26L22 9L17 14L18.18 21L12 17.77L5.82 21L7 14L2 9L8.91 8.26L12 2Z" 
            fill="currentColor"/>
    </svg>
  ),
  lowCalorie: (
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" 
            stroke="currentColor" strokeWidth="2" fill="none"/>
      <path d="M12 6V12L16 14" stroke="currentColor" strokeWidth="2"/>
    </svg>
  )
}

/**
 * 🏷️ Enhanced Badge Component - Badge accessibile con tooltip
 */
export function EnhancedBadge({ 
  type = 'info',
  variant = 'default',
  size = 'medium',
  icon,
  children,
  tooltip,
  semanticLabel,
  className = '',
  ...props 
}) {
  const [showTooltip, setShowTooltip] = useState(false)
  const badgeRef = useRef(null)
  const tooltipId = `tooltip-${Math.random().toString(36).substr(2, 9)}`

  // Mappa tipo a colori semantici
  const typeStyles = {
    allergen: 'badge-allergen bg-red-100 text-red-900 border-red-200',
    warning: 'badge-warning bg-amber-100 text-amber-900 border-amber-200',
    success: 'badge-success bg-green-100 text-green-900 border-green-200',
    info: 'badge-info bg-blue-100 text-blue-900 border-blue-200',
    dietary: 'badge-dietary bg-emerald-100 text-emerald-900 border-emerald-200',
    premium: 'badge-premium bg-purple-100 text-purple-900 border-purple-200'
  }

  // Mappa size
  const sizeStyles = {
    small: 'badge-sm text-xs px-2 py-1',
    medium: 'badge-md text-sm px-3 py-1.5',
    large: 'badge-lg text-base px-4 py-2'
  }

  // Varianti
  const variantStyles = {
    default: '',
    outline: 'bg-transparent border-2',
    solid: 'text-white border-transparent',
    subtle: 'bg-opacity-50 border-opacity-50'
  }

  const badgeClasses = `
    badge enhanced-badge inline-flex items-center gap-2 font-medium rounded-full border transition-all duration-200 focus-visible
    ${typeStyles[type] || typeStyles.info}
    ${sizeStyles[size]}
    ${variantStyles[variant]}
    ${className}
  `.trim()

  const handleMouseEnter = () => {
    if (tooltip) setShowTooltip(true)
  }

  const handleMouseLeave = () => {
    setShowTooltip(false)
  }

  const handleFocus = () => {
    if (tooltip) setShowTooltip(true)
  }

  const handleBlur = () => {
    setShowTooltip(false)
  }

  return (
    <span
      ref={badgeRef}
      className={badgeClasses}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onFocus={handleFocus}
      onBlur={handleBlur}
      aria-label={semanticLabel || children}
      aria-describedby={tooltip ? tooltipId : undefined}
      tabIndex={tooltip ? 0 : undefined}
      role="img"
      {...props}
    >
      {icon && (
        <span className="badge-icon w-4 h-4 flex-shrink-0" aria-hidden="true">
          {icon}
        </span>
      )}
      <span className="badge-text">{children}</span>
      
      {/* Tooltip */}
      {tooltip && showTooltip && (
        <div
          id={tooltipId}
          className="tooltip absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-2 bg-neutral-900 text-white text-sm rounded-lg shadow-lg z-50 whitespace-nowrap"
          role="tooltip"
        >
          {tooltip}
          <div className="tooltip-arrow absolute top-full left-1/2 transform -translate-x-1/2 border-l-4 border-r-4 border-t-4 border-transparent border-t-neutral-900"></div>
        </div>
      )}
    </span>
  )
}

/**
 * 🚨 Allergen Badge - Badge allergeni specifico
 */
export function AllergenBadge({ allergen, severity = 'high', className = '', ...props }) {
  const allergenInfo = {
    gluten: { label: 'Glutine', icon: AllergenIcons.gluten, description: 'Contiene glutine' },
    dairy: { label: 'Lattosio', icon: AllergenIcons.dairy, description: 'Contiene lattosio/latticini' },
    nuts: { label: 'Frutta a guscio', icon: AllergenIcons.nuts, description: 'Contiene frutta a guscio' },
    eggs: { label: 'Uova', icon: AllergenIcons.eggs, description: 'Contiene uova' },
    fish: { label: 'Pesce', icon: AllergenIcons.fish, description: 'Contiene pesce' },
    soy: { label: 'Soia', icon: AllergenIcons.soy, description: 'Contiene soia' },
    shellfish: { label: 'Crostacei', icon: AllergenIcons.shellfish, description: 'Contiene crostacei' },
    sesame: { label: 'Sesamo', icon: AllergenIcons.sesame, description: 'Contiene sesamo' }
  }

  const info = allergenInfo[allergen]
  if (!info) return null

  const severityStyles = {
    high: 'bg-red-600 text-white border-red-600',
    medium: 'bg-amber-500 text-white border-amber-500',
    low: 'bg-orange-400 text-white border-orange-400'
  }

  return (
    <EnhancedBadge
      type="allergen"
      variant="solid"
      icon={info.icon}
      tooltip={info.description}
      semanticLabel={`Allergene: ${info.label}`}
      className={`allergen-badge ${severityStyles[severity]} ${className}`}
      {...props}
    >
      {info.label}
    </EnhancedBadge>
  )
}

/**
 * 🍃 Dietary Badge - Badge regime alimentare
 */
export function DietaryBadge({ diet, certified = false, className = '', ...props }) {
  const dietaryInfo = {
    vegan: { 
      label: 'Vegano', 
      icon: DietaryIcons.vegan, 
      description: 'Prodotto 100% vegano, senza ingredienti di origine animale',
      color: 'bg-green-600 text-white border-green-600'
    },
    vegetarian: { 
      label: 'Vegetariano', 
      icon: DietaryIcons.vegetarian, 
      description: 'Adatto ai vegetariani',
      color: 'bg-green-500 text-white border-green-500'
    },
    glutenFree: { 
      label: 'Senza Glutine', 
      icon: DietaryIcons.glutenFree, 
      description: 'Certificato senza glutine',
      color: 'bg-blue-600 text-white border-blue-600'
    },
    organic: { 
      label: 'Biologico', 
      icon: DietaryIcons.organic, 
      description: 'Ingredienti da agricoltura biologica certificata',
      color: 'bg-emerald-600 text-white border-emerald-600'
    },
    lowCalorie: { 
      label: 'Light', 
      icon: DietaryIcons.lowCalorie, 
      description: 'Ridotto contenuto calorico',
      color: 'bg-cyan-600 text-white border-cyan-600'
    }
  }

  const info = dietaryInfo[diet]
  if (!info) return null

  return (
    <EnhancedBadge
      type="dietary"
      variant="solid"
      icon={info.icon}
      tooltip={certified ? `${info.description} - Certificato` : info.description}
      semanticLabel={`Regime alimentare: ${info.label}${certified ? ' certificato' : ''}`}
      className={`dietary-badge ${info.color} ${certified ? 'certified' : ''} ${className}`}
      {...props}
    >
      {info.label}
      {certified && (
        <span className="certified-indicator ml-1 text-xs" aria-label="Certificato">
          ✓
        </span>
      )}
    </EnhancedBadge>
  )
}

/**
 * 📊 Nutritional Badge - Badge valori nutrizionali
 */
export function NutritionalBadge({ 
  type, 
  value, 
  unit = '', 
  level = 'medium',
  className = '',
  ...props 
}) {
  const nutritionalInfo = {
    calories: { label: 'Calorie', unit: 'kcal' },
    protein: { label: 'Proteine', unit: 'g' },
    carbs: { label: 'Carboidrati', unit: 'g' },
    fat: { label: 'Grassi', unit: 'g' },
    fiber: { label: 'Fibre', unit: 'g' },
    sodium: { label: 'Sodio', unit: 'mg' },
    sugar: { label: 'Zuccheri', unit: 'g' }
  }

  const info = nutritionalInfo[type]
  if (!info) return null

  // Determinazione colore basato su livello
  const levelStyles = {
    low: 'bg-green-100 text-green-800 border-green-200',
    medium: 'bg-yellow-100 text-yellow-800 border-yellow-200',
    high: 'bg-red-100 text-red-800 border-red-200'
  }

  const displayValue = `${value}${unit || info.unit}`

  return (
    <EnhancedBadge
      type="info"
      size="small"
      tooltip={`${info.label}: ${displayValue}`}
      semanticLabel={`Valore nutrizionale ${info.label}: ${displayValue}`}
      className={`nutritional-badge ${levelStyles[level]} ${className}`}
      {...props}
    >
      <span className="text-xs font-mono">{displayValue}</span>
    </EnhancedBadge>
  )
}

/**
 * 🏆 Quality Badge - Badge qualità e certificazioni
 */
export function QualityBadge({ 
  quality, 
  certification = null, 
  className = '',
  ...props 
}) {
  const qualityInfo = {
    premium: {
      label: 'Premium',
      description: 'Ingredienti di prima qualità',
      color: 'bg-gradient-to-r from-purple-600 to-purple-700 text-white border-purple-600'
    },
    artisan: {
      label: 'Artigianale',
      description: 'Prodotto artigianalmente',
      color: 'bg-gradient-to-r from-amber-600 to-amber-700 text-white border-amber-600'
    },
    traditional: {
      label: 'Tradizionale',
      description: 'Ricetta della tradizione',
      color: 'bg-gradient-to-r from-orange-600 to-red-600 text-white border-orange-600'
    },
    chef: {
      label: 'Chef\'s Choice',
      description: 'Selezione dello chef',
      color: 'bg-gradient-to-r from-indigo-600 to-indigo-700 text-white border-indigo-600'
    }
  }

  const info = qualityInfo[quality]
  if (!info) return null

  return (
    <EnhancedBadge
      type="premium"
      variant="solid"
      tooltip={certification ? `${info.description} - ${certification}` : info.description}
      semanticLabel={`Qualità: ${info.label}${certification ? ` - ${certification}` : ''}`}
      className={`quality-badge ${info.color} ${className}`}
      {...props}
    >
      <span className="quality-star mr-1" aria-hidden="true">⭐</span>
      {info.label}
    </EnhancedBadge>
  )
}

/**
 * 🏷️ Badge Group - Gruppo di badge organizzato
 */
export function BadgeGroup({ 
  badges = [], 
  className = '',
  maxVisible = 4,
  showMoreLabel = 'Altri',
  groupLabel = 'Informazioni prodotto',
  ...props 
}) {
  const [showAll, setShowAll] = useState(false)
  
  const visibleBadges = showAll ? badges : badges.slice(0, maxVisible)
  const hiddenCount = badges.length - maxVisible

  return (
    <div 
      className={`badge-group flex flex-wrap items-center gap-2 ${className}`}
      role="group"
      aria-label={groupLabel}
      {...props}
    >
      {visibleBadges.map((badge, index) => (
        <span key={index} className="badge-item">
          {badge}
        </span>
      ))}
      
      {!showAll && hiddenCount > 0 && (
        <button
          onClick={() => setShowAll(true)}
          className="show-more-badge inline-flex items-center gap-1 px-2 py-1 text-xs font-medium text-neutral-600 hover:text-brand-primary border border-neutral-300 hover:border-brand-primary rounded-full transition-colors duration-200 focus-visible"
          aria-label={`Mostra altri ${hiddenCount} badge`}
        >
          +{hiddenCount} {showMoreLabel}
        </button>
      )}
      
      {showAll && hiddenCount > 0 && (
        <button
          onClick={() => setShowAll(false)}
          className="show-less-badge inline-flex items-center gap-1 px-2 py-1 text-xs font-medium text-neutral-600 hover:text-brand-primary border border-neutral-300 hover:border-brand-primary rounded-full transition-colors duration-200 focus-visible"
          aria-label="Mostra meno badge"
        >
          Meno
        </button>
      )}
    </div>
  )
}

/**
 * 🎯 Badge Filter - Filtro per badge
 */
export function BadgeFilter({ 
  filters = [], 
  selectedFilters = [], 
  onFilterChange,
  className = '',
  ...props 
}) {
  const handleFilterToggle = (filterValue) => {
    const isSelected = selectedFilters.includes(filterValue)
    const newFilters = isSelected 
      ? selectedFilters.filter(f => f !== filterValue)
      : [...selectedFilters, filterValue]
    
    onFilterChange?.(newFilters)
  }

  return (
    <div 
      className={`badge-filter ${className}`}
      role="group"
      aria-label="Filtri per badge"
      {...props}
    >
      <div className="filter-header mb-3">
        <h3 className="text-sm font-medium text-neutral-700">Filtra per:</h3>
      </div>
      
      <div className="filter-options flex flex-wrap gap-2">
        {filters.map((filter, index) => (
          <button
            key={index}
            onClick={() => handleFilterToggle(filter.value)}
            className={`filter-option inline-flex items-center gap-2 px-3 py-2 text-sm font-medium rounded-full border transition-all duration-200 focus-visible touch-comfortable ${
              selectedFilters.includes(filter.value)
                ? 'bg-brand-primary text-white border-brand-primary'
                : 'bg-white text-neutral-700 border-neutral-300 hover:border-brand-primary'
            }`}
            aria-pressed={selectedFilters.includes(filter.value)}
            aria-label={`Filtro ${filter.label}: ${selectedFilters.includes(filter.value) ? 'attivo' : 'inattivo'}`}
          >
            {filter.icon && (
              <span className="filter-icon w-4 h-4" aria-hidden="true">
                {filter.icon}
              </span>
            )}
            <span>{filter.label}</span>
            {filter.count !== undefined && (
              <span 
                className={`count-badge text-xs px-1.5 py-0.5 rounded-full ${
                  selectedFilters.includes(filter.value) 
                    ? 'bg-white/20' 
                    : 'bg-neutral-100'
                }`}
                aria-label={`${filter.count} elementi`}
              >
                {filter.count}
              </span>
            )}
          </button>
        ))}
      </div>
      
      {selectedFilters.length > 0 && (
        <div className="filter-actions mt-3">
          <button
            onClick={() => onFilterChange?.([])}
            className="clear-filters text-sm text-neutral-600 hover:text-brand-primary underline focus-visible"
            aria-label="Rimuovi tutti i filtri"
          >
            Rimuovi tutti i filtri
          </button>
        </div>
      )}
    </div>
  )
}