import { useState, useRef, useEffect } from 'react'

export default function LazyImage({ 
  src, 
  alt, 
  className = '', 
  style = {}, 
  placeholder = '🍕',
  onLoad = () => {},
  onError = () => {},
  interactive = false
}) {
  const [isLoading, setIsLoading] = useState(true)
  const [hasError, setHasError] = useState(false)
  const [isInView, setIsInView] = useState(false)
  const imgRef = useRef(null)

  // Intersection Observer semplificato
  useEffect(() => {
    if (!imgRef.current) return

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsInView(true)
        observer.disconnect()
      }
    })

    observer.observe(imgRef.current)
    return () => observer.disconnect()
  }, [])

  const handleLoad = () => {
    setIsLoading(false)
    onLoad()
  }

  const handleError = () => {
    setIsLoading(false)
    setHasError(true)
    onError()
  }

  // Placeholder semplificato
  if (!src || !isInView || hasError) {
    return (
      <div 
        className={`d-flex align-items-center justify-content-center bg-light ${className} ${interactive ? 'interactive' : ''}`}
        style={{ ...style, minHeight: '100px' }}
        ref={imgRef}
      >
        <div className="text-center text-muted">
          <div style={{ fontSize: '2.5rem' }}>{placeholder}</div>
          {hasError && <small>Immagine non disponibile</small>}
        </div>
      </div>
    )
  }

  return (
    <div className="position-relative" style={{ overflow: 'hidden' }}>
      {isLoading && (
        <div className={`position-absolute w-100 h-100 d-flex align-items-center justify-content-center bg-light`}>
          <span className="text-muted" style={{ fontSize: '2rem' }}>{placeholder}</span>
        </div>
      )}
      <img
        src={src}
        alt={alt}
        className={`${className} ${interactive ? 'interactive' : ''}`}
        style={{
          ...style,
          opacity: isLoading ? 0 : 1,
          transition: 'opacity 0.3s ease'
        }}
        onLoad={handleLoad}
        onError={handleError}
        loading="lazy"
      />
    </div>
  )
}