/**
 * Scale Calculator for 16bit pixel-perfect rendering
 * Calculates integer scaling for virtual resolution
 */

export const VIRTUAL_WIDTH = 320;
export const VIRTUAL_HEIGHT = 240;

export interface ScaleResult {
  scale: number;
  displayWidth: number;
  displayHeight: number;
}

/**
 * Calculate the best integer scale for the given window size
 * Always returns an integer scale (2x, 3x, 4x, etc.) to maintain pixel-perfect rendering
 */
export function calculateScale(
  windowWidth: number,
  windowHeight: number
): ScaleResult {
  // Calculate maximum scale that fits in the window
  const scaleX = Math.floor(windowWidth / VIRTUAL_WIDTH);
  const scaleY = Math.floor(windowHeight / VIRTUAL_HEIGHT);

  // Use the smaller scale to ensure everything fits
  const scale = Math.max(1, Math.min(scaleX, scaleY));

  return {
    scale,
    displayWidth: VIRTUAL_WIDTH * scale,
    displayHeight: VIRTUAL_HEIGHT * scale,
  };
}

/**
 * Get recommended scale based on common display sizes
 */
export function getRecommendedScale(
  windowWidth: number,
  windowHeight: number
): number {
  if (windowWidth >= 1280 && windowHeight >= 960) {
    return 4; // 1280x960 (4x)
  } else if (windowWidth >= 960 && windowHeight >= 720) {
    return 3; // 960x720 (3x)
  } else if (windowWidth >= 640 && windowHeight >= 480) {
    return 2; // 640x480 (2x)
  } else {
    return 1; // 320x240 (1x)
  }
}
