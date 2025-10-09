import React from "react";
import "../../styles/simple-menu-item.css";

// Utility per normalizzare stringa o oggetto lingua
function getText(val, label = "") {
  if (typeof val === "string") return val;
  if (val && typeof val === "object") {
    if (val.it) return val.it;
    // Cerca la prima stringa tra le chiavi
    const firstStr = Object.values(val).find(v => typeof v === "string" && v.trim());
    if (firstStr) return firstStr;
    // Log per debug
    if (typeof window !== 'undefined') {
      console.warn(`[SimpleMenuItem] ${label} oggetto non gestito:`, val);
    }
    return "";
  }
  return "";
}

export default function SimpleMenuItem({
  name,
  price,
  description,
  note,
  vegan,
  allergens = [],
  ingredients = [],
  image
}) {
  return (
    <li className="simple-menu-item">
      <div className="item-row">
  <span className="item-name">{getText(name, "name")}</span>
        {price && (
          <span className="item-price">€{Number(price).toFixed(2)}</span>
        )}
        {vegan && (
          <span className="item-badge vegan" title="Vegano o vegetariano">Veg</span>
        )}
        {allergens.length > 0 && (
          <span className="item-badges-group">
            {allergens.map((a, i) => (
              <span className="item-badge allergen" key={a.id || a.name || i} title={a.name || a}>{getText(a.name || a, "allergen")}</span>
            ))}
          </span>
        )}
      </div>
      {description && (
        <div className="item-description">{getText(description, "description")}</div>
      )}
      {ingredients.length > 0 && (
        <div className="item-ingredients">
          <span className="item-ingredients-label">Ingredienti:</span> {ingredients.map((ing, i) => getText(ing.name || ing, "ingredient")).join(", ")}
        </div>
      )}
  {note && <div className="item-note">{getText(note, "note")}</div>}
    </li>
  );
}
