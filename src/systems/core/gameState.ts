import { Character, Item } from '../../types';

/**
 * Game State Manager
 * Singleton class to manage global game state.
 */
export class GameState {
    private static instance: GameState;

    public party: Character[] = [];
    public inventory: Map<string, number> = new Map(); // ItemId -> Quantity
    public gold: number = 0;
    public flags: Map<string, boolean> = new Map(); // Story flags

    private constructor() { }

    public static getInstance(): GameState {
        if (!GameState.instance) {
            GameState.instance = new GameState();
        }
        return GameState.instance;
    }

    // --- Party Management ---
    public addCharacter(character: Character): void {
        this.party.push(character);
    }

    public getCharacter(id: string): Character | undefined {
        return this.party.find(c => c.id === id);
    }

    // --- Inventory Management ---
    public addItem(itemId: string, amount: number = 1): void {
        const current = this.inventory.get(itemId) || 0;
        this.inventory.set(itemId, current + amount);
    }

    public removeItem(itemId: string, amount: number = 1): boolean {
        const current = this.inventory.get(itemId) || 0;
        if (current < amount) return false;

        this.inventory.set(itemId, current - amount);
        return true;
    }

    public getItemCount(itemId: string): number {
        return this.inventory.get(itemId) || 0;
    }

    // --- Gold Management ---
    public addGold(amount: number): void {
        this.gold += amount;
    }

    public removeGold(amount: number): boolean {
        if (this.gold < amount) return false;
        this.gold -= amount;
        return true;
    }

    // --- Flag Management ---
    public setFlag(flagId: string, value: boolean): void {
        this.flags.set(flagId, value);
    }

    public getFlag(flagId: string): boolean {
        return this.flags.get(flagId) || false;
    }

    // --- Debug/Reset ---
    public reset(): void {
        this.party = [];
        this.inventory.clear();
        this.gold = 0;
        this.flags.clear();
    }
}
