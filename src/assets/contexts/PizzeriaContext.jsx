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
  const [categories, setCategories] = useState([])
  const [pizzas, setPizzas] = useState([])
  const [ingredients, setIngredients] = useState([])
  const [allergens, setAllergens] = useState([])
  const [appetizers, setAppetizers] = useState([])
  const [beverages, setBeverages] = useState([])
  const [desserts, setDesserts] = useState([])

  const [loading, setLoading] = useState({ categories: true, pizzas: true, ingredients: true, allergens: true, appetizers: true, beverages: true, desserts: true })
  const [error, setError] = useState({ categories: null, pizzas: null, ingredients: null, allergens: null, appetizers: null, beverages: null, desserts: null })
  const [initialized, setInitialized] = useState({ categories: false, pizzas: false, ingredients: false, allergens: false, appetizers: false, beverages: false, desserts: false })

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
    if (initialized.categories && !force) return
    
    setLoading((s) => ({ ...s, categories: true }))
    setError((e) => ({ ...e, categories: null }))
    try {
      const data = await listCategories()
      setCategories(extractList(data))
      setInitialized((s) => ({ ...s, categories: true }))
    } catch (e) {
      setError((err) => ({ ...err, categories: e }))
    } finally {
      setLoading((s) => ({ ...s, categories: false }))
    }
  }, [initialized.categories])

  const fetchPizzas = useCallback(async (params = {}, force = false) => {
    // Non fare fetch se già inizializzato e non forzato
    if (initialized.pizzas && !force) return
    
    // Non mostrare loader se abbiamo già dei dati e non è forzato
    const shouldShowLoader = force || !initialized.pizzas
    if (shouldShowLoader) {
      setLoading((s) => ({ ...s, pizzas: true }))
    }
    setError((e) => ({ ...e, pizzas: null }))
    try {
      const data = await listPizzas(params)
      setPizzas(extractList(data))
      setInitialized((s) => ({ ...s, pizzas: true }))
    } catch (e) {
      setError((err) => ({ ...err, pizzas: e }))
    } finally {
      setLoading((s) => ({ ...s, pizzas: false }))
    }
  }, [initialized.pizzas])

  const fetchIngredients = useCallback(async (force = false) => {
    // Non fare fetch se già inizializzato e non forzato
    if (initialized.ingredients && !force) return
    
    setLoading((s) => ({ ...s, ingredients: true }))
    setError((e) => ({ ...e, ingredients: null }))
    try {
      const data = await listIngredients()
      setIngredients(extractList(data))
      setInitialized((s) => ({ ...s, ingredients: true }))
    } catch (e) {
      setError((err) => ({ ...err, ingredients: e }))
    } finally {
      setLoading((s) => ({ ...s, ingredients: false }))
    }
  }, [initialized.ingredients])

  const fetchAllergens = useCallback(async (force = false) => {
    // Non fare fetch se già inizializzato e non forzato
    if (initialized.allergens && !force) return
    
    setLoading((s) => ({ ...s, allergens: true }))
    setError((e) => ({ ...e, allergens: null }))
    try {
      const data = await listAllergens()
      setAllergens(extractList(data))
      setInitialized((s) => ({ ...s, allergens: true }))
    } catch (e) {
      setError((err) => ({ ...err, allergens: e }))
    } finally {
      setLoading((s) => ({ ...s, allergens: false }))
    }
  }, [initialized.allergens])

  const fetchAppetizers = useCallback(async (force = false) => {
    // Non fare fetch se già inizializzato e non forzato
    if (initialized.appetizers && !force) return
    
    const shouldShowLoader = force || !initialized.appetizers
    if (shouldShowLoader) {
      setLoading((s) => ({ ...s, appetizers: true }))
    }
    setError((e) => ({ ...e, appetizers: null }))
    try {
      const data = await listAppetizers()
      setAppetizers(extractList(data))
      setInitialized((s) => ({ ...s, appetizers: true }))
    } catch (e) {
      setError((err) => ({ ...err, appetizers: e }))
    } finally {
      setLoading((s) => ({ ...s, appetizers: false }))
    }
  }, [initialized.appetizers])

  const fetchBeverages = useCallback(async (force = false) => {
    // Non fare fetch se già inizializzato e non forzato
    if (initialized.beverages && !force) return
    
    const shouldShowLoader = force || !initialized.beverages
    if (shouldShowLoader) {
      setLoading((s) => ({ ...s, beverages: true }))
    }
    setError((e) => ({ ...e, beverages: null }))
    try {
      const data = await listBeverages()
      setBeverages(extractList(data))
      setInitialized((s) => ({ ...s, beverages: true }))
    } catch (e) {
      setError((err) => ({ ...err, beverages: e }))
    } finally {
      setLoading((s) => ({ ...s, beverages: false }))
    }
  }, [initialized.beverages])

  const fetchDesserts = useCallback(async (force = false) => {
    // Non fare fetch se già inizializzato e non forzato
    if (initialized.desserts && !force) return
    
    const shouldShowLoader = force || !initialized.desserts
    if (shouldShowLoader) {
      setLoading((s) => ({ ...s, desserts: true }))
    }
    setError((e) => ({ ...e, desserts: null }))
    try {
      const data = await listDesserts()
      setDesserts(extractList(data))
      setInitialized((s) => ({ ...s, desserts: true }))
    } catch (e) {
      setError((err) => ({ ...err, desserts: e }))
    } finally {
      setLoading((s) => ({ ...s, desserts: false }))
    }
  }, [initialized.desserts])

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
      initialized,
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
    [categories, pizzas, ingredients, allergens, appetizers, beverages, desserts, loading, error, initialized, fetchCategories, fetchPizzas, fetchIngredients, fetchAllergens, fetchAppetizers, fetchBeverages, fetchDesserts]
  )

  return <PizzeriaContext.Provider value={value}>{children}</PizzeriaContext.Provider>
}

export function usePizzeria() {
  const ctx = useContext(PizzeriaContext)
  if (!ctx) throw new Error('usePizzeria must be used within a PizzeriaProvider')
  return ctx
}
