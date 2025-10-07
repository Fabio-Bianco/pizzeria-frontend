import api from './apiClient'

export async function listPizzas(params = {}) {
  // Includi gli allergeni per default
  const defaultParams = { with: 'allergens', ...params }
  const { data } = await api.get('/pizzas', { params: defaultParams })
  return data
}

export async function getPizza(id, params = {}) {
  // Includi gli allergeni per default
  const defaultParams = { with: 'allergens', ...params }
  const { data } = await api.get(`/pizzas/${id}`, { params: defaultParams })
  return data
}
