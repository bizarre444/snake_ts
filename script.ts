console.log("Hello world!");

enum CellType { Empty, SnakeBody, Food }
enum Direction { Up, Down, Right, Left }

interface Size {
    height: number;
    width: number;
}

interface Point {
    x: number;
    y: number;
}

function add(a: Point, b: Point): Point {
    return {x: a.x + b.x, y: a.y + b.y};
}

function isEqual(a: Point, b: Point): boolean {
    return a.x === b.x && a.y === b.y;
}

function inverse(a: Point): Point {
    return { x: -a.x, y: -a.y };
}

class Vector {
    static up = { x: 0, y: -1};
    static down = { x: 0, y: 1};
    static right = { x: 1, y: 0};
    static left = { x: -1, y: 0};
}

class Render {
    readonly context: CanvasRenderingContext2D;
    readonly cellSizePx: number;
    readonly fieldSize: Size;

    constructor(context: CanvasRenderingContext2D, cellSizePx: number, fieldSize: Size) {
        this.context = context;
        this.cellSizePx = cellSizePx;
        this.fieldSize = fieldSize;
    }

    drawEmpty(coord: Point): void {
        this.context.fillStyle = "gray";
        this.context.fillRect(coord.x * this.cellSizePx, coord.y * this.cellSizePx, this.cellSizePx, this.cellSizePx);
    }

    drawSnake(coord: Point): void {
        this.context.fillStyle = "green";
        this.context.fillRect(coord.x * this.cellSizePx, coord.y * this.cellSizePx, this.cellSizePx, this.cellSizePx);
    }

    drawFood(coord: Point): void {
        this.context.fillStyle = "yellow";
        this.context.fillRect(coord.x * this.cellSizePx, coord.y * this.cellSizePx, this.cellSizePx, this.cellSizePx);
    }
}

class GameState {
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
        return Object.assign({}, this);
    }
}

const canvas = document.getElementById("field") as HTMLCanvasElement;
const ctx = canvas.getContext("2d");

if (ctx) {
    const randy = new Render(ctx, 20, {height: 10, width: 10});
    randy.drawEmpty({x: 0, y: 0});
    randy.drawSnake({x: 1, y: 1});
    randy.drawFood({x: 0, y: 1});
}

class Game {
    nextHeadLocation(state: GameState): Point {
        return add(state.headLocation, this.getCurrentDirection(state));
    }

    checkObstacle(state: GameState): boolean {
        const h = this.nextHeadLocation(state);
        if (h.x < 0 || h.y < 0 || h.x >= state.fieldSize.width || h.y >= state.fieldSize.height) {
            return true;
        } 
        const snakeLocations = this.getSnakeLocations(state);
        return snakeLocations.some((elem) => isEqual(elem, h));
    }

    getSnakeLocations(state: GameState): Point[] {
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
            this.addFood(result);
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

    addFood(state: GameState): void {
        const freeCells = this.getFreeCells(state);
        const index = Math.floor(Math.random() * freeCells.length);
        const freeCellLocation = freeCells[index];
        state.foodLocations.push(freeCellLocation);
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
        this.getSnakeLocations(state).forEach(markOccupied);
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
        state.tailVectors.unshift(inverse(this.getCurrentDirection(state)));
    }

    getCurrentDirection(state: GameState): Point {
        return state.headDirection;
    }

    setCurrentDirection(state: GameState, vector: Point) {
        state.headDirection = vector;
    }
}
