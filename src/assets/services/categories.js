
import api from './apiClient'

export async function listCategories(params = {}) {
  const { data } = await api.get('/categories', { params })
  return data
}

export async function getCategory(id, params = {}) {
  const { data } = await api.get(`/categories/${id}`, { params })
  return data
}

