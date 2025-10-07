import api from './apiClient'

export async function listAllergens(params = {}) {
  try {
    const { data } = await api.get('/allergens', { params })
    return data
  } catch (error) {
    console.error('Errore nel caricamento allergeni:', error)
    throw error
  }
}

export async function getAllergen(id, params = {}) {
  try {
    const { data } = await api.get(`/allergens/${id}`, { params })
    return data
  } catch (error) {
    console.error(`Errore nel caricamento allergene ${id}:`, error)
    throw error
  }
}
