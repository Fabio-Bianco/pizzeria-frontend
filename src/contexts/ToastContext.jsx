/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext } from 'react'
import { useToast } from '../hooks/useUIEnhancements'

const ToastContext = createContext()

export function ToastProvider({ children }) {
  const toastMethods = useToast()
  
  return (
    <ToastContext.Provider value={toastMethods}>
      {children}
    </ToastContext.Provider>
  )
}

export function useToastContext() {
  const context = useContext(ToastContext)
  if (!context) {
    throw new Error('useToastContext must be used within a ToastProvider')
  }
  return context
}