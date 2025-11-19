"use strict";
/**
 * Damage Calculator for Gear Chronicle
 *
 * Implements the physical damage formula with "Armor Break" status support.
 * Formula: Damage = (Attacker.Atk * WrenchMod) - (Target.Def * ArmorBreakStatus)
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.calculateDamage = calculateDamage;
function calculateDamage(attacker, target) {
    const armorBreakFactor = target.isArmorBroken ? 0.5 : 1.0;
    const effectiveDef = target.def * armorBreakFactor;
    let damage = (attacker.atk * attacker.wrenchMod) - effectiveDef;
    // Minimum damage is always 1
    return Math.max(1, Math.floor(damage));
}
