import { attemptInvention, Crafter, Material, CraftingResult } from '../src/systems/crafting/inventionLogic';

console.log("=== Verifying Crafting Logic ===");

const alto: Crafter = {
    dexterity: 5 // +10% bonus
};

const scrapMetal: Material = {
    rarity: 1 // No penalty
};

const rareGear: Material = {
    rarity: 3 // -20% penalty
};

// Test 1: Basic Crafting Simulation
console.log("Test 1: Crafting with Scrap Metal (Base 70% + 10% = 80%)");
let successes = 0;
let greatSuccesses = 0;
const iterations = 1000;

for (let i = 0; i < iterations; i++) {
    const result = attemptInvention(alto, scrapMetal);
    if (result === CraftingResult.Success || result === CraftingResult.GreatSuccess) {
        successes++;
    }
    if (result === CraftingResult.GreatSuccess) {
        greatSuccesses++;
    }
}

console.log(`Success Rate: ${(successes / iterations) * 100}% (Expected ~80%)`);
console.log(`Great Success Rate: ${(greatSuccesses / iterations) * 100}% (Expected ~8%)`);

// Test 2: Hard Crafting Simulation
console.log("Test 2: Crafting with Rare Gear (Base 70% + 10% - 20% = 60%)");
successes = 0;
for (let i = 0; i < iterations; i++) {
    const result = attemptInvention(alto, rareGear);
    if (result === CraftingResult.Success || result === CraftingResult.GreatSuccess) {
        successes++;
    }
}
console.log(`Success Rate: ${(successes / iterations) * 100}% (Expected ~60%)`);
