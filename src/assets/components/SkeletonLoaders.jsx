export function CardSkeleton({ type = 'pizza' }) {
  const getIcon = () => {
    switch(type) {
      case 'appetizer': return '🥗'
      case 'beverage': return '🥤'
      default: return '🍕'
    }
  }

  return (
    <div className="card shadow-sm h-100">
      {/* Image skeleton */}
      <div className="position-relative" style={{ height: '200px', overflow: 'hidden', borderRadius: '20px 20px 0 0' }}>
        <div className="loading-skeleton position-absolute w-100 h-100" />
        <div className="position-absolute top-50 start-50 translate-middle text-muted" style={{ fontSize: '3rem', zIndex: 1 }}>
          {getIcon()}
        </div>
      </div>
      
      <div className="card-body">
        {/* Title and price skeleton */}
        <div className="d-flex justify-content-between align-items-start mb-3">
          <div className="loading-skeleton rounded" style={{ width: '70%', height: '1.5rem' }} />
          <div className="loading-skeleton rounded" style={{ width: '20%', height: '1.5rem' }} />
        </div>
        
        {/* Description skeleton */}
        <div className="mb-3">
          <div className="loading-skeleton rounded mb-2" style={{ width: '100%', height: '1rem' }} />
          <div className="loading-skeleton rounded mb-2" style={{ width: '80%', height: '1rem' }} />
          <div className="loading-skeleton rounded" style={{ width: '60%', height: '1rem' }} />
        </div>
        
        {/* Ingredients skeleton */}
        <div className="mb-3">
          <div className="loading-skeleton rounded mb-2" style={{ width: '40%', height: '0.9rem' }} />
          <div className="loading-skeleton rounded" style={{ width: '90%', height: '0.9rem' }} />
        </div>
        
        {/* Allergens skeleton */}
        <div className="mb-3">
          <div className="loading-skeleton rounded mb-2" style={{ width: '30%', height: '0.8rem' }} />
          <div className="d-flex gap-2">
            <div className="loading-skeleton rounded" style={{ width: '60px', height: '1.2rem' }} />
            <div className="loading-skeleton rounded" style={{ width: '50px', height: '1.2rem' }} />
            <div className="loading-skeleton rounded" style={{ width: '70px', height: '1.2rem' }} />
          </div>
        </div>
        
        {/* Category skeleton */}
        <div className="mt-auto">
          <div className="loading-skeleton rounded" style={{ width: '35%', height: '1.1rem' }} />
        </div>
      </div>
    </div>
  )
}

export function SearchSkeleton() {
  return (
    <div className="search-filters-container mb-4">
      {/* Search bar skeleton */}
      <div className="mb-3">
        <div className="loading-skeleton rounded-pill" style={{ width: '100%', height: '3rem' }} />
      </div>
      
      {/* Filter button skeleton */}
      <div className="d-flex justify-content-between align-items-center mb-3">
        <div className="loading-skeleton rounded" style={{ width: '120px', height: '2.5rem' }} />
        <div className="loading-skeleton rounded" style={{ width: '100px', height: '2rem' }} />
      </div>
    </div>
  )
}

export function SectionHeaderSkeleton() {
  return (
    <div className="section-header">
      <div className="loading-skeleton rounded" style={{ width: '250px', height: '2rem' }} />
      <div className="loading-skeleton rounded ms-3" style={{ width: '50px', height: '1.5rem' }} />
    </div>
  )
}

export function NavbarSkeleton() {
  return (
    <nav className="navbar navbar-expand-lg mb-4" style={{ 
      background: 'linear-gradient(135deg, #f8f9fa, #e9ecef)',
      borderRadius: '15px',
      padding: '1rem 0'
    }}>
      <div className="container-fluid">
        <div className="loading-skeleton rounded" style={{ width: '200px', height: '2rem' }} />
        <div className="d-flex gap-3">
          <div className="loading-skeleton rounded" style={{ width: '80px', height: '1.5rem' }} />
          <div className="loading-skeleton rounded" style={{ width: '120px', height: '1.5rem' }} />
          <div className="loading-skeleton rounded" style={{ width: '90px', height: '1.5rem' }} />
        </div>
      </div>
    </nav>
  )
}

export function HeroSkeleton() {
  return (
    <div className="hero-section mb-5" style={{ padding: '3rem 0' }}>
      <div className="text-center">
        <div className="loading-skeleton rounded mx-auto mb-3" style={{ width: '60%', height: '3rem' }} />
        <div className="loading-skeleton rounded mx-auto" style={{ width: '40%', height: '1.5rem' }} />
      </div>
    </div>
  )
}

export function GridSkeleton({ type = 'pizza', count = 6 }) {
  return (
    <div className="row g-4">
      {Array.from({ length: count }).map((_, index) => (
        <div key={index} className="col-12 col-md-6 col-lg-4">
          <CardSkeleton type={type} />
        </div>
      ))}
    </div>
  )
}

export function FullPageSkeleton() {
  return (
    <div className="container py-4">
      <NavbarSkeleton />
      <HeroSkeleton />
      <SearchSkeleton />
      <SectionHeaderSkeleton />
      <GridSkeleton count={6} />
    </div>
  )
}