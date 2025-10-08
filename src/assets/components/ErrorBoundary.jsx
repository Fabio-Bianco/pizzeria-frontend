import { Component } from 'react'

class ErrorBoundary extends Component {
  constructor(props) {
    super(props)
    this.state = { hasError: false, error: null, errorInfo: null }
  }

  static getDerivedStateFromError() {
    return { hasError: true }
  }

  componentDidCatch(error, errorInfo) {
    this.setState({
      error: error,
      errorInfo: errorInfo
    })
    
    // Log error for debugging
    console.error('ErrorBoundary caught an error:', error, errorInfo)
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="error-boundary-container">
          <div className="error-boundary-content">
            <div className="error-icon">😕</div>
            <h2 className="error-title">Oops! Qualcosa è andato storto</h2>
            <p className="error-message">
              Si è verificato un errore inaspettato. Prova a ricaricare la pagina.
            </p>
            
            <div className="error-actions">
              <button 
                className="error-button primary"
                onClick={() => window.location.reload()}
              >
                🔄 Ricarica Pagina
              </button>
              
              <button 
                className="error-button secondary"
                onClick={() => this.setState({ hasError: false })}
              >
                ↩️ Riprova
              </button>
            </div>

            {import.meta.env.DEV && (
              <details className="error-details">
                <summary>Dettagli Errore (sviluppo)</summary>
                <pre className="error-stack">
                  {this.state.error && this.state.error.toString()}
                  <br />
                  {this.state.errorInfo && this.state.errorInfo.componentStack}
                </pre>
              </details>
            )}
          </div>
          
          <style jsx>{`
            .error-boundary-container {
              display: flex;
              align-items: center;
              justify-content: center;
              min-height: 400px;
              padding: 2rem;
              background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
              border-radius: 12px;
              margin: 2rem 0;
            }
            
            .error-boundary-content {
              text-align: center;
              max-width: 500px;
              background: white;
              padding: 2.5rem;
              border-radius: 16px;
              box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
              border: 1px solid #e9ecef;
            }
            
            .error-icon {
              font-size: 4rem;
              margin-bottom: 1rem;
              animation: errorBounce 2s ease-in-out infinite;
            }
            
            @keyframes errorBounce {
              0%, 20%, 50%, 80%, 100% {
                transform: translateY(0);
              }
              40% {
                transform: translateY(-10px);
              }
              60% {
                transform: translateY(-5px);
              }
            }
            
            .error-title {
              color: #495057;
              font-size: 1.5rem;
              font-weight: 600;
              margin-bottom: 1rem;
            }
            
            .error-message {
              color: #6c757d;
              font-size: 1rem;
              line-height: 1.5;
              margin-bottom: 2rem;
            }
            
            .error-actions {
              display: flex;
              gap: 1rem;
              justify-content: center;
              flex-wrap: wrap;
            }
            
            .error-button {
              padding: 0.75rem 1.5rem;
              border: none;
              border-radius: 8px;
              font-weight: 500;
              cursor: pointer;
              transition: all 0.2s ease;
              font-size: 0.95rem;
            }
            
            .error-button.primary {
              background: linear-gradient(135deg, #efca1a 0%, #e5ad3e 100%);
              color: white;
            }
            
            .error-button.primary:hover {
              transform: translateY(-2px);
              box-shadow: 0 4px 12px rgba(239, 202, 26, 0.3);
            }
            
            .error-button.secondary {
              background: #f8f9fa;
              color: #495057;
              border: 1px solid #dee2e6;
            }
            
            .error-button.secondary:hover {
              background: #e9ecef;
              transform: translateY(-1px);
            }
            
            .error-details {
              margin-top: 2rem;
              text-align: left;
            }
            
            .error-details summary {
              cursor: pointer;
              color: #6c757d;
              font-weight: 500;
              margin-bottom: 0.5rem;
            }
            
            .error-stack {
              background: #f8f9fa;
              border: 1px solid #dee2e6;
              border-radius: 4px;
              padding: 1rem;
              font-size: 0.8rem;
              color: #495057;
              overflow-x: auto;
              white-space: pre-wrap;
            }
          `}</style>
        </div>
      )
    }

    return this.props.children
  }
}

export default ErrorBoundary