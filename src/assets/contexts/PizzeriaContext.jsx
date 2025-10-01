/* eslint-disable react-refresh/only-export-components */
import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react'
import { listCategories } from '../services/categories'
import { listPizzas } from '../services/pizzas'
import { listIngredients } from '../services/ingredients'
import { listAllergens } from '../services/allergens'
import { listAppetizers } from '../services/appetizers'
import { listBeverages } from '../services/beverages'

const PizzeriaContext = createContext(null)

export function PizzeriaProvider({ children }) {
  const [categories, setCategories] = useState([])
  const [pizzas, setPizzas] = useState([])
  const [ingredients, setIngredients] = useState([])
  const [allergens, setAllergens] = useState([])
  const [appetizers, setAppetizers] = useState([])
  const [beverages, setBeverages] = useState([])

  const [loading, setLoading] = useState({ categories: false, pizzas: false, ingredients: false, allergens: false, appetizers: false, beverages: false })
  const [error, setError] = useState({ categories: null, pizzas: null, ingredients: null, allergens: null, appetizers: null, beverages: null })

  // Tenta di estrarre una lista da varie forme di risposta comuni in Laravel (paginata/non paginata)
  const extractList = (payload) => {
    if (Array.isArray(payload)) return payload
    if (Array.isArray(payload?.data)) return payload.data
    if (Array.isArray(payload?.results)) return payload.results
    if (Array.isArray(payload?.data?.data)) return payload.data.data
    if (Array.isArray(payload?.payload)) return payload.payload
    return []
  }

  const fetchCategories = useCallback(async () => {
    setLoading((s) => ({ ...s, categories: true }))
    setError((e) => ({ ...e, categories: null }))
    try {
  const data = await listCategories()
  setCategories(extractList(data))
    } catch (e) {
      setError((err) => ({ ...err, categories: e }))
    } finally {
      setLoading((s) => ({ ...s, categories: false }))
    }
  }, [])

  const fetchPizzas = useCallback(async (params = {}) => {
    setLoading((s) => ({ ...s, pizzas: true }))
    setError((e) => ({ ...e, pizzas: null }))
    try {
  const data = await listPizzas(params)
  setPizzas(extractList(data))
    } catch (e) {
      setError((err) => ({ ...err, pizzas: e }))
    } finally {
      setLoading((s) => ({ ...s, pizzas: false }))
    }
  }, [])

  const fetchIngredients = useCallback(async () => {
    setLoading((s) => ({ ...s, ingredients: true }))
    setError((e) => ({ ...e, ingredients: null }))
    try {
  const data = await listIngredients()
  setIngredients(extractList(data))
    } catch (e) {
      setError((err) => ({ ...err, ingredients: e }))
    } finally {
      setLoading((s) => ({ ...s, ingredients: false }))
    }
  }, [])

  const fetchAllergens = useCallback(async () => {
    setLoading((s) => ({ ...s, allergens: true }))
    setError((e) => ({ ...e, allergens: null }))
    try {
  const data = await listAllergens()
  setAllergens(extractList(data))
    } catch (e) {
      setError((err) => ({ ...err, allergens: e }))
    } finally {
      setLoading((s) => ({ ...s, allergens: false }))
    }
  }, [])

  const fetchAppetizers = useCallback(async () => {
    setLoading((s) => ({ ...s, appetizers: true }))
    setError((e) => ({ ...e, appetizers: null }))
    try {
      const data = await listAppetizers()
      setAppetizers(extractList(data))
    } catch (e) {
      setError((err) => ({ ...err, appetizers: e }))
    } finally {
      setLoading((s) => ({ ...s, appetizers: false }))
    }
  }, [])

  const fetchBeverages = useCallback(async () => {
    setLoading((s) => ({ ...s, beverages: true }))
    setError((e) => ({ ...e, beverages: null }))
    try {
      const data = await listBeverages()
      setBeverages(extractList(data))
    } catch (e) {
      setError((err) => ({ ...err, beverages: e }))
    } finally {
      setLoading((s) => ({ ...s, beverages: false }))
    }
  }, [])

  useEffect(() => {
    // fetch iniziale in parallelo
    fetchCategories()
    fetchPizzas()
    fetchIngredients()
    fetchAllergens()
  fetchAppetizers()
  fetchBeverages()
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
      loading,
      error,
      refetch: {
        categories: fetchCategories,
        pizzas: fetchPizzas,
        ingredients: fetchIngredients,
        allergens: fetchAllergens,
        appetizers: fetchAppetizers,
        beverages: fetchBeverages,
      },
    }),
    [categories, pizzas, ingredients, allergens, loading, error, fetchCategories, fetchPizzas, fetchIngredients, fetchAllergens]
  )

  return <PizzeriaContext.Provider value={value}>{children}</PizzeriaContext.Provider>
}

export function usePizzeria() {
  const ctx = useContext(PizzeriaContext)
  if (!ctx) throw new Error('usePizzeria must be used within a PizzeriaProvider')
  return ctx
}
