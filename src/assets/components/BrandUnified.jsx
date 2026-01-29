/* eslint-disable react-refresh/only-export-components */
import { useState, useEffect } from 'react'

// Icons
export function PizzaIcon({ size = 24, className = '', color = 'var(--color-brand-primary)' }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      role="img"
      aria-label="Icona pizza autentica italiana"
    >
      <path d="M12 2L22 20H2L12 2Z" fill={color} stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      <circle cx="8" cy="14" r="1" fill="white" />
      <circle cx="16" cy="14" r="1" fill="white" />
      <circle cx="12" cy="12" r="1" fill="white" />
      <circle cx="10" cy="16" r="0.5" fill="white" />
      <circle cx="14" cy="16" r="0.5" fill="white" />
    </svg>
  )
}

export function LeafIcon({ size = 16, className = '', color = 'var(--color-success)' }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      role="img"
      aria-label="Icona ingredienti naturali"
    >
      <path d="M2 15C2 10 5 5 8 2C11 5 14 10 14 15C14 18 11 20 8 20C5 20 2 18 2 15Z" 
            fill={color} opacity="0.8"/>
      <path d="M8 2C10 6 12 10 14 15" stroke={color} strokeWidth="1" fill="none"/>
    </svg>
  )
}

// Logo Unificato con accessibilità
export function PremiumPizzeriaLogo({ 
  size = 'medium', 
  showText = true, 
  className = '',
  variant = 'default',
  interactive = false 
}) {
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => setIsLoaded(true), 100)
    return () => clearTimeout(timer)
  }, [])

  const sizes = {
    small: 32,
    medium: 48,
    large: 64,
    xl: 80
  }

  const iconSize = sizes[size]
  
  const logoClass = `
    premium-logo 
    ${className} 
    ${isLoaded ? 'logo-loaded' : 'logo-loading'}
    ${interactive ? 'logo-interactive' : ''}
    ${variant}
  `.trim()

  return (
    <div className={logoClass} role="banner">
      <div className="logo-content">
        <div className="logo-icon" role="img" aria-label="Logo Pizzeria Italiana Premium">
          <PizzaIcon 
            size={iconSize} 
            className="pizza-icon"
            color={variant === 'light' ? 'white' : 'var(--color-brand-primary)'}
          />
          <LeafIcon 
            size={iconSize * 0.3} 
            className="leaf-accent"
            color={variant === 'light' ? 'rgba(255,255,255,0.8)' : 'var(--color-success)'}
          />
        </div>
        
        {showText && (
          <div className="logo-text" aria-hidden="true">
            <h1 className="brand-name">La Pizzeria</h1>
            <p className="brand-tagline">Autentica • Italiana</p>
          </div>
        )}
      </div>
    </div>
  )
}

// Header Brand Semplificato
export function BrandHeader({ 
  title = "La Pizzeria", 
  subtitle = "Autentica Tradizione Italiana",
  showLogo = true,
  className = '',
  variant = 'default'
}) {
  return (
    <header className={`brand-header ${className} ${variant}`} role="banner">
      <div className="brand-container">
        {showLogo && (
          <PremiumPizzeriaLogo 
            size="large" 
            showText={false}
            variant={variant}
            interactive
          />
        )}
        <div className="brand-info">
          <h1 className="brand-title">{title}</h1>
          <p className="brand-subtitle">{subtitle}</p>
        </div>
      </div>
    </header>
  )
}

// Componente Quality Badge semplificato
export function QualityBadge({ type = 'premium', className = '' }) {
  const badges = {
    premium: { text: 'Premium Quality', color: 'var(--color-gold)' },
    authentic: { text: 'Autentica Italiana', color: 'var(--color-success)' },
    fresh: { text: 'Ingredienti Freschi', color: 'var(--color-info)' }
  }

  const badge = badges[type]

  return (
    <div className={`quality-badge quality-badge--${type} ${className}`}>
      <LeafIcon size={14} color={badge.color} />
      <span>{badge.text}</span>
    </div>
  )
}