import api from './apiClient'

export async function listBeverages(params = {}) {
  const { data } = await api.get('/beverages', { params })
  return data
}

export async function getBeverage(id, params = {}) {
  const { data } = await api.get(`/beverages/${id}`, { params })
  return data
}
