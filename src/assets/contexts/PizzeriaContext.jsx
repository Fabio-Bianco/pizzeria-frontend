/* eslint-disable react-refresh/only-export-components */
import { createContext, useCallback, useContext, useEffect, useMemo, useState, useRef } from 'react'
import { listCategories } from '../services/categories'
import { listPizzas } from '../services/pizzas'
import { listIngredients } from '../services/ingredients'
import { listAllergens } from '../services/allergens'
import { listAppetizers } from '../services/appetizers'
import { listBeverages } from '../services/beverages'
import { listDesserts } from '../services/desserts'

const PizzeriaContext = createContext(null)

export function PizzeriaProvider({ children }) {
  const [categories, setCategories] = useState([])
  const [pizzas, setPizzas] = useState([])
  const [ingredients, setIngredients] = useState([])
  const [allergens, setAllergens] = useState([])
  const [appetizers, setAppetizers] = useState([])
  const [beverages, setBeverages] = useState([])
  const [desserts, setDesserts] = useState([])

  const [loading, setLoading] = useState({ categories: true, pizzas: true, ingredients: true, allergens: true, appetizers: true, beverages: true, desserts: true })
  const [error, setError] = useState({ categories: null, pizzas: null, ingredients: null, allergens: null, appetizers: null, beverages: null, desserts: null })
  
  // Uso useRef per i flag di inizializzazione per evitare re-render
  const initializedRef = useRef({ categories: false, pizzas: false, ingredients: false, allergens: false, appetizers: false, beverages: false, desserts: false })
  
  // Cache per evitare chiamate duplicate durante StrictMode
  const fetchingRef = useRef({ categories: false, pizzas: false, ingredients: false, allergens: false, appetizers: false, beverages: false, desserts: false })
  const cacheTimestamp = useRef({ categories: 0, pizzas: 0, ingredients: 0, allergens: 0, appetizers: 0, beverages: 0, desserts: 0 })
  const CACHE_DURATION = 30000 // 30 secondi di cache

  // Tenta di estrarre una lista da varie forme di risposta comuni in Laravel (paginata/non paginata)
  const extractList = (payload) => {
    if (Array.isArray(payload)) return payload
    // Gestisce formato { success: true, data: [...] }
    if (payload?.success && Array.isArray(payload?.data)) return payload.data
    if (Array.isArray(payload?.data)) return payload.data
    if (Array.isArray(payload?.results)) return payload.results
    if (Array.isArray(payload?.data?.data)) return payload.data.data
    if (Array.isArray(payload?.payload)) return payload.payload
    return []
  }

  const fetchCategories = useCallback(async (force = false) => {
    // Cache check: se abbiamo dati recenti, non ricaricare
    const now = Date.now()
    if (!force && initializedRef.current.categories && (now - cacheTimestamp.current.categories) < CACHE_DURATION) {
      return
    }
    
    // Lock: previene chiamate duplicate simultanee
    if (fetchingRef.current.categories) return
    fetchingRef.current.categories = true
    
    setLoading((s) => ({ ...s, categories: true }))
    setError((e) => ({ ...e, categories: null }))
    try {
      const data = await listCategories()
      setCategories(extractList(data))
      initializedRef.current.categories = true
      cacheTimestamp.current.categories = Date.now()
    } catch (e) {
      console.error('Errore nel caricamento categorie:', e)
      setError((err) => ({ ...err, categories: e }))
      // NON resettare lo stato se già abbiamo dei dati
    } finally {
      setLoading((s) => ({ ...s, categories: false }))
      fetchingRef.current.categories = false
    }
  }, []) // Rimuovo la dipendenza da initialized.categories

  const fetchPizzas = useCallback(async (params = {}, force = false) => {
    // Cache check
    const now = Date.now()
    if (!force && initializedRef.current.pizzas && (now - cacheTimestamp.current.pizzas) < CACHE_DURATION) {
      return
    }
    
    // Lock: previene chiamate duplicate simultanee
    if (fetchingRef.current.pizzas) return
    fetchingRef.current.pizzas = true
    
    const shouldShowLoader = force || !initializedRef.current.pizzas
    if (shouldShowLoader) {
      setLoading((s) => ({ ...s, pizzas: true }))
    }
    setError((e) => ({ ...e, pizzas: null }))
    try {
      const data = await listPizzas(params)
      console.log('[PizzeriaContext] Pizzas raw response:', data)
      const mapped = extractList(data).map(item => ({
        ...item,
        vegan: item.is_vegan ?? item.vegan,
        vegetarian: item.is_vegetarian ?? item.vegetarian
      }))
      console.log('[PizzeriaContext] Pizzas mapped:', mapped.length, 'items')
      setPizzas(mapped)
      initializedRef.current.pizzas = true
      cacheTimestamp.current.pizzas = Date.now()
    } catch (e) {
      console.error('[PizzeriaContext] Errore nel caricamento pizze:', e)
      setError((err) => ({ ...err, pizzas: e }))
      if (e?.response?.status === 404) {
        console.warn('[PizzeriaContext] ⚠️ API non trovata (404). Il backend potrebbe richiedere autenticazione o le rotte API pubbliche non sono configurate.')
      }
    } finally {
      setLoading((s) => ({ ...s, pizzas: false }))
      fetchingRef.current.pizzas = false
    }
  }, []) // Rimuovo dipendenza

  const fetchIngredients = useCallback(async (force = false) => {
    const now = Date.now()
    if (!force && initializedRef.current.ingredients && (now - cacheTimestamp.current.ingredients) < CACHE_DURATION) return
    if (fetchingRef.current.ingredients) return
    fetchingRef.current.ingredients = true
    
    setLoading((s) => ({ ...s, ingredients: true }))
    setError((e) => ({ ...e, ingredients: null }))
    try {
      const data = await listIngredients()
      setIngredients(extractList(data))
      initializedRef.current.ingredients = true
      cacheTimestamp.current.ingredients = Date.now()
    } catch (e) {
      console.error('Errore nel caricamento ingredienti:', e)
      setError((err) => ({ ...err, ingredients: e }))
    } finally {
      setLoading((s) => ({ ...s, ingredients: false }))
      fetchingRef.current.ingredients = false
    }
  }, []) // Rimuovo dipendenza

  const fetchAllergens = useCallback(async (force = false) => {
    const now = Date.now()
    if (!force && initializedRef.current.allergens && (now - cacheTimestamp.current.allergens) < CACHE_DURATION) return
    if (fetchingRef.current.allergens) return
    fetchingRef.current.allergens = true
    
    setLoading((s) => ({ ...s, allergens: true }))
    setError((e) => ({ ...e, allergens: null }))
    try {
      const data = await listAllergens()
      setAllergens(extractList(data))
      initializedRef.current.allergens = true
      cacheTimestamp.current.allergens = Date.now()
    } catch (e) {
      console.error('Errore nel caricamento allergeni:', e)
      setError((err) => ({ ...err, allergens: e }))
    } finally {
      setLoading((s) => ({ ...s, allergens: false }))
      fetchingRef.current.allergens = false
    }
  }, []) // Rimuovo dipendenza

  const fetchAppetizers = useCallback(async (force = false) => {
    const now = Date.now()
    if (!force && initializedRef.current.appetizers && (now - cacheTimestamp.current.appetizers) < CACHE_DURATION) return
    if (fetchingRef.current.appetizers) return
    fetchingRef.current.appetizers = true
    
    const shouldShowLoader = force || !initializedRef.current.appetizers
    if (shouldShowLoader) {
      setLoading((s) => ({ ...s, appetizers: true }))
    }
    setError((e) => ({ ...e, appetizers: null }))
    try {
      const data = await listAppetizers()
      const extracted = extractList(data)
      const mapped = extracted.map(item => ({
        ...item,
        is_gluten_free: item.is_gluten_free ?? item.gluten_free,
        gluten_free: item.is_gluten_free ?? item.gluten_free
      }))
      if (typeof window !== 'undefined') {
        console.log('[PizzeriaContext] Appetizers from API:', mapped)
      }
      setAppetizers(mapped)
      initializedRef.current.appetizers = true
      cacheTimestamp.current.appetizers = Date.now()
    } catch (e) {
      console.error('Errore nel caricamento antipasti:', e)
      setError((err) => ({ ...err, appetizers: e }))
    } finally {
      setLoading((s) => ({ ...s, appetizers: false }))
      fetchingRef.current.appetizers = false
    }
  }, []) // Rimuovo dipendenza

  const fetchBeverages = useCallback(async (force = false) => {
    const now = Date.now()
    if (!force && initializedRef.current.beverages && (now - cacheTimestamp.current.beverages) < CACHE_DURATION) return
    if (fetchingRef.current.beverages) return
    fetchingRef.current.beverages = true
    
    const shouldShowLoader = force || !initializedRef.current.beverages
    if (shouldShowLoader) {
      setLoading((s) => ({ ...s, beverages: true }))
    }
    setError((e) => ({ ...e, beverages: null }))
    try {
      const data = await listBeverages()
      setBeverages(extractList(data))
      initializedRef.current.beverages = true
      cacheTimestamp.current.beverages = Date.now()
    } catch (e) {
      console.error('Errore nel caricamento bevande:', e)
      setError((err) => ({ ...err, beverages: e }))
    } finally {
      setLoading((s) => ({ ...s, beverages: false }))
      fetchingRef.current.beverages = false
    }
  }, []) // Rimuovo dipendenza

  const fetchDesserts = useCallback(async (force = false) => {
    const now = Date.now()
    if (!force && initializedRef.current.desserts && (now - cacheTimestamp.current.desserts) < CACHE_DURATION) return
    if (fetchingRef.current.desserts) return
    fetchingRef.current.desserts = true
    
    const shouldShowLoader = force || !initializedRef.current.desserts
    if (shouldShowLoader) {
      setLoading((s) => ({ ...s, desserts: true }))
    }
    setError((e) => ({ ...e, desserts: null }))
    try {
      const data = await listDesserts()
      setDesserts(extractList(data))
      initializedRef.current.desserts = true
      cacheTimestamp.current.desserts = Date.now()
    } catch (e) {
      console.error('Errore nel caricamento dolci:', e)
      setError((err) => ({ ...err, desserts: e }))
    } finally {
      setLoading((s) => ({ ...s, desserts: false }))
      fetchingRef.current.desserts = false
    }
  }, []) // Rimuovo dipendenza

  useEffect(() => {
    // fetch iniziale in parallelo
    fetchCategories()
    fetchPizzas()
    fetchIngredients()
    fetchAllergens()
  fetchAppetizers()
  fetchBeverages()
  fetchDesserts()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const value = useMemo(
    () => ({
      categories,
      pizzas,
      pizzasEnriched: (() => {
        if (!Array.isArray(categories) || categories.length === 0) return pizzas
        const map = new Map(categories.map((c) => [String(c.id), c]))
        return (pizzas || []).map((p) => {
          let cats = Array.isArray(p.categories) ? p.categories : []
          const ids = new Set()
          if (p.category?.id) ids.add(String(p.category.id))
          if (p.category_id) ids.add(String(p.category_id))
          if (Array.isArray(p.category_ids)) p.category_ids.forEach((id) => ids.add(String(id)))
          const fromIds = Array.from(ids).map((id) => map.get(id)).filter(Boolean)
          if (!cats.length && fromIds.length) cats = fromIds
          return { ...p, categories: cats }
        })
      })(),
      ingredients,
      allergens,
      appetizers,
      beverages,
      desserts,
      loading,
      error,
      refetch: {
        categories: fetchCategories,
        pizzas: fetchPizzas,
        ingredients: fetchIngredients,
        allergens: fetchAllergens,
        appetizers: fetchAppetizers,
        beverages: fetchBeverages,
        desserts: fetchDesserts,
      },
    }),
    [categories, pizzas, ingredients, allergens, appetizers, beverages, desserts, loading, error, 
     fetchCategories, fetchPizzas, fetchIngredients, fetchAllergens, fetchAppetizers, fetchBeverages, fetchDesserts]
  )

  return <PizzeriaContext.Provider value={value}>{children}</PizzeriaContext.Provider>
}

export function usePizzeria() {
  const ctx = useContext(PizzeriaContext)
  if (!ctx) throw new Error('usePizzeria must be used within a PizzeriaProvider')
  return ctx
}
