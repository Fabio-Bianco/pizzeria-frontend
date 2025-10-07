import api, { getApiStatus } from './apiClient'
import { 
  mockCategories, 
  mockPizzas, 
  mockAppetizers, 
  mockBeverages, 
  mockIngredients, 
  mockAllergens 
} from '../data/mockData'

// Flag per modalità sviluppo
const isDevelopment = import.meta.env.DEV
let backendAvailable = true

// Funzione per testare se il backend è disponibile
const checkBackendHealth = async () => {
  try {
    await api.get('/categories', { timeout: 2000 })
    backendAvailable = true
    return true
  } catch (error) {
    backendAvailable = false
    console.warn('[DEV MODE] Backend non disponibile, usando dati mock')
    return false
  }
}

// Wrapper generico per API calls con fallback
const apiCallWithFallback = async (apiCall, mockData, entityName) => {
  if (!isDevelopment) {
    // In produzione usa sempre le API reali
    return await apiCall()
  }

  try {
    // Tenta la chiamata API reale
    const result = await apiCall()
    backendAvailable = true
    return result
  } catch (error) {
    if (error.code === 'ECONNREFUSED' || 
        error.message?.includes('refused') || 
        error.code === 'NETWORK_ERROR' ||
        error.message?.includes('timeout')) {
      console.warn(`[DEV MODE] Backend non raggiungibile per ${entityName}, usando dati mock`)
      backendAvailable = false
      // Simula risposta API con delay
      await new Promise(resolve => setTimeout(resolve, 300))
      return { data: mockData }
    }
    throw error
  }
}

// Funzione per verificare se stiamo usando i mock
const isUsingMockData = () => {
  const apiStatus = getApiStatus()
  return isDevelopment && (!apiStatus.isHealthy || !backendAvailable)
}

export { 
  api as default, 
  apiCallWithFallback, 
  checkBackendHealth,
  backendAvailable,
  isUsingMockData,
  getApiStatus
}