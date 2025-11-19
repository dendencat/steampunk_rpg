"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ShopSystem = exports.ShopTransactionResult = void 0;
const gameState_1 = require("../core/gameState");
var ShopTransactionResult;
(function (ShopTransactionResult) {
    ShopTransactionResult["Success"] = "Success";
    ShopTransactionResult["InsufficientFunds"] = "InsufficientFunds";
    ShopTransactionResult["InsufficientItems"] = "InsufficientItems";
})(ShopTransactionResult || (exports.ShopTransactionResult = ShopTransactionResult = {}));
class ShopSystem {
    constructor() {
        this.gameState = gameState_1.GameState.getInstance();
    }
    buyItem(item, quantity = 1) {
        const totalCost = item.price * quantity;
        if (this.gameState.gold < totalCost) {
            return ShopTransactionResult.InsufficientFunds;
        }
        this.gameState.removeGold(totalCost);
        this.gameState.addItem(item.id, quantity);
        return ShopTransactionResult.Success;
    }
    sellItem(item, quantity = 1) {
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
exports.ShopSystem = ShopSystem;
