/* eslint-disable react-refresh/only-export-components */
import { useState, useEffect, useRef, useCallback } from 'react'

/**
 * ⚡ Interactive States System - Sistema stati interattivi avanzati WCAG AAA
 * Loading states, animazioni, feedback e micro-interazioni accessibili
 */

/**
 * 🔄 Enhanced Loading Spinner - Spinner accessibile
 */
export function EnhancedLoadingSpinner({ 
  size = 'medium',
  variant = 'primary',
  label = 'Caricamento in corso',
  showLabel = false,
  className = '',
  ...props 
}) {
  const sizeClasses = {
    small: 'w-4 h-4',
    medium: 'w-6 h-6', 
    large: 'w-8 h-8',
    xlarge: 'w-12 h-12'
  }

  const variantClasses = {
    primary: 'text-brand-primary',
    secondary: 'text-neutral-600',
    white: 'text-white',
    success: 'text-green-600',
    warning: 'text-amber-600',
    danger: 'text-red-600'
  }

  return (
    <div 
      className={`loading-spinner inline-flex items-center gap-3 ${className}`}
      role="status"
      aria-label={label}
      {...props}
    >
      <svg
        className={`animate-spin ${sizeClasses[size]} ${variantClasses[variant]}`}
        fill="none"
        viewBox="0 0 24 24"
        aria-hidden="true"
      >
        <circle
          className="opacity-25"
          cx="12"
          cy="12"
          r="10"
          stroke="currentColor"
          strokeWidth="4"
        />
        <path
          className="opacity-75"
          fill="currentColor"
          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
        />
      </svg>
      {showLabel && (
        <span className="loading-label text-sm font-medium text-neutral-700">
          {label}
        </span>
      )}
      <span className="sr-only">{label}</span>
    </div>
  )
}

/**
 * 📊 Progress Bar - Barra di progresso accessibile
 */
export function ProgressBar({ 
  value = 0,
  max = 100,
  label = 'Progresso',
  showValue = true,
  variant = 'primary',
  size = 'medium',
  className = '',
  ...props 
}) {
  const percentage = Math.min(100, Math.max(0, (value / max) * 100))
  
  const sizeClasses = {
    small: 'h-2',
    medium: 'h-3',
    large: 'h-4'
  }

  const variantClasses = {
    primary: 'bg-brand-primary',
    success: 'bg-green-600',
    warning: 'bg-amber-600',
    danger: 'bg-red-600'
  }

  return (
    <div className={`progress-container ${className}`} {...props}>
      {label && (
        <div className="progress-header flex justify-between items-center mb-2">
          <label className="progress-label text-sm font-medium text-neutral-700">
            {label}
          </label>
          {showValue && (
            <span className="progress-value text-sm font-medium text-neutral-600">
              {Math.round(percentage)}%
            </span>
          )}
        </div>
      )}
      <div 
        className={`progress-track w-full bg-neutral-200 rounded-full overflow-hidden ${sizeClasses[size]}`}
        role="progressbar"
        aria-valuenow={value}
        aria-valuemin={0}
        aria-valuemax={max}
        aria-label={`${label}: ${Math.round(percentage)}%`}
      >
        <div
          className={`progress-fill h-full transition-all duration-300 ease-out rounded-full ${variantClasses[variant]}`}
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  )
}

/**
 * 💀 Skeleton Loader - Caricamento skeleton accessibile
 */
export function SkeletonLoader({ 
  variant = 'text',
  width = '100%',
  height,
  lines = 1,
  className = '',
  ...props 
}) {
  const skeletonLines = Array.from({ length: lines }, (_, index) => (
    <div
      key={index}
      className="skeleton-line bg-neutral-200 rounded animate-pulse"
      style={{
        width: index === lines - 1 && lines > 1 ? '75%' : width,
        height: height || (variant === 'text' ? '1em' : '100%')
      }}
    />
  ))

  const variantClasses = {
    text: 'space-y-2',
    card: 'p-4 border border-neutral-200 rounded-lg',
    avatar: 'rounded-full',
    button: 'rounded-lg',
    image: 'rounded-lg'
  }

  if (variant === 'avatar') {
    return (
      <div
        className={`skeleton skeleton-avatar w-10 h-10 bg-neutral-200 rounded-full animate-pulse ${className}`}
        role="status"
        aria-label="Caricamento avatar"
        {...props}
      />
    )
  }

  if (variant === 'image') {
    return (
      <div
        className={`skeleton skeleton-image bg-neutral-200 rounded-lg animate-pulse ${className}`}
        style={{ width, height: height || '200px' }}
        role="status"
        aria-label="Caricamento immagine"
        {...props}
      />
    )
  }

  return (
    <div
      className={`skeleton ${variantClasses[variant]} ${className}`}
      role="status"
      aria-label="Caricamento contenuto"
      {...props}
    >
      {skeletonLines}
    </div>
  )
}

/**
 * 🎯 Interactive Button - Pulsante con stati avanzati
 */
