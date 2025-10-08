import React, { useEffect, useState } from 'react'
import { usePizzeria } from '../contexts/PizzeriaContext'
import { useMenuSections } from '../../hooks/useMenuSections'
import { useAllergeni, useLanguage } from '../../hooks/useMenuFeatures'
import { useAllergenFilter } from '../../hooks/useAllergenFilter'

// Import WCAG AAA Enhanced Components
import { SkipLinks, useKeyboardNavigation } from '../components/AccessibilityComponentsWCAG'
import { PremiumPizzeriaLogo, BrandHeader } from '../components/BrandComponentsWCAG'
import { 
  EnhancedBreadcrumb, 
  AdvancedSearchBar, 
  QuickAccessNav,
  PositionIndicator 
} from '../components/NavigationComponentsWCAG'
import { 
  EnhancedBadge,
  AllergenBadge, 
  DietaryBadge,
  QualityBadge,
  NutritionalBadge,
  BadgeGroup 
} from '../components/SemanticBadgeSystemWCAG'
import { 
  InteractiveButton,
  ToastNotification,
  LoadingState,
  AnimatedCard
} from '../components/InteractiveStatesWCAG'
import CollapsibleMenuSection from '../components/CollapsibleMenuSection'
import AllergenModal from '../components/AllergenModal'
// Context e Services

