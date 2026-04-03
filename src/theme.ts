import { createTheme, MantineColorsTuple } from '@mantine/core'

// Shades 0 (lightest) → 9 (darkest), primary at index 5
const osrsYellow: MantineColorsTuple = [
  '#feffd0',
  '#fffe99',
  '#fffe66',
  '#fffd33',
  '#fffd00',
  '#ffff00', // primary — pure OSRS yellow
  '#e6e600',
  '#cccc00',
  '#999900',
  '#666600',
]

// Shades centered on #ff981f
const osrsGold: MantineColorsTuple = [
  '#fff4e6',
  '#ffe8c5',
  '#ffd09a',
  '#ffb870',
  '#ffa845',
  '#ff981f', // primary — OSRS gold/orange
  '#e88919',
  '#cc7917',
  '#9e5d12',
  '#7a490e',
]

// Brown panel palette — used for panel backgrounds and bevel borders
const osrsBrown: MantineColorsTuple = [
  '#f0ead8',
  '#ddd0b8',
  '#c8b48a',
  '#b09864',
  '#8b7355', // bevel highlight border
  '#605443', // panel midtone
  '#3d2b1f', // panel bg (light)
  '#2d1f0e', // panel bg (main)
  '#1a0f00', // bevel shadow border
  '#0d0700',
]

export const theme = createTheme({
  fontFamily: "'Press Start 2P', monospace",
  fontFamilyMonospace: "'Press Start 2P', monospace",

  primaryColor: 'osrsYellow',
  primaryShade: 5,

  // All radii set to 0 — OSRS uses no rounded corners
  defaultRadius: 0,
  radius: {
    xs: '0',
    sm: '0',
    md: '0',
    lg: '0',
    xl: '0',
  },

  black: '#000000',
  white: '#ffffff',

  colors: {
    osrsYellow,
    osrsGold,
    osrsBrown,
  },

  // Map Mantine's semantic heading sizes to something readable
  // at the small pixel font size
  headings: {
    fontFamily: "'Press Start 2P', monospace",
    sizes: {
      h1: { fontSize: '1.5rem', lineHeight: '1.6' },
      h2: { fontSize: '1.2rem', lineHeight: '1.6' },
      h3: { fontSize: '1rem',   lineHeight: '1.6' },
      h4: { fontSize: '0.85rem', lineHeight: '1.6' },
    },
  },

  spacing: {
    xs: '4px',
    sm: '8px',
    md: '12px',
    lg: '16px',
    xl: '24px',
  },
})
