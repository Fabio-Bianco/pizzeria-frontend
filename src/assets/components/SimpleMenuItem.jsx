import React, { useState } from 'react';
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
export default function SimpleMenuItem({ name, price, description, note, vegan, is_gluten_free, allergens = [], ingredients = [], image, category }) {
  return (
    <li className="simple-menu-item qodeup-product-card" tabIndex={0} style={{
      position: 'relative',
      display: 'flex',
      alignItems: 'center',
      gap: '3em',
  padding: '2.1em 1.3em 2.1em 1.3em', // padding verticale aumentato
  minHeight: '150px', // altezza minima ancora maggiore
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
      {/* Badge categoria in alto a sinistra */}
      {category && (() => {
        const catName = typeof category === 'object' ? (category.name || '').toLowerCase() : (category || '').toLowerCase();
        let bg = '#f3f4f6';
        let color = '#374151';
        let border = '1px solid #e5e7eb';
        if(catName.includes('classica') || catName.includes('classiche')) {
          bg = '#d1fae5'; color = '#047857'; border = '1px solid #a7f3d0';
        } else if(catName.includes('bianca') || catName.includes('bianche')) {
          bg = '#fef3c7'; color = '#b45309'; border = '1px solid #fde68a';
        } else if(catName.includes('special') || catName.includes('speciali')) {
          bg = '#ede9fe'; color = '#6d28d9'; border = '1px solid #ddd6fe';
        }
        return (
          <div style={{
            position: 'absolute',
            top: 10,
            left: 14,
            zIndex: 2,
            background: bg,
            color: color,
            fontWeight: 500,
            fontSize: '0.85em',
            padding: '0.09em 0.55em',
            borderRadius: '6px',
            letterSpacing: '0.01em',
            border: border,
            minWidth: 0,
            maxWidth: '60%',
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            pointerEvents: 'none',
            boxShadow: 'none',
            opacity: 0.85
          }}
            title={typeof category === 'object' ? category.name : category}
          >
            {typeof category === 'object' ? category.name : category}
          </div>
        );
      })()}
      <div style={{
        flexShrink:0,
        display:'flex',
        flexDirection:'column',
        alignItems:'flex-start',
        height:'100%',
        justifyContent:'flex-start',
        minWidth:64,
        gap:'1.5em' // aria tra immagine e prezzo
      }}>
        {image && typeof image === 'string' && image.trim() !== '' ? (
          <LazyImage 
            src={image} 
            alt={name || 'Immagine piatto'} 
            className="qodeup-product-image" 
            placeholder="🍽️" 
            style={{width:64,height:64,borderRadius:12,objectFit:'cover',background:'#e6fbe6'}} 
          />
        ) : (
          <div className="qodeup-product-placeholder" style={{width:64,height:64,borderRadius:12,background:'#f6f6f6',display:'flex',alignItems:'center',justifyContent:'center',fontSize:'2em'}}>🍽️</div>
        )}
        {/* Rimosso label 'Prezzo', lasciato solo prezzo unità in basso a destra */}
      </div>
  <div style={{
    flex:1,
    display:'flex',
    flexDirection:'column',
    gap:'0.7em',
    minWidth:0,
    justifyContent:'flex-start',
    alignItems:'flex-start',
    height:'100%',
    paddingTop:0,
    marginTop:0,
    position:'relative'
  }}>
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
        {/* Ingredienti subito sotto il nome, poi la descrizione */}
        {Array.isArray(ingredients) && ingredients.length > 0 && (
          <div className="item-ingredients" style={{ color:'#e0e0e0', fontSize:'0.97em', fontStyle:'italic', margin:'0.1em 0 0.2em 0', lineHeight:1.2, textAlign:'left', overflow:'hidden', textOverflow:'ellipsis', whiteSpace:'nowrap' }}>
            ({ingredients.map((ing, idx) => (
              <span className="item-ingredient" key={typeof ing === 'object' ? ing.id || ing.name : ing}>
                {typeof ing === 'object' ? ing.name : ing}{idx < ingredients.length - 1 ? ', ' : ''}
              </span>
            ))})
          </div>
        )}
        {description && (
          <div style={{
            width: '100%',
            margin: '0.18em 0 2.7em 0', // gap ancora maggiore sotto la descrizione
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'flex-start',
            gap: 0
          }}>
            <span
              className="qodeup-product-description"
              style={{
                color: '#000',
                fontSize: '1.04em',
                lineHeight: 1.38,
                textAlign: 'left',
                overflow: 'visible',
                textOverflow: 'clip',
                whiteSpace: 'normal',
                flex: 1,
                minWidth: 0,
                fontWeight: 400,
                paddingLeft: 0
              }}
            >
              {description}
            </span>
          </div>
        )}
        {/* Prezzo unità in basso a destra */}
        <span className="price-value" style={{
          fontWeight:700,
          color:'#16a34a',
          fontSize:'1.13em',
          whiteSpace:'nowrap',
          textAlign:'right',
          position:'absolute',
          right:0,
          bottom:0,
          marginBottom:'0.2em',
          marginRight:'0.2em',
          background:'#fff',
          padding:'0 0.3em'
        }}>{Number(price).toFixed(2)} €</span>
  {/* Nessuna sezione note, ripristino layout stabile precedente */}

      </div>
    </li>
  );
}
