/**
 * Invention Logic for Gear Chronicle
 * 
 * Calculates success rate based on Dexterity and Material Rarity.
 */

export enum CraftingResult {
    Failure = "Failure",
    Success = "Success",
    GreatSuccess = "GreatSuccess"
}

export interface Crafter {
    dexterity: number;
}

export interface Material {
    rarity: number; // 1 (Common) to 5 (Legendary)
}

export function attemptInvention(crafter: Crafter, material: Material): CraftingResult {
    // Base success rate starts at 70%
    let baseChance = 70;

    // Dexterity bonus: +2% per point
    baseChance += crafter.dexterity * 2;

    // Rarity penalty: -10% per rarity level above 1
    baseChance -= (material.rarity - 1) * 10;

    // Cap chance at 95%
    const finalChance = Math.min(95, Math.max(5, baseChance));

    const roll = Math.random() * 100;

    if (roll < finalChance) {
        // 10% chance of Great Success within a success
        if (Math.random() < 0.1) {
            return CraftingResult.GreatSuccess;
        }
        return CraftingResult.Success;
    }

    return CraftingResult.Failure;
}
