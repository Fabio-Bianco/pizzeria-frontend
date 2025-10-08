import api from './apiClient'

export async function listBeverages(params = {}) {
  // Includi gli allergeni per default
  const defaultParams = { with: 'allergens', ...params }
  const { data } = await api.get('/beverages', { params: defaultParams })
  return data
}
export async function getBeverage(id, params = {}) {
  // Includi gli allergeni per default
  const defaultParams = { with: 'allergens', ...params }
  const { data } = await api.get(`/beverages/${id}`, { params: defaultParams })
  return data
}
