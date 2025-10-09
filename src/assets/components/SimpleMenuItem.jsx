import React from 'react';
import LazyImage from './LazyImage';
import { AllergenIcon } from './Icons';

// Mapping icone allergeni (Material Symbols)
const ALLERGEN_ICON_MAP = {
  'LATTOSIO': 'icecream',
  'FRUTTA A GUSCIO': 'nutrition',
  'UOVA': 'egg',
  'PESCE': 'fish',
  'ARACHIDI': 'spa', // nessuna icona perfetta, alternativa
  'SOIA': 'eco',
  'CROSTACEI': 'cruelty_free',
  'SEDANO': 'grass',
  'SENAPE': 'science',
  'SESAMO': 'restaurant',
  'SOLFITI': 'local_drink',
  'LUPINI': 'spa',
  'MOLLUSCHI': 'waves',
};
// Esempio di props: { name, price, description, note, vegan, allergens, ingredients, image }
export default function SimpleMenuItem({ name, price, description, note, vegan, is_gluten_free, allergens = [], ingredients = [], image }) {
  return (
    <li className="simple-menu-item qodeup-product-card" tabIndex={0} style={{
      position: 'relative',
      display: 'flex',
      alignItems: 'center',
      gap: '1.5em',
      padding: '1.3em 0.7em 1.3em 0.7em',
      background: '#fff',
      borderRadius: '18px',
      boxShadow: '0 4px 18px #0002, 0 1.5px 4px #fde04755',
      margin: 0,
      marginBottom: '2em',
      border: '1.5px solid #f3f3f3'
    }}>
      {/* Contenitore icone allergeni in alto a destra */}
      {allergens.length > 0 && (
        <div style={{
          position: 'absolute',
          top: 10,
          right: 14,
          display: 'flex',
          gap: '0.3em',
          zIndex: 2
        }}>
          {allergens.map(a => {
            const allergenName = typeof a === 'object' ? a.name : a;
            const allergenId = typeof a === 'object' ? a.id || a.name : a;
            const icon = ALLERGEN_ICON_MAP[allergenName?.toUpperCase?.()] || 'warning';
            return (
              <span
                key={allergenId}
                className="allergen-icon"
                aria-label={`Allergene: ${allergenName}`}
                title={allergenName}
                tabIndex={0}
                style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: 22, height: 22, borderRadius: 4, background: '#f6f6f6', fontSize: '1em', border: '1px solid #eee', padding: 0 }}
              >
                <span className="material-symbols-outlined" style={{fontSize:'1.1em',lineHeight:1,color:'#d8a62a'}}>{icon}</span>
              </span>
            );
          })}
        </div>
      )}
      {/* ...existing code... */}
      <div style={{flexShrink:0}}>
        {image ? (
          <LazyImage src={image} alt={name} className="qodeup-product-image" placeholder="🍽️" style={{width:64,height:64,borderRadius:12,objectFit:'cover',background:'#f6f6f6'}} />
        ) : (
          <div className="qodeup-product-placeholder" style={{width:64,height:64,borderRadius:12,background:'#f6f6f6',display:'flex',alignItems:'center',justifyContent:'center',fontSize:'2em'}}>🍽️</div>
        )}
      </div>
      <div style={{flex:1,display:'flex',flexDirection:'column',gap:'0.2em',minWidth:0}}>
        <div style={{display:'flex',alignItems:'center',marginBottom:'0.15em'}}>
          <span
            className="qodeup-product-name"
            title={name}
            style={{
              fontWeight: 600,
              fontSize: '1.13em',
              color: '#333',
              whiteSpace: 'nowrap',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              letterSpacing: '0.01em',
              lineHeight: 1.2,
              display: 'inline-block',
              verticalAlign: 'middle',
              marginRight: (vegan || is_gluten_free) ? '0.38em' : 0
            }}
          >
            {name}
          </span>
          {vegan && (
            <span
              className="item-badge vegan"
              aria-label="Piatto vegano"
              title="Vegano"
              style={{
                background: '#e6f9e6',
                color: '#16a34a',
                borderRadius: '7px',
                padding: '0.13em 0.7em 0.13em 0.5em',
                fontWeight: 700,
                fontSize: '1em',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.38em',
                boxShadow: '0 1px 4px #16a34a22',
                letterSpacing: '0.01em',
                lineHeight: 1.1,
                minWidth: 0,
                verticalAlign: 'middle',
                marginRight: is_gluten_free ? '0.38em' : 0
              }}
            >
              <span style={{fontSize:'1.15em',marginRight:'0.13em'}}></span>
              <span style={{fontSize:'0.97em',fontWeight:600,letterSpacing:'0.01em'}}>Vegan</span>
            </span>
          )}
          {is_gluten_free && (
            <span
              className="item-badge gluten-free"
              aria-label="Senza glutine"
              title="Gluten Free"
              style={{
                background: '#f0fdf4',
                color: '#0e7490',
                borderRadius: '7px',
                padding: '0.13em 0.7em 0.13em 0.5em',
                fontWeight: 700,
                fontSize: '1em',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.38em',
                boxShadow: '0 1px 4px #0ea5e922',
                letterSpacing: '0.01em',
                lineHeight: 1.1,
                minWidth: 0,
                verticalAlign: 'middle'
              }}
            >
              <span style={{fontSize:'1.13em',marginRight:'0.13em'}}>🌾</span>
              <span style={{fontSize:'0.97em',fontWeight:600,letterSpacing:'0.01em'}}>Gluten Free</span>
            </span>
          )}
        </div>
        {/* ...resto del contenuto card... */}
        {description && (
          <div className="qodeup-product-description" style={{color:'#141414',fontSize:'1.01em',margin:'0.1em 0 0.2em 0',lineHeight:1.35,overflow:'hidden',textOverflow:'ellipsis',whiteSpace:'nowrap'}}>{description}</div>
        )}
        {Array.isArray(ingredients) && ingredients.length > 0 && (
          <div className="item-ingredients" style={{ color:'#b0b0b0', fontSize:'0.97em', fontStyle:'italic', margin:'0.1em 0 0.2em 0', lineHeight:1.2, textAlign:'left', overflow:'hidden', textOverflow:'ellipsis', whiteSpace:'nowrap' }}>
            ({ingredients.map((ing, idx) => (
              <span className="item-ingredient" key={typeof ing === 'object' ? ing.id || ing.name : ing}>
                {typeof ing === 'object' ? ing.name : ing}{idx < ingredients.length - 1 ? ', ' : ''}
              </span>
            ))})
          </div>
        )}
        {note && <div className="item-note" style={{marginTop:'0.2em'}}>Nota: <em>{note}</em></div>}
        <div style={{display:'flex',alignItems:'flex-end',marginTop:'0.7em',borderTop:'1px solid #f0f0f0',paddingTop:'0.5em'}}>
          <div style={{display:'flex',flexDirection:'column',gap:'0.1em'}}>
            <span style={{fontSize:'0.98em',color:'#222',fontWeight:500}}>Prezzo</span>
          </div>
          <span style={{flex:1}}></span>
          <span className="price-value" style={{fontWeight:700,color:'#16a34a',fontSize:'1.13em',whiteSpace:'nowrap'}}>{Number(price).toFixed(2)} €</span>
        </div>
      </div>
    </li>
  );
}
