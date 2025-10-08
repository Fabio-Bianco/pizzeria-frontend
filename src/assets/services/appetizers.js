import api from './apiClient'

export async function listAppetizers(params = {}) {
  // Includi gli allergeni per default
  const defaultParams = { with: 'allergens', ...params }
  const { data } = await api.get('/appetizers', { params: defaultParams })
  return data
}

export async function getAppetizer(id, params = {}) {
  // Includi gli allergeni per default
  const defaultParams = { with: 'allergens', ...params }
  const { data } = await api.get(`/appetizers/${id}`, { params: defaultParams })
  return data
}