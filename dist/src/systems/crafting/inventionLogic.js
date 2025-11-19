"use strict";
/**
 * Invention Logic for Gear Chronicle
 *
 * Calculates success rate based on Dexterity and Material Rarity.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.CraftingResult = void 0;
exports.attemptInvention = attemptInvention;
var CraftingResult;
(function (CraftingResult) {
    CraftingResult["Failure"] = "Failure";
    CraftingResult["Success"] = "Success";
    CraftingResult["GreatSuccess"] = "GreatSuccess";
})(CraftingResult || (exports.CraftingResult = CraftingResult = {}));
function attemptInvention(crafter, material) {
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
