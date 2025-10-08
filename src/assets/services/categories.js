import api from './apiClient'
import { mockCategories } from './mockData'

export async function listCategories(params = {}) {
  try {
    const { data } = await api.get('/categories', { params })
    return data
  } catch (error) {
    console.warn('API non disponibile, uso dati mock per categorie')
    return mockCategories
  }
}

export async function getCategory(id, params = {}) {
  try {
    const { data } = await api.get(`/categories/${id}`, { params })
    return data
  } catch (error) {
    console.warn('API non disponibile, uso dati mock per categoria')
    return mockCategories.find(cat => cat.id === parseInt(id))
  }
}
