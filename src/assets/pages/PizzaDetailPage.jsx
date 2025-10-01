import { useEffect, useMemo, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { usePizzeria } from '../contexts/PizzeriaContext'
import { getPizza } from '../services/pizzas'

export default function PizzaDetailPage() {
  const { id } = useParams()
  const { pizzas } = usePizzeria()
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const fromContext = useMemo(() => {
    return (pizzas || []).find((p) => String(p.id) === String(id)) || null
  }, [pizzas, id])

  useEffect(() => {
    if (fromContext) {
      setData(fromContext)
      setError(null)
      setLoading(false)
      return
    }
    let active = true
    setLoading(true)
    setError(null)
    getPizza(id)
      .then((res) => {
        if (!active) return
        setData(res?.data || res)
      })
      .catch((e) => active && setError(e))
      .finally(() => active && setLoading(false))
    return () => {
      active = false
    }
  }, [id, fromContext])

  if (loading) return <div className="alert alert-info">Caricamento...</div>
  if (error) return <div className="alert alert-danger">Errore nel caricamento</div>
  if (!data) return null

  const { name, price, description, image_url, ingredients = [], allergens = [], categories = [] } = data

  return (
    <div className="pizza-detail py-3">
      <Link to="/menu" className="btn btn-link p-0 mb-3">← Torna al Menu</Link>
      <div className="row g-4 align-items-start">
        <div className="col-12 col-md-5">
          {image_url && (
            <img src={image_url} alt={name} className="img-fluid rounded shadow-sm" />
          )}
        </div>
        <div className="col-12 col-md-7">
          <h2 className="mb-2">{name}</h2>
          {price != null && <div className="h5 text-primary mb-3">€ {Number(price).toFixed(2)}</div>}
          {description && <p className="text-muted">{description}</p>}

          {!!ingredients.length && (
            <p className="mb-1"><strong>Ingredienti:</strong> {ingredients.map((i) => i.name).join(', ')}</p>
          )}
          {!!allergens.length && (
            <p className="text-danger mb-1"><strong>Allergeni:</strong> {allergens.map((a) => a.name).join(', ')}</p>
          )}
          {!!categories.length && (
            <div className="mt-2">
              {categories.map((c) => (
                <span key={c.id} className="badge text-bg-light me-1">{c.name}</span>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
