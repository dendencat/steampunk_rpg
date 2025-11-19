import { BattleEngine } from '../src/systems/battle/battleEngine';
import { Character, Enemy } from '../src/types';

console.log("=== Verifying Battle Loop ===");

const alto: Character = {
    id: "p01",
    name: "Alto",
    hp: 50,
    maxHp: 50,
    atk: 15,
    def: 5,
    speed: 10
};

const slime: Enemy = {
    id: "e01",
    name: "Oil Slime",
    hp: 30,
    maxHp: 30,
    atk: 10,
    def: 2,
    speed: 5,
    dropChance: 0.5
};

const battle = new BattleEngine(alto, slime);

console.log("Battle Start!");
let turnCount = 0;
const maxTurns = 10;

while (!battle.getState().isBattleOver && turnCount < maxTurns) {
    const activeId = battle.getState().activeCharacterId;
    const isPlayer = activeId === alto.id;

    console.log(`--- Turn ${battle.getState().turn} [${isPlayer ? "Player" : "Enemy"}] ---`);

    // If player turn, choose Attack. If enemy turn, engine handles it.
    const log = battle.executeTurn('Attack');
    console.log(log);

    turnCount++;
}

if (battle.getState().winner === 'Player') {
    console.log("PASS: Player won.");
} else {
    console.error("FAIL: Battle did not end with Player win as expected.");
}
