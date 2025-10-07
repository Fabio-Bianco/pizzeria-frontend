import api from './apiClient'

export async function listPizzas(params = {}) {
  try {
    // Includi gli allergeni per default
    const defaultParams = { with: 'allergens', ...params }
    const { data } = await api.get('/pizzas', { params: defaultParams })
    return data
  } catch (error) {
    console.error('Errore nel caricamento pizze:', error)
    throw error
  }
}

export async function getPizza(id, params = {}) {
  try {
    // Includi gli allergeni per default
    const defaultParams = { with: 'allergens', ...params }
    const { data } = await api.get(`/pizzas/${id}`, { params: defaultParams })
    return data
  } catch (error) {
    console.error(`Errore nel caricamento pizza ${id}:`, error)
    throw error
  }
}
