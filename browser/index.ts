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

const randy = new Render(ctx, 20);
randy.draw(game.getCurrentState());

function step(vector: Point): void {
    game.setCurrentDirection(vector);
    game.advance();
    randy.draw(game.getCurrentState());
    if (game.over()) {
        alert('GAME OVER!!!!!');
        game.reset();
        randy.draw(game.getCurrentState());
    }
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