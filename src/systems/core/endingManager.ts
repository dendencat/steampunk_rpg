export class EndingManager {
    public triggerEnding(choice: 'Destroy' | 'Control' | 'Sacrifice'): string {
        switch (choice) {
            case 'Destroy':
                return this.endingDestroy();
            case 'Control':
                return this.endingControl();
            case 'Sacrifice':
                return this.endingSacrifice();
            default:
                return "Unknown Ending";
        }
    }

    private endingDestroy(): string {
        return `
        ENDING A: The Broken Sky
        
        Alto smashes the Mother Gear with his wrench.
        The floating fortress crumbles.
        Steam dissipates, revealing a clear blue sky for the first time in centuries.
        Technology is lost, but humanity is free.
        `;
    }

    private endingControl(): string {
        return `
        ENDING B: The Clockwork King
        
        Alto takes Victor's place at the throne.
        He believes he can manage the world better.
        Order is maintained, but the smog never clears.
        Mina looks at him with sadness before leaving forever.
        `;
    }

    private endingSacrifice(): string {
        return `
        ENDING C: The Eternal Engine
        
        Mina merges with the Core to stabilize the energy.
        The world enters a golden age of infinite power.
        Alto builds a statue of her in the town square, waiting for a time that will never return.
        `;
    }
}
