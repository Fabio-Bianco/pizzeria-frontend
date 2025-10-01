import api from './apiClient'

export async function listIngredients(params = {}) {
  const { data } = await api.get('/ingredients', { params })
  return data
}

export async function getIngredient(id, params = {}) {
  const { data } = await api.get(`/ingredients/${id}`, { params })
  return data
}
