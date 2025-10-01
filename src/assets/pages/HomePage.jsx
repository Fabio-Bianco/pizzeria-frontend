import { useMemo, useCallback } from 'react'
import { usePizzeria } from '../contexts/PizzeriaContext'
import PizzaCard from '../components/PizzaCard'

export default function HomePage() {
    const { pizzas, categories } = usePizzeria()

    const normalize = (s) => String(s || '').toLowerCase().normalize('NFD').replace(/\p{Diacritic}/gu, '').trim()

    const matchCategory = useCallback((synonyms) => {
        const syn = (synonyms || []).map(normalize)
        const exact = (categories || []).find((c) => syn.includes(normalize(c.name)))
        if (exact) return exact
        // fallback: contiene il termine (es. "pizza" dentro "le pizze")
        return (categories || []).find((c) => syn.some((t) => normalize(c.name).includes(t))) || null
    }, [categories])

    const pizzasByCategoryId = useCallback((catId) => {
        const idStr = String(catId)
        return (pizzas || []).filter((p) => {
            // diverse possibili strutture dal backend
            if (Array.isArray(p.categories) && p.categories.some((c) => String(c.id) === idStr)) return true
            if (p.category && String(p.category.id) === idStr) return true
            if (p.category_id && String(p.category_id) === idStr) return true
            if (Array.isArray(p.category_ids) && p.category_ids.map(String).includes(idStr)) return true
            return false
        })
    }, [pizzas])

    const byCategoryName = useCallback((synonyms) => {
        const cat = matchCategory(Array.isArray(synonyms) ? synonyms : [synonyms])
        if (!cat) return []
        return pizzasByCategoryId(cat.id)
    }, [matchCategory, pizzasByCategoryId])

    const sections = useMemo(() => (
        [
            { key: 'pizze', title: 'Le nostre Pizze', items: byCategoryName(['pizze', 'pizza']) },
            { key: 'antipasti', title: 'Antipasti', items: byCategoryName(['antipasti', 'antipasto', 'starter', 'appetizer']) },
            { key: 'bevande', title: 'Bevande', items: byCategoryName(['bevande', 'bibite', 'drinks']) },
        ]
    ), [byCategoryName])

    return (
        <div className="py-4">
            <h1 className="mb-3">Benvenuto nella Pizzeria</h1>
            <p className="lead">Scopri il nostro menu aggiornato e buon appetito!</p>

            {sections.map((sec) => (
                <div key={sec.key} className="my-4">
                    <div className="d-flex align-items-center mb-2">
                        <h3 className="mb-0">{sec.title}</h3>
                        <span className="ms-2 badge text-bg-secondary">{sec.items.length}</span>
                    </div>
                    <div className="row g-3">
                        {sec.items.map((pizza) => (
                            <div key={pizza.id} className="col-12 col-md-6 col-lg-4">
                                <PizzaCard pizza={pizza} />
                            </div>
                        ))}
                        {!sec.items.length && (
                            <div className="col-12">
                                <div className="alert alert-light border">Nessun elemento in questa sezione.</div>
                            </div>
                        )}
                    </div>
                </div>
            ))}
        </div>
    )
}
