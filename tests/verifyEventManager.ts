import { EventManager, Trigger } from '../src/systems/core/eventManager';
import { GameState } from '../src/systems/core/gameState';

console.log("=== Verifying Event Manager ===");

const gameState = GameState.getInstance();
gameState.reset();
const eventManager = new EventManager();

// Test 1: Simple Trigger
console.log("Test 1: Simple Trigger (Set Flag)");
const trigger1: Trigger = {
    type: 'onEnter',
    targetId: 'loc_slums',
    flagToSet: 'visited_slums',
    message: 'Welcome to the Slums.'
};
const msg1 = eventManager.handleTrigger(trigger1);
if (msg1 === 'Welcome to the Slums.' && gameState.getFlag('visited_slums')) {
    console.log("PASS");
} else {
    console.error("FAIL");
}

// Test 2: Conditional Transition
console.log("Test 2: Conditional Transition (Iron Serpent)");
// Initially false
if (!eventManager.checkTransition('slums', 'ironSerpent')) {
    console.log("PASS: Access denied without ticket.");
} else {
    console.error("FAIL: Access allowed without ticket.");
}

// Grant ticket
gameState.setFlag('has_ticket', true);
if (eventManager.checkTransition('slums', 'ironSerpent')) {
    console.log("PASS: Access granted with ticket.");
} else {
    console.error("FAIL: Access denied with ticket.");
}
