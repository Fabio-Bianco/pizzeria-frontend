/* eslint-disable react-refresh/only-export-components */
import { useEffect, useRef, useState, useCallback } from 'react'

/**
 * 🔗 Skip Links Component - WCAG AAA Navigation
 * Fornisce navigazione rapida per screen reader e keyboard users
 */
export function SkipLinks() {
  return (
    <div className="skip-links" role="navigation" aria-label="Link di navigazione rapida">
      <a href="#main-content" className="skip-link">
        Vai al contenuto principale
      </a>
      <a href="#main-navigation" className="skip-link">
        Vai al menu di navigazione
      </a>
      <a href="#search" className="skip-link">
        Vai alla ricerca
      </a>
      <a href="#menu-sections" className="skip-link">
        Vai alle sezioni del menu
      </a>
      <a href="#footer" className="skip-link">
        Vai al footer
      </a>
    </div>
  )
}

/**
 * 🎯 Focus Manager Hook - Gestione focus accessibile
 * Gestisce il focus per modal, drawer e componenti dinamici
 */
export function useFocusManagement(isOpen = false) {
  const containerRef = useRef(null)
  const previousFocusRef = useRef(null)

  useEffect(() => {
    if (isOpen) {
      // Salva il focus corrente
      previousFocusRef.current = document.activeElement
      
      // Focus sul primo elemento focusabile nel container
      setTimeout(() => {
        const firstFocusable = containerRef.current?.querySelector(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        )
        firstFocusable?.focus()
      }, 0)
    } else {
      // Ripristina il focus precedente
      previousFocusRef.current?.focus()
    }
  }, [isOpen])

  // Trap focus all'interno del container
  const handleKeyDown = useCallback((e) => {
    if (e.key === 'Tab' && containerRef.current) {
      const focusableElements = containerRef.current.querySelectorAll(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      )
      
      const firstElement = focusableElements[0]
      const lastElement = focusableElements[focusableElements.length - 1]

      if (e.shiftKey) {
        if (document.activeElement === firstElement) {
          e.preventDefault()
          lastElement?.focus()
        }
      } else {
        if (document.activeElement === lastElement) {
          e.preventDefault()
          firstElement?.focus()
        }
      }
    }
  }, [])

  return { containerRef, handleKeyDown }
}

/**
 * 📢 Live Region Component - ARIA Live per aggiornamenti dinamici
 */
export function LiveRegion({ message, priority = 'polite', clearDelay = 5000 }) {
  const [currentMessage, setCurrentMessage] = useState('')
  const timeoutRef = useRef(null)

  useEffect(() => {
    if (message) {
      setCurrentMessage(message)
      
      if (clearDelay > 0) {
        clearTimeout(timeoutRef.current)
        timeoutRef.current = setTimeout(() => {
          setCurrentMessage('')
        }, clearDelay)
      }
    }
  }, [message, clearDelay])

  useEffect(() => {
    return () => {
      clearTimeout(timeoutRef.current)
    }
  }, [])

  return (
    <div
      aria-live={priority}
      aria-atomic="true"
      className="live-region"
      role={priority === 'assertive' ? 'alert' : 'status'}
    >
      {currentMessage}
    </div>
  )
}

/**
 * ⌨️ Keyboard Navigation Hook - Navigazione avanzata
 */
