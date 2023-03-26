import { Point } from "./point";
import { Vector } from "./vector";
import { Size } from "./size";

export class GameState {
    readonly fieldSize: Size;
    headLocation: Point;
    headDirection: Point;
    foodLocations: Point[];
    tailVectors: Point[];
    gameOver: boolean;

    constructor(fieldSize: Size) {
        this.fieldSize = fieldSize;
        this.headLocation = { x: this.fieldSize.height / 2, y: this.fieldSize.width / 2};
        this.foodLocations = [];
        this.tailVectors = [];
        this.headDirection = Vector.up;
        this.gameOver = false;
    }

    clone(): GameState {
        return Object.assign(new GameState(this.fieldSize), this);
    }
}