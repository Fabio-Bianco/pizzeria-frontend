import { useMemo, useState, useCallback } from 'react'

/**
 * Hook per preparare e organizzare le sezioni del menu con supporto per filtri allergeni
 */
export const useMenuSections = (pizzas, appetizers, beverages, desserts, loading, filterFunction = null) => {
  const menuSections = useMemo(() => {
    // Funzione per applicare il filtro se fornito
    const applyFilter = (items) => {
      if (!filterFunction || !Array.isArray(items)) return items || []
      if (typeof window !== 'undefined') {
        console.log('[useMenuSections] applyFilter items:', items)
      }
      const filtered = filterFunction(items)
      if (typeof window !== 'undefined') {
        console.log('[useMenuSections] filtered:', filtered)
      }
      return filtered
    }

    // Calcola i conteggi filtrati per ogni sezione
    const appetizersFiltered = applyFilter(appetizers)
    // Ordina le pizze per priorità categoria: classica > bianca > speciale > altre
    const sortByCategoryPriority = (arr) => {
      if (!Array.isArray(arr)) return arr;
      const getCat = (item) => {
        const cats = [];
        if (item.category) cats.push(item.category);
        if (Array.isArray(item.categories)) cats.push(...item.categories);
        const norm = c => (typeof c === 'object' ? (c.name || '').toLowerCase() : (c || '').toLowerCase());
        if (cats.find(c => norm(c).includes('classica') || norm(c).includes('classiche'))) return 1;
        if (cats.find(c => norm(c).includes('bianca') || norm(c).includes('bianche'))) return 2;
        if (cats.find(c => norm(c).includes('speciale') || norm(c).includes('speciali'))) return 3;
        return 4;
      };
      return [...arr].sort((a, b) => getCat(a) - getCat(b));
    };
    const pizzasFiltered = sortByCategoryPriority(applyFilter(pizzas));
    const dessertsFiltered = applyFilter(desserts)
    const beveragesFiltered = applyFilter(beverages)

    return [
      {
        id: 'appetizers',
        title: 'ANTIPASTI',
        icon: '🍤',
        items: appetizersFiltered,
        originalItems: appetizers || [],
        count: appetizersFiltered.length,
        originalCount: (appetizers || []).length,
        loading: loading.appetizers
      },
      {
        id: 'pizzas',
        title: 'PIZZE',
        icon: '🍕', 
        items: pizzasFiltered,
        originalItems: pizzas || [],
        count: pizzasFiltered.length,
        originalCount: (pizzas || []).length,
        loading: loading.pizzas
      },
      {
        id: 'desserts',
        title: 'DESSERT',
        icon: '🍰',
        items: dessertsFiltered,
        originalItems: desserts || [],
        count: dessertsFiltered.length,
        originalCount: (desserts || []).length,
        loading: loading.desserts
      },
      {
        id: 'beverages', 
        title: 'BEVANDE',
        icon: '🥤',
        items: beveragesFiltered,
        originalItems: beverages || [],
        count: beveragesFiltered.length,
        originalCount: (beverages || []).length,
        loading: loading.beverages
      }
    ]
  }, [pizzas, appetizers, beverages, desserts, loading, filterFunction])

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