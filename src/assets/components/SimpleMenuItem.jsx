import React from 'react';
import LazyImage from './LazyImage';
import AllergenBadges from './AllergenBadges';
import { VeganBadgeIcon } from './Icons';

function SimpleMenuItem({
  name,
  image,
  format,
  alcohol,
  is_gluten_free,
  allergens,
  ingredients,
  description,
  price,
  vegan,
  className = ''
}) {
  const hasFormatOrAlcohol = !!format || !!alcohol;

  return (
    <li className={`simple-menu-item ${className}`}>
      <div style={{ flexShrink: 0 }}>
        {image && typeof image === 'string' && image.trim() !== '' ? (
          <LazyImage 
            src={image} 
            alt={name || 'Immagine piatto'} 
            className="qodeup-product-image" 
            placeholder="🍽️" 
            interactive={true}
          />
        ) : (
          <div className="qodeup-product-placeholder">🍽️</div>
        )}
      </div>
      <div style={{ flex: 1, minWidth: 0, position: 'relative', display: 'flex', flexDirection: 'column' }}>
        {/* Titolo con badge inline */}
        <div style={{display:'flex',alignItems:'center',gap:'0.6rem',flexWrap:'wrap'}}>
          <h3 className="qodeup-product-name dark-mode-ready" title={name}>
            {name}
          </h3>
          {vegan && (
            <span className="item-badge modern vegan" title="Vegano">
              <VeganBadgeIcon size={14} color="#ffffff" withLabel={false} />
              <span style={{fontSize:'0.75em',fontWeight:600}}>VEGAN</span>
            </span>
          )}
          {is_gluten_free && (
            <span className="item-badge modern gluten-free" title="Senza Glutine">
              <span className="material-symbols-outlined" style={{fontSize:'1em',fontVariationSettings:"'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24"}}>spa</span>
              <span style={{fontSize:'0.75em',fontWeight:600}}>GLUTEN FREE</span>
            </span>
          )}
        </div>
        
        {/* Ingredienti subito sotto il titolo */}
        {Array.isArray(ingredients) && ingredients.length > 0 && (
          <div className="item-ingredients">
            {ingredients.map((ing, idx) => (
              <span className="item-ingredient" key={typeof ing === 'object' ? ing.id || ing.name : ing}>
                {typeof ing === 'object' ? ing.name : ing}{idx < ingredients.length - 1 ? ', ' : ''}
              </span>
            ))}
          </div>
        )}

        {/* Formato e gradazione alcolica */}
        {hasFormatOrAlcohol && (
          <div style={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            gap: '1.1em',
            margin: '0.13em 0 0 0',
            padding: 0,
            minHeight: '1.7em',
          }}>
            {format && (
              <span style={{
                display: 'inline-flex',
                alignItems: 'center',
                background: '#f3f4f6',
                color: '#374151',
                borderRadius: '6px',
                fontWeight: 600,
                fontSize: '0.98em',
                padding: '0.11em 0.7em 0.11em 0.5em',
                letterSpacing: '0.01em',
                boxShadow: '0 1px 4px #e0e7ef22',
                border: '1px solid #e5e7eb',
                gap: '0.35em',
                minWidth: 0,
                lineHeight: 1.1,
                marginRight: alcohol ? '0.3em' : 0
              }}>
                <span className="material-symbols-outlined" style={{fontSize:'1.13em',marginRight:'0.18em',color:'#64748b'}}>local_drink</span>
                <span>{format}</span>
              </span>
            )}
            {alcohol && (
              <span style={{
                display: 'inline-flex',
                alignItems: 'center',
                background: '#f0fdf4',
                color: '#0e7490',
                borderRadius: '6px',
                fontWeight: 600,
                fontSize: '0.98em',
                padding: '0.11em 0.7em 0.11em 0.5em',
                letterSpacing: '0.01em',
                boxShadow: '0 1px 4px #0ea5e922',
                border: '1px solid #bae6fd',
                gap: '0.35em',
                minWidth: 0,
                lineHeight: 1.1
              }}>
                <span className="material-symbols-outlined" style={{fontSize:'1.13em',marginRight:'0.18em',color:'#0ea5e9'}}>percent</span>
                <span>{typeof alcohol === 'number' ? alcohol.toFixed(1) + '%' : (String(alcohol).endsWith('%') ? alcohol : alcohol + '%')}</span>
              </span>
            )}
          </div>
        )}
        
        {/* Descrizione sotto ingredienti */}
        {description && (
          <p className="qodeup-product-description dark-mode-ready">
            {description}
          </p>
        )}
        {/* Badge allergeni in basso */}
        {allergens && allergens.length > 0 && (
          <div style={{marginTop:'0.8rem'}}>
            <AllergenBadges allergens={allergens} size="small" className="modern" />
          </div>
        )}
        {/* Prezzo unità in basso a destra */}
        <span className="price-value">{Number(price).toFixed(2)} €</span>
      </div>
    </li>
  );
}

export default SimpleMenuItem;
