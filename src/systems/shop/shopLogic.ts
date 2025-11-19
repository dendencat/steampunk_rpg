import { GameState } from '../core/gameState';
import { Item } from '../../types';

export enum ShopTransactionResult {
    Success = "Success",
    InsufficientFunds = "InsufficientFunds",
    InsufficientItems = "InsufficientItems"
}

export class ShopSystem {
    private gameState: GameState;

    constructor() {
        this.gameState = GameState.getInstance();
    }

    public buyItem(item: Item, quantity: number = 1): ShopTransactionResult {
        const totalCost = item.price * quantity;

        if (this.gameState.gold < totalCost) {
            return ShopTransactionResult.InsufficientFunds;
        }

        this.gameState.removeGold(totalCost);
        this.gameState.addItem(item.id, quantity);
        return ShopTransactionResult.Success;
    }

    public sellItem(item: Item, quantity: number = 1): ShopTransactionResult {
        if (this.gameState.getItemCount(item.id) < quantity) {
            return ShopTransactionResult.InsufficientItems;
        }

        // Sell price is usually half of buy price
        const sellPrice = Math.floor(item.price / 2);
        const totalValue = sellPrice * quantity;

        this.gameState.removeItem(item.id, quantity);
        this.gameState.addGold(totalValue);
        return ShopTransactionResult.Success;
    }
}
