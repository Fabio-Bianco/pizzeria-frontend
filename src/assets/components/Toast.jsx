import { createPortal } from 'react-dom'
import { useToastContext } from '../../contexts/ToastContext'

export function Toast({ toast, onRemove }) {
  const getIcon = () => {
    switch (toast.type) {
      case 'success': return '✅'
      case 'error': return '❌'
      case 'warning': return '⚠️'
      default: return 'ℹ️'
    }
  }

  const getColorScheme = () => {
    switch (toast.type) {
      case 'success': return { bg: '#d4edda', border: '#c3e6cb', text: '#155724' }
      case 'error': return { bg: '#f8d7da', border: '#f5c6cb', text: '#721c24' }
      case 'warning': return { bg: '#fff3cd', border: '#ffeaa7', text: '#856404' }
      default: return { bg: '#d1ecf1', border: '#bee5eb', text: '#0c5460' }
    }
  }

  const colors = getColorScheme()

  return (
    <div 
      className="toast-item"
      style={{
        '--bg-color': colors.bg,
        '--border-color': colors.border,
        '--text-color': colors.text
      }}
    >
      <div className="toast-content">
        <span className="toast-icon">{getIcon()}</span>
        <span className="toast-message">{toast.message}</span>
        <button 
          className="toast-close"
          onClick={() => onRemove(toast.id)}
          aria-label="Chiudi notifica"
        >
          ×
        </button>
      </div>
      
      <style jsx>{`
        .toast-item {
          background: var(--bg-color);
          border: 1px solid var(--border-color);
          color: var(--text-color);
          border-radius: 8px;
          margin-bottom: 0.5rem;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
          animation: toastSlideIn 0.3s cubic-bezier(0.68, -0.55, 0.265, 1.55);
          overflow: hidden;
          position: relative;
          max-width: 400px;
        }
        
        .toast-content {
          display: flex;
          align-items: center;
          padding: 0.75rem 1rem;
          gap: 0.5rem;
        }
        
        .toast-icon {
          font-size: 1.1rem;
          flex-shrink: 0;
        }
        
        .toast-message {
          flex: 1;
          font-size: 0.9rem;
          line-height: 1.4;
        }
        
        .toast-close {
          background: none;
          border: none;
          color: var(--text-color);
          font-size: 1.2rem;
          cursor: pointer;
          padding: 0;
          width: 20px;
          height: 20px;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 50%;
          opacity: 0.7;
          transition: opacity 0.2s ease;
        }
        
        .toast-close:hover {
          opacity: 1;
          background: rgba(0, 0, 0, 0.1);
        }
        
        @keyframes toastSlideIn {
          from {
            opacity: 0;
            transform: translateX(100%);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        
        .toast-item.removing {
          animation: toastSlideOut 0.3s ease-in-out;
        }
        
        @keyframes toastSlideOut {
          from {
            opacity: 1;
            transform: translateX(0);
          }
          to {
            opacity: 0;
            transform: translateX(100%);
          }
        }
      `}</style>
    </div>
  )
}

export function ToastContainer() {
  const { toasts, removeToast } = useToastContext()

  if (toasts.length === 0) return null

  const toastContainer = (
    <div className="toast-container">
      {toasts.map(toast => (
        <Toast 
          key={toast.id} 
          toast={toast} 
          onRemove={removeToast}
        />
      ))}
      
      <style jsx>{`
        .toast-container {
          position: fixed;
          top: 2rem;
          right: 2rem;
          z-index: 9999;
          pointer-events: none;
        }
        
        .toast-container > :global(.toast-item) {
          pointer-events: auto;
        }
        
        @media (max-width: 768px) {
          .toast-container {
            top: 1rem;
            right: 1rem;
            left: 1rem;
          }
        }
      `}</style>
    </div>
  )

  return createPortal(toastContainer, document.body)
}