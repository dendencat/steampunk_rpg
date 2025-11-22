import React from 'react';
import { ColorPalette } from '../utils/colorPalette';
import {
  VIRTUAL_WIDTH,
  VIRTUAL_HEIGHT,
  calculateScale,
} from '../utils/scaleCalculator';
import { GameCanvas } from './GameCanvas';

const App: React.FC = () => {
  const canvasRef = React.useRef<HTMLCanvasElement>(null);
  const [scale, setScale] = React.useState(2);

  React.useEffect(() => {
    // Calculate initial scale
    const handleResize = () => {
      const scaleResult = calculateScale(window.innerWidth, window.innerHeight);
      setScale(scaleResult.scale);
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  React.useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Disable anti-aliasing for pixel-perfect rendering
    ctx.imageSmoothingEnabled = false;

    // Clear canvas with dark gray background
    ctx.fillStyle = ColorPalette.darkGray;
    ctx.fillRect(0, 0, VIRTUAL_WIDTH, VIRTUAL_HEIGHT);

    // Draw title text (temporary - will be replaced with bitmap font)
    ctx.fillStyle = ColorPalette.antiqueWhite;
    ctx.font = '16px monospace';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText('GEAR CHRONICLE', VIRTUAL_WIDTH / 2, VIRTUAL_HEIGHT / 2 - 20);

    ctx.font = '12px monospace';
    ctx.fillStyle = ColorPalette.textSecondary;
    ctx.fillText(
      '～錆びついた空の歌～',
      VIRTUAL_WIDTH / 2,
      VIRTUAL_HEIGHT / 2 + 10
    );

    ctx.fillStyle = ColorPalette.steamBlue;
    ctx.fillText(
      'Environment Setup Complete',
      VIRTUAL_WIDTH / 2,
      VIRTUAL_HEIGHT / 2 + 40
    );

    ctx.fillStyle = ColorPalette.rust;
    ctx.fillText(
      `Resolution: ${VIRTUAL_WIDTH}x${VIRTUAL_HEIGHT} @ ${scale}x`,
      VIRTUAL_WIDTH / 2,
      VIRTUAL_HEIGHT / 2 + 60
    );
  }, [scale]);

  return (
    <div style={{
      width: '100vw',
      height: '100vh',
      backgroundColor: '#1a1a1a',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center'
    }}>
      <GameCanvas />
    </div>
  );
};

export default App;
