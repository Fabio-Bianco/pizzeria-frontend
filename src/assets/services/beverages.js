import api from './apiClient'
import { mockBeverages } from './mockData'

export async function listBeverages(params = {}) {
  try {
    // Includi gli allergeni per default
    const defaultParams = { with: 'allergens', ...params }
    const { data } = await api.get('/beverages', { params: defaultParams })
    return data
  } catch (error) {
    console.warn('API non disponibile, uso dati mock per bevande')
    return mockBeverages
  }
}

export async function getBeverage(id, params = {}) {
  try {
    // Includi gli allergeni per default
    const defaultParams = { with: 'allergens', ...params }
    const { data } = await api.get(`/beverages/${id}`, { params: defaultParams })
    return data
  } catch (error) {
    console.warn('API non disponibile, uso dati mock per bevanda')
    return mockBeverages.find(bev => bev.id === parseInt(id))
  }
}
