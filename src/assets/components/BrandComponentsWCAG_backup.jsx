/* eslint-disable react-refresh/only-export-components */
import { useState, useEffect } from 'react'

/**
 * 🍕 Pizza Icon SVG - Icona professionale WCAG AAA
 * SVG ottimizzato per accessibilità e performance
 */
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
      <path
        d="M12 2L22 20H2L12 2Z"
        fill={color}
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="8" cy="14" r="1" fill="white" />
      <circle cx="16" cy="14" r="1" fill="white" />
      <circle cx="12" cy="12" r="1" fill="white" />
      <circle cx="10" cy="16" r="0.5" fill="white" />
      <circle cx="14" cy="16" r="0.5" fill="white" />
    </svg>
  )
}

/**
 * 🌿 Leaf Icon SVG - Icona natura/bio
 */
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
      <path
        d="M13 3C10.5 3 8.5 4.5 8 7C7.5 4.5 5.5 3 3 3C3 8 6 11 8 11C10 11 13 8 13 3Z"
        fill={color}
        opacity="0.8"
      />
      <path
        d="M8 7L6 9"
        stroke={color}
        strokeWidth="1"
        strokeLinecap="round"
      />
    </svg>
  )
}

/**
 * ⭐ Star Icon SVG - Icona qualità premium
 */
