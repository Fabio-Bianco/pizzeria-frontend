import api from './apiClient'
import { mockAllergens } from './mockData'

export async function listAllergens(params = {}) {
  try {
    const { data } = await api.get('/allergens', { params })
    return data
  } catch (error) {
    console.warn('API non disponibile, uso dati mock per allergeni')
    return mockAllergens
  }
}

export async function getAllergen(id, params = {}) {
  try {
    const { data } = await api.get(`/allergens/${id}`, { params })
    return data
  } catch (error) {
    console.warn('API non disponibile, uso dati mock per allergene')
    return mockAllergens.find(all => all.id === parseInt(id))
  }
}
