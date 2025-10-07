import { useEffect, useRef } from 'react'

export function useSwipeNavigation(onSwipeLeft, onSwipeRight, threshold = 50) {
  const touchStartX = useRef(null)
  const touchStartY = useRef(null)

  useEffect(() => {
    const handleTouchStart = (e) => {
      touchStartX.current = e.touches[0].clientX
      touchStartY.current = e.touches[0].clientY
    }

    const handleTouchEnd = (e) => {
      if (!touchStartX.current || !touchStartY.current) return

      const touchEndX = e.changedTouches[0].clientX
      const touchEndY = e.changedTouches[0].clientY
      
      const deltaX = touchStartX.current - touchEndX
      const deltaY = Math.abs(touchStartY.current - touchEndY)
      
      // Solo se il movimento orizzontale è maggiore di quello verticale
      if (Math.abs(deltaX) > deltaY && Math.abs(deltaX) > threshold) {
        if (deltaX > 0) {
          // Swipe left
          onSwipeLeft?.()
        } else {
          // Swipe right
          onSwipeRight?.()
        }
      }

      touchStartX.current = null
      touchStartY.current = null
    }

    document.addEventListener('touchstart', handleTouchStart, { passive: true })
    document.addEventListener('touchend', handleTouchEnd, { passive: true })

    return () => {
      document.removeEventListener('touchstart', handleTouchStart)
      document.removeEventListener('touchend', handleTouchEnd)
    }
  }, [onSwipeLeft, onSwipeRight, threshold])
}

export function usePullToRefresh(onRefresh, threshold = 100) {
  const pullStartY = useRef(null)
  const isPulling = useRef(false)

  useEffect(() => {
    const handleTouchStart = (e) => {
      if (window.scrollY === 0) {
        pullStartY.current = e.touches[0].clientY
      }
    }

    const handleTouchMove = (e) => {
      if (pullStartY.current !== null && window.scrollY === 0) {
        const currentY = e.touches[0].clientY
        const pullDistance = currentY - pullStartY.current
        
        if (pullDistance > 0) {
          isPulling.current = true
          e.preventDefault() // Previene il refresh nativo del browser
        }
      }
    }

    const handleTouchEnd = (e) => {
      if (isPulling.current && pullStartY.current !== null) {
        const endY = e.changedTouches[0].clientY
        const pullDistance = endY - pullStartY.current
        
        if (pullDistance > threshold) {
          onRefresh?.()
        }
        
        isPulling.current = false
        pullStartY.current = null
      }
    }

    document.addEventListener('touchstart', handleTouchStart, { passive: true })
    document.addEventListener('touchmove', handleTouchMove, { passive: false })
    document.addEventListener('touchend', handleTouchEnd, { passive: true })

    return () => {
      document.removeEventListener('touchstart', handleTouchStart)
      document.removeEventListener('touchmove', handleTouchMove)
      document.removeEventListener('touchend', handleTouchEnd)
    }
  }, [onRefresh, threshold])
}