import { GameState } from '../src/systems/core/gameState';
import { ShopSystem, ShopTransactionResult } from '../src/systems/shop/shopLogic';
import { Item } from '../src/types';

console.log("=== Verifying Shop Logic ===");

const gameState = GameState.getInstance();
gameState.reset(); // Ensure clean state
const shop = new ShopSystem();

// Setup
const potion: Item = {
    id: "item_potion",
    name: "Oil Potion",
    price: 50,
    description: "Heals 20 HP",
    type: "Consumable"
};

// Test 1: Buy with insufficient funds
console.log("Test 1: Buy without gold");
const result1 = shop.buyItem(potion);
if (result1 === ShopTransactionResult.InsufficientFunds) console.log("PASS"); else console.error(`FAIL: Got ${result1}`);

// Test 2: Buy with sufficient funds
console.log("Test 2: Buy with gold");
gameState.addGold(100);
const result2 = shop.buyItem(potion);
if (result2 === ShopTransactionResult.Success && gameState.gold === 50 && gameState.getItemCount(potion.id) === 1) {
    console.log("PASS");
} else {
    console.error(`FAIL: Result=${result2}, Gold=${gameState.gold}, Items=${gameState.getItemCount(potion.id)}`);
}

// Test 3: Sell item
console.log("Test 3: Sell item");
const result3 = shop.sellItem(potion);
// Sell price is 25. Gold should be 50 + 25 = 75. Item count 0.
if (result3 === ShopTransactionResult.Success && gameState.gold === 75 && gameState.getItemCount(potion.id) === 0) {
    console.log("PASS");
} else {
    console.error(`FAIL: Result=${result3}, Gold=${gameState.gold}, Items=${gameState.getItemCount(potion.id)}`);
}
