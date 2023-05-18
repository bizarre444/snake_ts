import { Game } from "../common/game.js";
import { GameState } from "../common/gamestate.js";
import { Point } from "../common/point.js";
export type GameOverHandler = () => void;
export type GameStateChangeHandler = (gamestate: GameState) => void;
export class GameController {
    private game: Game;
    private gameOver?: GameOverHandler;
    private gameStateChanged?: GameStateChangeHandler;
    static intervalMs = 500; 
    private timerId?: number | NodeJS.Timer;

    constructor(game: Game) {
        this.game = game;        
    }

    changeDirection(direction: Point): void {
        this.game.setCurrentDirection(direction);
    }

    startGame(): void {
        this.game.reset();
        this.timerId = setInterval(this.onTimer.bind(this), GameController.intervalMs);
    }

    private onGameOver() {
        clearInterval(this.timerId);
        this.gameOver?.();
    }

    setGameOverHandler(gameOver?: GameOverHandler): void {
        this.gameOver = gameOver;
    }

    setGameStateChangeHandler(gameStateChanged?: GameStateChangeHandler): void {
        this.gameStateChanged = gameStateChanged;
    }

    private onTimer(): void {
        if(this.game.over()) {
            return;
        }
        this.game.advance();
        this.gameStateChanged?.(this.game.getCurrentState());
        if(this.game.over()) {
            this.onGameOver();
        }
    }

}