import { useState, useRef, useEffect } from 'react'

export default function LazyImage({ 
  src, 
  alt, 
  className = '', 
  style = {}, 
  placeholder = '🍕',
  fallbackSrc = null,
  onLoad = () => {},
  onError = () => {},
  interactive = false
}) {
  const [isLoading, setIsLoading] = useState(true)
  const [hasError, setHasError] = useState(false)
  const [isInView, setIsInView] = useState(false)
  const imgRef = useRef(null)
  const observerRef = useRef(null)

  // Intersection Observer per lazy loading
  useEffect(() => {
    if (!imgRef.current) return

    observerRef.current = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true)
          observerRef.current?.disconnect()
        }
      },
      { 
        threshold: 0.1,
        rootMargin: '50px' // Inizia a caricare 50px prima che l'immagine entri in vista
      }
    )

    observerRef.current.observe(imgRef.current)

    return () => observerRef.current?.disconnect()
  }, [])

  const handleImageLoad = () => {
    setIsLoading(false)
    onLoad()
  }

  const handleImageError = () => {
    setIsLoading(false)
    setHasError(true)
    onError()
  }

  const renderPlaceholder = () => (
    <div 
      className={`d-flex align-items-center justify-content-center bg-light ${className}`}
      style={{
        ...style,
        position: 'relative',
        overflow: 'hidden'
      }}
      ref={imgRef}
    >
      {isLoading && !hasError && (
        <>
          {/* Skeleton loading animation */}
          <div 
            className="loading-skeleton position-absolute w-100 h-100"
            style={{ top: 0, left: 0 }}
          />
          {/* Placeholder icon */}
          <span className="text-muted position-relative" style={{ fontSize: '3rem', zIndex: 1 }}>
            {placeholder}
          </span>
        </>
      )}
      {hasError && (
        <div className="text-center text-muted p-3">
          <div style={{ fontSize: '2.5rem' }}>{placeholder}</div>
          <small>Immagine non disponibile</small>
        </div>
      )}
    </div>
  )

  // Se non abbiamo src o non siamo in vista, mostra placeholder
  if (!src || !isInView) {
    return renderPlaceholder()
  }

  return (
    <div 
      className="position-relative"
      style={{ overflow: 'hidden' }}
      ref={imgRef}
    >
      {/* Loading placeholder mentre l'immagine si carica */}
      {isLoading && (
        <div 
          className={`position-absolute top-0 start-0 d-flex align-items-center justify-content-center bg-light ${className}`}
          style={{
            ...style,
            zIndex: 1
          }}
        >
          <div 
            className="loading-skeleton position-absolute w-100 h-100"
            style={{ top: 0, left: 0 }}
          />
          <span className="text-muted position-relative" style={{ fontSize: '3rem', zIndex: 1 }}>
            {placeholder}
          </span>
        </div>
      )}
      
      {/* Immagine effettiva */}
      {!hasError && (
        <img
          src={src}
          alt={alt}
          className={`${className} ${interactive ? 'interactive' : ''}`}
          style={{
            ...style,
            opacity: isLoading ? 0 : 1,
            transition: 'opacity 0.3s ease-in-out'
          }}
          onLoad={handleImageLoad}
          onError={handleImageError}
          loading="lazy"
        />
      )}
      
      {/* Fallback in caso di errore */}
      {hasError && fallbackSrc && (
        <img
          src={fallbackSrc}
          alt={alt}
          className={className}
          style={style}
          onError={() => setHasError(true)}
        />
      )}
      
      {/* Placeholder finale se tutto fallisce */}
      {hasError && !fallbackSrc && renderPlaceholder()}
    </div>
  )
}