/*
  Props: {
    appetizer: {
      id, name, price, description, notes, image_url,
      ingredients?: Array<{ id, name, allergens?: Array<{ id, name }> }>,
    }
  }
*/

export default function AppetizerCard({ appetizer }) {
  if (!appetizer) return null
  
  const {
    name,
    price,
    image_url,
    ingredients = [],
  } = appetizer
  
  const description = appetizer?.description ?? appetizer?.notes ?? ''
  
  // Estrai tutti gli allergeni unici dagli ingredienti
  const allergens = [...new Set(
    ingredients
      .flatMap(ingredient => ingredient.allergens || [])
      .map(allergen => allergen.name)
  )].sort()

  return (
    <div className="card shadow-sm h-100">
      {image_url && (
        <img src={image_url} className="card-img-top" alt={name} style={{ objectFit: 'cover', height: 180 }} />
      )}
      <div className="card-body d-flex flex-column">
        <div className="d-flex justify-content-between align-items-start mb-2">
          <h5 className="card-title mb-0">{name}</h5>
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
      </div>
    </div>
  )
}