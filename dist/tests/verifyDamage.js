"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const damageCalculator_1 = require("../src/systems/battle/damageCalculator");
console.log("=== Verifying Battle Logic ===");
const alto = {
    atk: 20,
    wrenchMod: 1.0
};
const scrapBeetle = {
    def: 10,
    isArmorBroken: false
};
// Test 1: Normal Attack
const damageNormal = (0, damageCalculator_1.calculateDamage)(alto, scrapBeetle);
console.log(`Test 1 (Normal): Expected ~10, Got ${damageNormal}`);
if (damageNormal === 10)
    console.log("PASS");
else
    console.error("FAIL");
// Test 2: Armor Break Attack
scrapBeetle.isArmorBroken = true;
const damageBreak = (0, damageCalculator_1.calculateDamage)(alto, scrapBeetle);
// Def becomes 5. Damage = 20 - 5 = 15
console.log(`Test 2 (Break): Expected ~15, Got ${damageBreak}`);
if (damageBreak === 15)
    console.log("PASS");
else
    console.error("FAIL");
// Test 3: Wrench Upgrade
alto.wrenchMod = 1.5; // Upgraded
scrapBeetle.isArmorBroken = false; // Reset
const damageUpgrade = (0, damageCalculator_1.calculateDamage)(alto, scrapBeetle);
// Atk becomes 30. Def is 10. Damage = 30 - 10 = 20
console.log(`Test 3 (Upgrade): Expected ~20, Got ${damageUpgrade}`);
if (damageUpgrade === 20)
    console.log("PASS");
else
    console.error("FAIL");
