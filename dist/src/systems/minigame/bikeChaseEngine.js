"use strict";
/**
 * Bike Chase Mini-game Engine
 *
 * Manages the state of the bike chase sequence.
 * Player must reach the target distance while avoiding obstacles and maintaining speed.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.BikeChaseEngine = void 0;
class BikeChaseEngine {
    constructor(targetDistance = 1000) {
        this.MAX_SPEED = 100;
        this.ACCEL_RATE = 10;
        this.BRAKE_RATE = 20;
        this.OBSTACLE_DAMAGE = 20;
        this.state = {
            distanceTraveled: 0,
            targetDistance: targetDistance,
            playerHp: 100,
            speed: 0,
            isGameOver: false
        };
    }
    getState() {
        return this.state;
    }
    update(action, hitObstacle = false) {
        if (this.state.isGameOver)
            return "Game Over.";
        // 1. Update Speed
        if (action === 'Accelerate') {
            this.state.speed = Math.min(this.MAX_SPEED, this.state.speed + this.ACCEL_RATE);
        }
        else if (action === 'Brake') {
            this.state.speed = Math.max(0, this.state.speed - this.BRAKE_RATE);
        }
        else {
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
exports.BikeChaseEngine = BikeChaseEngine;
