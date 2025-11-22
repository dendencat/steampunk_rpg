import React, { useEffect, useRef } from 'react';
import { SpriteRenderer } from '../systems/SpriteRenderer';

export const GameCanvas: React.FC = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const altoRef = useRef<SpriteRenderer | null>(null);
    const minaRef = useRef<SpriteRenderer | null>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        // Initialize sprites
        // Actual generated images are 1024x1024
        // Assuming 3 rows, 4 columns layout
        altoRef.current = new SpriteRenderer('/assets/characters/alto.png', 1024, 1024, 3, 4);
        minaRef.current = new SpriteRenderer('/assets/characters/mina.png', 1024, 1024, 3, 4);

        let lastTime = performance.now();
        let animationId: number;

        const render = (time: number) => {
            const deltaTime = time - lastTime;
            lastTime = time;

            // Clear canvas
            ctx.fillStyle = '#2c3e50'; // Dark background
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            // Draw floor (simple grid)
            ctx.strokeStyle = '#34495e';
            ctx.lineWidth = 2;
            for (let i = 0; i < canvas.width; i += 40) {
                ctx.beginPath();
                ctx.moveTo(i, 0);
                ctx.lineTo(i, canvas.height);
                ctx.stroke();
            }
            for (let i = 0; i < canvas.height; i += 40) {
                ctx.beginPath();
                ctx.moveTo(0, i);
                ctx.lineTo(canvas.width, i);
                ctx.stroke();
            }

            // Update and Draw Alto
            // Scale down because source images are large (1024x1024)
            const spriteScale = 0.2;

            if (altoRef.current) {
                altoRef.current.update(deltaTime);
                altoRef.current.draw(ctx, 200, 200, spriteScale);
            }

            // Update and Draw Mina
            if (minaRef.current) {
                minaRef.current.update(deltaTime);
                minaRef.current.draw(ctx, 300, 220, spriteScale);
            }

            animationId = requestAnimationFrame(render);
        };

        animationId = requestAnimationFrame(render);

        return () => {
            cancelAnimationFrame(animationId);
        };
    }, []);

    return (
        <canvas
            ref={canvasRef}
            width={800}
            height={600}
            style={{
                border: '4px solid #c0392b',
                borderRadius: '8px',
                boxShadow: '0 0 20px rgba(0,0,0,0.5)',
                imageRendering: 'pixelated' // Critical for 16-bit look
            }}
        />
    );
};
