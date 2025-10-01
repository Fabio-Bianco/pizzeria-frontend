/*
  Props: {
    pizza: {
      id, name, price, description, notes, image_url,
      category?: { id, name },
      ingredients?: Array<{ id, name, allergens?: Array<{ id, name }> }>,
    }
  }
*/
import { Link } from 'react-router-dom'

export default function PizzaCard({ pizza }) {
  if (!pizza) return null
  
  const {
    name,
    price,
    image_url,
    category,
    ingredients = [],
  } = pizza
  
  const description = pizza?.description ?? pizza?.notes ?? ''
  
  // Estrai tutti gli allergeni unici dagli ingredienti
  const allergens = [...new Set(
    ingredients
      .flatMap(ingredient => ingredient.allergens || [])
      .map(allergen => allergen.name)
  )].sort()

  return (
    <div className="card shadow-sm h-100">
      {image_url ? (
        <Link to={`/pizzas/${pizza.id}`}>
          <img src={image_url} className="card-img-top" alt={name} style={{ objectFit: 'cover', height: 180 }} />
        </Link>
      ) : null}
      <div className="card-body d-flex flex-column">
        <div className="d-flex justify-content-between align-items-start mb-2">
          <h5 className="card-title mb-0">
            <Link to={`/pizzas/${pizza.id}`} className="text-decoration-none">{name}</Link>
          </h5>
          {price != null && (
            <span className="badge text-bg-primary">€ {Number(price).toFixed(2)}</span>
          )}
        </div>
        {description && <p className="card-text text-muted mb-2">{description}</p>}
        {!!ingredients.length && (
          <div className="small text-secondary mb-2">
            <strong>Ingredienti:</strong> {ingredients.map((i) => i.name).join(', ')}
          </div>
        )}
        {!!allergens.length && (
          <div className="mb-2">
            <div className="small text-danger mb-1">
              <strong>⚠️ Allergeni:</strong>
            </div>
            <div className="d-flex flex-wrap gap-1">
              {allergens.map((allergen, index) => (
                <span key={index} className="badge bg-danger-subtle text-danger-emphasis">
                  {allergen}
                </span>
              ))}
            </div>
          </div>
        )}
        {category && (
          <div className="mt-auto">
            <span className="badge text-bg-light">{category.name}</span>
          </div>
        )}
      </div>
    </div>
  )
}
