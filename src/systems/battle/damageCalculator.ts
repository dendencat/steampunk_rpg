/**
 * Damage Calculator for Gear Chronicle
 * 
 * Implements the physical damage formula with "Armor Break" status support.
 * Formula: Damage = (Attacker.Atk * WrenchMod) - (Target.Def * ArmorBreakStatus)
 */

export interface Attacker {
    atk: number;
    wrenchMod: number; // 1.0 for normal, 1.2 for upgraded, etc.
}

export interface Target {
    def: number;
    isArmorBroken: boolean;
}

export function calculateDamage(attacker: Attacker, target: Target): number {
    const armorBreakFactor = target.isArmorBroken ? 0.5 : 1.0;
    const effectiveDef = target.def * armorBreakFactor;

    let damage = (attacker.atk * attacker.wrenchMod) - effectiveDef;

    // Minimum damage is always 1
    return Math.max(1, Math.floor(damage));
}
