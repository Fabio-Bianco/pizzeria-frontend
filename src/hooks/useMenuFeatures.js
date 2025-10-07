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
  const [currentLanguage, setCurrentLanguage] = useState('it')

  const changeLanguage = useCallback((lang) => {
    setCurrentLanguage(lang)
    // TODO: Implementare logica cambio lingua
    console.log('Cambio lingua a:', lang)
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