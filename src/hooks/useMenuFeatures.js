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

