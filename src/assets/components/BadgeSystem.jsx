import React from 'react'

// Badge semplificato con funzionalità essenziali
export function SemanticBadge({
  children,
  variant = 'default',
  size = 'medium',
  icon,
  removable = false,
  onRemove,
  className = '',
  count,
  ...props
}) {
  const badgeClasses = `badge badge-${variant} badge-${size} ${className}`.trim()

  return (
    <span className={badgeClasses} {...props}>
      {icon && <span className="badge-icon">{icon}</span>}
      <span>{children}</span>
      {count && count > 0 && (
        <span className="badge-count">{count > 99 ? '99+' : count}</span>
      )}
      {removable && (
        <button 
          className="badge-remove" 
          onClick={(e) => {
            e.stopPropagation()
            onRemove?.()
          }}
        >
          ×
        </button>
      )}
    </span>
  )
}

// Alias per compatibilità
export { SemanticBadge as Badge }
export default SemanticBadge