import React, { useState, useRef, useEffect, useCallback } from 'react'

/* ===============================================
   🧭 NAVIGATION COMPONENTS - INTUITIVE UX
   =============================================== */

// Advanced Search Bar Component
function AdvancedSearchBar({
  value = '',
  onSearch,
  onFilter,
  onSort,
  placeholder = 'Cerca nel menu...',
  filters = [],
  sortOptions = [],
  showFilters = true,
  showSort = true,
  className = ''
}) {
  const [isExpanded, setIsExpanded] = useState(false)
  const [searchValue, setSearchValue] = useState(value)
  const [activeFilters, setActiveFilters] = useState([])
  const [sortBy, setSortBy] = useState('')
  const searchRef = useRef(null)

  useEffect(() => {
    setSearchValue(value)
  }, [value])

  const handleSearchChange = (e) => {
    const newValue = e.target.value
    setSearchValue(newValue)
    onSearch?.(newValue)
  }

  const handleClearSearch = () => {
    setSearchValue('')
    onSearch?.('')
    searchRef.current?.focus()
  }

  const handleFilterToggle = (filterId) => {
    const newFilters = activeFilters.includes(filterId)
      ? activeFilters.filter(id => id !== filterId)
      : [...activeFilters, filterId]
    
    setActiveFilters(newFilters)
    onFilter?.(newFilters)
  }

  const handleSortChange = (sortValue) => {
    setSortBy(sortValue)
    onSort?.(sortValue)
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Escape') {
      handleClearSearch()
    }
    if (e.key === 'Enter' && e.ctrlKey) {
      setIsExpanded(!isExpanded)
    }
  }

  return (
    <div className={`advanced-search ${className}`}>
      {/* Main Search Input */}
      <div className="search-input-container">
        <div className="search-input-wrapper">
          <SearchIcon className="search-icon" aria-hidden="true" />
          <input
            ref={searchRef}
            type="search"
            value={searchValue}
            onChange={handleSearchChange}
            onKeyDown={handleKeyDown}
            placeholder={placeholder}
            className="search-input"
            aria-label="Campo di ricerca nel menu"
            aria-describedby="search-help"
            autoComplete="off"
          />
          
          {searchValue && (
            <button
              onClick={handleClearSearch}
              className="search-clear-btn"
              aria-label="Cancella ricerca"
              type="button"
            >
              <XIcon size={16} />
            </button>
          )}
        </div>

        {/* Expand/Collapse Filters Button */}
        {(showFilters || showSort) && (
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="search-expand-btn"
            aria-label={isExpanded ? "Nascondi filtri" : "Mostra filtri"}
            aria-expanded={isExpanded}
            type="button"
          >
            <FilterIcon size={20} />
            {activeFilters.length > 0 && (
              <span className="filter-badge" aria-label={`${activeFilters.length} filtri attivi`}>
                {activeFilters.length}
              </span>
            )}
          </button>
        )}
      </div>

      {/* Help Text */}
      <div id="search-help" className="search-help sr-only">
        Cerca per nome piatto, ingredienti o categoria. Premi Ctrl+Invio per i filtri avanzati.
      </div>

      {/* Advanced Filters Panel */}
      {isExpanded && (showFilters || showSort) && (
        <div className="search-filters-panel" role="region" aria-label="Filtri di ricerca">
          
          {/* Filters Section */}
          {showFilters && filters.length > 0 && (
            <div className="filters-section">
              <h3 className="filters-title">Filtra per:</h3>
              <div className="filters-grid">
                {filters.map((filter) => (
                  <label key={filter.id} className="filter-checkbox">
                    <input
                      type="checkbox"
                      checked={activeFilters.includes(filter.id)}
                      onChange={() => handleFilterToggle(filter.id)}
                      className="filter-input"
                    />
                    <span className="filter-label">
                      {filter.icon && (
                        <span className="filter-icon" aria-hidden="true">
                          {filter.icon}
                        </span>
                      )}
                      {filter.label}
                      {filter.count !== undefined && (
                        <span className="filter-count">({filter.count})</span>
                      )}
                    </span>
                  </label>
                ))}
              </div>
            </div>
          )}

          {/* Sort Section */}
          {showSort && sortOptions.length > 0 && (
            <div className="sort-section">
              <h3 className="sort-title">Ordina per:</h3>
              <div className="sort-options">
                {sortOptions.map((option) => (
                  <button
                    key={option.value}
                    onClick={() => handleSortChange(option.value)}
                    className={`sort-option ${sortBy === option.value ? 'sort-option--active' : ''}`}
                    aria-pressed={sortBy === option.value}
                  >
                    {option.label}
                    {option.icon && (
                      <span className="sort-icon" aria-hidden="true">
                        {option.icon}
                      </span>
                    )}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Quick Actions */}
          <div className="search-actions">
            <button
              onClick={() => {
                setActiveFilters([])
                setSortBy('')
                onFilter?.([])
                onSort?.('')
              }}
              className="action-btn action-btn--secondary"
              type="button"
            >
              Reset filtri
            </button>
            <button
              onClick={() => setIsExpanded(false)}
              className="action-btn action-btn--primary"
              type="button"
            >
              Applica
            </button>
          </div>
        </div>
      )}

      {/* Active Filters Display */}
      {activeFilters.length > 0 && (
        <div className="active-filters" aria-label="Filtri attivi">
          {activeFilters.map((filterId) => {
            const filter = filters.find(f => f.id === filterId)
            return filter ? (
              <span key={filterId} className="active-filter-tag">
                {filter.label}
                <button
                  onClick={() => handleFilterToggle(filterId)}
                  className="filter-remove-btn"
                  aria-label={`Rimuovi filtro ${filter.label}`}
                  type="button"
                >
                  <XIcon size={12} />
                </button>
              </span>
            ) : null
          })}
        </div>
      )}
    </div>
  )
}

// Enhanced Breadcrumb Component
function EnhancedBreadcrumb({
  items = [],
  maxItems = 5,
  separator = '›',
  showHome = true,
  homeLabel = 'Menu',
  homeHref = '/',
  className = ''
}) {
  const [isCollapsed, setIsCollapsed] = useState(false)

  useEffect(() => {
    setIsCollapsed(items.length > maxItems)
  }, [items.length, maxItems])

  const displayItems = isCollapsed 
    ? [
        ...(showHome ? [{ label: homeLabel, href: homeHref }] : []),
        { label: '...', isEllipsis: true },
        ...items.slice(-2)
      ]
    : [
        ...(showHome ? [{ label: homeLabel, href: homeHref }] : []),
        ...items
      ]

  return (
    <nav aria-label="Percorso di navigazione" className={`enhanced-breadcrumb ${className}`}>
      <ol className="breadcrumb-list">
        {displayItems.map((item, index) => (
          <li key={index} className="breadcrumb-item">
            {index > 0 && (
              <span className="breadcrumb-separator" aria-hidden="true">
                {separator}
              </span>
            )}
            
            {item.isEllipsis ? (
              <button
                onClick={() => setIsCollapsed(false)}
                className="breadcrumb-expand"
                aria-label="Mostra tutti i percorsi"
                type="button"
              >
                <span aria-hidden="true">...</span>
              </button>
            ) : item.href && index < displayItems.length - 1 ? (
              <a href={item.href} className="breadcrumb-link">
                {item.icon && (
                  <span className="breadcrumb-icon" aria-hidden="true">
                    {item.icon}
                  </span>
                )}
                {item.label}
              </a>
            ) : (
              <span 
                className="breadcrumb-current" 
                aria-current={index === displayItems.length - 1 ? "page" : undefined}
              >
                {item.icon && (
                  <span className="breadcrumb-icon" aria-hidden="true">
                    {item.icon}
                  </span>
                )}
                {item.label}
              </span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  )
}

// Back Navigation Component
function BackNavigation({
  label = 'Indietro',
  href,
  onClick,
  showKeyboardShortcut = true,
  className = ''
}) {
  const handleClick = useCallback((e) => {
    if (onClick) {
      e.preventDefault()
      onClick()
    } else if (!href) {
      e.preventDefault()
      window.history.back()
    }
  }, [onClick, href])

  const handleKeyDown = useCallback((e) => {
    if (e.altKey && e.key === 'ArrowLeft') {
      e.preventDefault()
      handleClick(e)
    }
  }, [handleClick])

  useEffect(() => {
    if (showKeyboardShortcut) {
      document.addEventListener('keydown', handleKeyDown)
      return () => document.removeEventListener('keydown', handleKeyDown)
    }
  }, [showKeyboardShortcut, handleClick, handleKeyDown])

  return (
    <div className={`back-navigation ${className}`}>
      <a
        href={href || '#'}
        onClick={handleClick}
        className="back-nav-link"
        aria-label={`${label}${showKeyboardShortcut ? ' (Alt + ←)' : ''}`}
      >
        <ArrowLeftIcon className="back-nav-icon" aria-hidden="true" />
        <span className="back-nav-text">{label}</span>
      </a>
      
      {showKeyboardShortcut && (
        <span className="back-nav-shortcut sr-only">
          Scorciatoia da tastiera: Alt + Freccia sinistra
        </span>
      )}
    </div>
  )
}

// Quick Access Navigation
function QuickAccessNav({
  items = [],
  orientation = 'horizontal', // 'horizontal' | 'vertical'
  showLabels = true,
  showBadges = true,
  className = ''
}) {
  const [activeItem, setActiveItem] = useState(null)

  return (
    <nav 
      aria-label="Accesso rapido" 
      className={`quick-access-nav quick-access-nav--${orientation} ${className}`}
    >
      <ul className="quick-access-list">
        {items.map((item, index) => (
          <li key={item.id || index} className="quick-access-item">
            <a
              href={item.href}
              onClick={item.onClick}
              className={`quick-access-link ${activeItem === item.id ? 'quick-access-link--active' : ''}`}
              aria-label={item.ariaLabel || item.label}
              aria-describedby={item.description ? `qa-desc-${item.id}` : undefined}
              onFocus={() => setActiveItem(item.id)}
              onBlur={() => setActiveItem(null)}
            >
              <span className="quick-access-icon" aria-hidden="true">
                {item.icon}
              </span>
              
              {showLabels && (
                <span className="quick-access-label">
                  {item.label}
                </span>
              )}
              
              {showBadges && item.badge && (
                <span 
                  className={`quick-access-badge ${item.badge.type ? `badge--${item.badge.type}` : ''}`}
                  aria-label={item.badge.ariaLabel || `${item.badge.count} elementi`}
                >
                  {item.badge.count}
                </span>
              )}
            </a>
            
            {item.description && (
              <div 
                id={`qa-desc-${item.id}`} 
                className="quick-access-description sr-only"
              >
                {item.description}
              </div>
            )}
          </li>
        ))}
      </ul>
    </nav>
  )
}

// Navigation Icons
function SearchIcon({ size = 20, className = '' }) {
  return (
    <svg 
      width={size} 
      height={size} 
      viewBox="0 0 24 24" 
      fill="none" 
      className={className}
      aria-hidden="true"
    >
      <circle cx="11" cy="11" r="8" stroke="currentColor" strokeWidth="2"/>
      <path d="m21 21-4.35-4.35" stroke="currentColor" strokeWidth="2"/>
    </svg>
  )
}

function FilterIcon({ size = 20, className = '' }) {
  return (
    <svg 
      width={size} 
      height={size} 
      viewBox="0 0 24 24" 
      fill="none" 
      className={className}
      aria-hidden="true"
    >
      <polygon points="22,3 2,3 10,12.46 10,19 14,21 14,12.46" stroke="currentColor" strokeWidth="2" fill="none"/>
    </svg>
  )
}

function XIcon({ size = 20, className = '' }) {
  return (
    <svg 
      width={size} 
      height={size} 
      viewBox="0 0 24 24" 
      fill="none" 
      className={className}
      aria-hidden="true"
    >
      <line x1="18" y1="6" x2="6" y2="18" stroke="currentColor" strokeWidth="2"/>
      <line x1="6" y1="6" x2="18" y2="18" stroke="currentColor" strokeWidth="2"/>
    </svg>
  )
}

function ArrowLeftIcon({ size = 20, className = '' }) {
  return (
    <svg 
      width={size} 
      height={size} 
      viewBox="0 0 24 24" 
      fill="none" 
      className={className}
      aria-hidden="true"
    >
      <line x1="19" y1="12" x2="5" y2="12" stroke="currentColor" strokeWidth="2"/>
      <polyline points="12,19 5,12 12,5" stroke="currentColor" strokeWidth="2"/>
    </svg>
  )
}

export { 
  AdvancedSearchBar, 
  EnhancedBreadcrumb, 
  QuickAccessNav as QuickAccessMenu, 
  BackNavigation
}