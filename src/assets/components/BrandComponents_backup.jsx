import React from 'react'

/* ===============================================
   🏪 BRAND COMPONENTS - LOGO PIZZERIA AUTENTICA
   =============================================== */

// Pizza Icon SVG Component
function PizzaLogoIcon({ size = 32, className = '' }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      className={className}
      role="img"
      aria-label="Logo Pizzeria"
    >
      {/* Pizza Base */}
      <circle
        cx="12"
        cy="12"
        r="10"
        fill="var(--color-brand-accent)"
        stroke="var(--color-brand-primary)"
        strokeWidth="1.5"
      />
      
      {/* Pizza Toppings */}
      <circle cx="9" cy="9" r="1.5" fill="var(--color-brand-primary)" />
      <circle cx="15" cy="10" r="1" fill="var(--color-brand-secondary)" />
      <circle cx="10" cy="14" r="1" fill="var(--color-brand-primary)" />
      <circle cx="14" cy="14" r="1.2" fill="var(--color-brand-secondary)" />
      <circle cx="12" cy="7" r="0.8" fill="var(--color-brand-primary)" />
      
      {/* Basilico leaves */}
      <path
        d="M7 11c0-1 .5-1.5 1.5-1.5S10 10 10 11s-.5 1.5-1.5 1.5S7 12 7 11z"
        fill="var(--color-brand-secondary)"
      />
      <path
        d="M16 8c0-.8.4-1.2 1.2-1.2S18.4 7.2 18.4 8s-.4 1.2-1.2 1.2S16 8.8 16 8z"
        fill="var(--color-brand-secondary)"
      />
    </svg>
  )
}

// Chef Hat Icon for Premium Feel
function ChefHatIcon({ size = 24, className = '' }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      className={className}
      role="img"
      aria-label="Chef Hat"
    >
      <path
        d="M6 14h12v6H6v-6zM8 4c0-1.1.9-2 2-2s2 .9 2 2c1.1 0 2 .9 2 2 1.7 0 3 1.3 3 3v2H5V9c0-1.7 1.3-3 3-3 0-1.1.9-2 2-2z"
        fill="var(--color-neutral-0)"
        stroke="var(--color-brand-primary)"
        strokeWidth="1.5"
      />
    </svg>
  )
}

// Italian Flag Element
function ItalianFlagStripe({ className = '' }) {
  return (
    <div className={`italian-flag-stripe ${className}`}>
      <div className="flag-green"></div>
      <div className="flag-white"></div>
      <div className="flag-red"></div>
    </div>
  )
}

// Main Logo Component with Variants
function PizzeriaLogo({ 
  variant = 'full', // 'full', 'compact', 'icon-only'
  size = 'medium', // 'small', 'medium', 'large'
  theme = 'light', // 'light', 'dark'
  className = '',
  onClick
}) {
  const sizeClasses = {
    small: 'pizzeria-logo--small',
    medium: 'pizzeria-logo--medium', 
    large: 'pizzeria-logo--large'
  }
  
  const themeClasses = {
    light: 'pizzeria-logo--light',
    dark: 'pizzeria-logo--dark'
  }
  
  const variantClasses = {
    full: 'pizzeria-logo--full',
    compact: 'pizzeria-logo--compact',
    'icon-only': 'pizzeria-logo--icon-only'
  }

  return (
    <div 
      className={`pizzeria-logo ${sizeClasses[size]} ${themeClasses[theme]} ${variantClasses[variant]} ${className}`}
      onClick={onClick}
      role={onClick ? 'button' : undefined}
      tabIndex={onClick ? 0 : undefined}
    >
      <div className="pizzeria-logo__icon">
        <PizzaLogoIcon size={variant === 'icon-only' ? 40 : 32} />
        {variant !== 'icon-only' && (
          <ChefHatIcon size={16} className="pizzeria-logo__chef-hat" />
        )}
      </div>
      
      {variant !== 'icon-only' && (
        <div className="pizzeria-logo__text">
          <h1 className="pizzeria-logo__title">
            Bella Napoli
          </h1>
          {variant === 'full' && (
            <>
              <p className="pizzeria-logo__subtitle">
                Autentica Pizzeria Italiana
              </p>
              <ItalianFlagStripe className="pizzeria-logo__flag" />
            </>
          )}
        </div>
      )}
    </div>
  )
}

// Header Brand Component
export function HeaderBrand({ onClick }) {
  return (
    <div className="header-brand" onClick={onClick}>
      <PizzeriaLogo 
        variant="compact" 
        size="medium"
        className="header-brand__logo"
      />
      <div className="header-brand__tagline">
        <span className="header-brand__quality">Dal 1952</span>
        <span className="header-brand__specialty">Specialità Napoletane</span>
      </div>
    </div>
  )
}

// Footer Brand Component
export function FooterBrand() {
  return (
    <div className="footer-brand">
      <PizzeriaLogo 
        variant="full" 
        size="large"
        theme="dark"
        className="footer-brand__logo"
      />
      <div className="footer-brand__info">
        <p className="footer-brand__address">
          Via Roma 123, 80121 Napoli, Italia
        </p>
        <p className="footer-brand__contact">
          Tel: +39 081 123 4567 | info@bellanapoli.it
        </p>
        <div className="footer-brand__certifications">
          <span className="certification-badge">🍕 Vera Pizza Napoletana</span>
          <span className="certification-badge">🏆 Michelin Recommended</span>
        </div>
      </div>
    </div>
  )
}

// Loading Logo Animation
export function LoadingLogo({ size = 'medium' }) {
  return (
    <div className="loading-logo">
      <PizzeriaLogo 
        variant="icon-only" 
        size={size}
        className="loading-logo__icon"
      />
      <div className="loading-logo__text">
        <p>Preparando il vostro ordine...</p>
        <div className="loading-dots">
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>
    </div>
  )
}

// Error State Logo
export function ErrorLogo({ message = "Qualcosa è andato storto" }) {
  return (
    <div className="error-logo">
      <PizzeriaLogo 
        variant="icon-only" 
        size="large"
        className="error-logo__icon opacity-50"
      />
      <div className="error-logo__message">
        <h3>Ops! {message}</h3>
        <p>La nostra cucina sta lavorando per risolvere il problema</p>
      </div>
    </div>
  )
}

// Brand Colors per JS usage (se servono, decommentare e completare in altro file)
// const brandColors = {
//   primary: 'var(--color-brand-primary)',
//   secondary: 'var(--color-brand-secondary)', 
//   accent: 'var(--color-brand-accent)',
//   primaryLight: 'var(--color-brand-primary-light)',
//   primaryDark: 'var(--color-brand-primary-dark)',
//   secondaryLight: 'var(--color-brand-secondary-light)',
//   secondaryDark: 'var(--color-brand-secondary-dark)',
//   accentLight: 'var(--color-brand-accent-light)',
//   accentDark: 'var(--color-brand-accent-dark)'
// }

export { PizzeriaLogo as Logo, PizzaLogoIcon, ChefHatIcon, ItalianFlagStripe }