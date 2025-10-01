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
})

api.interceptors.response.use(
  (res) => res,
  (error) => {
    // normalizza errori
    const e = error?.response?.data || error
    // log diagnostico
    console.error('[API ERROR]', {
      url: error?.config?.baseURL + error?.config?.url,
      method: error?.config?.method,
      status: error?.response?.status,
      data: e,
    })
    return Promise.reject(e)
  }
)

export default api
