import React from 'react'

/* ===============================================
   🏷️ BADGE SYSTEM - SEMANTIC VARIANTS
   =============================================== */

// Main Badge Component with Semantic Variants
export function SemanticBadge({
  children,
  variant = 'default', // 'default' | 'success' | 'warning' | 'error' | 'info' | 'brand'
  size = 'medium', // 'small' | 'medium' | 'large'
  style = 'filled', // 'filled' | 'outline' | 'soft' | 'glass'
  shape = 'rounded', // 'rounded' | 'pill' | 'square'
  icon,
  iconPosition = 'left', // 'left' | 'right' | 'only'
  removable = false,
  onRemove,
  className = '',
  ariaLabel,
  count,
  pulsing = false,
  ...props
}) {
  const baseClass = 'semantic-badge'
  const variantClass = `${baseClass}--${variant}`
  const sizeClass = `${baseClass}--${size}`
  const styleClass = `${baseClass}--${style}`
  const shapeClass = `${baseClass}--${shape}`
  const pulsingClass = pulsing ? `${baseClass}--pulsing` : ''

  const handleRemove = (e) => {
    e.stopPropagation()
    onRemove?.()
  }

  const renderIcon = () => {
    if (!icon) return null
    return (
      <span className={`${baseClass}__icon ${baseClass}__icon--${iconPosition}`} aria-hidden="true">
        {icon}
      </span>
    )
  }

  const renderContent = () => {
    if (iconPosition === 'only') {
      return renderIcon()
    }

    return (
      <>
        {iconPosition === 'left' && renderIcon()}
        <span className={`${baseClass}__text`}>
          {children}
          {count !== undefined && count > 0 && (
            <span className={`${baseClass}__count`} aria-label={`${count} elementi`}>
              {count > 99 ? '99+' : count}
            </span>
          )}
        </span>
        {iconPosition === 'right' && renderIcon()}
      </>
    )
  }

  return (
    <span
      className={`
        ${baseClass}
        ${variantClass}
        ${sizeClass}
        ${styleClass}
        ${shapeClass}
        ${pulsingClass}
        ${className}
      `.trim()}
      aria-label={ariaLabel}
      {...props}
    >
      {renderContent()}
      
      {removable && (
        <button
          onClick={handleRemove}
          className={`${baseClass}__remove`}
          aria-label={`Rimuovi ${children || ariaLabel}`}
          type="button"
        >
          <XIcon size={12} />
        </button>
      )}
    </span>
  )
}

// Allergen Specific Badge
export function AllergenBadge({
  allergen,
  showIcon = true,
  severity = 'medium', // 'low' | 'medium' | 'high'
  ...props
}) {
  const allergenIcons = {
    glutine: '🌾',
    latticini: '🥛',
    uova: '🥚',
    pesce: '🐟',
    crostacei: '🦐',
    noci: '🥜',
    arachidi: '🥜',
    soia: '🫘',
    sesamo: '🫘',
    sedano: '🥬',
    senape: '🌿',
    lupini: '🫘',
    molluschi: '🦪',
    anidride_solforosa: '⚗️'
  }

  const severityColors = {
    low: 'info',
    medium: 'warning', 
    high: 'error'
  }

  return (
    <SemanticBadge
      variant={severityColors[severity]}
      icon={showIcon ? allergenIcons[allergen] : null}
      ariaLabel={`Contiene ${allergen} - Livello allergenico ${severity}`}
      {...props}
    >
      {allergen.charAt(0).toUpperCase() + allergen.slice(1)}
    </SemanticBadge>
  )
}

// Status Badge for Orders/Items
export function StatusBadge({
  status,
  showIcon = true,
  animated = false,
  ...props
}) {
  const statusConfig = {
    available: {
      variant: 'success',
      icon: '✅',
      label: 'Disponibile'
    },
    unavailable: {
      variant: 'error', 
      icon: '❌',
      label: 'Non disponibile'
    },
    limited: {
      variant: 'warning',
      icon: '⚠️',
      label: 'Disponibilità limitata'
    },
    new: {
      variant: 'info',
      icon: '✨',
      label: 'Novità'
    },
    popular: {
      variant: 'brand',
      icon: '🔥',
      label: 'Popolare'
    },
    seasonal: {
      variant: 'info',
      icon: '🍂',
      label: 'Stagionale'
    },
    vegetarian: {
      variant: 'success',
      icon: '🌱',
      label: 'Vegetariano'
    },
    vegan: {
      variant: 'success', 
      icon: '🌿',
      label: 'Vegano'
    },
    spicy: {
      variant: 'error',
      icon: '🌶️',
      label: 'Piccante'
    },
    chef_special: {
      variant: 'brand',
      icon: '👨‍🍳',
      label: 'Specialità dello Chef'
    }
  }

  const config = statusConfig[status] || statusConfig.available

  return (
    <SemanticBadge
      variant={config.variant}
      icon={showIcon ? config.icon : null}
      pulsing={animated && (status === 'new' || status === 'popular')}
      ariaLabel={config.label}
      {...props}
    >
      {config.label}
    </SemanticBadge>
  )
}