export default function EnhancedMenuPage() {
  const { pizzas, appetizers, beverages, desserts, allergens, loading } = usePizzeria()
  const { showAllergensModal, openAllergensModal, closeAllergensModal } = useAllergeni()
  const { currentLanguage, toggleLanguage } = useLanguage()
  
  // State locale per UI enhancement
  const [currentSection, setCurrentSection] = useState('pizzas')
  const [searchQuery, setSearchQuery] = useState('')
  const [activeFilters, setActiveFilters] = useState([])
  const [toasts, setToasts] = useState([])

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
    // Track current section for position indicator
    const handleScroll = () => {
      const sections = ['pizzas', 'appetizers', 'beverages', 'desserts']
      const scrollPosition = window.scrollY + 100
      
      for (const section of sections) {
        const element = document.getElementById(section)
        if (element) {
          const { offsetTop, offsetHeight } = element
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setCurrentSection(section)
            break
          }
        }
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Prepara le sezioni del menu usando il hook con filtro
  const menuSections = useMenuSections(
    pizzas, 
    appetizers, 
    beverages, 
    desserts, 
    loading, 
    filterItems
  )

  // Search suggestions per auto-complete
  const searchSuggestions = [
    { text: 'Pizza Margherita', category: 'Pizze' },
    { text: 'Pizza Napoletana', category: 'Pizze' },
    { text: 'Bruschetta', category: 'Antipasti' },
    { text: 'Tiramisù', category: 'Dolci' },
    { text: 'Vino Chianti', category: 'Bevande' }
  ]

  // Search and filter configuration
  const searchFilters = [
    { 
      value: 'vegetarian', 
      label: 'Vegetariano', 
      icon: '🌱', 
      count: 12,
      active: activeFilters.includes('vegetarian')
    },
    { 
      value: 'vegan', 
      label: 'Vegano', 
      icon: '🌿', 
      count: 8,
      active: activeFilters.includes('vegan')
    },
    { 
      value: 'gluten-free', 
      label: 'Senza Glutine', 
      icon: '🌾', 
      count: 15,
      active: activeFilters.includes('gluten-free')
    },
    { 
      value: 'spicy', 
      label: 'Piccante', 
      icon: '🌶️', 
      count: 6,
      active: activeFilters.includes('spicy')
    },
    { 
      value: 'new', 
      label: 'Novità', 
      icon: '✨', 
      count: 4,
      active: activeFilters.includes('new')
    },
    { 
      value: 'popular', 
      label: 'Popolare', 
      icon: '🔥', 
      count: 10,
      active: activeFilters.includes('popular')
    }
  ]

  // Quick access navigation items
  const quickAccessSections = [
    {
      id: 'pizzas',
      title: 'Pizze',
      icon: '🍕',
      count: pizzas?.length || 0
    },
    {
      id: 'appetizers', 
      title: 'Antipasti',
      icon: '🥗',
      count: appetizers?.length || 0
    },
    {
      id: 'beverages',
      title: 'Bevande',
      icon: '🥤',
      count: beverages?.length || 0
    },
    {
      id: 'desserts',
      title: 'Dolci',
      icon: '🍰',
      count: desserts?.length || 0
    }
  ]

  // Breadcrumb items
  const breadcrumbItems = [
    { label: 'Home', href: '/' },
    { label: 'Menu Completo', href: '/menu' },
    { label: 'Specialità Napoletane' }
  ]

  // Toast management
  const addToast = (toast) => {
    const id = Date.now()
    setToasts(prev => [...prev, { ...toast, id }])
  }

  const removeToast = (id) => {
    setToasts(prev => prev.filter(toast => toast.id !== id))
  }

  // Event handlers
  const handleSearch = (searchTerm) => {
    setSearchQuery(searchTerm)
    console.log('Searching for:', searchTerm)
  }

  const handleFilter = (filter) => {
    const newFilters = activeFilters.includes(filter.value)
      ? activeFilters.filter(f => f !== filter.value)
      : [...activeFilters, filter.value]
    
    setActiveFilters(newFilters)
    addToast({
      type: 'success',
      title: 'Filtro aggiornato',
      message: `Filtro "${filter.label}" ${newFilters.includes(filter.value) ? 'attivato' : 'disattivato'}`
    })
  }

  const handleAllergensClick = () => {
    openAllergensModal()
  }

  const handleLanguageClick = () => {
    toggleLanguage()
    addToast({
      type: 'info',
      title: 'Lingua cambiata',
      message: `Lingua impostata su ${currentLanguage === 'it' ? 'Inglese' : 'Italiano'}`
    })
  }

  const handleResetFilters = () => {
    resetSelection()
    setActiveFilters([])
    setSearchQuery('')
    addToast({
      type: 'info',
      title: 'Filtri azzerati',
      message: 'Tutti i filtri sono stati rimossi'
    })
  }

  const handleAllergenSelection = (newSelection) => {
    updateSelection(newSelection)
  }

  const getSectionTitle = (sectionId) => {
    const section = quickAccessSections.find(s => s.id === sectionId)
    return section ? section.title : sectionId
  }

  return (
    <>
      {/* Skip Links for Accessibility */}
      <SkipLinks />
      
      {/* Position Indicator */}
      <PositionIndicator 
        currentSection={getSectionTitle(currentSection)}
        sections={quickAccessSections}
      />
      
      <div className="app-layout">
        {/* Enhanced Header con Brand WCAG AAA */}
        <BrandHeader className="enhanced-header">
          <div className="container">
            <div className="flex items-center justify-between py-4">
              {/* Enhanced Brand Logo */}
              <PremiumPizzeriaLogo 
                variant="horizontal"
                size="medium"
                showTagline={true}
                interactive={true}
              />

              {/* Quick Access Navigation */}
              <QuickAccessNav 
                sections={quickAccessSections}
                className="hidden md:flex"
              />

              {/* Header Actions */}
              <div className="flex items-center gap-3">
                {/* Allergeni Button with Enhanced Badge */}
                <InteractiveButton
                  variant="ghost"
                  size="medium"
                  onClick={handleAllergensClick}
                  aria-label="Gestione allergeni"
                  className="relative"
                >
                  🚫
                  {filterStats.hasActiveFilters && (
                    <EnhancedBadge
                      type="warning"
                      size="small"
                      className="absolute -top-1 -right-1"
                    >
                      {filterStats.activeFilterCount}
                    </EnhancedBadge>
                  )}
                </InteractiveButton>

                {/* Language Toggle */}
                <InteractiveButton
                  variant="ghost" 
                  size="medium"
                  onClick={handleLanguageClick}
                  aria-label={`Cambia lingua (attuale: ${currentLanguage})`}
                >
                  {currentLanguage === 'it' ? 'IT' : 'EN'}
                </InteractiveButton>

                {/* Reset Filters */}
                {(activeFilters.length > 0 || filterStats.hasActiveFilters) && (
                  <InteractiveButton
                    variant="outline"
                    size="small"
                    onClick={handleResetFilters}
                    aria-label="Azzera tutti i filtri"
                  >
                    Azzera filtri
                  </InteractiveButton>
                )}
              </div>
            </div>
          </div>
        </BrandHeader>

        {/* Main Content */}
        <main className="app-main" id="main-content">
          <div className="container py-6">
            {/* Breadcrumb Navigation */}
            <EnhancedBreadcrumb 
              items={breadcrumbItems}
              className="mb-6"
            />

            {/* Advanced Search Bar */}
            <AdvancedSearchBar
              placeholder="Cerca pizze, antipasti, ingredienti..."
              value={searchQuery}
              onSearch={handleSearch}
              onFilter={handleFilter}
              filters={searchFilters}
              suggestions={searchSuggestions}
              className="mb-8"
            />

            {/* Menu Content */}
            {loading.pizzas || loading.appetizers || loading.beverages || loading.desserts ? (
              <LoadingState 
                variant="skeleton"
                message="Caricamento menu in corso..."
              />
            ) : (
              <div className="space-y-12">
                {menuSections.map((section) => (
                  <section key={section.title} className="menu-section" id={section.title.toLowerCase()}>
                    {/* Enhanced Section Header */}
                    <div className="flex items-center justify-between mb-6">
                      <div className="flex items-center gap-4">
                        <span className="text-4xl" aria-hidden="true">
                          {section.icon}
                        </span>
                        <div>
                          <h2 className="heading-2 flex items-center gap-3">
                            {section.title}
                            <EnhancedBadge
                              type="info"
                              size="medium"
                            >
                              {section.items.length}
                            </EnhancedBadge>
                          </h2>
                          {section.description && (
                            <p className="body-large text-neutral-600 mt-1">
                              {section.description}
                            </p>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Enhanced Menu Items Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {section.items.map((item) => (
                        <AnimatedCard key={item.id} className="menu-item-card">
                          <div className="flex justify-between items-start mb-3">
                            <div className="flex-1">
                              <h3 className="heading-3 mb-2">{item.name}</h3>
                              {item.description && (
                                <p className="body-base text-neutral-600 mb-3">
                                  {item.description}
                                </p>
                              )}
                            </div>
                            
                            <div className="text-right">
                              <div className="heading-3 text-brand-primary">€{item.price}</div>
                              {item.originalPrice && item.originalPrice > item.price && (
                                <div className="text-sm text-neutral-500 line-through">
                                  €{item.originalPrice}
                                </div>
                              )}
                            </div>
                          </div>

                          {/* Enhanced Badges */}
                          <BadgeGroup className="mb-4">
                            {item.vegetarian && (
                              <DietaryBadge diet="vegetarian" certified={false} />
                            )}
                            {item.vegan && (
                              <DietaryBadge diet="vegan" certified={true} />
                            )}
                            {item.glutenFree && (
                              <DietaryBadge diet="glutenFree" certified={true} />
                            )}
                            {item.spicy && (
                              <EnhancedBadge type="warning" icon="🌶️" size="small">
                                Piccante
                              </EnhancedBadge>
                            )}
                            {item.isNew && (
                              <EnhancedBadge type="success" icon="✨" size="small">
                                Novità
                              </EnhancedBadge>
                            )}
                            {item.popular && (
                              <QualityBadge quality="chef" />
                            )}
                            
                            {/* Allergen Badges */}
                            {item.allergens?.map((allergen) => (
                              <AllergenBadge
                                key={allergen}
                                allergen={allergen}
                                severity="high"
                              />
                            ))}
                          </BadgeGroup>

                          {/* Nutritional Info */}
                          {item.calories && (
                            <div className="flex gap-2 mb-4">
                              <NutritionalBadge 
                                type="calories" 
                                value={item.calories}
                                level={item.calories > 500 ? 'high' : 'medium'}
                              />
                              {item.protein && (
                                <NutritionalBadge 
                                  type="protein" 
                                  value={item.protein}
                                  level="medium"
                                />
                              )}
                            </div>
                          )}

                          {/* Item Footer */}
                          <div className="flex items-center justify-between pt-4 border-t border-neutral-200">
                            <div className="flex items-center gap-3">
                              {item.rating && (
                                <EnhancedBadge
                                  type="premium"
                                  size="small"
                                  icon="⭐"
                                >
                                  {item.rating.toFixed(1)}
                                </EnhancedBadge>
                              )}
                              
                              {item.prepTime && (
                                <EnhancedBadge
                                  type="info"
                                  size="small"
                                  icon="⏱️"
                                >
                                  {item.prepTime} min
                                </EnhancedBadge>
                              )}
                            </div>

                            <InteractiveButton 
                              variant="primary" 
                              size="small"
                              onClick={() => addToast({
                                type: 'success',
                                title: 'Aggiunto al carrello',
                                message: `${item.name} aggiunto con successo`
                              })}
                            >
                              Aggiungi
                            </InteractiveButton>
                          </div>
                        </AnimatedCard>
                      ))}
                    </div>
                  </section>
                ))}
              </div>
            )}
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

      {/* Toast Notifications */}
      {toasts.map((toast) => (
        <ToastNotification
          key={toast.id}
          type={toast.type}
          title={toast.title}
          message={toast.message}
          onClose={() => removeToast(toast.id)}
          duration={3000}
        />
      ))}
    </>
  )
}