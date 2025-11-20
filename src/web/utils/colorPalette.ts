/**
 * Color Palette for GEAR CHRONICLE
 * Steampunk-themed 16bit color palette
 */

export const ColorPalette = {
  // Base colors
  darkGray: '#2B2A28',
  rust: '#D4A574',
  steamBlue: '#6B8E9E',
  antiqueWhite: '#F5E6D3',

  // UI colors
  background: '#1A1918',
  windowBorder: '#4A4845',
  textPrimary: '#F5E6D3',
  textSecondary: '#A89F91',
  textDisabled: '#5A564F',

  // Status colors
  hpGreen: '#5FAF5F',
  mpBlue: '#5F87AF',
  warning: '#D78700',
  danger: '#AF5F5F',

  // Metal tones
  copper: '#B87333',
  bronze: '#8C7853',
  iron: '#4A4A4A',
  steel: '#8A8A8A',

  // Accent colors
  gearGold: '#D4A034',
  oilBlack: '#0F0F0F',
  steamWhite: '#E8E8E8',
} as const;

export type ColorName = keyof typeof ColorPalette;

/**
 * Convert hex color to RGB values
 */
export function hexToRgb(hex: string): { r: number; g: number; b: number } {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result
    ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16),
      }
    : { r: 0, g: 0, b: 0 };
}

/**
 * Convert RGB to hex color
 */
export function rgbToHex(r: number, g: number, b: number): string {
  return '#' + [r, g, b].map((x) => x.toString(16).padStart(2, '0')).join('');
}
