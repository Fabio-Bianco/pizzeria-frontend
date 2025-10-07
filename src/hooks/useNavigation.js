import { useState, useEffect } from 'react'

/* ===============================================
   🧭 NAVIGATION HOOK - URL MANAGEMENT
   =============================================== */

export function useNavigation() {
  const [currentPath, setCurrentPath] = useState(window.location.pathname)
  const [searchParams, setSearchParams] = useState(new URLSearchParams(window.location.search))

  const navigate = (path, options = {}) => {
    const { replace = false, state = null } = options
    
    if (replace) {
      window.history.replaceState(state, '', path)
    } else {
      window.history.pushState(state, '', path)
    }
    
    setCurrentPath(window.location.pathname)
    setSearchParams(new URLSearchParams(window.location.search))
  }

  const updateSearchParams = (params) => {
    const newSearchParams = new URLSearchParams(searchParams)
    
    Object.entries(params).forEach(([key, value]) => {
      if (value === null || value === undefined) {
        newSearchParams.delete(key)
      } else {
        newSearchParams.set(key, value)
      }
    })
    
    const newSearch = newSearchParams.toString()
    const newPath = `${currentPath}${newSearch ? `?${newSearch}` : ''}`
    
    window.history.pushState(null, '', newPath)
    setSearchParams(newSearchParams)
  }

  useEffect(() => {
    const handlePopState = () => {
      setCurrentPath(window.location.pathname)
      setSearchParams(new URLSearchParams(window.location.search))
    }

    window.addEventListener('popstate', handlePopState)
    return () => window.removeEventListener('popstate', handlePopState)
  }, [])

  return {
    currentPath,
    searchParams,
    navigate,
    updateSearchParams,
    goBack: () => window.history.back(),
    goForward: () => window.history.forward()
  }
}