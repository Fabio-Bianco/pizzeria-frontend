import { useState, useEffect } from 'react'

export function LoadingSpinner({ size = 'medium', color = '#efca1a', message = null }) {
  const sizes = {
    small: '20px',
    medium: '40px',
    large: '60px'
  }

  return (
    <div className="loading-spinner-container">
      <div 
        className="loading-spinner"
        style={{ 
          '--size': sizes[size], 
          '--color': color 
        }}
      >
        <div className="spinner-inner"></div>
      </div>
      {message && <p className="loading-message">{message}</p>}
      
      <style jsx>{`
        .loading-spinner-container {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 1rem;
        }
        
        .loading-spinner {
          width: var(--size);
          height: var(--size);
          position: relative;
        }
        
        .spinner-inner {
          width: 100%;
          height: 100%;
          border: 3px solid #f3f4f6;
          border-top: 3px solid var(--color);
          border-radius: 50%;
          animation: spinnerRotate 1s ease-in-out infinite;
        }
        
        @keyframes spinnerRotate {
          0% {
            transform: rotate(0deg);
          }
          100% {
            transform: rotate(360deg);
          }
        }
        
        .loading-message {
          color: #6c757d;
          font-size: 0.9rem;
          margin: 0;
          text-align: center;
        }
      `}</style>
    </div>
  )
}

export function PulseLoader({ count = 3, color = '#efca1a', size = '12px' }) {
  return (
    <div className="pulse-loader">
      {Array.from({ length: count }).map((_, i) => (
        <div 
          key={i}
          className="pulse-dot"
          style={{ 
            '--delay': `${i * 0.15}s`,
            '--color': color,
            '--size': size
          }}
        />
      ))}
      
      <style jsx>{`
        .pulse-loader {
          display: flex;
          align-items: center;
          gap: 0.25rem;
        }
        
        .pulse-dot {
          width: var(--size);
          height: var(--size);
          background: var(--color);
          border-radius: 50%;
          animation: pulseDot 1.4s ease-in-out infinite both;
          animation-delay: var(--delay);
        }
        
        @keyframes pulseDot {
          0%, 80%, 100% {
            transform: scale(0.6);
            opacity: 0.5;
          }
          40% {
            transform: scale(1);
            opacity: 1;
          }
        }
      `}</style>
    </div>
  )
}

export function ProgressiveLoader({ progress = 0, message = null, showPercentage = true }) {
  const [displayProgress, setDisplayProgress] = useState(0)

  useEffect(() => {
    const timer = setTimeout(() => {
      setDisplayProgress(progress)
    }, 100)
    
    return () => clearTimeout(timer)
  }, [progress])

  return (
    <div className="progressive-loader">
      <div className="progress-bar-container">
        <div 
          className="progress-bar"
          style={{ width: `${displayProgress}%` }}
        />
      </div>
      
      <div className="progress-info">
        {message && <span className="progress-message">{message}</span>}
        {showPercentage && <span className="progress-percentage">{Math.round(displayProgress)}%</span>}
      </div>
      
      <style jsx>{`
        .progressive-loader {
          width: 100%;
          max-width: 300px;
        }
        
        .progress-bar-container {
          width: 100%;
          height: 6px;
          background: #f3f4f6;
          border-radius: 3px;
          overflow: hidden;
          margin-bottom: 0.5rem;
        }
        
        .progress-bar {
          height: 100%;
          background: linear-gradient(90deg, #efca1a 0%, #e5ad3e 100%);
          border-radius: 3px;
          transition: width 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          position: relative;
          overflow: hidden;
        }
        
        .progress-bar::after {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: linear-gradient(
            90deg,
            transparent 0%,
            rgba(255, 255, 255, 0.4) 50%,
            transparent 100%
          );
          animation: progressShimmer 2s ease-in-out infinite;
        }
        
        @keyframes progressShimmer {
          0% {
            transform: translateX(-100%);
          }
          100% {
            transform: translateX(100%);
          }
        }
        
        .progress-info {
          display: flex;
          justify-content: space-between;
          align-items: center;
          font-size: 0.8rem;
          color: #6c757d;
        }
        
        .progress-message {
          flex: 1;
        }
        
        .progress-percentage {
          font-weight: 500;
          color: #495057;
        }
      `}</style>
    </div>
  )
}

export function SkeletonPulse({ width = '100%', height = '1rem', borderRadius = '4px', className = '' }) {
  return (
    <div 
      className={`skeleton-pulse ${className}`}
      style={{ width, height, borderRadius }}
    >
      <style jsx>{`
        .skeleton-pulse {
          background: linear-gradient(
            90deg,
            #f3f4f6 25%,
            #e5e7eb 50%,
            #f3f4f6 75%
          );
          background-size: 200% 100%;
          animation: skeletonWave 1.5s ease-in-out infinite;
        }
        
        @keyframes skeletonWave {
          0% {
            background-position: 200% 0;
          }
          100% {
            background-position: -200% 0;
          }
        }
      `}</style>
    </div>
  )
}

export function AdaptiveLoader({ 
  isLoading, 
  hasError, 
  isEmpty, 
  children,
  loadingComponent = <LoadingSpinner message="Caricamento..." />,
  errorComponent = null,
  emptyComponent = null
}) {
  if (hasError && errorComponent) {
    return errorComponent
  }
  
  if (isLoading) {
    return (
      <div className="adaptive-loader-container">
        {loadingComponent}
      </div>
    )
  }
  
  if (isEmpty && emptyComponent) {
    return emptyComponent
  }
  
  return children
}