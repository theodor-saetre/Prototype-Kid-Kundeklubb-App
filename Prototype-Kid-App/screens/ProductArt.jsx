// Inline SVG product illustrations — always load, always match
window.ProductArt = ({ kind, bg, stroke = '#1F1B16', size = '100%' }) => {
  const svgs = {
    pute: (
      // Linen pillow — rounded square with stitching
      <svg viewBox="0 0 120 120" width={size} height={size} preserveAspectRatio="xMidYMid meet">
        <rect x="20" y="28" width="80" height="64" rx="10" fill="none" stroke={stroke} strokeWidth="1.5"/>
        <rect x="24" y="32" width="72" height="56" rx="6" fill="none" stroke={stroke} strokeWidth="0.8" opacity="0.4"/>
        <path d="M 30 38 Q 45 30 60 38 Q 75 46 90 38" stroke={stroke} strokeWidth="0.9" fill="none" opacity="0.35"/>
        <path d="M 30 82 Q 45 90 60 82 Q 75 74 90 82" stroke={stroke} strokeWidth="0.9" fill="none" opacity="0.35"/>
        {/* tassels */}
        <line x1="20" y1="28" x2="14" y2="22" stroke={stroke} strokeWidth="1.2"/>
        <line x1="100" y1="28" x2="106" y2="22" stroke={stroke} strokeWidth="1.2"/>
        <line x1="20" y1="92" x2="14" y2="98" stroke={stroke} strokeWidth="1.2"/>
        <line x1="100" y1="92" x2="106" y2="98" stroke={stroke} strokeWidth="1.2"/>
      </svg>
    ),
    vase: (
      // Ceramic vase silhouette with branches
      <svg viewBox="0 0 120 120" width={size} height={size} preserveAspectRatio="xMidYMid meet">
        {/* branches above */}
        <path d="M 60 36 Q 50 22 44 12 M 60 36 Q 70 24 76 16 M 60 36 Q 58 24 56 14" stroke={stroke} strokeWidth="1" fill="none" opacity="0.7"/>
        <circle cx="44" cy="12" r="2" fill={stroke} opacity="0.7"/>
        <circle cx="76" cy="16" r="2" fill={stroke} opacity="0.7"/>
        <circle cx="56" cy="14" r="1.8" fill={stroke} opacity="0.7"/>
        {/* vase body */}
        <path d="M 48 38 L 48 46 Q 36 56 36 72 Q 36 92 60 96 Q 84 92 84 72 Q 84 56 72 46 L 72 38 Z"
          fill="none" stroke={stroke} strokeWidth="1.6" strokeLinejoin="round"/>
        <ellipse cx="60" cy="38" rx="12" ry="2.5" fill="none" stroke={stroke} strokeWidth="1.4"/>
        <line x1="44" y1="74" x2="76" y2="74" stroke={stroke} strokeWidth="0.6" opacity="0.3"/>
      </svg>
    ),
    lampe: (
      // Table lamp with shade
      <svg viewBox="0 0 120 120" width={size} height={size} preserveAspectRatio="xMidYMid meet">
        {/* shade */}
        <path d="M 36 30 L 84 30 L 80 60 L 40 60 Z" fill="none" stroke={stroke} strokeWidth="1.6" strokeLinejoin="round"/>
        <line x1="34" y1="60" x2="86" y2="60" stroke={stroke} strokeWidth="1.6"/>
        {/* light glow lines */}
        <line x1="42" y1="40" x2="42" y2="55" stroke={stroke} strokeWidth="0.6" opacity="0.3"/>
        <line x1="78" y1="40" x2="78" y2="55" stroke={stroke} strokeWidth="0.6" opacity="0.3"/>
        {/* neck */}
        <line x1="60" y1="60" x2="60" y2="86" stroke={stroke} strokeWidth="1.6"/>
        {/* base */}
        <ellipse cx="60" cy="92" rx="20" ry="4" fill="none" stroke={stroke} strokeWidth="1.6"/>
        <path d="M 44 92 L 46 100 L 74 100 L 76 92" fill="none" stroke={stroke} strokeWidth="1.6" strokeLinejoin="round"/>
      </svg>
    ),
    skal: (
      // Bowls stacked + one tilted (skålsett)
      <svg viewBox="0 0 120 120" width={size} height={size} preserveAspectRatio="xMidYMid meet">
        {/* back bowl tilted */}
        <ellipse cx="86" cy="44" rx="20" ry="6" fill="none" stroke={stroke} strokeWidth="1.4"/>
        <path d="M 66 44 Q 72 64 86 64 Q 100 64 106 44" fill="none" stroke={stroke} strokeWidth="1.4"/>
        {/* front large bowl */}
        <ellipse cx="46" cy="62" rx="34" ry="8" fill="none" stroke={stroke} strokeWidth="1.6"/>
        <path d="M 12 62 Q 22 92 46 92 Q 70 92 80 62" fill="none" stroke={stroke} strokeWidth="1.6"/>
        <ellipse cx="46" cy="62" rx="30" ry="6" fill="none" stroke={stroke} strokeWidth="0.7" opacity="0.35"/>
        {/* small bowl front */}
        <ellipse cx="86" cy="84" rx="14" ry="4" fill="none" stroke={stroke} strokeWidth="1.4"/>
        <path d="M 72 84 Q 76 98 86 98 Q 96 98 100 84" fill="none" stroke={stroke} strokeWidth="1.4"/>
      </svg>
    ),
    pledd: (
      // Folded throw blanket
      <svg viewBox="0 0 120 120" width={size} height={size} preserveAspectRatio="xMidYMid meet">
        {/* folded blanket — 3 layers */}
        <path d="M 22 34 L 98 30 L 96 50 L 20 54 Z" fill="none" stroke={stroke} strokeWidth="1.5" strokeLinejoin="round"/>
        <path d="M 24 52 L 100 48 L 98 70 L 22 74 Z" fill="none" stroke={stroke} strokeWidth="1.5" strokeLinejoin="round"/>
        <path d="M 26 72 L 102 68 L 100 92 L 24 96 Z" fill="none" stroke={stroke} strokeWidth="1.5" strokeLinejoin="round"/>
        {/* texture lines */}
        <line x1="30" y1="40" x2="92" y2="38" stroke={stroke} strokeWidth="0.5" opacity="0.35"/>
        <line x1="32" y1="60" x2="94" y2="58" stroke={stroke} strokeWidth="0.5" opacity="0.35"/>
        <line x1="34" y1="82" x2="96" y2="80" stroke={stroke} strokeWidth="0.5" opacity="0.35"/>
        {/* fringe */}
        <g stroke={stroke} strokeWidth="0.7" opacity="0.6">
          <line x1="28" y1="92" x2="28" y2="100"/>
          <line x1="36" y1="92" x2="36" y2="100"/>
          <line x1="44" y1="92" x2="44" y2="100"/>
          <line x1="52" y1="92" x2="52" y2="100"/>
          <line x1="60" y1="92" x2="60" y2="100"/>
          <line x1="68" y1="92" x2="68" y2="100"/>
          <line x1="76" y1="92" x2="76" y2="100"/>
          <line x1="84" y1="92" x2="84" y2="100"/>
          <line x1="92" y1="92" x2="92" y2="100"/>
        </g>
      </svg>
    ),
    lys: (
      // Three pillar candles, varying heights with flames
      <svg viewBox="0 0 120 120" width={size} height={size} preserveAspectRatio="xMidYMid meet">
        {/* flames */}
        <path d="M 36 22 Q 32 28 36 34 Q 40 28 36 22 Z" fill={stroke} opacity="0.55"/>
        <path d="M 60 14 Q 56 22 60 30 Q 64 22 60 14 Z" fill={stroke} opacity="0.55"/>
        <path d="M 84 26 Q 80 32 84 38 Q 88 32 84 26 Z" fill={stroke} opacity="0.55"/>
        {/* wicks */}
        <line x1="36" y1="34" x2="36" y2="40" stroke={stroke} strokeWidth="1"/>
        <line x1="60" y1="30" x2="60" y2="36" stroke={stroke} strokeWidth="1"/>
        <line x1="84" y1="38" x2="84" y2="44" stroke={stroke} strokeWidth="1"/>
        {/* candles */}
        <rect x="28" y="40" width="16" height="56" rx="1.5" fill="none" stroke={stroke} strokeWidth="1.5"/>
        <rect x="52" y="36" width="16" height="60" rx="1.5" fill="none" stroke={stroke} strokeWidth="1.5"/>
        <rect x="76" y="44" width="16" height="52" rx="1.5" fill="none" stroke={stroke} strokeWidth="1.5"/>
        {/* tray */}
        <ellipse cx="60" cy="98" rx="44" ry="3" fill="none" stroke={stroke} strokeWidth="1.2"/>
      </svg>
    ),
  };
  return (
    <div style={{
      width: '100%', height: '100%',
      background: bg,
      display: 'grid', placeItems: 'center',
      borderRadius: 'inherit',
    }}>
      <div style={{ width: '78%', height: '78%' }}>
        {svgs[kind] || svgs.pute}
      </div>
    </div>
  );
};
