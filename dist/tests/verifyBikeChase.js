"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const bikeChaseEngine_1 = require("../src/systems/minigame/bikeChaseEngine");
console.log("=== Verifying Bike Chase Logic ===");
const chase = new bikeChaseEngine_1.BikeChaseEngine(500); // Target 500m
// Test 1: Acceleration
console.log("Test 1: Acceleration");
chase.update('Accelerate');
const state1 = chase.getState();
if (state1.speed === 10 && state1.distanceTraveled === 10) {
    console.log("PASS: Speed increased to 10.");
}
else {
    console.error(`FAIL: Speed=${state1.speed}, Distance=${state1.distanceTraveled}`);
}
// Test 2: Obstacle Collision
console.log("Test 2: Obstacle Collision");
chase.update('Accelerate', true); // Hit obstacle
const state2 = chase.getState();
// Speed was 10 -> Accel to 20 -> Hit (-30) -> 0. HP 100 -> 80.
if (state2.playerHp === 80 && state2.speed === 0) {
    console.log("PASS: HP reduced and speed penalty applied.");
}
else {
    console.error(`FAIL: HP=${state2.playerHp}, Speed=${state2.speed}`);
}
// Test 3: Winning the game
console.log("Test 3: Winning the game");
let turns = 0;
while (!chase.getState().isGameOver && turns < 20) {
    chase.update('Accelerate');
    turns++;
}
if (chase.getState().result === 'Win') {
    console.log(`PASS: Reached target in ${turns} turns.`);
}
else {
    console.error("FAIL: Did not win.");
}
