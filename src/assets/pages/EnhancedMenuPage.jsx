import React, { useEffect } from 'react'
import { usePizzeria } from '../contexts/PizzeriaContext'
import { useMenuSections } from '../../hooks/useMenuSections'
import { useAllergeni, useLanguage } from '../../hooks/useMenuFeatures'
import { useAllergenFilter } from '../../hooks/useAllergenFilter'

// Import Enhanced Components
import { SkipLinks, useKeyboardNavigation } from '../components/AccessibilityComponents'
import { PizzeriaLogo } from '../components/BrandComponents'
import { AdvancedSearchBar, EnhancedBreadcrumb, QuickAccessNav } from '../components/NavigationComponents'
import { SemanticBadge, AllergenBadge, StatusBadge, PriceBadge, BadgeGroup } from '../components/BadgeSystem'
import CollapsibleMenuSection from '../components/CollapsibleMenuSection'
import AllergenModal from '../components/AllergenModal'
import { GridSkeleton } from '../components/SkeletonLoaders'

export default function EnhancedMenuPage() {
  const { pizzas, appetizers, beverages, desserts, allergens, loading, initialized } = usePizzeria()
  const { showAllergensModal, openAllergensModal, closeAllergensModal } = useAllergeni()
  const { currentLanguage, toggleLanguage } = useLanguage()

  // Enable keyboard navigation
  useKeyboardNavigation()

  // Hook per la gestione del filtro allergeni
  const {
    selectedAllergens,
    updateSelection,
    resetSelection,
    filterItems,
    filterStats
  } = useAllergenFilter()

  useEffect(() => {
    // Il caricamento è già gestito automaticamente dal PizzeriaContext
  }, [])

  // Prepara le sezioni del menu usando il hook con filtro
  const menuSections = useMenuSections(
    pizzas, 
    appetizers, 
    beverages, 
    desserts, 
    loading, 
    initialized,
    filterItems
  )

  // Search and filter configuration
  const searchFilters = [
    { id: 'vegetarian', label: 'Vegetariano', icon: '🌱', count: 12 },
    { id: 'vegan', label: 'Vegano', icon: '🌿', count: 8 },
    { id: 'gluten-free', label: 'Senza Glutine', icon: '🌾', count: 15 },
    { id: 'spicy', label: 'Piccante', icon: '🌶️', count: 6 },
    { id: 'new', label: 'Novità', icon: '✨', count: 4 },
    { id: 'popular', label: 'Popolare', icon: '🔥', count: 10 }
  ]

  const sortOptions = [
    { value: 'name', label: 'Nome', icon: '📝' },
    { value: 'price-low', label: 'Prezzo crescente', icon: '💰' },
    { value: 'price-high', label: 'Prezzo decrescente', icon: '💸' },
    { value: 'rating', label: 'Valutazione', icon: '⭐' },
    { value: 'popularity', label: 'Popolarità', icon: '🔥' }
  ]

  // Quick access navigation items
  const quickAccessItems = [
    {
      id: 'pizzas',
      label: 'Pizze',
      icon: '🍕',
      href: '#pizzas',
      badge: { count: pizzas?.length || 0, type: 'brand' },
      description: 'Le nostre pizze tradizionali napoletane'
    },
    {
      id: 'appetizers', 
      label: 'Antipasti',
      icon: '🥗',
      href: '#appetizers',
      badge: { count: appetizers?.length || 0 },
      description: 'Antipasti tipici della tradizione italiana'
    },
    {
      id: 'beverages',
      label: 'Bevande',
      icon: '🥤',
      href: '#beverages', 
      badge: { count: beverages?.length || 0 },
      description: 'Bevande, vini e liquori selezionati'
    },
    {
      id: 'desserts',
      label: 'Dolci',
      icon: '🍰',
      href: '#desserts',
      badge: { count: desserts?.length || 0 },
      description: 'Dolci artigianali della casa'
    }
  ]

  // Breadcrumb items
  const breadcrumbItems = [
    { label: 'Menu Completo', href: '/menu' },
    { label: 'Specialità Napoletane' }
  ]

  const handleSearch = (searchTerm) => {
    console.log('Searching for:', searchTerm)
    // Implement search logic
  }

  const handleFilter = (activeFilters) => {
    console.log('Active filters:', activeFilters)
    // Implement filter logic
  }

  const handleSort = (sortValue) => {
    console.log('Sorting by:', sortValue)
    // Implement sort logic
  }

  const handleAllergensClick = () => {
    openAllergensModal()
  }

  const handleLanguageClick = () => {
    toggleLanguage()
  }

  const handleResetFilters = () => {
    resetSelection()
  }

  const handleAllergenSelection = (newSelection) => {
    updateSelection(newSelection)
  }

  return (
    <>
      {/* Skip Links for Accessibility */}
      <SkipLinks />
      
      <div className="app-layout">
        {/* Enhanced Header */}
        <header className="enhanced-header" id="main-navigation">
          <div className="container">
            <div className="enhanced-header-container">
              {/* Enhanced Brand Logo */}
              <div className="enhanced-header-brand">
                <PizzeriaLogo 
                  variant="compact" 
                  size="medium"
                  onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                />
              </div>

              {/* Quick Access Navigation */}
              <nav className="enhanced-header-nav">
                <QuickAccessNav 
                  items={quickAccessItems}
                  orientation="horizontal"
                  showLabels={false}
                  showBadges={true}
                />
              </nav>

              {/* Header Actions */}
              <div className="enhanced-header-actions">
                {/* Allergeni Button with Enhanced Badge */}
                <button 
                  className="qodeup-header-icon-btn"
                  onClick={handleAllergensClick}
                  aria-label="Gestione allergeni"
                  title="Filtri allergeni"
                >
                  <span className="text-2xl">🚫</span>
                  {filterStats.hasActiveFilters && (
                    <SemanticBadge
                      variant="warning"
                      size="small"
                      style="filled"
                      className="absolute -top-1 -right-1"
                    >
                      {filterStats.activeFilterCount}
                    </SemanticBadge>
                  )}
                </button>

                {/* Language Toggle */}
                <button 
                  className="qodeup-header-icon-btn"
                  onClick={handleLanguageClick}
                  aria-label={`Cambia lingua (attuale: ${currentLanguage})`}
                  title="Cambia lingua"
                >
                  <span className="text-xl font-bold">
                    {currentLanguage === 'it' ? 'IT' : 'EN'}
                  </span>
                </button>

                {/* Search Toggle */}
                <button 
                  className="qodeup-header-icon-btn"
                  aria-label="Ricerca avanzata"
                  title="Cerca nel menu"
                >
                  <span className="text-xl">🔍</span>
                </button>
              </div>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="app-main" id="main-content">
          <div className="container">
            {/* Breadcrumb Navigation */}
            <EnhancedBreadcrumb 
              items={breadcrumbItems}
              showHome={true}
              homeLabel="Home"
              homeHref="/"
              className="mb-6"
            />

            {/* Advanced Search Bar */}
            <AdvancedSearchBar
              placeholder="Cerca pizze, antipasti, ingredienti..."
              onSearch={handleSearch}
              onFilter={handleFilter}
              onSort={handleSort}
              filters={searchFilters}
              sortOptions={sortOptions}
              showFilters={true}
              showSort={true}
              className="mb-8"
            />

            {/* Menu Layout */}
            <div className="menu-layout">
              {/* Sidebar with Filters */}
              <aside className="menu-sidebar">
                <div className="space-y-6">
                  <div>
                    <h3 className="heading-4 mb-4">Filtri Rapidi</h3>
                    <BadgeGroup direction="vertical" spacing="normal">
                      <StatusBadge status="vegetarian" />
                      <StatusBadge status="vegan" />
                      <StatusBadge status="new" />
                      <StatusBadge status="popular" />
                      <StatusBadge status="spicy" />
                    </BadgeGroup>
                  </div>

                  <div>
                    <h3 className="heading-4 mb-4">Informazioni</h3>
                    <div className="space-y-3 text-sm text-neutral-600">
                      <p>🍕 Tutte le nostre pizze sono preparate con impasto a lievitazione naturale di 48 ore</p>
                      <p>🧄 Utilizziamo solo ingredienti DOP e IGP certificati</p>
                      <p>🔥 Cottura nel forno a legna a 450°C</p>
                    </div>
                  </div>

                  <div>
                    <h3 className="heading-4 mb-4">Allergeni</h3>
                    <p className="text-sm text-neutral-600 mb-3">
                      Clicca sul pulsante allergeni nell'header per gestire i filtri.
                    </p>
                    <SemanticBadge
                      variant="info"
                      size="small"
                      style="soft"
                      icon="ℹ️"
                    >
                      Informazioni complete disponibili
                    </SemanticBadge>
                  </div>
                </div>
              </aside>

              {/* Menu Content */}
              <div className="menu-content">
                {loading && !initialized ? (
                  <GridSkeleton />
                ) : (
                  <div className="space-y-12">
                    {menuSections.map((section) => (
                      <section key={section.title} className="menu-section" id={section.title.toLowerCase()}>
                        {/* Enhanced Section Header */}
                        <div className="menu-section-header">
                          <div className="flex items-center">
                            <span className="menu-section-icon" aria-hidden="true">
                              {section.icon}
                            </span>
                            <h2 className="menu-section-title">
                              {section.title}
                              <SemanticBadge
                                variant="brand"
                                size="medium"
                                style="soft"
                                className="menu-section-count"
                              >
                                {section.items.length}
                              </SemanticBadge>
                            </h2>
                          </div>
                          
                          {section.description && (
                            <p className="subtitle">{section.description}</p>
                          )}
                        </div>

                        {/* Enhanced Menu Items Grid */}
                        <div className="menu-items-grid">
                          {section.items.map((item) => (
                            <article key={item.id} className="menu-item-card">
                              <div className="menu-item-header">
                                <div className="flex-1">
                                  <h3 className="menu-item-title">{item.name}</h3>
                                  {item.description && (
                                    <p className="menu-item-description">{item.description}</p>
                                  )}
                                </div>
                                
                                <PriceBadge 
                                  price={item.price}
                                  currency="€"
                                  discount={item.discount}
                                  original={item.originalPrice}
                                />
                              </div>

                              {/* Enhanced Badges */}
                              <div className="menu-item-badges">
                                <BadgeGroup spacing="normal">
                                  {item.vegetarian && <StatusBadge status="vegetarian" size="small" />}
                                  {item.vegan && <StatusBadge status="vegan" size="small" />}
                                  {item.spicy && <StatusBadge status="spicy" size="small" />}
                                  {item.isNew && <StatusBadge status="new" size="small" animated />}
                                  {item.popular && <StatusBadge status="popular" size="small" animated />}
                                  
                                  {/* Allergen Badges */}
                                  {item.allergens?.map((allergen) => (
                                    <AllergenBadge
                                      key={allergen}
                                      allergen={allergen}
                                      size="small"
                                      severity="medium"
                                    />
                                  ))}
                                </BadgeGroup>
                              </div>

                              {/* Item Footer */}
                              <div className="menu-item-footer">
                                <div className="flex items-center space-x-4">
                                  {item.rating && (
                                    <SemanticBadge
                                      variant="brand"
                                      size="small"
                                      style="soft"
                                      icon="⭐"
                                    >
                                      {item.rating.toFixed(1)}
                                    </SemanticBadge>
                                  )}
                                  
                                  {item.prepTime && (
                                    <SemanticBadge
                                      variant="info"
                                      size="small"
                                      style="outline"
                                      icon="⏱️"
                                    >
                                      {item.prepTime} min
                                    </SemanticBadge>
                                  )}
                                </div>

                                <button className="btn btn-primary btn-sm hover-lift">
                                  Aggiungi
                                </button>
                              </div>
                            </article>
                          ))}
                        </div>
                      </section>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </main>
      </div>

      {/* Allergen Modal with Enhanced Styling */}
      {showAllergensModal && (
        <AllergenModal
          allergens={allergens}
          selectedAllergens={selectedAllergens}
          onSelectionChange={handleAllergenSelection}
          onClose={closeAllergensModal}
          onReset={handleResetFilters}
        />
      )}
    </>
  )
}