// Dati mock per sviluppo senza backend
export const mockCategories = [
  { id: 1, name: 'Pizze Classiche', slug: 'pizze-classiche' },
  { id: 2, name: 'Antipasti', slug: 'antipasti' },
  { id: 3, name: 'Bevande', slug: 'bevande' }
]

export const mockPizzas = [
  {
    id: 1,
    name: 'Margherita',
    description: 'Pomodoro, mozzarella, basilico',
    price: '8.00',
    image_url: null,
    category_id: 1,
    ingredients: [
      { id: 1, name: 'Pomodoro' },
      { id: 2, name: 'Mozzarella' },
      { id: 3, name: 'Basilico' }
    ],
    allergens: [
      { id: 1, name: 'Lattosio' }
    ]
  },
  {
    id: 2,
    name: 'Marinara',
    description: 'Pomodoro, aglio, origano, olio extravergine',
    price: '6.50',
    image_url: null,
    category_id: 1,
    ingredients: [
      { id: 1, name: 'Pomodoro' },
      { id: 4, name: 'Aglio' },
      { id: 5, name: 'Origano' }
    ],
    allergens: []
  },
  {
    id: 3,
    name: 'Diavola',
    description: 'Pomodoro, mozzarella, salame piccante',
    price: '9.50',
    image_url: null,
    category_id: 1,
    ingredients: [
      { id: 1, name: 'Pomodoro' },
      { id: 2, name: 'Mozzarella' },
      { id: 6, name: 'Salame piccante' }
    ],
    allergens: [
      { id: 1, name: 'Lattosio' }
    ]
  }
]

export const mockAppetizers = [
  {
    id: 4,
    name: 'Bruschette',
    description: 'Pane tostato con pomodoro e basilico',
    price: '5.00',
    image_url: null,
    ingredients: [
      { id: 7, name: 'Pane' },
      { id: 1, name: 'Pomodoro' },
      { id: 3, name: 'Basilico' }
    ],
    allergens: [
      { id: 2, name: 'Glutine' }
    ]
  },
  {
    id: 5,
    name: 'Olive ascolane',
    description: 'Olive ripiene fritte',
    price: '6.50',
    image_url: null,
    ingredients: [
      { id: 8, name: 'Olive' },
      { id: 9, name: 'Carne macinata' },
      { id: 10, name: 'Pangrattato' }
    ],
    allergens: [
      { id: 2, name: 'Glutine' },
      { id: 3, name: 'Uova' }
    ]
  }
]

export const mockBeverages = [
  {
    id: 6,
    name: 'Coca Cola',
    description: 'Bibita gassata 33cl',
    price: '3.00',
    image_url: null,
    allergens: []
  },
  {
    id: 7,
    name: 'Acqua naturale',
    description: 'Bottiglia 50cl',
    price: '2.00',
    image_url: null,
    allergens: []
  },
  {
    id: 8,
    name: 'Birra media',
    description: 'Birra alla spina 40cl',
    price: '4.50',
    image_url: null,
    allergens: [
      { id: 2, name: 'Glutine' }
    ]
  }
]

export const mockIngredients = [
  { id: 1, name: 'Pomodoro' },
  { id: 2, name: 'Mozzarella' },
  { id: 3, name: 'Basilico' },
  { id: 4, name: 'Aglio' },
  { id: 5, name: 'Origano' },
  { id: 6, name: 'Salame piccante' },
  { id: 7, name: 'Pane' },
  { id: 8, name: 'Olive' },
  { id: 9, name: 'Carne macinata' },
  { id: 10, name: 'Pangrattato' }
]

export const mockAllergens = [
  { id: 1, name: 'Lattosio' },
  { id: 2, name: 'Glutine' },
  { id: 3, name: 'Uova' },
  { id: 4, name: 'Frutta a guscio' },
  { id: 5, name: 'Pesce' },
  { id: 6, name: 'Soia' }
]