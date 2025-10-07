import React, { useEffect, useRef, useState } from 'react'

/* ===============================================
   ♿ ACCESSIBILITY COMPONENTS - WCAG 2.1 AAA
   =============================================== */

// Skip Links Component
function SkipLinks() {
  return (
    <div className="skip-links">
      <a href="#main-content" className="skip-link">
        Vai al contenuto principale
      </a>
      <a href="#main-navigation" className="skip-link">
        Vai alla navigazione
      </a>
      <a href="#search" className="skip-link">
        Vai alla ricerca
      </a>
      <a href="#footer" className="skip-link">
        Vai al footer
      </a>
    </div>
  )
}

// Focus Trap for Modals
function FocusTrap({ children, isActive = true, restoreFocus = true }) {
  const containerRef = useRef(null)
  const previousFocusRef = useRef(null)

  useEffect(() => {
    if (!isActive) return

    // Store the currently focused element
    previousFocusRef.current = document.activeElement

    // Find all focusable elements
    const focusableElements = containerRef.current?.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    )

    if (!focusableElements?.length) return

    const firstElement = focusableElements[0]
    const lastElement = focusableElements[focusableElements.length - 1]

    // Focus the first element
    firstElement.focus()

    const handleTabKey = (e) => {
      if (e.key === 'Tab') {
        if (e.shiftKey) {
          // Shift + Tab
          if (document.activeElement === firstElement) {
            e.preventDefault()
            lastElement.focus()
          }
        } else {
          // Tab
          if (document.activeElement === lastElement) {
            e.preventDefault()
            firstElement.focus()
          }
        }
      }
      
      // Escape key to close
      if (e.key === 'Escape') {
        e.preventDefault()
        // Default escape behavior - could be enhanced with callback
      }
    }

    document.addEventListener('keydown', handleTabKey)

    return () => {
      document.removeEventListener('keydown', handleTabKey)
      // Restore focus when unmounting
      if (restoreFocus && previousFocusRef.current) {
        previousFocusRef.current.focus()
      }
    }
  }, [isActive, restoreFocus])

  if (!isActive) return children

  return (
    <div 
      ref={containerRef} 
      className="focus-trap"
      role="dialog"
      aria-modal="true"
    >
      {children}
    </div>
  )
}

// Live Region for Announcements
function LiveRegion({ 
  message, 
  politeness = 'polite', // 'polite' | 'assertive'
  clearAfter = 5000 
}) {
  const [announcement, setAnnouncement] = useState('')

  useEffect(() => {
    if (message) {
      setAnnouncement(message)
      
      if (clearAfter > 0) {
        const timer = setTimeout(() => {
          setAnnouncement('')
        }, clearAfter)
        
        return () => clearTimeout(timer)
      }
    }
  }, [message, clearAfter])

  return (
    <div
      className="live-region"
      aria-live={politeness}
      aria-atomic="true"
      role="status"
    >
      {announcement}
    </div>
  )
}

// Accessible Button Component
export function AccessibleButton({
  children,
  onClick,
  disabled = false,
  ariaLabel,
  ariaDescribedBy,
  variant = 'primary',
  size = 'medium',
  type = 'button',
  className = '',
  ...props
}) {
  const variants = {
    primary: 'btn-primary',
    secondary: 'btn-secondary', 
    outline: 'btn-outline',
    ghost: 'btn-ghost',
    danger: 'btn-danger'
  }

  const sizes = {
    small: 'btn-sm',
    medium: 'btn-md',
    large: 'btn-lg'
  }

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      aria-label={ariaLabel}
      aria-describedby={ariaDescribedBy}
      className={`
        btn 
        ${variants[variant]} 
        ${sizes[size]} 
        touch-target
        ${className}
      `.trim()}
      {...props}
    >
      {children}
    </button>
  )
}

// Accessible Form Input
export function AccessibleInput({
  id,
  label,
  type = 'text',
  value,
  onChange,
  error,
  help,
  required = false,
  disabled = false,
  placeholder,
  ariaDescribedBy,
  className = '',
  ...props
}) {
  const errorId = error ? `${id}-error` : undefined
  const helpId = help ? `${id}-help` : undefined
  const describedBy = [ariaDescribedBy, errorId, helpId].filter(Boolean).join(' ')

  return (
    <div className="form-group">
      <label 
        htmlFor={id} 
        className={`form-label ${required ? 'form-label--required' : ''}`}
      >
        {label}
      </label>
      
      <input
        id={id}
        type={type}
        value={value}
        onChange={onChange}
        required={required}
        disabled={disabled}
        placeholder={placeholder}
        aria-describedby={describedBy || undefined}
        aria-invalid={error ? 'true' : 'false'}
        className={`form-input ${className}`}
        {...props}
      />
      
      {help && (
        <div id={helpId} className="form-help">
          {help}
        </div>
      )}
      
      {error && (
        <div id={errorId} className="form-error" role="alert">
          {error}
        </div>
      )}
    </div>
  )
}

