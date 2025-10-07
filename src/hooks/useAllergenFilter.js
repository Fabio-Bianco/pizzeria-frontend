import { useState, useMemo, useCallback, useEffect } from 'react'

const STORAGE_KEY = 'allergen_filter_selection'

/**
 * Hook per gestire il filtro degli allergeni con logica ottimizzata e persistenza
 */
export const useAllergenFilter = (persistSelection = true) => {
  // Carica la selezione salvata da localStorage
  const loadSavedSelection = useCallback(() => {
    if (!persistSelection) return []
    
    try {
      const saved = localStorage.getItem(STORAGE_KEY)
      return saved ? JSON.parse(saved) : []
    } catch (error) {
      console.warn('Errore nel caricamento della selezione allergeni salvata:', error)
      return []
    }
  }, [persistSelection])

  const [selectedAllergens, setSelectedAllergens] = useState(loadSavedSelection)

  // Salva la selezione in localStorage quando cambia
  useEffect(() => {
    if (!persistSelection) return
    
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(selectedAllergens))
    } catch (error) {
      console.warn('Errore nel salvataggio della selezione allergeni:', error)
    }
  }, [selectedAllergens, persistSelection])

  // Callback per aggiornare la selezione degli allergeni
  const updateSelection = useCallback((newSelection) => {
    setSelectedAllergens(newSelection)
  }, [])

  // Reset della selezione
  const resetSelection = useCallback(() => {
    setSelectedAllergens([])
  }, [])

  // Toggle di un singolo allergene
  const toggleAllergen = useCallback((allergenId) => {
    setSelectedAllergens(prev => 
      prev.includes(allergenId)
        ? prev.filter(id => id !== allergenId)
        : [...prev, allergenId]
    )
  }, [])

  // Funzione principale per filtrare i piatti
  const filterItems = useCallback((items) => {
    // Se non ci sono allergeni selezionati, mostra tutti i piatti
    if (selectedAllergens.length === 0) {
      return items
    }

    // Filtra i piatti che NON contengono gli allergeni selezionati
    return items.filter(item => {
      // Se il piatto non ha allergeni, è sempre sicuro
      if (!item.allergens || !Array.isArray(item.allergens)) {
        return true
      }

      // Controlla se il piatto contiene QUALSIASI degli allergeni selezionati
      const hasSelectedAllergen = item.allergens.some(itemAllergen => 
        selectedAllergens.includes(itemAllergen.id)
      )

      // Restituisce true se NON contiene allergeni selezionati (quindi è sicuro)
      return !hasSelectedAllergen
    })
  }, [selectedAllergens])

  // Funzione ottimizzata con useMemo per le operazioni costose
  const getFilteredData = useMemo(() => {
    return {
      /**
       * Filtra le pizze
       */
      pizzas: (pizzas) => filterItems(pizzas),
      
      /**
       * Filtra gli antipasti 
       */
      appetizers: (appetizers) => filterItems(appetizers),
      
      /**
       * Filtra i dessert
       */
      desserts: (desserts) => filterItems(desserts),
      
      /**
       * Filtra le bevande
       */
      beverages: (beverages) => filterItems(beverages),

      /**
       * Filtra tutti i tipi di piatti in una sola volta
       */
      all: (data) => {
        const result = {}
        if (data.pizzas) result.pizzas = filterItems(data.pizzas)
        if (data.appetizers) result.appetizers = filterItems(data.appetizers)
        if (data.desserts) result.desserts = filterItems(data.desserts)
        if (data.beverages) result.beverages = filterItems(data.beverages)
        return result
      }
    }
  }, [filterItems])

  // Statistiche sui filtri applicati
  const filterStats = useMemo(() => {
    return {
      hasActiveFilters: selectedAllergens.length > 0,
      activeFilterCount: selectedAllergens.length,
      selectedAllergensIds: selectedAllergens
    }
  }, [selectedAllergens])

  // Funzione per contare i risultati filtrati
  const countFilteredItems = useCallback((items) => {
    return filterItems(items).length
  }, [filterItems])

  // Funzione per ottenere la lista degli allergeni selezionati con nomi
  const getSelectedAllergensDetails = useCallback((allAllergens) => {
    return allAllergens.filter(allergen => selectedAllergens.includes(allergen.id))
  }, [selectedAllergens])

  return {
    // Stato
    selectedAllergens,
    
    // Azioni
    updateSelection,
    resetSelection,
    toggleAllergen,
    
    // Filtri
    filterItems,
    getFilteredData,
    
    // Utility
    filterStats,
    countFilteredItems,
    getSelectedAllergensDetails
  }
}

/**
 * Hook per gestire le statistiche del menu filtrato
 */
export const useFilteredMenuStats = (originalData, filteredData) => {
  return useMemo(() => {
    const calculateItemCount = (items) => Array.isArray(items) ? items.length : 0
    
    const original = {
      pizzas: calculateItemCount(originalData.pizzas),
      appetizers: calculateItemCount(originalData.appetizers),
      desserts: calculateItemCount(originalData.desserts),
      beverages: calculateItemCount(originalData.beverages)
    }
    
    const filtered = {
      pizzas: calculateItemCount(filteredData.pizzas),
      appetizers: calculateItemCount(filteredData.appetizers),
      desserts: calculateItemCount(filteredData.desserts),
      beverages: calculateItemCount(filteredData.beverages)
    }
    
    const originalTotal = Object.values(original).reduce((sum, count) => sum + count, 0)
    const filteredTotal = Object.values(filtered).reduce((sum, count) => sum + count, 0)
    
    return {
      original,
      filtered,
      originalTotal,
      filteredTotal,
      hiddenCount: originalTotal - filteredTotal,
      isFiltered: originalTotal !== filteredTotal,
      visibilityPercentage: originalTotal > 0 ? Math.round((filteredTotal / originalTotal) * 100) : 100
    }
  }, [originalData, filteredData])
}