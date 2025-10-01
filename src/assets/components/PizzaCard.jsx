/*
  Props: {
    pizza: {
      id, name, price, description, image_url,
      categories?: Array<{ id, name }>,
      ingredients?: Array<{ id, name }>,
      allergens?: Array<{ id, name }>,
    }
  }
*/
import { Link } from 'react-router-dom'

export default function PizzaCard({ pizza }) {
  if (!pizza) return null
  const {
    name,
    price,
    description,
    image_url,
    categories = [],
    ingredients = [],
    allergens = [],
  } = pizza

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
          <div className="small text-danger mb-2">
            <strong>Allergeni:</strong> {allergens.map((a) => a.name).join(', ')}
          </div>
        )}
        {!!categories.length && (
          <div className="mt-auto">
            {categories.map((c) => (
              <span key={c.id} className="badge text-bg-light me-1">{c.name}</span>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
