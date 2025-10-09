import React from 'react';
import LazyImage from './LazyImage';
import AllergenBadges from './AllergenBadges';

function SimpleMenuItem({
  name,
  image,
  format,
  alcohol,
  is_gluten_free,
  allergens,
  ingredients,
  description,
  price
}) {
  const hasFormatOrAlcohol = !!format || !!alcohol;

  return (
    <li className="simple-menu-item" style={{
      display:'flex',
      flexDirection:'row',
      alignItems:'stretch',
      gap:'1.5em',
      padding:'1.2em 0',
      borderBottom:'1px solid #f3f3f3',
      position:'relative',
      background:'#fff',
      minHeight:120,
      minWidth:320,
      boxSizing:'border-box',
      width:'100%',
      marginTop:'18px',
      marginBottom:'18px'
    }}>
      <div style={{flexShrink:0,display:'flex',flexDirection:'column',alignItems:'flex-start',height:'100%',justifyContent:'flex-start',minWidth:64,gap:'1.5em',position:'relative'}}>
        <div style={{width:64, height:64, position:'relative', display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'flex-start'}}>
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
          {is_gluten_free && (
            <span
              className="item-badge gluten-free"
              aria-label="Senza glutine"
              title="Gluten Free"
              style={{
                marginTop: 8,
                background: '#f0fdf4',
                color: '#0e7490',
                borderRadius: '7px',
                padding: '0.13em 1em 0.13em 0.7em',
                fontWeight: 700,
                fontSize: '1em',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.38em',
                boxShadow: '0 1px 4px #0ea5e922',
                letterSpacing: '0.01em',
                lineHeight: 1.1,
                minWidth: 90,
                whiteSpace: 'nowrap',
                verticalAlign: 'middle',
              }}
            >
              <span style={{fontSize:'1.13em',marginRight:'0.13em'}}>🌾</span>
              <span style={{fontSize:'0.97em',fontWeight:600,letterSpacing:'0.01em'}}>Gluten Free</span>
            </span>
          )}
        </div>
      </div>
      <div style={{flex:1,display:'flex',flexDirection:'column',gap:'0.7em',minWidth:0,justifyContent:'flex-start',alignItems:'flex-start',height:'100%',paddingTop:0,marginTop:0,position:'relative'}}>
        {/* Allergen icons in alto a destra */}
        <div style={{position:'absolute',top:8,right:8,zIndex:2,display:'flex',justifyContent:'flex-end',width:'auto',maxWidth:'60%',pointerEvents:'none'}}>
          <AllergenBadges allergens={allergens} size="small" />
        </div>
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
            marginRight: 0
          }}
        >
          {name}
        </span>
        {/* Formato e gradazione alcolica subito sotto il titolo */}
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
            margin: '0.18em 0 2.7em 0',
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
      </div>
    </li>
  );
}

export default SimpleMenuItem;