// Price Badge with Currency Support
export function PriceBadge({
  price,
  currency = '€',
  size = 'large',
  variant = 'brand',
  discount,
  original,
  ...props
}) {
  return (
    <div className="price-badge-container">
      <SemanticBadge
        variant={variant}
        size={size}
        style="glass"
        className="price-badge"
        ariaLabel={`Prezzo ${price}${currency}`}
        {...props}
      >
        <span className="price-currency">{currency}</span>
        <span className="price-amount">{price}</span>
      </SemanticBadge>
      
      {discount && original && (
        <div className="price-discount">
          <SemanticBadge
            variant="error"
            size="small"
            style="soft"
            className="discount-badge"
          >
            -{discount}%
          </SemanticBadge>
          <span className="original-price">
            {currency}{original}
          </span>
        </div>
      )}
    </div>
  )
}

// Nutrition Badge
export function NutritionBadge({
  type, // 'calories' | 'protein' | 'carbs' | 'fat' | 'fiber'
  value,
  unit = 'g',
  level = 'medium', // 'low' | 'medium' | 'high'
  ...props
}) {
  const nutritionConfig = {
    calories: {
      icon: '🔥',
      label: 'Calorie',
      unit: 'kcal'
    },
    protein: {
      icon: '💪',
      label: 'Proteine'
    },
    carbs: {
      icon: '🌾',
      label: 'Carboidrati'
    },
    fat: {
      icon: '🧈',
      label: 'Grassi'
    },
    fiber: {
      icon: '🌿',
      label: 'Fibre'
    }
  }

  const levelColors = {
    low: 'success',
    medium: 'info',
    high: 'warning'
  }

  const config = nutritionConfig[type]
  const displayUnit = config.unit || unit

  return (
    <SemanticBadge
      variant={levelColors[level]}
      icon={config.icon}
      size="small"
      style="soft"
      ariaLabel={`${config.label}: ${value}${displayUnit} - Livello ${level}`}
      {...props}
    >
      {value}{displayUnit}
    </SemanticBadge>
  )
}

// Rating Badge with Stars
export function RatingBadge({
  rating,
  maxRating = 5,
  showStars = true,
  reviewCount,
  size = 'medium',
  ...props
}) {
  const renderStars = () => {
    if (!showStars) return null
    
    const stars = []
    const fullStars = Math.floor(rating)
    const hasHalfStar = rating % 1 !== 0
    
    for (let i = 0; i < fullStars; i++) {
      stars.push(<span key={i} className="star star--full">★</span>)
    }
    
    if (hasHalfStar) {
      stars.push(<span key="half" className="star star--half">☆</span>)
    }
    
    const emptyStars = maxRating - Math.ceil(rating)
    for (let i = 0; i < emptyStars; i++) {
      stars.push(<span key={`empty-${i}`} className="star star--empty">☆</span>)
    }
    
    return <span className="rating-stars">{stars}</span>
  }

  return (
    <SemanticBadge
      variant="brand"
      size={size}
      style="soft"
      className="rating-badge"
      ariaLabel={`Valutazione ${rating} su ${maxRating} stelle${reviewCount ? ` da ${reviewCount} recensioni` : ''}`}
      {...props}
    >
      {showStars && renderStars()}
      <span className="rating-value">{rating.toFixed(1)}</span>
      {reviewCount && (
        <span className="review-count">({reviewCount})</span>
      )}
    </SemanticBadge>
  )
}

// Time Badge for Preparation/Delivery
export function TimeBadge({
  minutes,
  type = 'preparation', // 'preparation' | 'delivery' | 'waiting'
  variant = 'info',
  showIcon = true,
  ...props
}) {
  const timeIcons = {
    preparation: '👨‍🍳',
    delivery: '🛵',
    waiting: '⏱️'
  }

  const formatTime = (mins) => {
    if (mins < 60) {
      return `${mins} min`
    }
    const hours = Math.floor(mins / 60)
    const remainingMins = mins % 60
    return remainingMins > 0 ? `${hours}h ${remainingMins}min` : `${hours}h`
  }

  return (
    <SemanticBadge
      variant={variant}
      icon={showIcon ? timeIcons[type] : null}
      ariaLabel={`Tempo di ${type === 'preparation' ? 'preparazione' : type === 'delivery' ? 'consegna' : 'attesa'}: ${formatTime(minutes)}`}
      {...props}
    >
      {formatTime(minutes)}
    </SemanticBadge>
  )
}

// Badge Group Container
export function BadgeGroup({
  children,
  spacing = 'normal', // 'tight' | 'normal' | 'loose'
  direction = 'horizontal', // 'horizontal' | 'vertical'
  wrap = true,
  className = ''
}) {
  return (
    <div 
      className={`
        badge-group 
        badge-group--${spacing}
        badge-group--${direction}
        ${wrap ? 'badge-group--wrap' : ''}
        ${className}
      `.trim()}
    >
      {children}
    </div>
  )
}

// Utility Icons
function XIcon({ size = 16 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <line x1="18" y1="6" x2="6" y2="18" stroke="currentColor" strokeWidth="2"/>
      <line x1="6" y1="6" x2="18" y2="18" stroke="currentColor" strokeWidth="2"/>
    </svg>
  )
}