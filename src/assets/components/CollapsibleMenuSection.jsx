import { useState } from 'react';
import SimpleMenuItem from './SimpleMenuItem';
import '../../styles/simple-menu-item.css';
import '../../styles/menu-components.css';

export default function CollapsibleMenuSection({
  title,
  items = [],
  icon = '🍕',
  isExpanded = false,
  count
}) {
  const [expanded, setExpanded] = useState(isExpanded);

  const toggleExpanded = () => setExpanded(!expanded);
  const displayCount = count !== undefined ? count : items.length;
  const getProductIcon = () => {
    if (title.toLowerCase().includes('pizza')) return '🍕';
    if (title.toLowerCase().includes('antipast') || title.toLowerCase().includes('fritti')) return '🍤';
    if (title.toLowerCase().includes('bevand') || title.toLowerCase().includes('drink')) return '🥤';
    if (title.toLowerCase().includes('dessert') || title.toLowerCase().includes('dolc')) return '🍰';
    return '🍽️';
  };

  return (
    <div className="qodeup-menu-section gradient-mesh">
      <button
        className={`qodeup-section-header gradient-header dark-mode-ready ${expanded ? 'expanded' : ''}`}
        onClick={toggleExpanded}
        aria-expanded={expanded}
        aria-controls={`section-${title.replace(/\s+/g, '-').toLowerCase()}`}
        aria-label={`${expanded ? 'Chiudi' : 'Apri'} sezione ${title} (${displayCount} prodotti)`}
      >
        <div className="qodeup-section-title">
          <span>{title}</span>
        </div>
        <div style={{display:'flex',alignItems:'center',gap:'0.65rem',flexShrink:0}}>
          <span className="qodeup-section-count" aria-label={`${displayCount} prodotti disponibili`}>
            {displayCount}
          </span>
          <span className="qodeup-section-chevron" aria-hidden="true">▼</span>
        </div>
      </button>
      <div
        className={`qodeup-section-content ${expanded ? 'expanded' : 'collapsed'}`}
        id={`section-${title.replace(/\s+/g, '-').toLowerCase()}`}
        role="region"
        aria-labelledby={`header-${title.replace(/\s+/g, '-').toLowerCase()}`}
      >
        {expanded && items.length === 0 && (
          <div className="qodeup-section-empty">Nessun prodotto disponibile.</div>
        )}
        {expanded && items.length > 0 && (
          <ul className="menu-items-list menu-uniform-grid">
            {items.map((item, index) => (
              <SimpleMenuItem
                key={item.id || item.name}
                className="menu-card-modern animated"
                name={item.name || item.title}
                price={item.price}
                description={item.description}
                note={item.note}
                vegan={item.is_vegan ?? item.vegan}
                is_gluten_free={item.is_gluten_free ?? item.gluten_free}
                allergens={item.allergens || []}
                ingredients={item.ingredients || []}
                image={item.image || item.photo || item.img || null}
                category={(() => {
                  // Priorità: classica > bianca > speciale > prima disponibile
                  const cats = [];
                  if (item.category) cats.push(item.category);
                  if (Array.isArray(item.categories)) cats.push(...item.categories);
                  const norm = c => (typeof c === 'object' ? (c.name || '').toLowerCase() : (c || '').toLowerCase());
                  const classica = cats.find(c => norm(c).includes('classica') || norm(c).includes('classiche'));
                  if (classica) return classica;
                  const bianca = cats.find(c => norm(c).includes('bianca') || norm(c).includes('bianche'));
                  if (bianca) return bianca;
                  const speciale = cats.find(c => norm(c).includes('speciale') || norm(c).includes('speciali'));
                  if (speciale) return speciale;
                  return cats[0] || null;
                })()}
                format={item.format || item.formato || undefined}
                alcohol={item.alcohol || item.gradazione || item.abv || item.gradazione_alcolica || undefined}
              />
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}