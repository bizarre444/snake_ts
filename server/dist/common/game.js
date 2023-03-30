"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Game = void 0;
const point_1 = require("./point");
class Game {
    nextHeadLocation(state) {
        return (0, point_1.add)(state.headLocation, this.getCurrentDirection(state));
    }
    checkObstacle(state) {
        const h = this.nextHeadLocation(state);
        if (h.x < 0 || h.y < 0 || h.x >= state.fieldSize.width || h.y >= state.fieldSize.height) {
            return true;
        }
        const snakeLocations = Game.getSnakeLocations(state);
        return snakeLocations.some((elem) => (0, point_1.isEqual)(elem, h));
    }
    static getSnakeLocations(state) {
        let result = [state.headLocation];
        for (let tailVector of state.tailVectors) {
            result.push((0, point_1.add)(result[result.length - 1], tailVector));
        }
        return result;
    }
    nextState(previous) {
        const result = previous.clone();
        if (this.checkObstacle(result)) {
            result.gameOver = true;
            return result;
        }
        this.moveSnake(result);
        if (this.eat(result)) {
            if (!this.addFood(result)) {
                result.gameOver = true;
            }
        }
        else
            this.shrink(result);
        return result;
    }
    eat(state) {
        const isEqualHeadLocation = (foodLocation) => (0, point_1.isEqual)(state.headLocation, foodLocation);
        let foodIndex = state.foodLocations.findIndex(isEqualHeadLocation);
        if (foodIndex !== -1) {
            state.foodLocations.splice(foodIndex, 1);
            return true;
        }
        else
            return false;
    }
    shrink(state) {
        if (state.tailVectors.length > 0) {
            state.tailVectors.pop();
        }
    }
    addFood(state) {
        const freeCells = this.getFreeCells(state);
        if (freeCells.length == 0) {
            return false;
        }
        const index = Math.floor(Math.random() * freeCells.length);
        const freeCellLocation = freeCells[index];
        state.foodLocations.push(freeCellLocation);
        return true;
    }
    getFreeCells(state) {
        const freeCellsFlags = new Array(state.fieldSize.height * state.fieldSize.width);
        freeCellsFlags.fill(true);
        const pointToIndex = (point) => {
            return point.x + point.y * state.fieldSize.width;
        };
        const markOccupied = (point) => {
            freeCellsFlags[pointToIndex(point)] = false;
        };
        Game.getSnakeLocations(state).forEach(markOccupied);
        state.foodLocations.forEach(markOccupied);
        const result = [];
        for (let x = 0; x < state.fieldSize.width; ++x) {
            for (let y = 0; y < state.fieldSize.height; ++y) {
                const point = { x: x, y: y };
                if (freeCellsFlags[pointToIndex(point)]) {
                    result.push(point);
                }
            }
        }
        return result;
    }
    moveSnake(state) {
        state.headLocation = this.nextHeadLocation(state);
        state.tailVectors.unshift((0, point_1.inverse)(this.getCurrentDirection(state)));
    }
    getCurrentDirection(state) {
        return state.headDirection;
    }
    setCurrentDirection(state, vector) {
        if (state.tailVectors.length == 0 || !(0, point_1.isEqual)(state.tailVectors[0], vector)) {
            state.headDirection = vector;
        }
    }
}
exports.Game = Game;
//# sourceMappingURL=game.js.map