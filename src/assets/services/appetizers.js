import api from './apiClient'
import { mockAppetizers } from './mockData'

export async function listAppetizers(params = {}) {
  try {
    // Includi gli allergeni per default
    const defaultParams = { with: 'allergens', ...params }
    const { data } = await api.get('/appetizers', { params: defaultParams })
    return data
  } catch (error) {
    console.warn('API non disponibile, uso dati mock per antipasti')
    return mockAppetizers
  }
}

export async function getAppetizer(id, params = {}) {
  try {
    // Includi gli allergeni per default  
    const defaultParams = { with: 'allergens', ...params }
    const { data } = await api.get(`/appetizers/${id}`, { params: defaultParams })
    return data
  } catch (error) {
    console.warn('API non disponibile, uso dati mock per antipasto')
    return mockAppetizers.find(app => app.id === parseInt(id))
  }
}