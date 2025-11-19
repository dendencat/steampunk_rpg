"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GameState = void 0;
/**
 * Game State Manager
 * Singleton class to manage global game state.
 */
class GameState {
    constructor() {
        this.party = [];
        this.inventory = new Map(); // ItemId -> Quantity
        this.gold = 0;
        this.flags = new Map(); // Story flags
    }
    static getInstance() {
        if (!GameState.instance) {
            GameState.instance = new GameState();
        }
        return GameState.instance;
    }
    // --- Party Management ---
    addCharacter(character) {
        this.party.push(character);
    }
    getCharacter(id) {
        return this.party.find(c => c.id === id);
    }
    // --- Inventory Management ---
    addItem(itemId, amount = 1) {
        const current = this.inventory.get(itemId) || 0;
        this.inventory.set(itemId, current + amount);
    }
    removeItem(itemId, amount = 1) {
        const current = this.inventory.get(itemId) || 0;
        if (current < amount)
            return false;
        this.inventory.set(itemId, current - amount);
        return true;
    }
    getItemCount(itemId) {
        return this.inventory.get(itemId) || 0;
    }
    // --- Gold Management ---
    addGold(amount) {
        this.gold += amount;
    }
    removeGold(amount) {
        if (this.gold < amount)
            return false;
        this.gold -= amount;
        return true;
    }
    // --- Flag Management ---
    setFlag(flagId, value) {
        this.flags.set(flagId, value);
    }
    getFlag(flagId) {
        return this.flags.get(flagId) || false;
    }
    // --- Debug/Reset ---
    reset() {
        this.party = [];
        this.inventory.clear();
        this.gold = 0;
        this.flags.clear();
    }
}
exports.GameState = GameState;