export function useKeyboardNavigation(options = {}) {
  const {
    direction = 'both',
    wrap = true,
    exitKeys = ['Escape'],
    onExit = () => {}
  } = options

  const containerRef = useRef(null)

  const handleKeyDown = useCallback((e) => {
    if (!containerRef.current) return

    const focusableElements = Array.from(
      containerRef.current.querySelectorAll(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      )
    )

    const currentIndex = focusableElements.indexOf(document.activeElement)
    if (currentIndex === -1) return

    let nextIndex = currentIndex

    switch (e.key) {
      case 'ArrowDown':
        if (direction === 'vertical' || direction === 'both') {
          e.preventDefault()
          nextIndex = wrap && currentIndex === focusableElements.length - 1 
            ? 0 
            : Math.min(currentIndex + 1, focusableElements.length - 1)
        }
        break
      case 'ArrowUp':
        if (direction === 'vertical' || direction === 'both') {
          e.preventDefault()
          nextIndex = wrap && currentIndex === 0 
            ? focusableElements.length - 1 
            : Math.max(currentIndex - 1, 0)
        }
        break
      case 'ArrowRight':
        if (direction === 'horizontal' || direction === 'both') {
          e.preventDefault()
          nextIndex = wrap && currentIndex === focusableElements.length - 1 
            ? 0 
            : Math.min(currentIndex + 1, focusableElements.length - 1)
        }
        break
      case 'ArrowLeft':
        if (direction === 'horizontal' || direction === 'both') {
          e.preventDefault()
          nextIndex = wrap && currentIndex === 0 
            ? focusableElements.length - 1 
            : Math.max(currentIndex - 1, 0)
        }
        break
      case 'Home':
        e.preventDefault()
        nextIndex = 0
        break
      case 'End':
        e.preventDefault()
        nextIndex = focusableElements.length - 1
        break
      default:
        if (exitKeys.includes(e.key)) {
          e.preventDefault()
          onExit()
          return
        }
        break
    }

    if (nextIndex !== currentIndex) {
      focusableElements[nextIndex]?.focus()
    }
  }, [direction, wrap, exitKeys, onExit])

  return { containerRef, handleKeyDown }
}

/**
 * 🔊 Screen Reader Announcer - Comunicazione accessibile
 */
export function ScreenReaderAnnouncer({ children, level = 'polite' }) {
  return (
    <div
      aria-live={level}
      aria-atomic="true"
      className="sr-only"
      role={level === 'assertive' ? 'alert' : 'status'}
    >
      {children}
    </div>
  )
}

/**
 * 🎛️ Accessible Button - Pulsante WCAG AAA compliant
 */
export function AccessibleButton({
  children,
  variant = 'primary',
  size = 'medium',
  isLoading = false,
  isDisabled = false,
  onClick,
  ariaLabel,
  ariaDescribedBy,
  className = '',
  ...props
}) {
  const buttonRef = useRef(null)
  const [isPressed, setIsPressed] = useState(false)

  const handleClick = useCallback((e) => {
    if (isLoading || isDisabled) {
      e.preventDefault()
      return
    }
    onClick?.(e)
  }, [isLoading, isDisabled, onClick])

  const handleKeyDown = useCallback((e) => {
    if (e.key === ' ' || e.key === 'Enter') {
      setIsPressed(true)
    }
  }, [])

  const handleKeyUp = useCallback((e) => {
    if (e.key === ' ' || e.key === 'Enter') {
      setIsPressed(false)
      handleClick(e)
    }
  }, [handleClick])

  return (
    <button
      ref={buttonRef}
      className={`btn btn-${variant} btn-${size} ${className}`}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      onKeyUp={handleKeyUp}
      disabled={isDisabled}
      aria-label={ariaLabel}
      aria-describedby={ariaDescribedBy}
      aria-busy={isLoading}
      aria-pressed={isPressed}
      type="button"
      {...props}
    >
      {isLoading ? (
        <>
          <span className="sr-only">Caricamento in corso...</span>
          <span aria-hidden="true">{children}</span>
        </>
      ) : (
        children
      )}
    </button>
  )
}

// Focus Trap Hook
export function useFocusTrap(containerRef, isActive = true, restoreFocus = true) {
  const previousFocusRef = useRef(null)

  useEffect(() => {
    if (!isActive || !containerRef.current) return

    // Store the currently focused element
    previousFocusRef.current = document.activeElement

    const container = containerRef.current
    const focusableElements = container.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    )
    
    const firstElement = focusableElements[0]
    const lastElement = focusableElements[focusableElements.length - 1]

    // Focus the first element
    if (firstElement) {
      firstElement.focus()
    }

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
}

// Focus Trap Component
export function FocusTrap({ children, isActive = true, restoreFocus = true }) {
  const containerRef = useRef(null)
  useFocusTrap(containerRef, isActive, restoreFocus)

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