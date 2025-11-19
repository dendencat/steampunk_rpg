"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EventManager = void 0;
const gameState_1 = require("./gameState");
class EventManager {
    constructor() {
        this.gameState = gameState_1.GameState.getInstance();
    }
    handleTrigger(trigger) {
        // Check requirements
        if (trigger.requiredFlag) {
            if (!this.gameState.getFlag(trigger.requiredFlag)) {
                return ""; // Requirement not met
            }
        }
        // Set flag
        if (trigger.flagToSet) {
            this.gameState.setFlag(trigger.flagToSet, true);
        }
        // Return message
        return trigger.message || "Event triggered.";
    }
    checkTransition(currentMapId, destinationMapId) {
        // Example: Can only enter Iron Serpent if "has_ticket" flag is true
        if (destinationMapId === 'ironSerpent') {
            return this.gameState.getFlag('has_ticket');
        }
        return true;
    }
}
exports.EventManager = EventManager;
