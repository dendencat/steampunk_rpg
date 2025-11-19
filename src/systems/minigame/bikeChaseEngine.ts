/**
 * Bike Chase Mini-game Engine
 * 
 * Manages the state of the bike chase sequence.
 * Player must reach the target distance while avoiding obstacles and maintaining speed.
 */

export interface ChaseState {
    distanceTraveled: number;
    targetDistance: number;
    playerHp: number;
    speed: number; // 0 to 100
    isGameOver: boolean;
    result?: 'Win' | 'Lose';
}

export class BikeChaseEngine {
    private state: ChaseState;
    private readonly MAX_SPEED = 100;
    private readonly ACCEL_RATE = 10;
    private readonly BRAKE_RATE = 20;
    private readonly OBSTACLE_DAMAGE = 20;

    constructor(targetDistance: number = 1000) {
        this.state = {
            distanceTraveled: 0,
            targetDistance: targetDistance,
            playerHp: 100,
            speed: 0,
            isGameOver: false
        };
    }

    public getState(): ChaseState {
        return this.state;
    }

    public update(action: 'Accelerate' | 'Brake' | 'None', hitObstacle: boolean = false): string {
        if (this.state.isGameOver) return "Game Over.";

        // 1. Update Speed
        if (action === 'Accelerate') {
            this.state.speed = Math.min(this.MAX_SPEED, this.state.speed + this.ACCEL_RATE);
        } else if (action === 'Brake') {
            this.state.speed = Math.max(0, this.state.speed - this.BRAKE_RATE);
        } else {
            // Natural deceleration
            this.state.speed = Math.max(0, this.state.speed - 5);
        }

        // 2. Handle Collision
        if (hitObstacle) {
            this.state.playerHp -= this.OBSTACLE_DAMAGE;
            this.state.speed = Math.max(0, this.state.speed - 30); // Speed penalty
            if (this.state.playerHp <= 0) {
                this.state.isGameOver = true;
                this.state.result = 'Lose';
                return "Crashed! Game Over.";
            }
        }

        // 3. Update Distance
        this.state.distanceTraveled += this.state.speed;

        // 4. Check Win Condition
        if (this.state.distanceTraveled >= this.state.targetDistance) {
            this.state.isGameOver = true;
            this.state.result = 'Win';
            return "Escaped! You Win!";
        }

        return `Speed: ${this.state.speed}, Distance: ${this.state.distanceTraveled}/${this.state.targetDistance}, HP: ${this.state.playerHp}`;
    }
}