// Accessible Dropdown/Select
export function AccessibleSelect({
  id,
  label,
  value,
  onChange,
  options,
  placeholder,
  error,
  help,
  required = false,
  disabled = false,
  className = '',
  ...props
}) {
  const errorId = error ? `${id}-error` : undefined
  const helpId = help ? `${id}-help` : undefined
  const describedBy = [errorId, helpId].filter(Boolean).join(' ')

  return (
    <div className="form-group">
      <label 
        htmlFor={id} 
        className={`form-label ${required ? 'form-label--required' : ''}`}
      >
        {label}
      </label>
      
      <select
        id={id}
        value={value}
        onChange={onChange}
        required={required}
        disabled={disabled}
        aria-describedby={describedBy || undefined}
        aria-invalid={error ? 'true' : 'false'}
        className={`form-input ${className}`}
        {...props}
      >
        {placeholder && (
          <option value="" disabled>
            {placeholder}
          </option>
        )}
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      
      {help && (
        <div id={helpId} className="form-help">
          {help}
        </div>
      )}
      
      {error && (
        <div id={errorId} className="form-error" role="alert">
          {error}
        </div>
      )}
    </div>
  )
}

// Accessible Alert Component
export function AccessibleAlert({
  type = 'info', // 'success' | 'warning' | 'error' | 'info'
  title,
  children,
  dismissible = false,
  onDismiss,
  className = ''
}) {
  const icons = {
    success: '✅',
    warning: '⚠️',
    error: '❌',
    info: 'ℹ️'
  }

  const roles = {
    success: 'status',
    warning: 'alert',
    error: 'alert',
    info: 'status'
  }

  return (
    <div 
      className={`alert alert--${type} ${className}`}
      role={roles[type]}
      aria-live={type === 'error' ? 'assertive' : 'polite'}
    >
      <div className="alert__icon" aria-hidden="true">
        {icons[type]}
      </div>
      
      <div className="alert__content">
        {title && (
          <div className="alert__title">
            {title}
          </div>
        )}
        <div className="alert__description">
          {children}
        </div>
      </div>
      
      {dismissible && (
        <button
          onClick={onDismiss}
          className="alert__dismiss"
          aria-label="Chiudi avviso"
          type="button"
        >
          ✕
        </button>
      )}
    </div>
  )
}

// Accessible Toggle/Switch
export function AccessibleToggle({
  id,
  label,
  checked,
  onChange,
  disabled = false,
  ariaDescribedBy,
  className = ''
}) {
  return (
    <div className={`toggle-wrapper ${className}`}>
      <input
        id={id}
        type="checkbox"
        checked={checked}
        onChange={onChange}
        disabled={disabled}
        aria-describedby={ariaDescribedBy}
        className="toggle-input sr-only"
      />
      
      <label 
        htmlFor={id} 
        className="toggle-label"
        aria-label={label}
      >
        <span className="toggle-switch">
          <span className="toggle-knob" aria-hidden="true"></span>
        </span>
        <span className="toggle-text">{label}</span>
      </label>
    </div>
  )
}

// Accessible Breadcrumb
export function AccessibleBreadcrumb({ items, className = '' }) {
  return (
    <nav 
      aria-label="Percorso di navigazione" 
      className={`breadcrumb ${className}`}
    >
      <ol className="breadcrumb-list">
        {items.map((item, index) => (
          <li key={index} className="breadcrumb-item">
            {index > 0 && (
              <span className="breadcrumb-separator" aria-hidden="true">
                ›
              </span>
            )}
            {item.href && index < items.length - 1 ? (
              <a href={item.href} className="breadcrumb-link">
                {item.label}
              </a>
            ) : (
              <span 
                className="breadcrumb-current" 
                aria-current={index === items.length - 1 ? "page" : undefined}
              >
                {item.label}
              </span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  )
}

// Keyboard Navigation Hook
function useKeyboardNavigation() {
  useEffect(() => {
    const handleKeyDown = (e) => {
      // Add keyboard navigation class when Tab is pressed
      if (e.key === 'Tab') {
        document.body.classList.add('keyboard-nav-active')
        document.body.classList.remove('mouse-nav-active')
      }
    }

    const handleMouseDown = () => {
      // Add mouse navigation class when mouse is used
      document.body.classList.add('mouse-nav-active')
      document.body.classList.remove('keyboard-nav-active')
    }

    document.addEventListener('keydown', handleKeyDown)
    document.addEventListener('mousedown', handleMouseDown)

    return () => {
      document.removeEventListener('keydown', handleKeyDown)
      document.removeEventListener('mousedown', handleMouseDown)
    }
  }, [])
}

// Accessible Loading State
export function AccessibleLoading({ 
  message = "Caricamento in corso...",
  className = ''
}) {
  return (
    <div 
      className={`loading-state ${className}`}
      role="status" 
      aria-live="polite"
      aria-label={message}
    >
      <div className="loading-spinner" aria-hidden="true">
        <div className="spinner"></div>
      </div>
      <span className="sr-only">{message}</span>
    </div>
  )
}

export { SkipLinks, FocusTrap, LiveRegion }