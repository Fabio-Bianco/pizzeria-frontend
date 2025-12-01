import api from './apiClient'

export async function listAppetizers(params = {}) {
  const { data } = await api.get('/appetizers', { params })
  return data
}

export async function getAppetizer(id, params = {}) {
  const { data } = await api.get(`/appetizers/${id}`, { params })
  return data
}