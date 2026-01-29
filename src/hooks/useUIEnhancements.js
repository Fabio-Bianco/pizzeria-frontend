import { useState, useCallback } from 'react'

/**
 * Hook semplificato per feedback visivo di base
 */
export function useInteractionFeedback() {
  const [isPressed, setIsPressed] = useState(false)
  const [isHovered, setIsHovered] = useState(false)

  const interactionProps = {
    onMouseDown: useCallback(() => setIsPressed(true), []),
    onMouseUp: useCallback(() => setIsPressed(false), []),
    onMouseEnter: useCallback(() => setIsHovered(true), []),
    onMouseLeave: useCallback(() => {
      setIsHovered(false)
      setIsPressed(false)
    }, [])
  }

  return { isPressed, isHovered, interactionProps }
}

/**
 * Hook semplificato per stati async
 */
export function useAsyncState() {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  
  const execute = useCallback(async (asyncFunction) => {
    setLoading(true)
    setError(null)
    
    try {
      const result = await asyncFunction()
      setLoading(false)
      return result
    } catch (err) {
      setError(err)
      setLoading(false)
      throw err
    }
  }, [])

  return { loading, error, execute }
}

/**
 * Hook semplificato per toast notifications
 */
export function useToast() {
  const [toasts, setToasts] = useState([])

  const addToast = useCallback((message, type = 'info', duration = 3000) => {
    const id = Date.now()
    const newToast = { id, message, type, duration }

    setToasts(prev => [...prev, newToast])

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
    success: (message, duration) => addToast(message, 'success', duration),
    error: (message, duration) => addToast(message, 'error', duration),
    warning: (message, duration) => addToast(message, 'warning', duration),
    info: (message, duration) => addToast(message, 'info', duration)
  }
}