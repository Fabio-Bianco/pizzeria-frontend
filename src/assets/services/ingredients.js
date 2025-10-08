import api from './apiClient'
import { mockIngredients } from './mockData'

export async function listIngredients(params = {}) {
  try {
    const { data } = await api.get('/ingredients', { params })
    return data
  } catch (error) {
    console.warn('API non disponibile, uso dati mock per ingredienti')
    return mockIngredients
  }
}

export async function getIngredient(id, params = {}) {
  try {
    const { data } = await api.get(`/ingredients/${id}`, { params })
    return data
  } catch (error) {
    console.warn('API non disponibile, uso dati mock per ingrediente')
    return mockIngredients.find(ing => ing.id === parseInt(id))
  }
}
