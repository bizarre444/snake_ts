import { GameState } from '../../common/gamestate';
import { Game } from '../../common/game';
import { Vector } from '../../common/vector';
import { strict as assert } from 'assert';

describe('Snake', () => {
    describe('Game', () => {
        it('Head should move up', () => {
            let state = new GameState({height: 10, width: 10});
            state.headDirection = Vector.up;
            let game = new Game();
            let nextState = game.nextState(state);
            assert.ok(!nextState.gameOver, "game over");
            assert.equal(nextState.headLocation.x, state.headLocation.x, "head x");
            assert.equal(nextState.headLocation.y, state.headLocation.y - 1, "head y");
        })
        it('Game over on obstacle', () => {
            let state = new GameState({height: 10, width: 10});
            state.headDirection = Vector.up;
            state.headLocation = { x: 0, y: 0 };
            let game = new Game();
            let nextState = game.nextState(state);
            assert.ok(nextState.gameOver, "game over");
            assert.equal(nextState.headLocation.x, state.headLocation.x, "head x");
            assert.equal(nextState.headLocation.y, state.headLocation.y, "head y");
        })
        it('Eating makes snake grow', () => {
            let state = new GameState({height: 10, width: 10});
            state.headDirection = Vector.up;
            let game = new Game();
            state.foodLocations = [game.nextHeadLocation(state)];
            let nextState = game.nextState(state);
            assert.equal(nextState.tailVectors.length, 1, "tail");
            assert.equal(nextState.tailVectors[0].x, -state.headDirection.x, "tail x");
            assert.equal(nextState.tailVectors[0].y, -state.headDirection.y, "tail y");
        })
        it('Game over on self collision', () => {
            let state = new GameState({height: 10, width: 10});
            state.headLocation = { x: 0, y: 0 };
            state.headDirection = Vector.down;
            state.tailVectors = [Vector.right, Vector.down, Vector.left];
            let game = new Game();
            let nextState = game.nextState(state);
            assert.ok(nextState.gameOver, "game over");
        })
        it('Food appears inside the last free cell', () => {
            let state = new GameState({height: 2, width: 2});
            state.headLocation = { x: 0, y: 0 };
            state.headDirection = Vector.down;
            state.tailVectors = [Vector.right];
            state.foodLocations = [{ x: 0, y: 1 }];
            let game = new Game();
            let nextState = game.nextState(state);
            assert.ok(!nextState.gameOver, "game over");
            assert.equal(nextState.foodLocations.length, 1, "food isn't here");
            assert.deepEqual(nextState.foodLocations[0], { x: 1, y: 1 }, "food is in the right cell");
            nextState.headDirection = Vector.right;
            let lastState = game.nextState(nextState);
            assert.ok(lastState.gameOver, "game over");
        })
    })
})