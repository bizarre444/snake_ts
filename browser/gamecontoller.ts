import { GameState } from "../common/gamestate.js";
import { Point } from "../common/point.js";
export type GameOverHandler = () => void;
export type GameStateChangeHandler = (gamestate: GameState) => void;
export class GameController {
    private gameOver?: GameOverHandler;
    private gameStateChanged?: GameStateChangeHandler;
    static intervalMs = 500; 
    private timerId?: number | NodeJS.Timer;

    changeDirection(direction: Point): void {

    }

    startGame(): void {
        this.timerId = setInterval(this.onTimer.bind(this), GameController.intervalMs);
    }

    private onGameOver() {
        clearInterval(this.timerId);
    }

    setGameOverHandler(gameOver?: GameOverHandler): void {
        this.gameOver = gameOver;
    }

    setGameStateChangeHandler(gameStateChanged?: GameStateChangeHandler): void {
        this.gameStateChanged = gameStateChanged;
    }

    private onTimer(): void {

    }

}