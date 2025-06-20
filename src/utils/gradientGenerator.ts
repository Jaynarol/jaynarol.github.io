// Gradient color schemes for beautiful placeholder images
export const gradientSchemes = [
  // Soft Purple Dream
  {
    id: 'soft-purple',
    colors: ['#a8edea', '#fed6e3', '#d299c2', '#a8c0ff', '#c7ceea'],
    overlays: ['#ffeaa7', '#fab1a0', '#fd79a8'],
  },
  // Gentle Blue Sky
  {
    id: 'gentle-blue',
    colors: ['#74b9ff', '#0984e3', '#00b894', '#00cec9', '#6c5ce7'],
    overlays: ['#81ecec', '#a29bfe', '#fd79a8'],
  },
  // Warm Sunset
  {
    id: 'warm-sunset',
    colors: ['#fdcb6e', '#e17055', '#fd79a8', '#fdcb6e', '#fab1a0'],
    overlays: ['#ffeaa7', '#fab1a0', '#fd79a8'],
  },
  // Mint Fresh
  {
    id: 'mint-fresh',
    colors: ['#00b894', '#00cec9', '#74b9ff', '#a29bfe', '#6c5ce7'],
    overlays: ['#81ecec', '#a29bfe', '#ddd6fe'],
  },
  // Rose Garden
  {
    id: 'rose-garden',
    colors: ['#fd79a8', '#fdcb6e', '#fab1a0', '#ffeaa7', '#e17055'],
    overlays: ['#ffeaa7', '#fab1a0', '#fd79a8'],
  },
  // Lavender Fields
  {
    id: 'lavender-fields',
    colors: ['#a29bfe', '#6c5ce7', '#74b9ff', '#00cec9', '#00b894'],
    overlays: ['#ddd6fe', '#a8c0ff', '#c7ceea'],
  },
  // Coral Reef
  {
    id: 'coral-reef',
    colors: ['#fab1a0', '#e17055', '#fd79a8', '#fdcb6e', '#ffeaa7'],
    overlays: ['#ffeaa7', '#fab1a0', '#fd79a8'],
  },
  // Ocean Breeze
  {
    id: 'ocean-breeze',
    colors: ['#81ecec', '#74b9ff', '#0984e3', '#00cec9', '#00b894'],
    overlays: ['#ddd6fe', '#a8c0ff', '#c7ceea'],
  },
]

// Generate SVG with specific gradient scheme
export function generateGradientSVG(schemeIndex: number = 0): string {
  const scheme = gradientSchemes[schemeIndex % gradientSchemes.length]

  return `<svg width="800" height="450" viewBox="0 0 800 450" fill="none" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <!-- Main gradient -->
    <linearGradient id="mainGradient" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:${scheme.colors[0]};stop-opacity:1" />
      <stop offset="25%" style="stop-color:${scheme.colors[1]};stop-opacity:1" />
      <stop offset="50%" style="stop-color:${scheme.colors[2]};stop-opacity:1" />
      <stop offset="75%" style="stop-color:${scheme.colors[3]};stop-opacity:1" />
      <stop offset="100%" style="stop-color:${scheme.colors[4]};stop-opacity:1" />
    </linearGradient>
    
    <!-- Secondary gradient -->
    <linearGradient id="secondaryGradient" x1="100%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" style="stop-color:${scheme.overlays[0]};stop-opacity:0.6" />
      <stop offset="50%" style="stop-color:${scheme.overlays[1]};stop-opacity:0.4" />
      <stop offset="100%" style="stop-color:${scheme.overlays[2]};stop-opacity:0.3" />
    </linearGradient>
    
    <!-- Accent gradient -->
    <radialGradient id="accentGradient" cx="50%" cy="50%" r="50%">
      <stop offset="0%" style="stop-color:${scheme.colors[0]};stop-opacity:0.2" />
      <stop offset="100%" style="stop-color:${scheme.colors[1]};stop-opacity:0.1" />
    </radialGradient>
    
    <!-- Geometric pattern -->
    <pattern id="geometricPattern" patternUnits="userSpaceOnUse" width="80" height="80">
      <rect width="80" height="80" fill="transparent"/>
      <circle cx="40" cy="40" r="1.5" fill="white" opacity="0.08"/>
      <circle cx="20" cy="20" r="1" fill="white" opacity="0.05"/>
      <circle cx="60" cy="20" r="1" fill="white" opacity="0.05"/>
      <circle cx="20" cy="60" r="1" fill="white" opacity="0.05"/>
      <circle cx="60" cy="60" r="1" fill="white" opacity="0.05"/>
    </pattern>
  </defs>
  
  <!-- Base gradient background -->
  <rect width="800" height="450" fill="url(#mainGradient)"/>
  
  <!-- Overlay shapes -->
  <ellipse cx="200" cy="120" rx="280" ry="180" fill="url(#secondaryGradient)" transform="rotate(12 200 120)" opacity="0.7"/>
  <ellipse cx="600" cy="330" rx="220" ry="130" fill="url(#accentGradient)" transform="rotate(-15 600 330)" opacity="0.8"/>
  
  <!-- Abstract geometric shapes -->
  <path d="M 0 320 Q 180 280 360 340 T 800 300 L 800 450 L 0 450 Z" fill="url(#secondaryGradient)" opacity="0.25"/>
  
  <!-- Floating circles -->
  <circle cx="140" cy="90" r="35" fill="white" opacity="0.08"/>
  <circle cx="660" cy="130" r="22" fill="white" opacity="0.12"/>
  <circle cx="110" cy="370" r="28" fill="white" opacity="0.06"/>
  <circle cx="710" cy="320" r="45" fill="white" opacity="0.05"/>
  
  <!-- Subtle pattern overlay -->
  <rect width="800" height="450" fill="url(#geometricPattern)"/>
  
  <!-- Light overlay for depth -->
  <rect width="800" height="450" fill="url(#accentGradient)" opacity="0.15"/>
</svg>`
}

// Generate data URL for inline SVG
export function generateGradientDataURL(schemeIndex: number = 0): string {
  const svg = generateGradientSVG(schemeIndex)
  return `data:image/svg+xml;base64,${btoa(svg)}`
}

// Get random gradient scheme index
export function getRandomGradientIndex(): number {
  return Math.floor(Math.random() * gradientSchemes.length)
}
