// Icons.jsx
// Due icone SVG 100% vettoriali, pronte per React:
// - VeganBadgeIcon per la sezione vegana
// - AllergenIcon per la sezione allergeni (rinominato da GlutenIcon)

export function VeganBadgeIcon({
  size = 64,
  color = "#9E9E9E",
  strokeWidth = 2,
  withLabel = true, // mostra la scritta VEGAN sul nastro
  title = "Veggie"
}) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 64 64"
      role="img"
      aria-label={title}
    >
      <title>{title}</title>
      {/* Cerchio doppio (bordo a "medaglia") */}
      <circle cx="32" cy="32" r="22" fill="none" stroke={color} strokeWidth={strokeWidth}/>
      <circle cx="32" cy="32" r="28" fill="none" stroke={color} strokeWidth={strokeWidth}/>

      {/* Foglie stilizzate */}
      <g fill="none" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round">
        {/* gambo */}
        <path d="M32 40 C33 36, 33 30, 32 26" />
        {/* foglia dx */}
        <path d="M32 30 C38 28, 41 24, 42 20 C38 21, 34 24, 32 30 Z" fill="none"/>
        {/* foglia sx */}
        <path d="M32 33 C27 32, 24 29, 22 26 C24 27, 28 28, 32 33 Z" fill="none"/>
      </g>

      {/* Nastro diagonale */}
      <g transform="rotate(-15 32 32)">
        <rect
          x="10" y="28" width="44" height="12" rx="3" ry="3"
          fill={color} opacity="0.2"
          stroke={color} strokeWidth={strokeWidth}
        />
        {withLabel && (
          <text
            x="32" y="36"
            textAnchor="middle"
            fontFamily="system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial, sans-serif"
            fontSize="8"
            fontWeight="800"
            fill={color}
          >
            VEGAN
          </text>
        )}
      </g>
    </svg>
  );
}

export function AllergenIcon({
  size = 64,
  color = "#777777",
  strokeWidth = 2,
  title = "Allergeni"
}) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 64 64"
      role="img"
      aria-label={title}
    >
      <title>{title}</title>
      {/* Cerchio */}
      <circle cx="32" cy="32" r="26" fill="none" stroke={color} strokeWidth={strokeWidth} />

      {/* Spiga stilizzata */}
      <g fill="none" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round">
        {/* stelo */}
        <path d="M30 18 C31 28, 31 38, 30 46" />
        {/* granelli (foglie) come piccole ellissi alternate */}
        <path d="M30 22 C26 20, 24 18, 23 16" />
        <path d="M30 26 C34 24, 36 22, 37 20" />
        <path d="M30 30 C26 28, 24 26, 23 24" />
        <path d="M30 34 C34 32, 36 30, 37 28" />
        <path d="M30 38 C26 36, 24 34, 23 32" />
        <path d="M30 42 C34 40, 36 38, 37 36" />
      </g>
    </svg>
  );
}

// Componente esempio per testing
export function IconsExample() {
  return (
    <div style={{ display: "flex", gap: 24, alignItems: "center" }}>
      <VeganBadgeIcon size={72} color="#777777" withLabel />
      <AllergenIcon size={72} color="#777777" />
    </div>
  );
}
