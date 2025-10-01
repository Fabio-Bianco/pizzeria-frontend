import api from './apiClient'

export async function listAllergens(params = {}) {
  const { data } = await api.get('/allergens', { params })
  return data
}

export async function getAllergen(id, params = {}) {
  const { data } = await api.get(`/allergens/${id}`, { params })
  return data
}
