/* eslint-disable react-refresh/only-export-components */
import { useState, useRef, useEffect, useCallback } from 'react'
import { useKeyboardNavigation, useFocusManagement } from './AccessibilityComponentsWCAG'

/**
 * 🔍 Search Icon SVG - Icona ricerca accessibile
 */
function SearchIcon({ size = 20, className = '' }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      role="img"
      aria-label="Icona ricerca"
    >
      <path
        d="M17.5 17.5L13.875 13.875M15.8333 9.16667C15.8333 12.8486 12.8486 15.8333 9.16667 15.8333C5.48477 15.8333 2.5 12.8486 2.5 9.16667C2.5 5.48477 5.48477 2.5 9.16667 2.5C12.8486 2.5 15.8333 5.48477 15.8333 9.16667Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

/**
 * 🗑️ Clear Icon SVG - Icona cancella
 */
function ClearIcon({ size = 16, className = '' }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      role="img"
      aria-label="Cancella"
    >
      <path
        d="M12 4L4 12M4 4L12 12"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

/**
 * 🔽 Filter Icon SVG - Icona filtri
 */
function FilterIcon({ size = 20, className = '' }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      role="img"
      aria-label="Filtri"
    >
      <path
        d="M2.5 5H17.5M5 10H15M7.5 15H12.5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

/**
 * 🍞 Enhanced Breadcrumb Component - WCAG AAA Navigation
 * Breadcrumb semantici con supporto per screen reader
 */
export function EnhancedBreadcrumb({ items, className = '' }) {
  if (!items || items.length === 0) return null

  return (
    <nav 
      aria-label="Percorso di navigazione" 
      className={`breadcrumb ${className}`}
      role="navigation"
    >
      <ol className="breadcrumb-list flex items-center gap-var(--space-2) text-sm">
        {items.map((item, index) => (
          <li key={index} className="breadcrumb-item flex items-center">
            {/* Separatore per tutti tranne il primo */}
            {index > 0 && (
              <span 
                className="breadcrumb-separator mx-var(--space-2) text-neutral-400"
                aria-hidden="true"
              >
                ›
              </span>
            )}
            
            {/* Link o testo corrente */}
            {item.href && index < items.length - 1 ? (
              <a 
                href={item.href} 
                className="breadcrumb-link text-brand-primary hover:text-brand-primary-dark underline focus-visible"
                aria-label={`Vai a ${item.label}`}
              >
                {item.label}
              </a>
            ) : (
              <span 
                className="breadcrumb-current font-medium text-neutral-700"
                aria-current="page"
              >
                {item.label}
              </span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  )
}

/**
 * 🔍 Advanced Search Bar - Ricerca avanzata con accessibilità
 * Search con auto-complete e filtri integrati
 */
export function AdvancedSearchBar({ 
  placeholder = "Cerca nel menu...",
  onSearch,
  onFilter,
  filters = [],
  suggestions = [],
  value = '',
  className = ''
}) {
  const [searchValue, setSearchValue] = useState(value)
  const [showSuggestions, setShowSuggestions] = useState(false)
  const [showFilters, setShowFilters] = useState(false)
  const [selectedSuggestionIndex, setSelectedSuggestionIndex] = useState(-1)
  
  const searchInputRef = useRef(null)
  const suggestionsRef = useRef(null)
  const filtersRef = useRef(null)

  // Gestione focus per suggestions
  const { containerRef: suggestionsContainerRef, handleKeyDown: handleSuggestionsKeyDown } = 
    useKeyboardNavigation({
      direction: 'vertical',
      wrap: true,
      exitKeys: ['Escape'],
      onExit: () => {
        setShowSuggestions(false)
        searchInputRef.current?.focus()
      }
    })

  // Auto-focus sul mount
  useEffect(() => {
    if (searchInputRef.current) {
      searchInputRef.current.focus()
    }
  }, [])

  // Gestione ricerca
  const handleSearchChange = useCallback((e) => {
    const newValue = e.target.value
    setSearchValue(newValue)
    setShowSuggestions(newValue.length > 0 && suggestions.length > 0)
    setSelectedSuggestionIndex(-1)
    onSearch?.(newValue)
  }, [onSearch, suggestions.length])

  // Gestione clear
  const handleClear = useCallback(() => {
    setSearchValue('')
    setShowSuggestions(false)
    setSelectedSuggestionIndex(-1)
    searchInputRef.current?.focus()
    onSearch?.('')
  }, [onSearch])

  // Gestione keyboard per search input
  const handleSearchKeyDown = useCallback((e) => {
    if (!showSuggestions || suggestions.length === 0) return

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault()
        setSelectedSuggestionIndex(prev => 
          prev < suggestions.length - 1 ? prev + 1 : 0
        )
        break
      case 'ArrowUp':
        e.preventDefault()
        setSelectedSuggestionIndex(prev => 
          prev > 0 ? prev - 1 : suggestions.length - 1
        )
        break
      case 'Enter':
        e.preventDefault()
        if (selectedSuggestionIndex >= 0) {
          const selectedSuggestion = suggestions[selectedSuggestionIndex]
          setSearchValue(selectedSuggestion.text)
          setShowSuggestions(false)
          onSearch?.(selectedSuggestion.text)
        }
        break
      case 'Escape':
        e.preventDefault()
        setShowSuggestions(false)
        setSelectedSuggestionIndex(-1)
        break
    }
  }, [showSuggestions, suggestions, selectedSuggestionIndex, onSearch])

  // Gestione click su suggestion
  const handleSuggestionClick = useCallback((suggestion) => {
    setSearchValue(suggestion.text)
    setShowSuggestions(false)
    setSelectedSuggestionIndex(-1)
    onSearch?.(suggestion.text)
    searchInputRef.current?.focus()
  }, [onSearch])

  // Toggle filters
  const handleFiltersToggle = useCallback(() => {
    setShowFilters(prev => !prev)
  }, [])

  return (
    <div className={`search-container relative ${className}`} id="search">
      {/* Search Input Group */}
      <div className="search-input-group relative">
        <div className="relative flex items-center">
          {/* Search Icon */}
          <SearchIcon 
            className="absolute left-var(--space-3) text-neutral-500 pointer-events-none z-10" 
          />
          
          {/* Search Input */}
          <input
            ref={searchInputRef}
            type="search"
            value={searchValue}
            onChange={handleSearchChange}
            onKeyDown={handleSearchKeyDown}
            placeholder={placeholder}
            className="search-input w-full pl-12 pr-20 py-var(--space-3) border-2 border-neutral-300 rounded-lg focus:border-brand-primary focus:ring-0 text-base bg-white"
            aria-label="Campo di ricerca nel menu"
            aria-describedby="search-help"
            aria-expanded={showSuggestions}
            aria-haspopup="listbox"
            autoComplete="off"
            role="combobox"
          />
          
          {/* Clear Button */}
          {searchValue && (
            <button
              onClick={handleClear}
              className="absolute right-12 p-1 text-neutral-500 hover:text-neutral-700 focus-visible rounded"
              aria-label="Cancella ricerca"
              type="button"
            >
              <ClearIcon />
            </button>
          )}
          
          {/* Filter Toggle Button */}
          {filters.length > 0 && (
            <button
              onClick={handleFiltersToggle}
              className="absolute right-var(--space-3) p-1 text-neutral-600 hover:text-brand-primary focus-visible rounded"
              aria-label={`${showFilters ? 'Nascondi' : 'Mostra'} filtri`}
              aria-expanded={showFilters}
              type="button"
            >
              <FilterIcon />
            </button>
          )}
        </div>

        {/* Help Text */}
        <div id="search-help" className="sr-only">
          Digita per cercare nel menu. Usa le frecce per navigare tra i suggerimenti.
        </div>

        {/* Auto-complete Suggestions */}
        {showSuggestions && suggestions.length > 0 && (
          <div
            ref={suggestionsContainerRef}
            className="suggestions-dropdown absolute top-full left-0 right-0 bg-white border border-neutral-200 rounded-lg shadow-lg mt-1 max-h-60 overflow-auto z-50"
            role="listbox"
            aria-label="Suggerimenti di ricerca"
            onKeyDown={handleSuggestionsKeyDown}
          >
            {suggestions.map((suggestion, index) => (
              <button
                key={index}
                onClick={() => handleSuggestionClick(suggestion)}
                className={`suggestion-item w-full text-left px-var(--space-4) py-var(--space-3) hover:bg-neutral-50 focus:bg-brand-primary focus:text-white border-none ${
                  index === selectedSuggestionIndex ? 'bg-brand-primary text-white' : ''
                }`}
                role="option"
                aria-selected={index === selectedSuggestionIndex}
                type="button"
              >
                <div className="flex items-center gap-var(--space-2)">
                  <SearchIcon size={16} className="flex-shrink-0 opacity-60" />
                  <span>{suggestion.text}</span>
                  {suggestion.category && (
                    <span className="text-xs opacity-60 ml-auto">
                      {suggestion.category}
                    </span>
                  )}
                </div>
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Filters Section */}
      {showFilters && filters.length > 0 && (
        <div 
          ref={filtersRef}
          className="search-filters mt-var(--space-3) p-var(--space-4) border border-neutral-200 rounded-lg bg-neutral-50"
          role="region"
          aria-label="Filtri di ricerca"
        >
          <h3 className="label-medium mb-var(--space-3)">Filtra per:</h3>
          <div className="flex flex-wrap gap-var(--space-2)">
            {filters.map((filter, index) => (
              <FilterButton
                key={index}
                filter={filter}
                onToggle={() => onFilter?.(filter)}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

/**
 * 🏷️ Filter Button - Pulsante filtro accessibile
 */
function FilterButton({ filter, onToggle }) {
  return (
    <button
      onClick={onToggle}
      className={`filter-btn inline-flex items-center gap-var(--space-2) px-var(--space-3) py-var(--space-2) rounded-full border text-sm font-medium transition-all duration-var(--duration-fast) touch-comfortable ${
        filter.active 
          ? 'bg-brand-primary text-white border-brand-primary' 
          : 'bg-white text-neutral-700 border-neutral-300 hover:border-brand-primary'
      }`}
      aria-pressed={filter.active}
      aria-label={`Filtro ${filter.label}: ${filter.active ? 'attivo' : 'inattivo'}`}
      type="button"
    >
      {filter.icon && (
        <span className="flex-shrink-0" aria-hidden="true">
          {filter.icon}
        </span>
      )}
      <span>{filter.label}</span>
      {filter.count !== undefined && (
        <span 
          className={`text-xs px-1.5 py-0.5 rounded-full ${
            filter.active ? 'bg-white/20' : 'bg-neutral-100'
          }`}
          aria-label={`${filter.count} risultati`}
        >
          {filter.count}
        </span>
      )}
    </button>
  )
}

/**
 * 🧭 Quick Access Navigation - Navigazione rapida
 * Pulsanti di accesso rapido alle sezioni principali
 */
export function QuickAccessNav({ sections = [], className = '' }) {
  const { containerRef, handleKeyDown } = useKeyboardNavigation({
    direction: 'horizontal',
    wrap: true
  })

  return (
    <nav 
      ref={containerRef}
      onKeyDown={handleKeyDown}
      className={`quick-access-nav ${className}`}
      aria-label="Navigazione rapida sezioni menu"
      role="navigation"
    >
      <div className="flex gap-var(--space-2) overflow-x-auto pb-var(--space-2) scrollbar-thin">
        {sections.map((section, index) => (
          <a
            key={index}
            href={`#${section.id}`}
            className="quick-access-link flex-shrink-0 inline-flex items-center gap-var(--space-2) px-var(--space-4) py-var(--space-3) bg-white border border-neutral-200 rounded-lg text-sm font-medium text-neutral-700 hover:border-brand-primary hover:text-brand-primary transition-all duration-var(--duration-fast) focus-visible touch-comfortable"
            aria-label={`Vai alla sezione ${section.title}`}
          >
            {section.icon && (
              <span className="text-lg" aria-hidden="true">
                {section.icon}
              </span>
            )}
            <span>{section.title}</span>
            {section.count !== undefined && (
              <span 
                className="text-xs px-2 py-1 bg-neutral-100 rounded-full"
                aria-label={`${section.count} elementi`}
              >
                {section.count}
              </span>
            )}
          </a>
        ))}
      </div>
    </nav>
  )
}

/**
 * 📍 Position Indicator - Indicatore di posizione
 * Mostra la posizione corrente nella pagina
 */
export function PositionIndicator({ currentSection, sections = [], className = '' }) {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const updateProgress = () => {
      const scrollTop = window.pageYOffset
      const docHeight = document.documentElement.scrollHeight - window.innerHeight
      const progressPercent = (scrollTop / docHeight) * 100
      setProgress(Math.min(100, Math.max(0, progressPercent)))
    }

    window.addEventListener('scroll', updateProgress)
    updateProgress()
    
    return () => window.removeEventListener('scroll', updateProgress)
  }, [])

  return (
    <div className={`position-indicator ${className}`}>
      {/* Progress Bar */}
      <div className="progress-bar h-1 bg-neutral-200 fixed top-0 left-0 right-0 z-var(--z-index-fixed)">
        <div 
          className="progress-fill h-full bg-brand-primary transition-all duration-var(--duration-fast)"
          style={{ width: `${progress}%` }}
          role="progressbar"
          aria-valuenow={Math.round(progress)}
          aria-valuemin="0"
          aria-valuemax="100"
          aria-label={`Progresso lettura: ${Math.round(progress)}%`}
        />
      </div>

      {/* Current Section Indicator */}
      {currentSection && (
        <div className="current-section-indicator fixed bottom-var(--space-4) right-var(--space-4) bg-white border border-neutral-200 rounded-lg px-var(--space-3) py-var(--space-2) shadow-md z-var(--z-index-fixed)">
          <div className="text-xs text-neutral-600 uppercase tracking-wide">
            Sezione corrente
          </div>
          <div className="text-sm font-medium text-neutral-900">
            {currentSection}
          </div>
        </div>
      )}
    </div>
  )
}

/**
 * 📱 Mobile Navigation Menu - Menu mobile accessibile
 * Menu hamburger con navigazione touch-friendly
 */
export function MobileNavigationMenu({ 
  isOpen, 
  onClose, 
  sections = [], 
  className = '' 
}) {
  const { containerRef, handleKeyDown } = useFocusManagement(isOpen)

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }

    return () => {
      document.body.style.overflow = ''
    }
  }, [isOpen])

  if (!isOpen) return null

  return (
    <div className="mobile-nav-overlay fixed inset-0 z-var(--z-index-modal) lg:hidden">
      {/* Backdrop */}
      <div 
        className="backdrop absolute inset-0 bg-black/50"
        onClick={onClose}
        aria-hidden="true"
      />
      
      {/* Menu Panel */}
      <div
        ref={containerRef}
        onKeyDown={handleKeyDown}
        className={`mobile-nav-panel absolute top-0 right-0 h-full w-80 max-w-[85vw] bg-white shadow-xl transform transition-transform duration-var(--duration-normal) ${className}`}
        role="dialog"
        aria-modal="true"
        aria-label="Menu di navigazione mobile"
        id="mobile-menu"
      >
        {/* Header */}
        <div className="nav-header flex items-center justify-between p-var(--space-4) border-b border-neutral-200">
          <h2 className="heading-3">Menu</h2>
          <button
            onClick={onClose}
            className="btn btn-secondary btn-sm"
            aria-label="Chiudi menu"
          >
            <ClearIcon />
          </button>
        </div>

        {/* Navigation Links */}
        <nav className="nav-content p-var(--space-4)" role="navigation">
          <ul className="space-y-var(--space-2)">
            {sections.map((section, index) => (
              <li key={index}>
                <a
                  href={`#${section.id}`}
                  onClick={onClose}
                  className="nav-link flex items-center gap-var(--space-3) p-var(--space-3) rounded-lg text-neutral-700 hover:bg-neutral-50 hover:text-brand-primary transition-colors duration-var(--duration-fast) focus-visible touch-large"
                  aria-label={`Vai alla sezione ${section.title}`}
                >
                  {section.icon && (
                    <span className="text-xl" aria-hidden="true">
                      {section.icon}
                    </span>
                  )}
                  <span className="flex-1">{section.title}</span>
                  {section.count !== undefined && (
                    <span className="text-xs px-2 py-1 bg-neutral-100 rounded-full">
                      {section.count}
                    </span>
                  )}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </div>
  )
}