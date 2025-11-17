# 🌙 Dark Mode Implementation Guide - Backoffice Pizzeria

## 📋 Indice
- [Palette Colori](#palette-colori)
- [Variabili CSS](#variabili-css)
- [Componenti da Modificare](#componenti-da-modificare)
- [Media Query](#media-query)
- [Testing](#testing)

---

## 🎨 Palette Colori

### Light Mode (Corrente)
```css
/* Background */
--bg-primary: #ffffff;
--bg-secondary: #f8f9fa;
--bg-tertiary: #e9ecef;

/* Text */
--text-primary: #333333;
--text-secondary: #777777;
--text-tertiary: #999999;

/* Borders */
--border-light: #e9ecef;
--border-medium: #e8e8e8;
--border-dark: #dee2e6;

/* Brand Colors */
--brand-yellow: #efca1a;
--brand-gold: #e5ad3e;
--brand-red: #d73527;
--brand-green: #22c55e;

/* Glassmorphism */
--glass-bg: rgba(255, 255, 255, 0.95);
--glass-border: rgba(255, 255, 255, 0.3);
--glass-shadow: rgba(0, 0, 0, 0.1);
```

### Dark Mode (Da Implementare)
```css
/* Background */
--bg-primary: #0f172a;        /* Slate 900 - Background principale */
--bg-secondary: #1e293b;      /* Slate 800 - Cards, modali */
--bg-tertiary: #334155;       /* Slate 700 - Elevated surfaces */

/* Text */
--text-primary: #f8fafc;      /* Slate 50 - Testo primario */
--text-secondary: #cbd5e1;    /* Slate 300 - Testo secondario */
--text-tertiary: #94a3b8;     /* Slate 400 - Testo terziario */

/* Borders */
--border-light: #334155;      /* Slate 700 */
--border-medium: #475569;     /* Slate 600 */
--border-dark: #64748b;       /* Slate 500 */

/* Brand Colors (Mantenuti ma adattati) */
--brand-yellow: #fbbf24;      /* Giallo più luminoso per contrasto */
--brand-gold: #f59e0b;        /* Oro più vibrante */
--brand-red: #ef4444;         /* Rosso più luminoso */
--brand-green: #10b981;       /* Verde smeraldo */

/* Glassmorphism Dark */
--glass-bg: rgba(15, 23, 42, 0.8);
--glass-border: rgba(255, 255, 255, 0.1);
--glass-shadow: rgba(0, 0, 0, 0.5);
```

---

## 🔧 Variabili CSS da Implementare

### 1. Root Variables (globals.css o main.css)

```css
:root {
  /* Light Mode Variables */
  --bg-primary: #ffffff;
  --bg-secondary: #f8f9fa;
  --bg-tertiary: #e9ecef;
  
  --text-primary: #333333;
  --text-secondary: #777777;
  --text-tertiary: #999999;
  
  --border-light: #e9ecef;
  --border-medium: #e8e8e8;
  --border-dark: #dee2e6;
  
  --brand-yellow: #efca1a;
  --brand-gold: #e5ad3e;
  --brand-red: #d73527;
  --brand-green: #22c55e;
  
  --glass-bg: rgba(255, 255, 255, 0.95);
  --glass-border: rgba(255, 255, 255, 0.3);
  --glass-shadow: rgba(0, 0, 0, 0.1);
  
  /* Shadows */
  --shadow-sm: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
  --shadow-md: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
  --shadow-lg: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
  --shadow-xl: 0 20px 25px -5px rgba(0, 0, 0, 0.1);
  
  /* Transitions */
  --transition-fast: 0.15s ease;
  --transition-base: 0.2s ease;
  --transition-slow: 0.3s ease;
}

/* Dark Mode Variables */
[data-theme="dark"],
.dark-mode {
  --bg-primary: #0f172a;
  --bg-secondary: #1e293b;
  --bg-tertiary: #334155;
  
  --text-primary: #f8fafc;
  --text-secondary: #cbd5e1;
  --text-tertiary: #94a3b8;
  
  --border-light: #334155;
  --border-medium: #475569;
  --border-dark: #64748b;
  
  --brand-yellow: #fbbf24;
  --brand-gold: #f59e0b;
  --brand-red: #ef4444;
  --brand-green: #10b981;
  
  --glass-bg: rgba(15, 23, 42, 0.8);
  --glass-border: rgba(255, 255, 255, 0.1);
  --glass-shadow: rgba(0, 0, 0, 0.5);
  
  /* Shadows Dark Mode */
  --shadow-sm: 0 1px 2px 0 rgba(0, 0, 0, 0.3);
  --shadow-md: 0 4px 6px -1px rgba(0, 0, 0, 0.4);
  --shadow-lg: 0 10px 15px -3px rgba(0, 0, 0, 0.5);
  --shadow-xl: 0 20px 25px -5px rgba(0, 0, 0, 0.6);
}

/* Preferenza sistema */
@media (prefers-color-scheme: dark) {
  :root:not([data-theme]) {
    /* Applica dark mode automaticamente se l'utente ha dark mode di sistema */
    --bg-primary: #0f172a;
    --bg-secondary: #1e293b;
    /* ... tutte le variabili dark */
  }
}
```

---

## 🎯 Componenti da Modificare

### 2. Header
```css
.qodeup-header-main {
  background: var(--bg-primary);
  border-bottom: 1px solid var(--border-light);
  color: var(--text-primary);
}

.qodeup-logo-text {
  color: var(--text-secondary);
}

.qodeup-header-icon-btn {
  background: var(--bg-secondary);
  border: 2px solid var(--border-light);
  color: white; /* Manteniamo bianco per icone */
}

.qodeup-header-icon-btn:hover {
  background: var(--bg-tertiary);
  border-color: var(--brand-yellow);
}
```

### 3. Cards Menu (SimpleMenuItem)
```css
.menu-card-modern {
  background: var(--bg-secondary);
  border: 1px solid var(--border-light);
  box-shadow: var(--shadow-md);
}

.menu-card-modern:hover {
  background: var(--bg-tertiary);
  box-shadow: var(--shadow-lg);
}

.menu-card-title {
  color: var(--text-primary);
}

.menu-card-description {
  color: var(--text-secondary);
}

.menu-card-price {
  color: var(--brand-yellow);
}
```

### 4. Section Headers (CollapsibleMenuSection)
```css
.qodeup-section-header {
  background: linear-gradient(135deg, 
    var(--brand-yellow) 0%, 
    var(--brand-gold) 100%
  );
  color: var(--text-primary);
  border: 1px solid var(--border-light);
}

/* Dark mode: gradient più intenso */
[data-theme="dark"] .qodeup-section-header {
  background: linear-gradient(135deg, 
    #fbbf24 0%, 
    #f59e0b 100%
  );
}
```

### 5. Modal Allergeni
```css
.allergen-modal-overlay {
  background: rgba(0, 0, 0, 0.6);
  backdrop-filter: blur(8px);
}

.allergen-modal-content {
  background: var(--bg-secondary);
  border: 2px solid var(--brand-yellow);
  box-shadow: var(--shadow-xl);
}

.allergen-modal-title {
  color: var(--text-primary);
}

.allergen-modal-disclaimer p {
  color: var(--text-secondary);
}

.allergen-modal-item {
  background: var(--bg-tertiary);
  border: 2px solid var(--border-medium);
}

.allergen-modal-item:hover {
  background: var(--bg-primary);
  border-color: var(--brand-yellow);
}

.allergen-modal-item-name {
  color: var(--text-secondary);
}
```

### 6. Badges
```css
.badge-vegan {
  background: linear-gradient(135deg, 
    var(--brand-green) 0%, 
    #059669 100%
  );
}

.badge-glutenfree {
  background: linear-gradient(135deg, 
    var(--brand-gold) 0%, 
    #d97706 100%
  );
}

.allergen-badge-icon-only {
  background: var(--glass-bg);
  border: 1.5px solid var(--brand-gold);
  backdrop-filter: blur(10px);
}
```

---

## 🔄 Media Query e Preferenze Sistema

### Rilevamento Automatico
```css
/* Rileva preferenza dark mode del sistema operativo */
@media (prefers-color-scheme: dark) {
  :root:not([data-theme="light"]) {
    /* Applica tutte le variabili dark mode */
    --bg-primary: #0f172a;
    /* ... resto delle variabili */
  }
}

/* Contrast mode per accessibilità */
@media (prefers-contrast: high) {
  :root {
    --border-light: #000000;
    --border-medium: #000000;
    --text-secondary: #000000;
  }
  
  [data-theme="dark"] {
    --border-light: #ffffff;
    --border-medium: #ffffff;
    --text-secondary: #ffffff;
  }
}
```

---

## ⚙️ JavaScript Toggle Dark Mode

### React Context per Dark Mode
```javascript
// contexts/ThemeContext.jsx
import { createContext, useContext, useState, useEffect } from 'react';

const ThemeContext = createContext();

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState(() => {
    // Leggi da localStorage o preferenza sistema
    const saved = localStorage.getItem('theme');
    if (saved) return saved;
    
    if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
      return 'dark';
    }
    return 'light';
  });

  useEffect(() => {
    // Applica data-theme al document
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export const useTheme = () => useContext(ThemeContext);
```

### Toggle Button Component
```jsx
// components/ThemeToggle.jsx
import { useTheme } from '../contexts/ThemeContext';

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      className="theme-toggle-btn"
      onClick={toggleTheme}
      aria-label={`Passa a ${theme === 'light' ? 'dark' : 'light'} mode`}
    >
      <span className="material-symbols-outlined">
        {theme === 'light' ? 'dark_mode' : 'light_mode'}
      </span>
    </button>
  );
}
```

### CSS Toggle Button
```css
.theme-toggle-btn {
  position: fixed;
  bottom: 2rem;
  right: 2rem;
  width: 56px;
  height: 56px;
  border-radius: 50%;
  background: var(--brand-yellow);
  border: 2px solid var(--border-light);
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  box-shadow: var(--shadow-lg);
  transition: var(--transition-base);
  z-index: 9999;
}

.theme-toggle-btn:hover {
  transform: translateY(-3px) rotate(15deg);
  box-shadow: var(--shadow-xl);
}

.theme-toggle-btn .material-symbols-outlined {
  font-size: 1.8rem;
  font-variation-settings: 'FILL' 1, 'wght' 500, 'GRAD' 0, 'opsz' 48;
}
```

---

## 📱 Responsive Considerations

### Mobile Dark Mode
```css
@media (max-width: 768px) {
  [data-theme="dark"] .qodeup-header-main {
    background: var(--bg-primary);
    border-bottom: none;
  }
  
  [data-theme="dark"] .menu-card-modern {
    background: var(--bg-secondary);
    border: 1px solid var(--border-light);
  }
  
  [data-theme="dark"] .allergen-modal-content {
    background: var(--bg-secondary);
  }
}
```

---

## 🎨 Immagini e SVG

### Filter per Adattare Icone
```css
/* Inverti colore icone in dark mode */
[data-theme="dark"] .icon-invertible {
  filter: invert(1) brightness(1.2);
}

/* Logo adattato */
[data-theme="dark"] .qodeup-logo-text {
  color: var(--text-primary);
  text-shadow: 0 2px 8px rgba(251, 191, 36, 0.3);
}

/* Immagini prodotti: overlay scuro */
[data-theme="dark"] .menu-card-image::after {
  content: '';
  position: absolute;
  inset: 0;
  background: rgba(0, 0, 0, 0.2);
  border-radius: inherit;
}
```

---

## ✅ Testing Checklist

### Visual Testing
- [ ] Header (logo, icone, badge)
- [ ] Cards menu (background, testo, prezzi)
- [ ] Section headers collapsabili
- [ ] Modal allergeni (overlay, cards allergeni)
- [ ] Badges (vegan, gluten-free, allergeni)
- [ ] Floating badges su immagini
- [ ] Filter stats bar
- [ ] Toast notifications
- [ ] Skeleton loaders

### Functional Testing
- [ ] Toggle dark/light mode
- [ ] Persistenza preferenza (localStorage)
- [ ] Rilevamento sistema operativo
- [ ] Transizioni smooth tra temi
- [ ] Accessibilità (contrasto WCAG AA)
- [ ] Hover states su tutti i componenti
- [ ] Focus states per navigazione keyboard

### Browser Testing
- [ ] Chrome/Edge (latest)
- [ ] Firefox (latest)
- [ ] Safari (iOS + macOS)
- [ ] Mobile browsers (Chrome Android, Safari iOS)

### Performance
- [ ] CSS variables caricano correttamente
- [ ] No flash of unstyled content (FOUC)
- [ ] Smooth transitions < 300ms
- [ ] No repaint/reflow pesanti

---

## 🚀 Implementazione Step-by-Step

### Fase 1: Setup Base (1-2 ore)
1. Creare `ThemeContext.jsx`
2. Aggiungere variabili CSS root
3. Implementare toggle button
4. Testare su Header

### Fase 2: Componenti Principali (3-4 ore)
1. Adattare Cards menu
2. Adattare Section headers
3. Adattare Modal allergeni
4. Adattare Badges system

### Fase 3: Refinement (2-3 ore)
1. Ottimizzare contrasti colori
2. Testare accessibilità
3. Fix edge cases
4. Testing multi-browser

### Fase 4: Polish (1-2 ore)
1. Aggiungere animazioni toggle
2. Ottimizzare performance
3. Documentazione finale
4. Deploy

---

## 📚 Risorse Utili

- [CSS Variables MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/Using_CSS_custom_properties)
- [prefers-color-scheme](https://developer.mozilla.org/en-US/docs/Web/CSS/@media/prefers-color-scheme)
- [WCAG Contrast Checker](https://webaim.org/resources/contrastchecker/)
- [Tailwind Dark Mode Guide](https://tailwindcss.com/docs/dark-mode)

---

## 📞 Contatti

Per domande o supporto durante l'implementazione, contattare il team frontend.

**Versione:** 1.0  
**Data:** 17 Novembre 2025  
**Autore:** Frontend Team - Pizzeria Project
