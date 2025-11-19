import { GameState } from './systems/core/gameState';
import { BattleEngine } from './systems/battle/battleEngine';
import { ShopSystem, ShopTransactionResult } from './systems/shop/shopLogic';
import { Character, Enemy, Item } from './types';
import * as readline from 'readline';

// Simple CLI wrapper
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

const ask = (question: string): Promise<string> => {
    return new Promise(resolve => {
        rl.question(question + '\n> ', resolve);
    });
};

async function main() {
    console.log("============================================");
    console.log("   GEAR CHRONICLE - PROTOTYPE CLI VER 0.1   ");
    console.log("============================================");
    console.log("Loading World...");

    const gameState = GameState.getInstance();
    gameState.reset();

    // Initialize Player
    const alto: Character = {
        id: 'chr_alto',
        name: 'Alto',
        hp: 100,
        maxHp: 100,
        atk: 20,
        def: 10,
        speed: 10
    };
    gameState.addCharacter(alto);

    // 1. Opening
    console.log("\n--- SCENE: OPENING ---");
    console.log("Alto: 'Another day, another pile of scrap...'");
    console.log("Mina: 'Alto, look! The sky... it's clearing?'");
    await ask("Press Enter to continue...");

    // 2. Battle
    console.log("\n--- BATTLE START ---");
    console.log("A wild Steam Trooper appears!");

    const player = gameState.party[0]; // Access directly
    const enemy: Enemy = {
        id: 'ene_trooper',
        name: 'Steam Trooper',
        hp: 50,
        maxHp: 50,
        atk: 15,
        def: 5,
        speed: 5,
        dropChance: 0.5
    };

    const battle = new BattleEngine(player, enemy);

    while (!battle.getState().isBattleOver) {
        console.log(`\nYour HP: ${player.hp} | Enemy HP: ${enemy.hp}`);
        const action = await ask("Choose Action: (a)ttack / (d)efend");

        let move: 'Attack' | 'Defend' = 'Attack';
        if (action.toLowerCase() === 'd') move = 'Defend';

        const log = battle.executeTurn(move);
        console.log(log);
    }

    if (battle.getState().winner === 'Enemy') {
        console.log("\nGAME OVER...");
        rl.close();
        return;
    }

    console.log("\nVICTORY! You found 100G.");
    gameState.addGold(100);

    // 3. Shop
    console.log("\n--- SHOP ---");
    const shop = new ShopSystem();
    console.log(`Current Gold: ${gameState.gold}G`); // Access directly

    const potion: Item = {
        id: 'itm_potion',
        name: 'Oil Potion',
        type: 'Consumable',
        price: 50,
        description: 'Heals 50 HP'
    };

    const buy = await ask("Buy 'Oil Potion' for 50G? (y/n)");
    if (buy.toLowerCase() === 'y') {
        const result = shop.buyItem(potion, 1);
        if (result === ShopTransactionResult.Success) {
            console.log("Bought Oil Potion!");
        } else {
            console.log(`Failed to buy: ${result}`);
        }
    }

    // 4. Ending
    console.log("\n--- TO BE CONTINUED ---");
    console.log("Thank you for playing the prototype!");

    rl.close();
}

main();
