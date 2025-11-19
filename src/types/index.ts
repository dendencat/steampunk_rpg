/**
 * Shared Types for Gear Chronicle
 */

export interface Item {
    id: string;
    name: string;
    price: number;
    description: string;
    type: 'Weapon' | 'Consumable' | 'Material';
    effectValue?: number; // Heal amount, damage bonus, etc.
}

export interface Character {
    id: string;
    name: string;
    hp: number;
    maxHp: number;
    atk: number;
    def: number;
    speed: number;
}

export interface Enemy extends Character {
    dropItemId?: string;
    dropChance: number; // 0.0 to 1.0
}

export interface BattleState {
    turn: number;
    activeCharacterId: string;
    isBattleOver: boolean;
    winner?: 'Player' | 'Enemy';
}
