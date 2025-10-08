// Mock data per development quando le API non sono disponibili
export const mockCategories = [
  { id: 1, name: 'Pizze Classiche', description: 'Le nostre pizze tradizionali', order: 1 },
  { id: 2, name: 'Pizze Speciali', description: 'Creazioni uniche dello chef', order: 2 },
  { id: 3, name: 'Pizze Bianche', description: 'Senza pomodoro', order: 3 }
]

export const mockPizzas = [
  {
    id: 1,
    name: 'Margherita',
    description: 'Pomodoro, mozzarella, basilico',
    price: 8.50,
    category_id: 1,
    ingredients: ['pomodoro', 'mozzarella', 'basilico'],
    allergens: ['latticini']
  },
  {
    id: 2,
    name: 'Diavola',
    description: 'Pomodoro, mozzarella, salame piccante',
    price: 10.00,
    category_id: 1,
    ingredients: ['pomodoro', 'mozzarella', 'salame piccante'],
    allergens: ['latticini']
  },
  {
    id: 3,
    name: 'Quattro Stagioni',
    description: 'Pomodoro, mozzarella, prosciutto, funghi, carciofi, olive',
    price: 12.00,
    category_id: 2,
    ingredients: ['pomodoro', 'mozzarella', 'prosciutto', 'funghi', 'carciofi', 'olive'],
    allergens: ['latticini']
  }
]

export const mockIngredients = [
  { id: 1, name: 'Pomodoro', category: 'verdure' },
  { id: 2, name: 'Mozzarella', category: 'formaggi' },
  { id: 3, name: 'Basilico', category: 'erbe' },
  { id: 4, name: 'Salame piccante', category: 'carni' },
  { id: 5, name: 'Prosciutto', category: 'carni' },
  { id: 6, name: 'Funghi', category: 'verdure' },
  { id: 7, name: 'Carciofi', category: 'verdure' },
  { id: 8, name: 'Olive', category: 'verdure' }
]

export const mockAllergens = [
  { id: 1, name: 'Latticini', icon: '🥛' },
  { id: 2, name: 'Glutine', icon: '🌾' },
  { id: 3, name: 'Uova', icon: '🥚' },
  { id: 4, name: 'Noci', icon: '🥜' }
]

export const mockAppetizers = [
  {
    id: 1,
    name: 'Bruschette',
    description: 'Pane tostato con pomodoro e basilico',
    price: 6.00,
    allergens: ['glutine']
  },
  {
    id: 2,
    name: 'Antipasto Misto',
    description: 'Selezione di salumi e formaggi',
    price: 12.00,
    allergens: ['latticini']
  }
]

export const mockBeverages = [
  { id: 1, name: 'Coca Cola', price: 3.00, category: 'bibite' },
  { id: 2, name: 'Acqua Naturale', price: 2.00, category: 'acqua' },
  { id: 3, name: 'Birra Media', price: 4.50, category: 'alcolici' }
]

export const mockDesserts = [
  {
    id: 1,
    name: 'Tiramisu',
    description: 'Il classico dolce italiano',
    price: 5.50,
    allergens: ['latticini', 'uova']
  },
  {
    id: 2,
    name: 'Panna Cotta',
    description: 'Con coulis ai frutti di bosco',
    price: 5.00,
    allergens: ['latticini']
  }
]