/* eslint-disable react-refresh/only-export-components */
import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react'
import { listCategories } from '../services/categories'
import { listPizzas } from '../services/pizzas'
import { listIngredients } from '../services/ingredients'
import { listAllergens } from '../services/allergens'

const PizzeriaContext = createContext(null)

export function PizzeriaProvider({ children }) {
  const [categories, setCategories] = useState([])
  const [pizzas, setPizzas] = useState([])
  const [ingredients, setIngredients] = useState([])
  const [allergens, setAllergens] = useState([])

  const [loading, setLoading] = useState({ categories: false, pizzas: false, ingredients: false, allergens: false })
  const [error, setError] = useState({ categories: null, pizzas: null, ingredients: null, allergens: null })

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

  useEffect(() => {
    // fetch iniziale in parallelo
    fetchCategories()
    fetchPizzas()
    fetchIngredients()
    fetchAllergens()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const value = useMemo(
    () => ({
      categories,
      pizzas,
      ingredients,
      allergens,
      loading,
      error,
      refetch: {
        categories: fetchCategories,
        pizzas: fetchPizzas,
        ingredients: fetchIngredients,
        allergens: fetchAllergens,
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
