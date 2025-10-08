import api from './apiClient'
import { mockPizzas } from './mockData'

export async function listPizzas(params = {}) {
  try {
    // Includi gli allergeni per default
    const defaultParams = { with: 'allergens', ...params }
    const { data } = await api.get('/pizzas', { params: defaultParams })
    return data
  } catch (error) {
    console.warn('API non disponibile, uso dati mock per pizze')
    return mockPizzas
  }
}

export async function getPizza(id, params = {}) {
  try {
    // Includi gli allergeni per default
    const defaultParams = { with: 'allergens', ...params }
    const { data } = await api.get(`/pizzas/${id}`, { params: defaultParams })
    return data
  } catch (error) {
    console.warn('API non disponibile, uso dati mock per pizza')
    return mockPizzas.find(pizza => pizza.id === parseInt(id))
  }
}
