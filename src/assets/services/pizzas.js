import api from './apiClient'

export async function listPizzas(params = {}) {
  const { data } = await api.get('/pizzas', { params })
  return data
}

export async function getPizza(id, params = {}) {
  const { data } = await api.get(`/pizzas/${id}`, { params })
  return data
}
