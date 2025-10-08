import api from './apiClient'
import { mockDesserts } from './mockData'

export async function listDesserts(params = {}) {
  try {
    // Includi gli allergeni per default
    const defaultParams = { with: 'allergens', ...params }
    const { data } = await api.get('/desserts', { params: defaultParams })
    return data
  } catch (error) {
    console.warn('API non disponibile, uso dati mock per dolci')
    return mockDesserts
  }
}

export async function getDessert(id, params = {}) {
  try {
    // Includi gli allergeni per default
    const defaultParams = { with: 'allergens', ...params }
    const { data } = await api.get(`/desserts/${id}`, { params: defaultParams })
    return data
  } catch (error) {
    console.warn('API non disponibile, uso dati mock per dolce')
    return mockDesserts.find(dess => dess.id === parseInt(id))
  }
}