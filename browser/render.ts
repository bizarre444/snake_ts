import { Size } from "../common/size.js";
import { Point } from "../common/point.js";
import { GameState } from "../common/gamestate.js";
import { Game }  from "../common/game.js";

export enum CellType { Empty, SnakeBody, Food }

export class Render {
    readonly context: CanvasRenderingContext2D;
    readonly cellSizePx: number;

    constructor(context: CanvasRenderingContext2D, cellSizePx: number) {
        this.context = context;
        this.cellSizePx = cellSizePx;
    }

    drawEmpty(coord: Point): void {
        this.context.fillStyle = "gray";
        this.context.fillRect(coord.x * this.cellSizePx, coord.y * this.cellSizePx, this.cellSizePx, this.cellSizePx);
    }

    drawSnakeCell(coord: Point): void {
        this.context.fillStyle = "green";
        this.context.fillRect(coord.x * this.cellSizePx, coord.y * this.cellSizePx, this.cellSizePx, this.cellSizePx);
    }

    drawFoodCell(coord: Point): void {
        this.context.fillStyle = "yellow";
        this.context.fillRect(coord.x * this.cellSizePx, coord.y * this.cellSizePx, this.cellSizePx, this.cellSizePx);
    }

    clearCells(fieldSize: Size): void {
        for( let x = 0; x < fieldSize.width; ++x ) {
            for( let y = 0; y < fieldSize.height; ++y ) {
                const point = { x: x, y: y };
                this.drawEmpty(point);
            } 
        }
    }

    drawSnake(state: GameState): void {
        const points = Game.getSnakeLocations(state);
        points.forEach((coord) => this.drawSnakeCell(coord));
    }

    drawFood(foodLocations: Point[]): void {
        foodLocations.forEach((coord) => this.drawFoodCell(coord));
    }

    draw(state: GameState): void {
        this.clearCells(state.fieldSize);
        this.drawSnake(state);
        this.drawFood(state.foodLocations);
    }
}
