"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.VictorAI = void 0;
class VictorAI {
    constructor(enemy) {
        this.form = 'Human';
        this.hasTransformed = false;
        this.enemy = enemy;
    }
    getAction(playerHp) {
        // Transformation Logic
        if (!this.hasTransformed && this.enemy.hp <= this.enemy.maxHp * 0.5) {
            this.transform();
            return "Victor: 'Behold, the perfection of the machine!' (Transforms into Deus Victor)";
        }
        if (this.form === 'Human') {
            return this.humanAction();
        }
        else {
            return this.machineAction();
        }
    }
    transform() {
        this.form = 'Machine';
        this.hasTransformed = true;
        this.enemy.atk += 10; // Power up
        this.enemy.def += 5;
        this.enemy.name = "Deus Victor";
    }
    humanAction() {
        // Standard attack or buff
        const roll = Math.random();
        if (roll < 0.3) {
            return "Victor uses 'Efficiency Protocol'. ATK Up!";
        }
        return "Victor fires his steam pistol.";
    }
    machineAction() {
        // Powerful attacks
        const roll = Math.random();
        if (roll < 0.4) {
            return "Deus Victor uses 'Purge'. Massive AoE Damage!";
        }
        return "Deus Victor crushes with a giant gear arm.";
    }
}
exports.VictorAI = VictorAI;
