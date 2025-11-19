import { Character, Enemy, BattleState } from '../../types';
import { calculateDamage, Attacker, Target } from './damageCalculator';

export class BattleEngine {
    private battleState: BattleState;
    private player: Character;
    private enemy: Enemy;

    constructor(player: Character, enemy: Enemy) {
        this.player = player;
        this.enemy = enemy;
        this.battleState = {
            turn: 1,
            activeCharacterId: player.speed >= enemy.speed ? player.id : enemy.id,
            isBattleOver: false
        };
    }

    public getState(): BattleState {
        return this.battleState;
    }

    public executeTurn(action: 'Attack' | 'Defend'): string {
        if (this.battleState.isBattleOver) return "Battle is over.";

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
        } else {
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

    private playerAction(action: 'Attack' | 'Defend'): string {
        if (action === 'Attack') {
            const attacker: Attacker = { atk: this.player.atk, wrenchMod: 1.0 };
            const target: Target = { def: this.enemy.def, isArmorBroken: false };
            const damage = calculateDamage(attacker, target);
            this.enemy.hp -= damage;
            return `Player attacks! Dealt ${damage} damage. Enemy HP: ${this.enemy.hp}.`;
        }
        return "Player defends.";
    }

    private enemyAction(): string {
        // Simple AI: Always attack
        const damage = Math.max(1, this.enemy.atk - this.player.def);
        this.player.hp -= damage;
        return `Enemy attacks! Dealt ${damage} damage. Player HP: ${this.player.hp}.`;
    }
}
