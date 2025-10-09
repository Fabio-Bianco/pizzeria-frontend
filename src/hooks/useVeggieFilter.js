import { useState } from 'react';

// Funzione di utilità per determinare se un piatto è veggie/vegano
function isVeggie(item) {
  // Adatta questa logica in base alla struttura dei tuoi dati
  // Esempio: item.vegan === true oppure item.tags.includes('vegan')
  if (item.vegan === true) return true;
  if (item.vegetarian === true) return true;
  if (Array.isArray(item.tags) && (item.tags.includes('vegan') || item.tags.includes('vegetarian'))) return true;
  return false;
}

export function useVeggieFilter() {
  const [veggieFilterActive, setVeggieFilterActive] = useState(false);

  // Attiva/disattiva il filtro veggie
  const toggleVeggieFilter = () => setVeggieFilterActive(v => !v);
  const resetVeggieFilter = () => setVeggieFilterActive(false);

  // Filtra solo i piatti veggie
  const filterItems = (items) => {
    if (!veggieFilterActive) return items;
    const filtered = items.filter(isVeggie);
    // DEBUG: logga cosa viene filtrato
    if (typeof window !== 'undefined') {
      console.log('[VeggieFilter] Items ricevuti:', items);
      console.log('[VeggieFilter] Items filtrati:', filtered);
    }
    return filtered;
  };

  // Statistiche filtro (opzionale)
  const filterStats = {
    active: veggieFilterActive
  };

  return {
    veggieFilterActive,
    toggleVeggieFilter,
    resetVeggieFilter,
    filterItems,
    filterStats
  };
}
