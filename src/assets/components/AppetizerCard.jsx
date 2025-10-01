/*
  Props: {
    appetizer: {
      id, name, price, description, notes, image_url,
      allergens?: Array<{ id, name }>,
    }
  }
*/

export default function AppetizerCard({ appetizer }) {
  if (!appetizer) return null
  const {
    name,
    price,
    image_url,
    allergens = [],
  } = appetizer
  const description = appetizer?.description ?? appetizer?.notes ?? ''

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
        {!!allergens.length && (
          <div className="small text-danger mb-2">
            <strong>Allergeni:</strong> {allergens.map((a) => a.name).join(', ')}
          </div>
        )}
      </div>
    </div>
  )
}