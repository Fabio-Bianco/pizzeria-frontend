/* eslint-disable react-refresh/only-export-components */
import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react'
import { listCategories } from '../services/categories'
import { listPizzas } from '../services/pizzas'
import { listIngredients } from '../services/ingredients'
import { listAllergens } from '../services/allergens'
import { listAppetizers } from '../services/appetizers'
import { listBeverages } from '../services/beverages'
import { listDesserts } from '../services/desserts'

const PizzeriaContext = createContext(null)

export function PizzeriaProvider({ children }) {
  // Stati unificati in un oggetto
  const [data, setData] = useState({
    categories: [],
    pizzas: [],
    ingredients: [],
    allergens: [],
    appetizers: [],
    beverages: [],
    desserts: []
  })

  const [loading, setLoading] = useState({
    categories: true, pizzas: true, ingredients: true, allergens: true,
    appetizers: true, beverages: true, desserts: true
  })

  const [error, setError] = useState({
    categories: null, pizzas: null, ingredients: null, allergens: null,
    appetizers: null, beverages: null, desserts: null
  })

  // Helper per estrarre liste dalla risposta API
  const extractList = (payload) => {
    if (Array.isArray(payload)) return payload
    if (payload?.success && Array.isArray(payload?.data)) return payload.data
    if (Array.isArray(payload?.data)) return payload.data
    if (Array.isArray(payload?.results)) return payload.results
    return []
  }

  // Funzione generica per creare fetcher
  const createFetcher = (key, apiFunction) => {
    return useCallback(async (params = {}) => {
      try {
        setError(prev => ({ ...prev, [key]: null }))
        const response = await apiFunction(params)
        let processed = extractList(response)
        
        // Mapping speciale per pizzas
        if (key === 'pizzas') {
          processed = processed.map(item => ({
            ...item,
            vegan: item.is_vegan ?? item.vegan,
            vegetarian: item.is_vegetarian ?? item.vegetarian
          }))
        }
        
        // Mapping speciale per appetizers
        if (key === 'appetizers') {
          processed = processed.map(item => ({
            ...item,
            is_gluten_free: item.is_gluten_free ?? item.gluten_free,
            gluten_free: item.is_gluten_free ?? item.gluten_free
          }))
        }
        
        setData(prev => ({ ...prev, [key]: processed }))
        if (typeof window !== 'undefined') {
          console.log(`[PizzeriaContext] ${key} loaded:`, processed.length, 'items')
        }
      } catch (e) {
        console.error(`Errore nel caricamento ${key}:`, e)
        setError(prev => ({ ...prev, [key]: e }))
        if (e?.response?.status === 404) {
          console.warn('⚠️ API non trovata. Il backend potrebbe richiedere configurazione.')
        }
      } finally {
        setLoading(prev => ({ ...prev, [key]: false }))
      }
    }, [key, apiFunction])
  }

  // Fetch functions
  const fetchCategories = createFetcher('categories', listCategories)
  const fetchPizzas = createFetcher('pizzas', listPizzas)
  const fetchIngredients = createFetcher('ingredients', listIngredients)
  const fetchAllergens = createFetcher('allergens', listAllergens)
  const fetchAppetizers = createFetcher('appetizers', listAppetizers)
  const fetchBeverages = createFetcher('beverages', listBeverages)
  const fetchDesserts = createFetcher('desserts', listDesserts)

  // Caricamento iniziale parallelo
  useEffect(() => {
    Promise.all([
      fetchCategories(),
      fetchPizzas(),
      fetchIngredients(),
      fetchAllergens(),
      fetchAppetizers(),
      fetchBeverages(),
      fetchDesserts()
    ]).catch(console.error)
  }, [fetchCategories, fetchPizzas, fetchIngredients, fetchAllergens, 
      fetchAppetizers, fetchBeverages, fetchDesserts])

  // Pizzas arricchite con categorie
  const pizzasEnriched = useMemo(() => {
    if (!data.categories.length || !data.pizzas.length) return data.pizzas
    
    return data.pizzas.map(pizza => ({
      ...pizza,
      categories: data.categories.filter(category => 
        pizza.category?.id === category.id || 
        pizza.category_id === category.id ||
        pizza.category_ids?.includes(category.id)
      )
    }))
  }, [data.categories, data.pizzas])

  // Valore del context
  const value = useMemo(() => ({
    // Tutti i dati
    ...data,
    pizzasEnriched,
    
    // Stati
    loading,
    error,
    initialized: Object.values(loading).every(isLoading => !isLoading),
    
    // Funzioni di refetch
    refetch: {
      categories: fetchCategories,
      pizzas: fetchPizzas,
      ingredients: fetchIngredients,
      allergens: fetchAllergens,
      appetizers: fetchAppetizers,
      beverages: fetchBeverages,
      desserts: fetchDesserts,
    }
  }), [data, pizzasEnriched, loading, error, fetchCategories, fetchPizzas, 
       fetchIngredients, fetchAllergens, fetchAppetizers, fetchBeverages, fetchDesserts])

  return (
    <PizzeriaContext.Provider value={value}>
      {children}
    </PizzeriaContext.Provider>
  )
}

export function usePizzeria() {
  const context = useContext(PizzeriaContext)
  if (!context) {
    throw new Error('usePizzeria must be used within a PizzeriaProvider')
  }
  return context
}