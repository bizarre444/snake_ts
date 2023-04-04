import { Game } from "../common/game.js";
import { GameState } from "../common/gamestate.js";
import { Point } from "../common/point.js";
import { Vector } from "../common/vector.js";
import { Render } from "./render.js";

const canvas = document.getElementById("field") as HTMLCanvasElement;
const ctx = canvas.getContext("2d")!;
let initialState = new GameState({height: 20, width: 20});
Game.addFood(initialState);
const game = new Game(initialState);
let gameStarted = false;
let startTime = 0;
let lastStepTime = 0;
const gameStartButton = document.getElementById("start");

function onGameStart() {
    gameStarted = true;
    window.requestAnimationFrame(renderFrame);
}

function renderFrame(timeStamp: DOMHighResTimeStamp) {
    if (game.over()) {
        alert('GAME OVER!!!!!');
        game.reset();
        randy.draw(game.getCurrentState());
        return;
    }
    if (gameStarted) {
        gameStarted = false;
        lastStepTime = timeStamp;
        randy.draw(game.getCurrentState());
    }
    if (timeStamp - lastStepTime > 500) {
        game.advance();
        randy.draw(game.getCurrentState());
        lastStepTime = timeStamp;
    }
    window.requestAnimationFrame(renderFrame);
}

gameStartButton?.addEventListener('click', onGameStart);

const randy = new Render(ctx, 20);
randy.draw(game.getCurrentState());

function step(vector: Point): void {
    game.setCurrentDirection(vector);
}

function addOnClick(id: string, vector: Point): void {
    const button = document.getElementById(id);
    button?.addEventListener('click', () => step(vector));
}

addOnClick("up", Vector.up);
addOnClick("down", Vector.down);
addOnClick("left", Vector.left);
addOnClick("right", Vector.right);

window.addEventListener("keydown", function(event) {
    if (event.defaultPrevented) {
        return;
    }
    const vector = keyToVector(event.code);
    if (vector !== null) {
        step(vector);
    }
    event.preventDefault();
}, true);

function keyToVector(key: string): Point|null {
    switch(key) {
        case "ArrowDown": return Vector.down;
        case "ArrowUp": return Vector.up;
        case "ArrowLeft": return Vector.left;
        case "ArrowRight": return Vector.right;
        default: return null;
    }
}