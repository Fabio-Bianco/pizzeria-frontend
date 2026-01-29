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
 * Comunica cambiamenti dinamici agli screen reader
 */
export function LiveRegion({ message, priority = 'polite', clearDelay = 5000 }) {
  const [currentMessage, setCurrentMessage] = useState('')
  const timeoutRef = useRef(null)

  useEffect(() => {
    if (message) {
      setCurrentMessage(message)
      
      // Auto-clear dopo delay
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
 * ⌨️ Keyboard Navigation Hook - Navigazione da tastiera
 * Gestisce la navigazione con frecce per liste e grids
 */
export function useKeyboardNavigation(options = {}) {
  const {
    direction = 'both', // 'horizontal', 'vertical', 'both'
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
 * 🔊 Screen Reader Announcer - Comunicazione con screen reader
 * Comunica messaggi importanti agli screen reader
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
 * 🎛️ Accessible Button - Pulsante con accessibilità completa
 * Button component con tutti gli stati accessibili
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

  const baseClasses = 'btn focus-visible'
  const variantClasses = {
    primary: 'btn-primary',
    secondary: 'btn-secondary',
    success: 'btn-success',
    warning: 'btn-warning',
    error: 'btn-error'
  }
  const sizeClasses = {
    small: 'btn-sm',
    medium: 'btn-md',
    large: 'btn-lg touch-comfortable'
  }

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
      className={`${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${className}`}
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

/**
 * 📋 Accessible Form Field - Campo form accessibile
 * Input con label, error e help text accessibili
 */
export function AccessibleFormField({
  id,
  label,
  type = 'text',
  required = false,
  error,
  helpText,
  value,
  onChange,
  placeholder,
  ...props
}) {
  const errorId = `${id}-error`
  const helpId = `${id}-help`
  
  return (
    <div className="form-field">
      <label htmlFor={id} className={required ? 'required' : ''}>
        {label}
      </label>
      
      <input
        id={id}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        aria-invalid={error ? 'true' : 'false'}
        aria-describedby={`${error ? errorId : ''} ${helpText ? helpId : ''}`.trim()}
        className={error ? 'error' : ''}
        {...props}
      />
      
      {helpText && (
        <div id={helpId} className="help-text">
          {helpText}
        </div>
      )}
      
      {error && (
        <div id={errorId} className="error-message" role="alert">
          {error}
        </div>
      )}
    </div>
  )
}

/**
 * 📱 Touch & Gesture Hook - Supporto touch accessibile
 * Gestisce touch e gesture mantenendo accessibilità
 */
export function useTouchGestures(options = {}) {
  const {
    onSwipeLeft = () => {},
    onSwipeRight = () => {},
    onSwipeUp = () => {},
    onSwipeDown = () => {},
    threshold = 50
  } = options

  const touchStartRef = useRef(null)
  const elementRef = useRef(null)

  const handleTouchStart = useCallback((e) => {
    touchStartRef.current = {
      x: e.touches[0].clientX,
      y: e.touches[0].clientY,
      time: Date.now()
    }
  }, [])

  const handleTouchEnd = useCallback((e) => {
    if (!touchStartRef.current) return

    const touchEnd = {
      x: e.changedTouches[0].clientX,
      y: e.changedTouches[0].clientY,
      time: Date.now()
    }

    const deltaX = touchEnd.x - touchStartRef.current.x
    const deltaY = touchEnd.y - touchStartRef.current.y
    const deltaTime = touchEnd.time - touchStartRef.current.time

    // Ignora swipe troppo lenti (probabile scroll)
    if (deltaTime > 500) return

    const absDeltaX = Math.abs(deltaX)
    const absDeltaY = Math.abs(deltaY)

    if (absDeltaX > threshold || absDeltaY > threshold) {
      if (absDeltaX > absDeltaY) {
        // Swipe orizzontale
        if (deltaX > 0) {
          onSwipeRight()
        } else {
          onSwipeLeft()
        }
      } else {
        // Swipe verticale
        if (deltaY > 0) {
          onSwipeDown()
        } else {
          onSwipeUp()
        }
      }
    }

    touchStartRef.current = null
  }, [onSwipeLeft, onSwipeRight, onSwipeUp, onSwipeDown, threshold])

  return {
    elementRef,
    touchHandlers: {
      onTouchStart: handleTouchStart,
      onTouchEnd: handleTouchEnd
    }
  }
}