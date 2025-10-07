import { useState, useCallback, useRef, useEffect } from 'react'

/**
 * Hook per gestire animazioni e feedback visivo delle interazioni
 */
export function useInteractionFeedback() {
  const [isPressed, setIsPressed] = useState(false)
  const [isHovered, setIsHovered] = useState(false)
  const [ripples, setRipples] = useState([])
  const timeoutRef = useRef()

  const handleMouseDown = useCallback((event) => {
    setIsPressed(true)
    
    // Crea effetto ripple
    const rect = event.currentTarget.getBoundingClientRect()
    const size = Math.max(rect.width, rect.height)
    const x = event.clientX - rect.left - size / 2
    const y = event.clientY - rect.top - size / 2
    
    const newRipple = {
      id: Date.now(),
      x,
      y,
      size
    }
    
    setRipples(prev => [...prev, newRipple])
    
    // Rimuovi ripple dopo animazione
    setTimeout(() => {
      setRipples(prev => prev.filter(r => r.id !== newRipple.id))
    }, 600)
  }, [])

  const handleMouseUp = useCallback(() => {
    setIsPressed(false)
  }, [])

  const handleMouseEnter = useCallback(() => {
    setIsHovered(true)
  }, [])

  const handleMouseLeave = useCallback(() => {
    setIsHovered(false)
    setIsPressed(false)
  }, [])

  const handleKeyDown = useCallback((event) => {
    if (event.key === 'Enter' || event.key === ' ') {
      setIsPressed(true)
    }
  }, [])

  const handleKeyUp = useCallback((event) => {
    if (event.key === 'Enter' || event.key === ' ') {
      setIsPressed(false)
    }
  }, [])

  useEffect(() => {
    return () => {
      const currentTimeout = timeoutRef.current
      if (currentTimeout) {
        clearTimeout(currentTimeout)
      }
    }
  }, [])

  return {
    isPressed,
    isHovered,
    ripples,
    interactionProps: {
      onMouseDown: handleMouseDown,
      onMouseUp: handleMouseUp,
      onMouseEnter: handleMouseEnter,
      onMouseLeave: handleMouseLeave,
      onKeyDown: handleKeyDown,
      onKeyUp: handleKeyUp,
    }
  }
}

/**
 * Hook per gestire stati di caricamento con timeout e retry
 */
export function useAsyncState(asyncFunction, dependencies = []) {
  const [state, setState] = useState({
    data: null,
    loading: false,
    error: null,
    retry: 0
  })

  const execute = useCallback(async (...args) => {
    setState(prev => ({ ...prev, loading: true, error: null }))
    
    try {
      const result = await asyncFunction(...args)
      setState(prev => ({ 
        ...prev, 
        data: result, 
        loading: false,
        error: null 
      }))
      return result
    } catch (error) {
      setState(prev => ({ 
        ...prev, 
        loading: false, 
        error,
        data: null 
      }))
      throw error
    }
  }, [asyncFunction])

  const retry = useCallback(() => {
    setState(prev => ({ ...prev, retry: prev.retry + 1 }))
    execute()
  }, [execute])

  const reset = useCallback(() => {
    setState({
      data: null,
      loading: false,
      error: null,
      retry: 0
    })
  }, [])

  useEffect(() => {
    if (dependencies.length > 0) {
      execute()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [...dependencies, state.retry])

  return {
    ...state,
    execute,
    retry,
    reset
  }
}

/**
 * Hook per gestire scroll smooth con indicatori di posizione
 */
export function useScrollManager() {
  const [scrollPosition, setScrollPosition] = useState(0)
  const [isScrolling, setIsScrolling] = useState(false)
  const [scrollDirection, setScrollDirection] = useState('down')
  const lastScrollY = useRef(0)
  const scrollTimeout = useRef()

  const scrollToElement = useCallback((elementId, offset = 0) => {
    const element = document.getElementById(elementId)
    if (element) {
      const elementPosition = element.getBoundingClientRect().top + window.pageYOffset
      const offsetPosition = elementPosition - offset

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      })
    }
  }, [])

  const scrollToTop = useCallback(() => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    })
  }, [])

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY
      const direction = currentScrollY > lastScrollY.current ? 'down' : 'up'
      
      setScrollPosition(currentScrollY)
      setScrollDirection(direction)
      setIsScrolling(true)
      
      lastScrollY.current = currentScrollY

      // Clear previous timeout
      if (scrollTimeout.current) {
        clearTimeout(scrollTimeout.current)
      }

      // Set new timeout
      scrollTimeout.current = setTimeout(() => {
        setIsScrolling(false)
      }, 150)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    
    return () => {
      window.removeEventListener('scroll', handleScroll)
      if (scrollTimeout.current) {
        clearTimeout(scrollTimeout.current)
      }
    }
  }, [])

  return {
    scrollPosition,
    isScrolling,
    scrollDirection,
    scrollToElement,
    scrollToTop,
    isAtTop: scrollPosition < 100,
    isNearBottom: scrollPosition > document.body.scrollHeight - window.innerHeight - 100
  }
}

/**
 * Hook per gestire notifiche toast
 */
export function useToast() {
  const [toasts, setToasts] = useState([])

  const addToast = useCallback((message, type = 'info', duration = 3000) => {
    const id = Date.now()
    const newToast = {
      id,
      message,
      type,
      duration,
      timestamp: Date.now()
    }

    setToasts(prev => [...prev, newToast])

    // Auto remove toast
    if (duration > 0) {
      setTimeout(() => {
        setToasts(prev => prev.filter(toast => toast.id !== id))
      }, duration)
    }

    return id
  }, [])

  const removeToast = useCallback((id) => {
    setToasts(prev => prev.filter(toast => toast.id !== id))
  }, [])

  const clearAllToasts = useCallback(() => {
    setToasts([])
  }, [])

  return {
    toasts,
    addToast,
    removeToast,
    clearAllToasts,
    // Convenience methods
    success: (message, duration) => addToast(message, 'success', duration),
    error: (message, duration) => addToast(message, 'error', duration),
    warning: (message, duration) => addToast(message, 'warning', duration),
    info: (message, duration) => addToast(message, 'info', duration)
  }
}