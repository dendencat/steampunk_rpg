import { VictorAI } from '../src/systems/battle/bossAI';
import { Enemy } from '../src/types';

console.log("=== Verifying Boss AI (Victor) ===");

const victor: Enemy = {
    id: "boss_victor",
    name: "Victor",
    hp: 100,
    maxHp: 100,
    atk: 20,
    def: 10,
    speed: 8,
    dropChance: 1.0
};

const ai = new VictorAI(victor);

// Test 1: Human Phase
console.log("Test 1: Human Phase (HP 100%)");
const action1 = ai.getAction(100);
console.log(`Action: ${action1}`);
if (!action1.includes("Deus Victor")) {
    console.log("PASS: Still in Human form.");
} else {
    console.error("FAIL: Transformed too early.");
}

// Test 2: Transformation
console.log("Test 2: Transformation (HP 40%)");
victor.hp = 40;
const action2 = ai.getAction(100);
console.log(`Action: ${action2}`);
if (action2.includes("Transforms") && victor.name === "Deus Victor") {
    console.log("PASS: Transformed correctly.");
} else {
    console.error("FAIL: Did not transform.");
}

// Test 3: Machine Phase
console.log("Test 3: Machine Phase");
const action3 = ai.getAction(100);
console.log(`Action: ${action3}`);
if (action3.includes("Deus Victor")) {
    console.log("PASS: Acting as Machine.");
} else {
    console.error("FAIL: Incorrect action.");
}
