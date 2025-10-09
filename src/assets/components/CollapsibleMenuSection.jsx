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
    <div className="qodeup-menu-section">
      <button
        className={`qodeup-section-header ${expanded ? 'expanded' : ''}`}
        onClick={toggleExpanded}
        aria-expanded={expanded}
        aria-controls={`section-${title.replace(/\s+/g, '-').toLowerCase()}`}
        aria-label={`${expanded ? 'Chiudi' : 'Apri'} sezione ${title} (${displayCount} prodotti)`}
      >
        <div className="qodeup-section-title">
          <span>{title}</span>
        </div>
        <div className="d-flex align-items-center gap-2">
          <span className="qodeup-section-count" aria-label={`${displayCount} prodotti disponibili`}>
            ({displayCount})
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
          <ul className="menu-items-list">
            {items.map((item) => (
              <SimpleMenuItem
                key={item.id || item.name}
                name={item.name || item.title}
                price={item.price}
                description={item.description}
                note={item.note}
                vegan={item.vegan || item.vegetarian || (item.tags && (item.tags.includes('vegan') || item.tags.includes('vegetarian')))}
                allergens={item.allergens || []}
                ingredients={item.ingredients || []}
                image={item.image || item.photo || item.img || null}
              />
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}