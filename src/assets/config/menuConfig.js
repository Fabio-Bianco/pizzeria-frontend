export const MENU_SECTIONS = {
  pizze: {
    id: import.meta.env.VITE_CATEGORY_PIZZE_ID || null,
    slug: import.meta.env.VITE_CATEGORY_PIZZE_SLUG || null,
    synonyms: ['pizze', 'pizza'],
    title: 'Le nostre Pizze',
  },
  antipasti: {
    id: import.meta.env.VITE_CATEGORY_ANTIPASTI_ID || null,
    slug: import.meta.env.VITE_CATEGORY_ANTIPASTI_SLUG || null,
    synonyms: ['antipasti', 'antipasto', 'starter', 'appetizer'],
    title: 'I nostri Antipasti',
  },
  bevande: {
    id: import.meta.env.VITE_CATEGORY_BEVANDE_ID || null,
    slug: import.meta.env.VITE_CATEGORY_BEVANDE_SLUG || null,
    synonyms: ['bevande', 'bibite', 'drinks'],
    title: 'Bevande',
  },
}
