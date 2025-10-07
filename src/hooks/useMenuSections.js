import { useMemo, useState, useCallback } from 'react'

/**
 * Hook per preparare e organizzare le sezioni del menu
 */
export const useMenuSections = (pizzas, appetizers, beverages, desserts, loading, initialized) => {
  const menuSections = useMemo(() => {
    return [
      {
        id: 'appetizers',
        title: 'ANTIPASTI',
        icon: '🍤',
        items: appetizers || [],
        loading: loading.appetizers,
        initialized: initialized.appetizers
      },
      {
        id: 'pizzas',
        title: 'PIZZE',
        icon: '🍕', 
        items: pizzas || [],
        loading: loading.pizzas,
        initialized: initialized.pizzas
      },
      {
        id: 'desserts',
        title: 'DESSERT',
        icon: '🍰',
        items: desserts || [],
        loading: loading.desserts,
        initialized: initialized.desserts
      },
      {
        id: 'beverages', 
        title: 'BEVANDE',
        icon: '🥤',
        items: beverages || [],
        loading: loading.beverages,
        initialized: initialized.beverages
      }
    ]
  }, [pizzas, appetizers, beverages, desserts, loading, initialized])

  return menuSections
}

/**
 * Hook per gestire lo stato delle sezioni collassabili
 */
export const useCollapsibleSections = (defaultExpanded = 'appetizers') => {
  const [expandedSections, setExpandedSections] = useState(
    new Set([defaultExpanded])
  )

  const toggleSection = useCallback((sectionId) => {
    setExpandedSections(prev => {
      const newSet = new Set(prev)
      if (newSet.has(sectionId)) {
        newSet.delete(sectionId)
      } else {
        newSet.add(sectionId)
      }
      return newSet
    })
  }, [])

  const isSectionExpanded = useCallback((sectionId) => {
    return expandedSections.has(sectionId)
  }, [expandedSections])

  return {
    expandedSections,
    toggleSection,
    isSectionExpanded
  }
}