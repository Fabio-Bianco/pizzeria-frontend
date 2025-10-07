import { useMemo } from 'react'
import './FilterStats.css'

/**
 * Componente per mostrare le statistiche del filtro allergeni
 */
export default function FilterStats({ 
  originalCounts, 
  filteredCounts, 
  selectedAllergensCount,
  className = '' 
}) {
  // Calcolo delle statistiche
  const stats = useMemo(() => {
    const originalTotal = Object.values(originalCounts).reduce((sum, count) => sum + count, 0)
    const filteredTotal = Object.values(filteredCounts).reduce((sum, count) => sum + count, 0)
    
    const hiddenCount = originalTotal - filteredTotal
    const visibilityPercentage = originalTotal > 0 ? Math.round((filteredTotal / originalTotal) * 100) : 100
    
    return {
      originalTotal,
      filteredTotal,
      hiddenCount,
      visibilityPercentage,
      isFiltered: hiddenCount > 0
    }
  }, [originalCounts, filteredCounts])

  // Non mostrare nulla se non ci sono filtri attivi
  if (!stats.isFiltered) {
    return null
  }

  return (
    <div className={`filter-stats ${className}`}>
      <div className="filter-stats-content">
        <div className="filter-stats-main">
          <span className="filter-stats-icon">📊</span>
          <span className="filter-stats-text">
            <strong>{stats.filteredTotal}</strong> di <strong>{stats.originalTotal}</strong> piatti disponibili
          </span>
          <span className="filter-stats-percentage">
            ({stats.visibilityPercentage}%)
          </span>
        </div>
        
        {stats.hiddenCount > 0 && (
          <div className="filter-stats-details">
            <span className="filter-stats-hidden">
              {stats.hiddenCount} piatti nascosti con allergeni selezionati
            </span>
          </div>
        )}
        
        {selectedAllergensCount > 0 && (
          <div className="filter-stats-filters">
            <span className="filter-stats-filter-count">
              {selectedAllergensCount} filtro{selectedAllergensCount > 1 ? 'i' : ''} attivo{selectedAllergensCount > 1 ? 'i' : ''}
            </span>
          </div>
        )}
      </div>
    </div>
  )
}

/**
 * Componente compatto per le statistiche
 */
export function FilterStatsCompact({ 
  filteredTotal, 
  originalTotal, 
  selectedAllergensCount,
  className = '' 
}) {
  if (selectedAllergensCount === 0) {
    return null
  }

  return (
    <div className={`filter-stats-compact ${className}`}>
      <span className="filter-stats-compact-icon">🔍</span>
      <span className="filter-stats-compact-text">
        {filteredTotal}/{originalTotal} piatti
      </span>
      {selectedAllergensCount > 0 && (
        <span className="filter-stats-compact-badge">
          {selectedAllergensCount}
        </span>
      )}
    </div>
  )
}