export function InteractiveButton({ 
  children,
  variant = 'primary',
  size = 'medium',
  loading = false,
  disabled = false,
  success = false,
  error = false,
  onClick,
  loadingText = 'Caricamento...',
  successText = 'Completato!',
  errorText = 'Errore',
  className = '',
  ...props 
}) {
  const [isPressed, setIsPressed] = useState(false)
  const [showFeedback, setShowFeedback] = useState(false)

  // Gestione feedback temporaneo
  useEffect(() => {
    if (success || error) {
      setShowFeedback(true)
      const timer = setTimeout(() => setShowFeedback(false), 2000)
      return () => clearTimeout(timer)
    }
  }, [success, error])

  const handleMouseDown = () => setIsPressed(true)
  const handleMouseUp = () => setIsPressed(false)
  const handleMouseLeave = () => setIsPressed(false)

  const handleClick = (e) => {
    if (loading || disabled) return
    onClick?.(e)
  }

  // Classi dinamiche
  const baseClasses = 'btn interactive-btn relative overflow-hidden transition-all duration-200 ease-out focus-visible'
  
  const variantClasses = {
    primary: 'btn-primary bg-brand-primary hover:bg-brand-primary-dark text-white',
    secondary: 'btn-secondary bg-neutral-100 hover:bg-neutral-200 text-neutral-900',
    outline: 'btn-outline border-2 border-brand-primary text-brand-primary hover:bg-brand-primary hover:text-white',
    ghost: 'btn-ghost text-brand-primary hover:bg-brand-primary hover:bg-opacity-10',
    danger: 'btn-danger bg-red-600 hover:bg-red-700 text-white'
  }

  const sizeClasses = {
    small: 'btn-sm px-3 py-1.5 text-sm',
    medium: 'btn-md px-4 py-2 text-base',
    large: 'btn-lg px-6 py-3 text-lg'
  }

  const stateClasses = {
    loading: 'cursor-wait opacity-75',
    disabled: 'cursor-not-allowed opacity-50',
    success: 'bg-green-600 hover:bg-green-600 text-white',
    error: 'bg-red-600 hover:bg-red-600 text-white',
    pressed: 'transform scale-95'
  }

  let currentStateClass = ''
  let currentText = children

  if (loading) {
    currentStateClass = stateClasses.loading
    currentText = loadingText
  } else if (disabled) {
    currentStateClass = stateClasses.disabled
  } else if (showFeedback && success) {
    currentStateClass = stateClasses.success
    currentText = successText
  } else if (showFeedback && error) {
    currentStateClass = stateClasses.error
    currentText = errorText
  } else if (isPressed) {
    currentStateClass = stateClasses.pressed
  }

  return (
    <button
      className={`${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${currentStateClass} ${className}`}
      onClick={handleClick}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseLeave}
      disabled={loading || disabled}
      aria-busy={loading}
      aria-label={loading ? loadingText : children}
      {...props}
    >
      <span className="btn-content flex items-center justify-center gap-2">
        {loading && (
          <EnhancedLoadingSpinner size="small" variant="white" />
        )}
        {showFeedback && success && (
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        )}
        {showFeedback && error && (
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        )}
        <span>{currentText}</span>
      </span>
      
      {/* Ripple Effect */}
      <span className="btn-ripple absolute inset-0 overflow-hidden rounded-inherit pointer-events-none">
        <span className="ripple-effect absolute bg-white bg-opacity-25 rounded-full transform scale-0 animate-ripple"></span>
      </span>
    </button>
  )
}

/**
 * 🎨 Animated Card - Card con animazioni
 */
export function AnimatedCard({ 
  children,
  variant = 'default',
  hover = true,
  loading = false,
  className = '',
  ...props 
}) {
  const [isLoaded, setIsLoaded] = useState(!loading)

  useEffect(() => {
    if (!loading) {
      const timer = setTimeout(() => setIsLoaded(true), 100)
      return () => clearTimeout(timer)
    }
  }, [loading])

  const variantClasses = {
    default: 'bg-white border border-neutral-200',
    elevated: 'bg-white shadow-lg border-0',
    outlined: 'bg-transparent border-2 border-neutral-300',
    filled: 'bg-neutral-50 border border-neutral-200'
  }

  const hoverClasses = hover ? 'hover:shadow-lg hover:-translate-y-1 hover:scale-[1.02]' : ''

  return (
    <div
      className={`animated-card p-6 rounded-lg transition-all duration-300 ease-out ${variantClasses[variant]} ${hoverClasses} ${isLoaded ? 'animate-slideInUp' : 'opacity-0'} ${className}`}
      {...props}
    >
      {loading ? (
        <div className="space-y-4">
          <SkeletonLoader variant="text" lines={3} />
          <SkeletonLoader variant="button" width="120px" height="40px" />
        </div>
      ) : (
        children
      )}
    </div>
  )
}

/**
 * 📢 Toast Notification - Notifiche toast accessibili
 */
