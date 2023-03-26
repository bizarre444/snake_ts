"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GameState = void 0;
const vector_1 = require("./vector");
class GameState {
    constructor(fieldSize) {
        this.fieldSize = fieldSize;
        this.headLocation = { x: this.fieldSize.height / 2, y: this.fieldSize.width / 2 };
        this.foodLocations = [];
        this.tailVectors = [];
        this.headDirection = vector_1.Vector.up;
        this.gameOver = false;
    }
    clone() {
        return Object.assign(new GameState(this.fieldSize), this);
    }
}
exports.GameState = GameState;
//# sourceMappingURL=gamestate.js.map