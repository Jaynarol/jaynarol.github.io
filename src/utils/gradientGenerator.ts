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

// Helper function to convert hex to HSL
function hexToHsl(hex: string): [number, number, number] {
  const r = parseInt(hex.slice(1, 3), 16) / 255
  const g = parseInt(hex.slice(3, 5), 16) / 255
  const b = parseInt(hex.slice(5, 7), 16) / 255

  const max = Math.max(r, g, b)
  const min = Math.min(r, g, b)
  let h = 0
  let s = 0
  const l = (max + min) / 2

  if (max !== min) {
    const d = max - min
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min)
    switch (max) {
      case r:
        h = (g - b) / d + (g < b ? 6 : 0)
        break
      case g:
        h = (b - r) / d + 2
        break
      case b:
        h = (r - g) / d + 4
        break
    }
    h /= 6
  }

  return [h * 360, s * 100, l * 100]
}

// Helper function to convert HSL to hex
function hslToHex(h: number, s: number, l: number): string {
  h = h % 360
  s = Math.max(0, Math.min(100, s)) / 100
  l = Math.max(0, Math.min(100, l)) / 100

  const c = (1 - Math.abs(2 * l - 1)) * s
  const x = c * (1 - Math.abs(((h / 60) % 2) - 1))
  const m = l - c / 2

  let r = 0,
    g = 0,
    b = 0

  if (0 <= h && h < 60) {
    r = c
    g = x
    b = 0
  } else if (60 <= h && h < 120) {
    r = x
    g = c
    b = 0
  } else if (120 <= h && h < 180) {
    r = 0
    g = c
    b = x
  } else if (180 <= h && h < 240) {
    r = 0
    g = x
    b = c
  } else if (240 <= h && h < 300) {
    r = x
    g = 0
    b = c
  } else if (300 <= h && h < 360) {
    r = c
    g = 0
    b = x
  }

  r = Math.round((r + m) * 255)
  g = Math.round((g + m) * 255)
  b = Math.round((b + m) * 255)

  return `#${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${b.toString(16).padStart(2, '0')}`
}

// Generate color palette from a base hex color
function generateColorPalette(baseColor: string): {
  colors: string[]
  overlays: string[]
} {
  const [h, s, l] = hexToHsl(baseColor)

  // Generate 5 main colors with variations in hue, saturation, and lightness
  const colors = [
    baseColor, // Original color
    hslToHex((h + 30) % 360, Math.max(40, s - 10), Math.min(85, l + 15)), // Warmer, lighter
    hslToHex((h - 20) % 360, Math.min(90, s + 15), Math.max(30, l - 10)), // Cooler, darker
    hslToHex((h + 60) % 360, Math.max(50, s - 5), Math.min(80, l + 10)), // Complementary-ish
    hslToHex((h - 40) % 360, Math.min(80, s + 10), Math.max(40, l - 5)), // Analogous
  ]

  // Generate overlay colors (lighter, more transparent versions)
  const overlays = [
    hslToHex(h, Math.max(30, s - 20), Math.min(90, l + 25)), // Much lighter
    hslToHex((h + 45) % 360, Math.max(40, s - 15), Math.min(85, l + 20)), // Light warm
    hslToHex((h - 30) % 360, Math.max(35, s - 10), Math.min(80, l + 15)), // Light cool
  ]

  return { colors, overlays }
}

// Generate SVG with specific gradient scheme or hex color
export function generateGradientSVG(
  schemeIndexOrHexColor: number | string = 0,
): string {
  let scheme: { colors: string[]; overlays: string[] }

  if (typeof schemeIndexOrHexColor === 'string') {
    // Generate palette from hex color
    scheme = generateColorPalette(schemeIndexOrHexColor)
  } else {
    // Use predefined scheme
    scheme = gradientSchemes[schemeIndexOrHexColor % gradientSchemes.length]
  }

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
export function generateGradientDataURL(
  schemeIndexOrHexColor: number | string = 0,
): string {
  const svg = generateGradientSVG(schemeIndexOrHexColor)
  return `data:image/svg+xml;base64,${btoa(svg)}`
}

// Get random gradient scheme index
export function getRandomGradientIndex(
  heroColor?: (typeof gradientSchemes)[number]['id'],
): number {
  console.log(heroColor)
  if (heroColor) {
    const index = gradientSchemes.findIndex((scheme) => scheme.id === heroColor)
    if (index >= 0) {
      return index
    }
  }

  return Math.floor(Math.random() * gradientSchemes.length)
}
