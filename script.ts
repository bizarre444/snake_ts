console.log("Hello world!");

enum CellType { Empty, SnakeBody, Food }
enum Direction { Up, Down, Right, Left }

function inverse(direct: Direction): Direction {
    switch(direct) {
        case Direction.Up: return Direction.Down;
        case Direction.Down: return Direction.Up;
        case Direction.Right: return Direction.Left;
        case Direction.Left: return Direction.Right;
    }
}

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
    foodLocations: Point[];
    bodyVectors: Point[];
    gameOver: boolean;

    constructor(fieldSize: Size) {
        this.fieldSize = fieldSize;
        this.headLocation = { x: this.fieldSize.height / 2, y: this.fieldSize.width / 2};
        this.foodLocations = [];
        this.bodyVectors = [Vector.up];
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
        const {x, y} = this.nextHeadLocation(state);
        return (x < 0 || y < 0 || x >= state.fieldSize.width || y >= state.fieldSize.height);
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
        if (state.bodyVectors.length > 1) {
            state.bodyVectors.pop();
        }
    }

    addFood(state: GameState): void {

    }

    moveSnake(state: GameState): void {
        state.bodyVectors.unshift(this.getCurrentDirection(state));
    }

    getCurrentDirection(state: GameState): Point {
        return state.bodyVectors[0];
    }

    setCurrentDirection(state: GameState, vector: Point) {
        state.bodyVectors[0] = vector;
    }
}
