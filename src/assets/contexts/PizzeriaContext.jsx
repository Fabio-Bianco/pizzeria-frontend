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

  // Tenta di estrarre una lista da varie forme di risposta comuni in Laravel (paginata/non paginata)
  const extractList = (payload) => {
    if (Array.isArray(payload)) return payload
    if (Array.isArray(payload?.data)) return payload.data
    if (Array.isArray(payload?.results)) return payload.results
    if (Array.isArray(payload?.data?.data)) return payload.data.data
    if (Array.isArray(payload?.payload)) return payload.payload
    return []
  }

  const fetchCategories = useCallback(async (force = false) => {
    // Non fare fetch se già inizializzato e non forzato
    if (initializedRef.current.categories && !force) return
    
    setLoading((s) => ({ ...s, categories: true }))
    setError((e) => ({ ...e, categories: null }))
    try {
      const data = await listCategories()
      setCategories(extractList(data))
      initializedRef.current.categories = true
    } catch (e) {
      console.error('Errore nel caricamento categorie:', e)
      setError((err) => ({ ...err, categories: e }))
    } finally {
      setLoading((s) => ({ ...s, categories: false }))
    }
  }, []) // Rimuovo la dipendenza da initialized.categories

  const fetchPizzas = useCallback(async (params = {}, force = false) => {
    // Non fare fetch se già inizializzato e non forzato
    if (initializedRef.current.pizzas && !force) return
    
    // Non mostrare loader se abbiamo già dei dati e non è forzato
    const shouldShowLoader = force || !initializedRef.current.pizzas
    if (shouldShowLoader) {
      setLoading((s) => ({ ...s, pizzas: true }))
    }
    setError((e) => ({ ...e, pizzas: null }))
    try {
      const data = await listPizzas(params)
      // Mappo is_vegan/is_vegetarian su vegan/vegetarian per compatibilità filtri
      const mapped = extractList(data).map(item => ({
        ...item,
        vegan: item.is_vegan ?? item.vegan,
        vegetarian: item.is_vegetarian ?? item.vegetarian
      }))
      setPizzas(mapped)
      initializedRef.current.pizzas = true
    } catch (e) {
      console.error('Errore nel caricamento pizze:', e)
      setError((err) => ({ ...err, pizzas: e }))
    } finally {
      setLoading((s) => ({ ...s, pizzas: false }))
    }
  }, []) // Rimuovo dipendenza

  const fetchIngredients = useCallback(async (force = false) => {
    // Non fare fetch se già inizializzato e non forzato
    if (initializedRef.current.ingredients && !force) return
    
    setLoading((s) => ({ ...s, ingredients: true }))
    setError((e) => ({ ...e, ingredients: null }))
    try {
      const data = await listIngredients()
      setIngredients(extractList(data))
      initializedRef.current.ingredients = true
    } catch (e) {
      console.error('Errore nel caricamento ingredienti:', e)
      setError((err) => ({ ...err, ingredients: e }))
    } finally {
      setLoading((s) => ({ ...s, ingredients: false }))
    }
  }, []) // Rimuovo dipendenza

  const fetchAllergens = useCallback(async (force = false) => {
    // Non fare fetch se già inizializzato e non forzato
    if (initializedRef.current.allergens && !force) return
    
    setLoading((s) => ({ ...s, allergens: true }))
    setError((e) => ({ ...e, allergens: null }))
    try {
      const data = await listAllergens()
      setAllergens(extractList(data))
      initializedRef.current.allergens = true
    } catch (e) {
      console.error('Errore nel caricamento allergeni:', e)
      setError((err) => ({ ...err, allergens: e }))
    } finally {
      setLoading((s) => ({ ...s, allergens: false }))
    }
  }, []) // Rimuovo dipendenza

  const fetchAppetizers = useCallback(async (force = false) => {
    // Non fare fetch se già inizializzato e non forzato
    if (initializedRef.current.appetizers && !force) return
    
    const shouldShowLoader = force || !initializedRef.current.appetizers
    if (shouldShowLoader) {
      setLoading((s) => ({ ...s, appetizers: true }))
    }
    setError((e) => ({ ...e, appetizers: null }))
    try {
      const data = await listAppetizers()
      const extracted = extractList(data)
      // Normalizza is_gluten_free e gluten_free per compatibilità badge
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
    } catch (e) {
      console.error('Errore nel caricamento antipasti:', e)
      setError((err) => ({ ...err, appetizers: e }))
    } finally {
      setLoading((s) => ({ ...s, appetizers: false }))
    }
  }, []) // Rimuovo dipendenza

  const fetchBeverages = useCallback(async (force = false) => {
    // Non fare fetch se già inizializzato e non forzato
    if (initializedRef.current.beverages && !force) return
    
    const shouldShowLoader = force || !initializedRef.current.beverages
    if (shouldShowLoader) {
      setLoading((s) => ({ ...s, beverages: true }))
    }
    setError((e) => ({ ...e, beverages: null }))
    try {
      const data = await listBeverages()
      setBeverages(extractList(data))
      initializedRef.current.beverages = true
    } catch (e) {
      console.error('Errore nel caricamento bevande:', e)
      setError((err) => ({ ...err, beverages: e }))
    } finally {
      setLoading((s) => ({ ...s, beverages: false }))
    }
  }, []) // Rimuovo dipendenza

  const fetchDesserts = useCallback(async (force = false) => {
    // Non fare fetch se già inizializzato e non forzato
    if (initializedRef.current.desserts && !force) return
    
    const shouldShowLoader = force || !initializedRef.current.desserts
    if (shouldShowLoader) {
      setLoading((s) => ({ ...s, desserts: true }))
    }
    setError((e) => ({ ...e, desserts: null }))
    try {
      const data = await listDesserts()
      setDesserts(extractList(data))
      initializedRef.current.desserts = true
    } catch (e) {
      console.error('Errore nel caricamento dolci:', e)
      setError((err) => ({ ...err, desserts: e }))
    } finally {
      setLoading((s) => ({ ...s, desserts: false }))
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
    [categories, pizzas, ingredients, allergens, appetizers, beverages, desserts, loading, error]
    // Rimuovo le fetch functions dalle dipendenze per evitare re-render infiniti
  )

  return <PizzeriaContext.Provider value={value}>{children}</PizzeriaContext.Provider>
}

export function usePizzeria() {
  const ctx = useContext(PizzeriaContext)
  if (!ctx) throw new Error('usePizzeria must be used within a PizzeriaProvider')
  return ctx
}
