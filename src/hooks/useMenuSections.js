import { useMemo, useState, useCallback } from 'react'

/**
 * Hook per preparare e organizzare le sezioni del menu con supporto per filtri allergeni
 */
export const useMenuSections = (pizzas, appetizers, beverages, desserts, loading, initialized, filterFunction = null) => {
  const menuSections = useMemo(() => {
    // Funzione per applicare il filtro se fornito
    const applyFilter = (items) => {
      if (!filterFunction || !Array.isArray(items)) return items || []
      return filterFunction(items)
    }

    return [
      {
        id: 'appetizers',
        title: 'ANTIPASTI',
        icon: '🍤',
        items: applyFilter(appetizers),
        originalItems: appetizers || [],
        loading: loading.appetizers,
        initialized: initialized.appetizers
      },
      {
        id: 'pizzas',
        title: 'PIZZE',
        icon: '🍕', 
        items: applyFilter(pizzas),
        originalItems: pizzas || [],
        loading: loading.pizzas,
        initialized: initialized.pizzas
      },
      {
        id: 'desserts',
        title: 'DESSERT',
        icon: '🍰',
        items: applyFilter(desserts),
        originalItems: desserts || [],
        loading: loading.desserts,
        initialized: initialized.desserts
      },
      {
        id: 'beverages', 
        title: 'BEVANDE',
        icon: '🥤',
        items: applyFilter(beverages),
        originalItems: beverages || [],
        loading: loading.beverages,
        initialized: initialized.beverages
      }
    ]
  }, [pizzas, appetizers, beverages, desserts, loading, initialized, filterFunction])

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