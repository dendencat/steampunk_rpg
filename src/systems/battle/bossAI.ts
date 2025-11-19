import { Enemy, BattleState } from '../../types';

export class VictorAI {
    private enemy: Enemy;
    private form: 'Human' | 'Machine' = 'Human';
    private hasTransformed: boolean = false;

    constructor(enemy: Enemy) {
        this.enemy = enemy;
    }

    public getAction(playerHp: number): string {
        // Transformation Logic
        if (!this.hasTransformed && this.enemy.hp <= this.enemy.maxHp * 0.5) {
            this.transform();
            return "Victor: 'Behold, the perfection of the machine!' (Transforms into Deus Victor)";
        }

        if (this.form === 'Human') {
            return this.humanAction();
        } else {
            return this.machineAction();
        }
    }

    private transform(): void {
        this.form = 'Machine';
        this.hasTransformed = true;
        this.enemy.atk += 10; // Power up
        this.enemy.def += 5;
        this.enemy.name = "Deus Victor";
    }

    private humanAction(): string {
        // Standard attack or buff
        const roll = Math.random();
        if (roll < 0.3) {
            return "Victor uses 'Efficiency Protocol'. ATK Up!";
        }
        return "Victor fires his steam pistol.";
    }

    private machineAction(): string {
        // Powerful attacks
        const roll = Math.random();
        if (roll < 0.4) {
            return "Deus Victor uses 'Purge'. Massive AoE Damage!";
        }
        return "Deus Victor crushes with a giant gear arm.";
    }
}
