import axios from 'axios'

// Base URL: usa VITE_API_BASE_URL se presente, altrimenti fallback a same-origin /api/v1
const BASE_URL = (import.meta.env?.VITE_API_BASE_URL ?? '').replace(/\/$/, '')
const apiBase = BASE_URL || `${window.location.origin}/api`

// Laravel api.php usa prefix v1
const api = axios.create({
  baseURL: `${apiBase}/v1`,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
  withCredentials: false,
  timeout: 30000, // 30 secondi timeout temporaneo per debug
})

// Debug per monitorare le chiamate API e prevenire polling
let apiCallCount = {}
let lastSuccessfulCall = null
let lastFailedCall = null

const resetCallCount = () => { apiCallCount = {} }
setInterval(resetCallCount, 60000) // Reset ogni minuto

api.interceptors.request.use(
  (config) => {
    const url = config.url
    apiCallCount[url] = (apiCallCount[url] || 0) + 1
    
    // Log warning se troppe chiamate alla stessa API
    if (apiCallCount[url] > 5) {
      console.warn(`[API WARNING] Possibile polling su ${url} - chiamate: ${apiCallCount[url]}`)
    }
    
    if (import.meta.env.DEV) {
      console.log(`[API REQUEST] ${config.method?.toUpperCase()} ${url}`)
    }
    return config
  },
  (error) => Promise.reject(error)
)

api.interceptors.response.use(
  (res) => {
    lastSuccessfulCall = new Date()
    if (import.meta.env.DEV) {
      console.log(`[API SUCCESS] ${res.config.method?.toUpperCase()} ${res.config.url}`)
    }
    return res
  },
  (error) => {
    lastFailedCall = new Date()
    // normalizza errori
    const e = error?.response?.data || error
    // log diagnostico dettagliato
    const errorLog = {
      url: error?.config?.baseURL + error?.config?.url,
      method: error?.config?.method,
      status: error?.response?.status,
      data: e,
      fullError: error,
      response: error?.response,
    }
    try {
      console.error('[API ERROR]', JSON.stringify(errorLog, null, 2))
    } catch (jsonErr) {
      console.error('[API ERROR]', errorLog)
    }
    return Promise.reject(e)
  }
)

// Funzioni per monitorare lo stato delle API
export const getApiStatus = () => ({
  lastSuccessfulCall,
  lastFailedCall,
  isHealthy: lastSuccessfulCall && (!lastFailedCall || lastSuccessfulCall > lastFailedCall)
})

export default api
