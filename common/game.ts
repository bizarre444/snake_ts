import { GameState } from "./gamestate";
import { Point, add, isEqual, inverse } from "./point";

export class Game {
    nextHeadLocation(state: GameState): Point {
        return add(state.headLocation, this.getCurrentDirection(state));
    }

    checkObstacle(state: GameState): boolean {
        const h = this.nextHeadLocation(state);
        if (h.x < 0 || h.y < 0 || h.x >= state.fieldSize.width || h.y >= state.fieldSize.height) {
            return true;
        } 
        const snakeLocations = Game.getSnakeLocations(state);
        return snakeLocations.some((elem) => isEqual(elem, h));
    }

    static getSnakeLocations(state: GameState): Point[] {
        let result = [state.headLocation];
        for ( let tailVector of state.tailVectors ) {
            result.push(add(result[result.length - 1], tailVector));
        }
        return result;
    }

    nextState(previous: GameState): GameState {
        const result = previous.clone();
        if (this.checkObstacle(result)) {
            result.gameOver = true;
            return result;
        }
        this.moveSnake(result);
        if (this.eat(result)) {
            if(!this.addFood(result)) {
                result.gameOver = true;
            }
        } else this.shrink(result);
        return result;
    }

    eat(state: GameState): boolean {
        const isEqualHeadLocation = (foodLocation: Point): boolean => isEqual(state.headLocation, foodLocation);
        let foodIndex = state.foodLocations.findIndex(isEqualHeadLocation);
        if (foodIndex !== -1) {
            state.foodLocations.splice(foodIndex, 1);
            return true;
        } else return false;
    }

    shrink(state: GameState): void {
        if (state.tailVectors.length > 0) {
            state.tailVectors.pop();
        }
    }

    addFood(state: GameState): boolean {
        const freeCells = this.getFreeCells(state);
        if (freeCells.length == 0) {
            return false;
        }
        const index = Math.floor(Math.random() * freeCells.length);
        const freeCellLocation = freeCells[index];
        state.foodLocations.push(freeCellLocation);
        return true;
    }

    getFreeCells(state: GameState): Point[] {
        const freeCellsFlags: boolean[] = new Array(state.fieldSize.height * state.fieldSize.width);
        freeCellsFlags.fill(true);
        const pointToIndex = (point: Point): number => {
            return point.x + point.y * state.fieldSize.width;
        }
        const markOccupied = (point: Point): void => { 
            freeCellsFlags[pointToIndex(point)] = false;
        }
        Game.getSnakeLocations(state).forEach(markOccupied);
        state.foodLocations.forEach(markOccupied);
        const result: Point[] = [];
        for( let x = 0; x < state.fieldSize.width; ++x ) {
            for( let y = 0; y < state.fieldSize.height; ++y ) {
                const point = { x: x, y: y };
                if(freeCellsFlags[pointToIndex(point)]) {
                    result.push(point);
                }
            } 
        }
        return result;
    }

    moveSnake(state: GameState): void {
        state.headLocation = this.nextHeadLocation(state);
        state.tailVectors.unshift(inverse(this.getCurrentDirection(state)));
    }

    getCurrentDirection(state: GameState): Point {
        return state.headDirection;
    }

    setCurrentDirection(state: GameState, vector: Point) {
        state.headDirection = vector;
    }
}