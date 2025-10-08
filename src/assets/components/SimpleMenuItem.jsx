import React from 'react';
// Esempio di props: { name, price, description, note, vegan, allergens }
export default function SimpleMenuItem({ name, price, description, note, vegan, allergens = [] }) {
  return (
    <li className="simple-menu-item" tabIndex={0}>
      <div className="item-row">
        <span className="item-name">{name}</span>
        {vegan && (
          <span className="item-badge vegan" aria-label="Piatto vegano" title="Vegano">🌱</span>
        )}
        {allergens.length > 0 && (
          <span className="item-badge allergen" aria-label={`Allergeni: ${allergens.map(a => typeof a === 'object' ? a.name : a).join(', ')}`}>{allergens.map(a => <span key={typeof a === 'object' ? a.id || a.name : a}>[{typeof a === 'object' ? a.name : a}]</span>)}</span>
        )}
        <span className="item-price">€{price}</span>
      </div>
      <div className="item-description">{description}</div>
      {note && <div className="item-note">Nota: <em>{note}</em></div>}
    </li>
  );
}