export function ToastNotification({ 
  type = 'info',
  title,
  message,
  duration = 5000,
  onClose,
  actions = [],
  className = '',
  ...props 
}) {
  const [isVisible, setIsVisible] = useState(true)
  const [isExiting, setIsExiting] = useState(false)
  const toastRef = useRef(null)

  // Auto-dismiss
  useEffect(() => {
    if (duration > 0) {
      const timer = setTimeout(() => {
        handleClose()
      }, duration)
      return () => clearTimeout(timer)
    }
  }, [duration])

  // Focus management
  useEffect(() => {
    if (toastRef.current) {
      toastRef.current.focus()
    }
  }, [])

  const handleClose = useCallback(() => {
    setIsExiting(true)
    setTimeout(() => {
      setIsVisible(false)
      onClose?.()
    }, 300)
  }, [onClose])

  if (!isVisible) return null

  const typeIcons = {
    success: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    error: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    warning: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
      </svg>
    ),
    info: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    )
  }

  const typeClasses = {
    success: 'bg-green-50 border-green-200 text-green-800',
    error: 'bg-red-50 border-red-200 text-red-800',
    warning: 'bg-amber-50 border-amber-200 text-amber-800',
    info: 'bg-blue-50 border-blue-200 text-blue-800'
  }

  return (
    <div
      ref={toastRef}
      className={`toast-notification fixed top-4 right-4 max-w-md w-full bg-white border-l-4 rounded-lg shadow-lg p-4 z-50 transition-all duration-300 ${typeClasses[type]} ${isExiting ? 'animate-slideOutRight' : 'animate-slideInRight'} ${className}`}
      role="alert"
      aria-live={type === 'error' ? 'assertive' : 'polite'}
      tabIndex={-1}
      {...props}
    >
      <div className="flex items-start gap-3">
        <div className="flex-shrink-0">
          {typeIcons[type]}
        </div>
        
        <div className="flex-1 min-w-0">
          {title && (
            <h4 className="toast-title font-medium text-sm mb-1">
              {title}
            </h4>
          )}
          {message && (
            <p className="toast-message text-sm opacity-90">
              {message}
            </p>
          )}
          
          {actions.length > 0 && (
            <div className="toast-actions flex gap-2 mt-3">
              {actions.map((action, index) => (
                <button
                  key={index}
                  onClick={action.onClick}
                  className="text-sm font-medium underline hover:no-underline focus-visible"
                >
                  {action.label}
                </button>
              ))}
            </div>
          )}
        </div>
        
        <button
          onClick={handleClose}
          className="flex-shrink-0 p-1 rounded hover:bg-black hover:bg-opacity-10 focus-visible"
          aria-label="Chiudi notifica"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
    </div>
  )
}

/**
 * 🎭 Loading State - Stato di caricamento completo
 */
export function LoadingState({ 
  variant = 'spinner',
  message = 'Caricamento in corso...',
  overlay = false,
  className = '',
  ...props 
}) {
  const variants = {
    spinner: (
      <div className="loading-state-content flex flex-col items-center gap-4">
        <EnhancedLoadingSpinner size="large" />
        <p className="text-neutral-600">{message}</p>
      </div>
    ),
    skeleton: (
      <div className="loading-state-content space-y-4">
        <SkeletonLoader variant="text" lines={4} />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <SkeletonLoader variant="card" height="200px" />
          <SkeletonLoader variant="card" height="200px" />
        </div>
      </div>
    ),
    progress: (
      <div className="loading-state-content flex flex-col items-center gap-4">
        <ProgressBar value={75} label="Caricamento dati" />
        <p className="text-neutral-600">{message}</p>
      </div>
    )
  }

  const containerClasses = overlay 
    ? 'fixed inset-0 bg-white bg-opacity-90 flex items-center justify-center z-50' 
    : 'flex items-center justify-center p-8'

  return (
    <div 
      className={`loading-state ${containerClasses} ${className}`}
      role="status"
      aria-label={message}
      {...props}
    >
      {variants[variant]}
    </div>
  )
}

/**
 * 🔄 Refresh Button - Pulsante di aggiornamento animato
 */
export function RefreshButton({ 
  onRefresh,
  loading = false,
  size = 'medium',
  className = '',
  ...props 
}) {
  const [isSpinning, setIsSpinning] = useState(false)

  const handleClick = async () => {
    if (loading) return
    
    setIsSpinning(true)
    try {
      await onRefresh?.()
    } finally {
      // Continua animazione per feedback visivo
      setTimeout(() => setIsSpinning(false), 1000)
    }
  }

  const sizeClasses = {
    small: 'w-4 h-4',
    medium: 'w-5 h-5',
    large: 'w-6 h-6'
  }

  return (
    <button
      onClick={handleClick}
      disabled={loading}
      className={`refresh-btn p-2 rounded-lg hover:bg-neutral-100 focus-visible transition-colors duration-200 ${className}`}
      aria-label="Aggiorna contenuto"
      {...props}
    >
      <svg
        className={`${sizeClasses[size]} transition-transform duration-500 ${(loading || isSpinning) ? 'animate-spin' : ''}`}
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
        />
      </svg>
    </button>
  )
}