export function StarIcon({ size = 16, className = '', filled = false }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      role="img"
      aria-label="Stella qualità premium"
    >
      <path
        d="M8 1L10.09 5.26L15 6L11.5 9.74L12.18 15L8 12.77L3.82 15L4.5 9.74L1 6L5.91 5.26L8 1Z"
        fill={filled ? 'var(--color-brand-accent)' : 'none'}
        stroke="var(--color-brand-accent)"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

/**
 * 🏛️ Premium Logo Component - Logo principale della pizzeria
 * Design professionale con varianti responsive e accessibilità WCAG AAA
 */
export function PremiumPizzeriaLogo({ 
  size = 'medium', 
  variant = 'full',
  theme = 'light',
  className = '',
  showTagline = true 
}) {
  const sizes = {
    small: {
      container: 'h-10',
      icon: 32,
      title: 'heading-3',
      tagline: 'text-xs'
    },
    medium: {
      container: 'h-16',
      icon: 48,
      title: 'heading-2',
      tagline: 'text-sm'
    },
    large: {
      container: 'h-24',
      icon: 64,
      title: 'heading-1',
      tagline: 'text-base'
    }
  }

  const themes = {
    light: {
      primary: 'var(--color-brand-primary)',
      secondary: 'var(--color-brand-secondary)',
      text: 'var(--color-neutral-900)',
      accent: 'var(--color-brand-accent)'
    },
    dark: {
      primary: 'white',
      secondary: 'var(--color-brand-accent)',
      text: 'white',
      accent: 'var(--color-brand-accent)'
    },
    minimal: {
      primary: 'var(--color-neutral-800)',
      secondary: 'var(--color-neutral-600)',
      text: 'var(--color-neutral-800)',
      accent: 'var(--color-brand-primary)'
    }
  }

  const currentSize = sizes[size]
  const currentTheme = themes[theme]

  if (variant === 'icon') {
    return (
      <div className={`flex items-center justify-center ${currentSize.container} ${className}`}>
        <PizzaIcon 
          size={currentSize.icon} 
          color={currentTheme.primary}
          className="drop-shadow-sm hover:scale-105 transition-transform duration-200"
        />
      </div>
    )
  }

  return (
    <div 
      className={`flex items-center gap-var(--space-3) ${currentSize.container} ${className}`}
      role="img"
      aria-label="Pizzeria Bella - Autentica Italiana"
    >
      {/* Icona principale con effetti premium */}
      <div className="relative">
        <PizzaIcon 
          size={currentSize.icon} 
          color={currentTheme.primary}
          className="drop-shadow-md transition-all duration-300 hover:scale-105 hover:rotate-1"
        />
        {/* Accent decorativo */}
        <div 
          className="absolute -top-1 -right-1 w-3 h-3 rounded-full opacity-80 animate-pulse"
          style={{ backgroundColor: currentTheme.accent }}
          aria-hidden="true"
        />
      </div>

      {/* Testo del brand con tipografia semantica */}
      {variant === 'full' && (
        <div className="flex flex-col justify-center">
          <h1 
            className={`${currentSize.title} tracking-tight leading-none font-black`}
            style={{ color: currentTheme.text }}
          >
            Pizzeria
            <span 
              className="ml-2 font-light italic"
              style={{ color: currentTheme.secondary }}
            >
              Bella
            </span>
          </h1>
          
          {showTagline && (
            <p 
              className={`${currentSize.tagline} tracking-wider uppercase opacity-75 leading-tight font-medium`}
              style={{ color: currentTheme.secondary }}
            >
              Autentica Italiana
            </p>
          )}
        </div>
      )}
    </div>
  )
}

/**
 * 🏷️ Brand Badge Component - Badge di qualità WCAG AAA
 * Distintivi per certificazioni e caratteristiche speciali
 */
export function BrandBadge({ 
  type = 'premium',
  size = 'medium',
  showIcon = true,
  className = ''
}) {
  const badges = {
    premium: {
      icon: <StarIcon size={16} filled />,
      text: 'Premium',
      color: 'var(--color-brand-accent)',
      bg: 'var(--color-warning-bg)',
      ariaLabel: 'Qualità premium garantita'
    },
    authentic: {
      icon: '🇮🇹',
      text: 'Autentica',
      color: 'var(--color-success)',
      bg: 'var(--color-success-bg)',
      ariaLabel: 'Ricetta autentica italiana'
    },
    fresh: {
      icon: <LeafIcon size={16} color="var(--color-success)" />,
      text: 'Fresco',
      color: 'var(--color-success)',
      bg: 'var(--color-success-bg)',
      ariaLabel: 'Ingredienti freschi giornalieri'
    },
    artisan: {
      icon: '👨‍🍳',
      text: 'Artigianale',
      color: 'var(--color-brand-primary)',
      bg: 'var(--color-info-bg)',
      ariaLabel: 'Lavorazione artigianale tradizionale'
    },
    bio: {
      icon: <LeafIcon size={16} color="var(--color-success)" />,
      text: 'Biologico',
      color: 'var(--color-success)',
      bg: 'var(--color-success-bg)',
      ariaLabel: 'Ingredienti biologici certificati'
    }
  }

  const sizeClasses = {
    small: 'px-var(--space-2) py-var(--space-1) text-xs',
    medium: 'px-var(--space-3) py-var(--space-2) text-sm',
    large: 'px-var(--space-4) py-var(--space-3) text-base'
  }

  const badge = badges[type]
  const sizeClass = sizeClasses[size]

  return (
    <div
      className={`inline-flex items-center gap-var(--space-2) rounded-full font-medium border touch-comfortable ${sizeClass} ${className}`}
      style={{ 
        color: badge.color,
        backgroundColor: badge.bg,
        borderColor: badge.color + '40'
      }}
      role="img"
      aria-label={badge.ariaLabel}
    >
      {showIcon && (
        <span className="flex-shrink-0" aria-hidden="true">
          {badge.icon}
        </span>
      )}
      <span>{badge.text}</span>
    </div>
  )
}

/**
 * 🎨 Brand Colors Display - Showcase palette colori
 * Componente per mostrare la palette brand con accessibilità
 */
export function BrandColorsShowcase() {
  const colors = [
    { name: 'Primary', value: 'var(--color-brand-primary)', desc: 'Blu professionale - Contrasto 8.2:1' },
    { name: 'Secondary', value: 'var(--color-brand-secondary)', desc: 'Verde natura - Contrasto 7.8:1' },
    { name: 'Accent', value: 'var(--color-brand-accent)', desc: 'Arancio energia - Contrasto 7.1:1' },
    { name: 'Success', value: 'var(--color-success)', desc: 'Verde successo - Contrasto 7.8:1' },
    { name: 'Warning', value: 'var(--color-warning)', desc: 'Arancio attenzione - Contrasto 7.1:1' },
    { name: 'Error', value: 'var(--color-error)', desc: 'Rosso errore - Contrasto 8.9:1' }
  ]

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-var(--space-4) p-var(--space-6)">
      {colors.map(color => (
        <div key={color.name} className="text-center">
          <div 
            className="w-16 h-16 rounded-xl mx-auto mb-var(--space-2) shadow-md border border-neutral-200 touch-comfortable"
            style={{ backgroundColor: color.value }}
            role="img"
            aria-label={`Colore ${color.name}: ${color.desc}`}
          />
          <div className="label-medium text-neutral-800">{color.name}</div>
          <div className="text-xs text-neutral-600">{color.desc}</div>
        </div>
      ))}
    </div>
  )
}

/**
 * 📱 Brand Header Component - Header con logo professionale
 * Header completo con logo, navigazione e brand elements
 */
