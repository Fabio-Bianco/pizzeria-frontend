# 📚 Documentazione Progetto Pizzeria Frontend

## 📁 Struttura Progetto

### `/docs` - Documentazione
- `BACKEND_API_SETUP.md` - Setup API Laravel backend
- `DARK_MODE_IMPLEMENTATION.md` - Guida implementazione dark mode
- `LINKEDIN_POST.md` - Post LinkedIn showcase progetto
- `MOBILE_FIRST_REFACTORING.md` - Refactoring mobile-first
- `MODERN_REDESIGN_GUIDE.md` - Guida redesign moderno
- `QUICK_START.md` - Quick start guide
- `VISUAL_COMPARISON.md` - Comparazione visuale versioni

### `/src/components` - Componenti React
**Componenti Core:**
- `MenuPage.jsx` - Pagina principale menu (ATTIVA)
- `EnhancedMenuPage.jsx` - Versione enhanced con WCAG
- `SimpleMenuItem.jsx` - Card singolo item menu
- `CollapsibleMenuSection.jsx` - Sezioni collassabili

**Componenti UI:**
- `AllergenModal.jsx` + `.css` - Modale selezione allergeni
- `AllergenBadges.jsx` - Badge allergeni icon-only
- `FilterStats.jsx` + `.css` - Statistiche filtri attivi
- `Icons.jsx` - Icone custom (Vegan, Allergen)

**Utility:**
- `ErrorBoundary.jsx` - Error handling
- `LazyImage.jsx` - Lazy loading immagini
- `SkeletonLoaders.jsx` - Loading placeholders
- `Toast.jsx` - Notifiche toast

**WCAG (Enhanced):**
- `AccessibilityComponentsWCAG.jsx`
- `BrandComponentsWCAG.jsx`
- `NavigationComponentsWCAG.jsx`

### `/src/styles` - Fogli di stile
**Core Styles:**
- `qodeup-layout.css` - Layout principale, header, footer
- `menu-components.css` - Componenti menu, sezioni
- `design-system.css` - Design tokens, variabili
- `responsive.css` - Media queries responsive

**Component Styles:**
- `/components/simple-menu-item.css` - Stili card menu
- `/components/AllergenModal.css` - Modale allergeni
- `/components/AllergenBadges.css` - Badge allergeni
- `/components/FilterStats.css` - Filtri stats

**Feature Styles:**
- `menu-uniform-modern.css` - Layout uniforme mobile-first
- `modern-badges.css` - Sistema badge moderno
- `header-labels.css` - Label header actions
- `micro-interactions.css` - Animazioni e transizioni
- `accessibility.css` - WCAG compliance
- `navigation.css` - Navigazione e skip links

### `/src/hooks` - Custom Hooks
- `useAllergenFilter.js` - Gestione filtro allergeni
- `useVeggieFilter.js` - Gestione filtro veggie
- `useMenuFeatures.js` - Features menu (allergeni modal)
- `useMenuSections.js` - Gestione sezioni menu
- `useNavigation.js` - Navigazione programmatica
- `useUIEnhancements.js` - Enhancement UI

### `/src/contexts` - React Context
- `PizzeriaContext.jsx` - Context globale dati (pizzas, appetizers, etc.)
- `ToastContext.jsx` - Context notifiche toast

### `/src/services` - API Services
- `apiClient.js` - Client HTTP base
- `pizzas.js` - API pizze
- `appetizers.js` - API antipasti
- `beverages.js` - API bevande
- `desserts.js` - API dolci
- `allergens.js` - API allergeni
- `ingredients.js` - API ingredienti
- `categories.js` - API categorie
- `mockData.js` - Dati mock sviluppo

## 🎨 Design System

### Colori Brand
- Yellow: `#efca1a`
- Gold: `#e5ad3e`
- Red: `#d73527`
- Green: `#22c55e` (vegan)
- Gray: `#777777` (text secondary)

### Breakpoints
```css
Mobile: < 768px
Tablet: 768px - 1024px
Desktop: > 1024px
Large: > 1440px
```

### Typography
- Font: Roboto (400, 500, 600, 700, 800)
- Material Symbols Outlined (icone)

## 🚀 Features Implementate

✅ **Mobile-First Responsive**
- Layout verticale < 768px
- Layout orizzontale > 768px
- Icon-only badges mobile
- Floating badges su immagini

✅ **Sistema Filtri**
- Filtro allergeni (modale)
- Filtro veggie (toggle)
- Statistiche filtri attivi
- Reset rapido

✅ **Glassmorphism Design**
- Backdrop blur
- RGBA transparency
- Border radius moderni
- Shadow layering

✅ **WCAG Accessibility**
- Semantic HTML
- ARIA labels
- Keyboard navigation
- Focus management
- Skip links

✅ **Performance**
- Lazy loading immagini
- Skeleton loaders
- Code splitting
- CSS optimizations

## 📦 Dipendenze

```json
{
  "react": "^18.3.1",
  "react-dom": "^18.3.1",
  "vite": "^5.4.10"
}
```

## 🗑️ File Rimossi (Obsoleti)

- `test-glassmorphism.js`
- `_trash/` directory
- `AccessibilityComponents.jsx` (duplicato)
- `BrandComponents.jsx` (duplicato)
- `NavigationComponents.jsx` (duplicato)
- `InteractiveStatesWCAG.jsx` (non usato)
- `SemanticBadgeSystemWCAG.jsx` (non usato)
- `BadgeSystem.jsx` (sostituito da AllergenBadges)
- `AllergenFilter.jsx` (sostituito da useAllergenFilter hook)
- `quick-preview.css` (obsoleto)
- `modern-redesign-2025.css` (consolidato)

## 📝 Convenzioni Codice

### Naming
- Componenti: PascalCase (`SimpleMenuItem.jsx`)
- Hooks: camelCase con prefisso `use` (`useMenuSections.js`)
- Context: PascalCase con suffisso `Context` (`PizzeriaContext.jsx`)
- CSS: kebab-case (`menu-components.css`)
- Classi CSS: kebab-case con prefisso `qodeup-` o specifico componente

### File Structure
```
ComponentName.jsx
ComponentName.css (se ha stili dedicati)
```

### Import Order
1. React imports
2. External libraries
3. Internal contexts
4. Internal hooks
5. Internal components
6. Services/API
7. Styles
8. Assets

## 🔄 Stato Progetto

**Versione Attiva:** `MenuPage.jsx` (mobile-first optimized)
**Versione Enhanced:** `EnhancedMenuPage.jsx` (WCAG enhanced)

**Ultimo Update:** 17 Novembre 2025
**Status:** ✅ Production Ready
