import api from './apiClient'

export async function listDesserts(params = {}) {
  // Includi gli allergeni per default
  const defaultParams = { with: 'allergens', ...params }
  const { data } = await api.get('/desserts', { params: defaultParams })
  return data
}

export async function getDessert(id, params = {}) {
  // Includi gli allergeni per default
  const defaultParams = { with: 'allergens', ...params }
  const { data } = await api.get(`/desserts/${id}`, { params: defaultParams })
  return data
}