export function BrandHeader({ 
  isScrolled = false,
  showNavigation = true,
  className = ''
}) {
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }
    
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  return (
    <header 
      className={`sticky top-0 z-var(--z-index-sticky) bg-white transition-all duration-var(--duration-normal) ${
        isScrolled ? 'shadow-lg border-b border-neutral-200' : 'shadow-sm'
      } ${className}`}
      role="banner"
      id="main-navigation"
    >
      <div className="container mx-auto px-var(--space-4) py-var(--space-3) md:py-var(--space-4)">
        <div className="flex items-center justify-between">
          {/* Logo principale con focus accessibile */}
          <div className="flex items-center">
            <a 
              href="#main-content" 
              className="focus-visible"
              aria-label="Pizzeria Bella - Torna alla homepage"
            >
              <PremiumPizzeriaLogo 
                size={isMobile ? 'small' : 'medium'}
                variant="full"
                theme="light"
                showTagline={!isMobile}
                className="hover:opacity-80 transition-opacity cursor-pointer"
              />
            </a>
          </div>

          {/* Brand badges - visibili solo su desktop */}
          <div className="hidden md:flex items-center gap-var(--space-2)">
            <BrandBadge type="authentic" size="small" />
            <BrandBadge type="premium" size="small" />
          </div>

          {/* Navigazione mobile accessibile */}
          {showNavigation && isMobile && (
            <button
              className="btn btn-secondary btn-sm touch-comfortable"
              aria-label="Apri menu di navigazione"
              aria-expanded="false"
              aria-controls="mobile-menu"
            >
              <span className="sr-only">Menu</span>
              <span aria-hidden="true">☰</span>
            </button>
          )}
        </div>
      </div>
    </header>
  )
}

/**
 * 🏆 Quality Indicators - Indicatori di qualità
 * Mostra certificazioni e caratteristiche distintive
 */
export function QualityIndicators({ className = '' }) {
  const indicators = [
    { 
      icon: '🇮🇹', 
      text: 'Made in Italy', 
      desc: 'Tradizione autentica italiana',
      ariaLabel: 'Prodotto autentico italiano con tradizione secolare'
    },
    { 
      icon: '🌿', 
      text: 'Ingredienti Bio', 
      desc: 'Selezione premium certificata',
      ariaLabel: 'Ingredienti biologici selezionati e certificati'
    },
    { 
      icon: '👨‍🍳', 
      text: 'Chef Esperti', 
      desc: 'Maestri pizzaioli qualificati',
      ariaLabel: 'Chef professionisti e maestri pizzaioli esperti'
    },
    { 
      icon: '🔥', 
      text: 'Forno a Legna', 
      desc: 'Cottura tradizionale perfetta',
      ariaLabel: 'Cottura nel forno a legna secondo tradizione'
    }
  ]

  return (
    <div className={`grid grid-cols-2 md:grid-cols-4 gap-var(--space-4) ${className}`}>
      {indicators.map((indicator, index) => (
        <div 
          key={index}
          className="text-center p-var(--space-4) rounded-lg bg-neutral-50 border border-neutral-200 hover:shadow-md transition-shadow duration-var(--duration-fast) touch-comfortable"
          role="article"
          aria-labelledby={`quality-${index}`}
          aria-describedby={`quality-desc-${index}`}
        >
          <div className="text-2xl mb-var(--space-2)" aria-hidden="true">
            {indicator.icon}
          </div>
          <h3 
            id={`quality-${index}`}
            className="label-large text-neutral-800 mb-var(--space-1)"
          >
            {indicator.text}
          </h3>
          <p 
            id={`quality-desc-${index}`}
            className="text-xs text-neutral-600"
          >
            {indicator.desc}
          </p>
          <span className="sr-only">{indicator.ariaLabel}</span>
        </div>
      ))}
    </div>
  )
}

/**
 * 🎯 Brand Footer - Footer con brand elements
 * Footer completo con logo e informazioni brand
 */
export function BrandFooter({ className = '' }) {
  return (
    <footer 
      className={`bg-neutral-900 text-white py-var(--space-12) ${className}`}
      role="contentinfo"
      id="footer"
    >
      <div className="container mx-auto px-var(--space-4)">
        <div className="text-center mb-var(--space-8)">
          <PremiumPizzeriaLogo 
            size="large"
            variant="full"
            theme="dark"
            className="mx-auto mb-var(--space-4)"
          />
          <p className="text-lg text-neutral-300 max-w-2xl mx-auto">
            Dal 1952, la tradizione autentica italiana nel cuore della città. 
            Ingredienti selezionati, ricette tramandate, passione artigianale.
          </p>
        </div>
        
        <div className="flex justify-center">
          <QualityIndicators className="max-w-4xl" />
        </div>
        
        <div className="text-center mt-var(--space-8) pt-var(--space-6) border-t border-neutral-700">
          <p className="text-sm text-neutral-400">
            © 2024 Pizzeria Bella. Tutti i diritti riservati. 
            <span className="mx-2">•</span>
            Tradizione autentica italiana dal 1952.
          </p>
        </div>
      </div>
    </footer>
  )
}