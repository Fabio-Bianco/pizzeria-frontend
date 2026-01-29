import axios from 'axios'

// Base URL: usa VITE_API_BASE_URL se presente, altrimenti fallback a same-origin
const BASE_URL = (import.meta.env?.VITE_API_BASE_URL ?? '').replace(/\/$/, '')
const apiBase = BASE_URL || `${window.location.origin}`

// Le API pubbliche della vetrina sono in routes/api.php con prefisso /api/v1
const api = axios.create({
  baseURL: `${apiBase}/api/v1`,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
  withCredentials: false,
  timeout: 15000, // 15 secondi timeout per connessioni lente
})

api.interceptors.request.use(
  (config) => config,
  (error) => Promise.reject(error)
)

api.interceptors.response.use(
  (res) => res,
  (error) => Promise.reject(error?.response?.data || error)
)

export default api
