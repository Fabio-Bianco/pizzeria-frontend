import { useState, useCallback } from 'react'

/**
 * Hook per gestire lo stato degli allergeni e modal
 */
export const useAllergeni = () => {
  const [showAllergensModal, setShowAllergensModal] = useState(false)

  const openAllergensModal = useCallback(() => {
    setShowAllergensModal(true)
  }, [])

  const closeAllergensModal = useCallback(() => {
    setShowAllergensModal(false)
  }, [])

  const toggleAllergensModal = useCallback(() => {
    setShowAllergensModal(prev => !prev)
  }, [])

  return {
    showAllergensModal,
    openAllergensModal,
    closeAllergensModal,
    toggleAllergensModal
  }
}

/**
 * Hook per gestire il sistema multilingua
 */
export const useLanguage = () => {
  // Carica la lingua dal localStorage, fallback a 'it'
  const [currentLanguage, setCurrentLanguage] = useState(() => {
    try {
      return localStorage.getItem('pizzeria-language') || 'it'
    } catch {
      return 'it'
    }
  })

  const changeLanguage = useCallback((lang) => {
    setCurrentLanguage(lang)
    // Salva la preferenza nel localStorage
    try {
      localStorage.setItem('pizzeria-language', lang)
    } catch (error) {
      console.warn('Errore nel salvataggio della lingua:', error)
    }
  }, [])

  const toggleLanguage = useCallback(() => {
    const newLang = currentLanguage === 'it' ? 'en' : 'it'
    changeLanguage(newLang)
  }, [currentLanguage, changeLanguage])

  return {
    currentLanguage,
    changeLanguage,
    toggleLanguage
  }
}