"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BattleEngine = void 0;
const damageCalculator_1 = require("./damageCalculator");
/**
 * Battle Engine
 *
 * Manages the turn-based combat system.
 * Handles turn order, action execution, and win/loss conditions.
 */
class BattleEngine {
    constructor(player, enemy) {
        this.player = player;
        this.enemy = enemy;
        this.battleState = {
            turn: 1,
            activeCharacterId: player.speed >= enemy.speed ? player.id : enemy.id,
            isBattleOver: false
        };
    }
    getState() {
        return this.battleState;
    }
    executeTurn(action) {
        if (this.battleState.isBattleOver)
            return "Battle is over.";
        let log = "";
        // Active character acts
        if (this.battleState.activeCharacterId === this.player.id) {
            log += this.playerAction(action);
            if (this.enemy.hp <= 0) {
                this.battleState.isBattleOver = true;
                this.battleState.winner = 'Player';
                return log + " Enemy defeated!";
            }
            this.battleState.activeCharacterId = this.enemy.id;
        }
        else {
            log += this.enemyAction();
            if (this.player.hp <= 0) {
                this.battleState.isBattleOver = true;
                this.battleState.winner = 'Enemy';
                return log + " Player defeated...";
            }
            this.battleState.activeCharacterId = this.player.id;
            this.battleState.turn++;
        }
        return log;
    }
    playerAction(action) {
        if (action === 'Attack') {
            const attacker = { atk: this.player.atk, wrenchMod: 1.0 };
            const target = { def: this.enemy.def, isArmorBroken: false };
            const damage = (0, damageCalculator_1.calculateDamage)(attacker, target);
            this.enemy.hp -= damage;
            return `Player attacks! Dealt ${damage} damage. Enemy HP: ${this.enemy.hp}.`;
        }
        return "Player defends.";
    }
    enemyAction() {
        // Simple AI: Always attack
        const damage = Math.max(1, this.enemy.atk - this.player.def);
        this.player.hp -= damage;
        return `Enemy attacks! Dealt ${damage} damage. Player HP: ${this.player.hp}.`;
    }
}
exports.BattleEngine = BattleEngine;
