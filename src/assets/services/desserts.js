import api from './apiClient'

export async function listDesserts(params = {}) {
  const { data } = await api.get('/desserts', { params })
  return data
}

export async function getDessert(id, params = {}) {
  const { data } = await api.get(`/desserts/${id}`, { params })
  return data
}