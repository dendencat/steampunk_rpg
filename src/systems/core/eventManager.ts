import { GameState } from './gameState';

export interface Trigger {
    type: 'onEnter' | 'onInteract';
    targetId: string; // Map ID or Object ID
    flagToSet?: string;
    requiredFlag?: string;
    message?: string;
}

export class EventManager {
    private gameState: GameState;

    constructor() {
        this.gameState = GameState.getInstance();
    }

    public handleTrigger(trigger: Trigger): string {
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

    public checkTransition(currentMapId: string, destinationMapId: string): boolean {
        // Example: Can only enter Iron Serpent if "has_ticket" flag is true
        if (destinationMapId === 'ironSerpent') {
            return this.gameState.getFlag('has_ticket');
        }
        return true;
    }
}
