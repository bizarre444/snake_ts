import { Game } from "../common/game.js";
import { GameState } from "../common/gamestate.js";
import { Point } from "../common/point.js";
import { Vector } from "../common/vector.js";
import { Render } from "./render.js";

const canvas = document.getElementById("field") as HTMLCanvasElement;
const ctx = canvas.getContext("2d")!;
const game = new Game();

const randy = new Render(ctx, 20);
let gameState = new GameState({height: 20, width: 20});
game.addFood(gameState);
randy.draw(gameState);

function step(vector: Point): void {
    game.setCurrentDirection(gameState, vector);
    gameState = game.nextState(gameState);
    randy.draw(gameState);
}

function addOnClick(id: string, vector: Point): void {
    const button = document.getElementById(id);
    button?.addEventListener('click', () => step(vector));
}

addOnClick("up", Vector.up);
addOnClick("down", Vector.down);
addOnClick("left", Vector.left);
addOnClick("right", Vector.right);