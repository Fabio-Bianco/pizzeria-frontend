import React from 'react';
import LazyImage from './LazyImage';
// Esempio di props: { name, price, description, note, vegan, allergens, ingredients, image }
export default function SimpleMenuItem({ name, price, description, note, vegan, allergens = [], ingredients = [], image }) {
  return (
    <li className="simple-menu-item qodeup-product-card" tabIndex={0}>
      {image ? (
        <LazyImage src={image} alt={name} className="qodeup-product-image" placeholder="🍽️" />
      ) : (
        <div className="qodeup-product-placeholder">�️</div>
      )}
      <div className="qodeup-product-info">
        <div className="qodeup-product-header">
          <span className="qodeup-product-name" title={name}>{name}</span>
          <span className="qodeup-product-price">€{price}</span>
        </div>
        <div className="qodeup-product-description" title={description}>{description}</div>
        {Array.isArray(ingredients) && ingredients.length > 0 && (
          <div className="item-ingredients" title={ingredients.map(i => typeof i === 'object' ? i.name : i).join(', ')}>
            <span className="item-ingredients-label">Ingredienti:</span> {ingredients.map((ing, idx) => (
              <span className="item-ingredient" key={typeof ing === 'object' ? ing.id || ing.name : ing}>
                {typeof ing === 'object' ? ing.name : ing}{idx < ingredients.length - 1 ? ', ' : ''}
              </span>
            ))}
          </div>
        )}
        <div className="item-badges-group" style={{ marginTop: '0.3em' }}>
          {vegan && (
            <span className="item-badge vegan" aria-label="Piatto vegano" title="Vegano">🌱</span>
          )}
          {allergens.length > 0 && allergens.map(a => {
            const allergenName = typeof a === 'object' ? a.name : a;
            const allergenId = typeof a === 'object' ? a.id || a.name : a;
            return (
              <span
                key={allergenId}
                className="item-badge allergen"
                aria-label={`Allergene: ${allergenName}`}
                title={allergenName}
                tabIndex={0}
              >
                {allergenName}
              </span>
            );
          })}
        </div>
        {note && <div className="item-note">Nota: <em>{note}</em></div>}
      </div>
    </li>
  );
}
