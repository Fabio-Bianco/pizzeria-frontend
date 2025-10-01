import { useMemo, useCallback, useEffect, useState } from 'react'
import { usePizzeria } from '../contexts/PizzeriaContext'
import PizzaCard from '../components/PizzaCard'
import { listPizzas } from '../services/pizzas'
import { getCategory } from '../services/categories'

export default function HomePage() {
    const { pizzasEnriched: pizzas, categories, appetizers, beverages } = usePizzeria()
    const [antipastiExtra, setAntipastiExtra] = useState([])
    const [bevandeExtra, setBevandeExtra] = useState([])
    // no explicit loading UI for sections; keep UX simple

    const normalize = (s) => String(s || '').toLowerCase().normalize('NFD').replace(/\p{Diacritic}/gu, '').trim()

        const hasCategorySynonym = useCallback((pizza, synonyms) => {
        const syn = (Array.isArray(synonyms) ? synonyms : [synonyms]).map(normalize)
        const names = []
        if (Array.isArray(pizza?.categories)) names.push(...pizza.categories.map((c) => c?.name))
        if (pizza?.category?.name) names.push(pizza.category.name)
        if (pizza?.category_name) names.push(pizza.category_name)
        if (pizza?.type) names.push(pizza.type)
        if (pizza?.category?.slug) names.push(pizza.category.slug)
            // mappa id -> nome dalla lista categories del contesto
            if (pizza?.category_id && Array.isArray(categories)) {
                const match = categories.find((c) => String(c.id) === String(pizza.category_id))
                if (match?.name) names.push(match.name)
                if (match?.slug) names.push(match.slug)
                if (match?.title) names.push(match.title)
            }
        const normNames = names.filter(Boolean).map(normalize)
        return normNames.some((n) => syn.some((t) => n === t || n.includes(t)))
        }, [categories])

        const itemsBySynonyms = useCallback((synonyms) => {
                const list = (pizzas || [])
                // 1) match diretto per nomi su ogni pizza
                const direct = list.filter((p) => hasCategorySynonym(p, synonyms))
                if (direct.length) return direct
                // 2) se non trovi match diretti, usa categories per mappare id
                const syn = (Array.isArray(synonyms) ? synonyms : [synonyms]).map(normalize)
                const matchCats = (categories || []).filter((c) => {
                    const n = normalize(c?.name)
                    const s = normalize(c?.slug)
                    return syn.some((t) => (n && (n === t || n.includes(t))) || (s && (s === t || s.includes(t))))
                })
                const ids = new Set(matchCats.map((c) => String(c.id)))
                if (!ids.size) return []
                return list.filter((p) => {
                    if (p?.category_id && ids.has(String(p.category_id))) return true
                    if (Array.isArray(p?.categories) && p.categories.some((c) => ids.has(String(c.id)))) return true
                    if (p?.category && ids.has(String(p.category?.id))) return true
                    return false
                })
            }, [pizzas, hasCategorySynonym, categories])

        const findCategoryBySynonyms = useCallback((synonyms) => {
            const syn = (Array.isArray(synonyms) ? synonyms : [synonyms]).map(normalize)
            return (categories || []).find((c) => syn.some((t) => normalize(c.name) === t || normalize(c.slug) === t || normalize(c.title) === t)) || null
        }, [categories])

        const extractList = (payload) => {
            if (Array.isArray(payload)) return payload
            if (Array.isArray(payload?.data)) return payload.data
            if (Array.isArray(payload?.results)) return payload.results
            if (Array.isArray(payload?.data?.data)) return payload.data.data
            if (Array.isArray(payload?.payload)) return payload.payload
            // a volte category show potrebbe restituire relazioni
            if (Array.isArray(payload?.pizzas)) return payload.pizzas
            if (Array.isArray(payload?.products)) return payload.products
            if (Array.isArray(payload?.items)) return payload.items
            return []
        }

        const fetchPizzasForCategory = useCallback(async (cat) => {
            if (!cat) return []
            const id = cat.id
            const slug = cat.slug
            // Prova vari parametri comuni
            const attempts = [
                { params: { category: id } },
                { params: { category_id: id } },
                { params: { categoryId: id } },
                slug ? { params: { category: slug } } : null,
                slug ? { params: { slug } } : null,
            ].filter(Boolean)
            for (const a of attempts) {
                try {
                    const res = await listPizzas(a.params)
                    const list = extractList(res)
                    if (list.length) return list
                } catch {
                    // continua con prossimo tentativo
                    continue
                }
            }
            // Fallback: prova a leggere la categoria e relazioni
            try {
                const res = await getCategory(id)
                const list = extractList(res?.data || res)
                if (list.length) return list
            } catch {
                // ignore and fallback to empty list
            }
            return []
        }, [])

        // Quando i filtri client restituiscono vuoto, tenta fetch per Antipasti/Bevande
        useEffect(() => {
            let active = true
            const run = async () => {
                const needAntipasti = itemsBySynonyms(['antipasti', 'antipasto', 'starter', 'appetizer']).length === 0
                const needBevande = itemsBySynonyms(['bevande', 'bibite', 'drinks']).length === 0
                if (!needAntipasti && !needBevande) return
                try {
                    if (needAntipasti) {
                        const catA = findCategoryBySynonyms(['antipasti', 'antipasto', 'starter', 'appetizer'])
                        const listA = await fetchPizzasForCategory(catA)
                        if (active) setAntipastiExtra(listA)
                    }
                    if (needBevande) {
                        const catB = findCategoryBySynonyms(['bevande', 'bibite', 'drinks'])
                        const listB = await fetchPizzasForCategory(catB)
                        if (active) setBevandeExtra(listB)
                    }
                } finally {
                    // nothing to do
                }
            }
            run()
            return () => { active = false }
        }, [itemsBySynonyms, findCategoryBySynonyms, fetchPizzasForCategory])

            const sections = useMemo(() => {
                const pizze = itemsBySynonyms(['pizze', 'pizza'])
                const antipastiClient = itemsBySynonyms(['antipasti', 'antipasto', 'starter', 'appetizer'])
                const bevandeClient = itemsBySynonyms(['bevande', 'bibite', 'drinks'])
                const pizzeSection = pizze.length === 0 ? (pizzas || []) : pizze
                const antipastiSection = (Array.isArray(appetizers) && appetizers.length)
                    ? appetizers
                    : (antipastiClient.length ? antipastiClient : antipastiExtra)
                const bevandeSection = (Array.isArray(beverages) && beverages.length)
                    ? beverages
                    : (bevandeClient.length ? bevandeClient : bevandeExtra)
                return [
                    { key: 'pizze', title: 'Le nostre Pizze', items: pizzeSection },
                    { key: 'antipasti', title: 'I nostri Antipasti', items: antipastiSection },
                    { key: 'bevande', title: 'Bevande', items: bevandeSection },
                ]
            }, [itemsBySynonyms, pizzas, appetizers, beverages, antipastiExtra, bevandeExtra])

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
