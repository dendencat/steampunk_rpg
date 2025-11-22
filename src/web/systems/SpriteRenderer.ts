export class SpriteRenderer {
    private image: HTMLImageElement;
    private frameWidth: number;
    private frameHeight: number;
    private rows: number;
    private cols: number;

    // Animation state
    private currentFrame: number = 0;
    private currentRow: number = 0;
    private frameTimer: number = 0;
    private frameInterval: number = 200; // ms per frame

    constructor(src: string, width: number, height: number, rows: number, cols: number) {
        this.image = new Image();
        this.image.src = src;
        this.frameWidth = width / cols;
        this.frameHeight = height / rows;
        this.rows = rows;
        this.cols = cols;
    }

    public setAnimation(row: number) {
        if (this.currentRow !== row) {
            this.currentRow = row;
            this.currentFrame = 0;
        }
    }

    public update(deltaTime: number) {
        this.frameTimer += deltaTime;
        if (this.frameTimer >= this.frameInterval) {
            this.currentFrame = (this.currentFrame + 1) % this.cols;
            this.frameTimer = 0;
        }
    }

    public draw(ctx: CanvasRenderingContext2D, x: number, y: number, scale: number = 1) {
        if (!this.image.complete) return;

        ctx.drawImage(
            this.image,
            this.currentFrame * this.frameWidth,
            this.currentRow * this.frameHeight,
            this.frameWidth,
            this.frameHeight,
            x,
            y,
            this.frameWidth * scale,
            this.frameHeight * scale
        );
    }
}
