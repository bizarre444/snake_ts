"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const gamestate_1 = require("../../common/gamestate");
const game_1 = require("../../common/game");
const vector_1 = require("../../common/vector");
const assert_1 = require("assert");
describe('Snake', () => {
    describe('Game', () => {
        it('Head should move up', () => {
            let state = new gamestate_1.GameState({ height: 10, width: 10 });
            state.headDirection = vector_1.Vector.up;
            let game = new game_1.Game();
            let nextState = game.nextState(state);
            assert_1.strict.ok(!nextState.gameOver, "game over");
            assert_1.strict.equal(nextState.headLocation.x, state.headLocation.x, "head x");
            assert_1.strict.equal(nextState.headLocation.y, state.headLocation.y - 1, "head y");
        });
        it('Game over on obstacle', () => {
            let state = new gamestate_1.GameState({ height: 10, width: 10 });
            state.headDirection = vector_1.Vector.up;
            state.headLocation = { x: 0, y: 0 };
            let game = new game_1.Game();
            let nextState = game.nextState(state);
            assert_1.strict.ok(nextState.gameOver, "game over");
            assert_1.strict.equal(nextState.headLocation.x, state.headLocation.x, "head x");
            assert_1.strict.equal(nextState.headLocation.y, state.headLocation.y, "head y");
        });
        it('Eating makes snake grow', () => {
            let state = new gamestate_1.GameState({ height: 10, width: 10 });
            state.headDirection = vector_1.Vector.up;
            let game = new game_1.Game();
            state.foodLocations = [game.nextHeadLocation(state)];
            let nextState = game.nextState(state);
            assert_1.strict.equal(nextState.tailVectors.length, 1, "tail");
            assert_1.strict.equal(nextState.tailVectors[0].x, -state.headDirection.x, "tail x");
            assert_1.strict.equal(nextState.tailVectors[0].y, -state.headDirection.y, "tail y");
        });
        it('Game over on self collision', () => {
            let state = new gamestate_1.GameState({ height: 10, width: 10 });
            state.headLocation = { x: 0, y: 0 };
            state.headDirection = vector_1.Vector.down;
            state.tailVectors = [vector_1.Vector.right, vector_1.Vector.down, vector_1.Vector.left];
            let game = new game_1.Game();
            let nextState = game.nextState(state);
            assert_1.strict.ok(nextState.gameOver, "game over");
        });
        it('Food appears inside the last free cell', () => {
            let state = new gamestate_1.GameState({ height: 2, width: 2 });
            state.headLocation = { x: 0, y: 0 };
            state.headDirection = vector_1.Vector.down;
            state.tailVectors = [vector_1.Vector.right];
            state.foodLocations = [{ x: 0, y: 1 }];
            let game = new game_1.Game();
            let nextState = game.nextState(state);
            assert_1.strict.ok(!nextState.gameOver, "game over");
            assert_1.strict.equal(nextState.foodLocations.length, 1, "food isn't here");
            assert_1.strict.deepEqual(nextState.foodLocations[0], { x: 1, y: 1 }, "food is in the right cell");
            nextState.headDirection = vector_1.Vector.right;
            let lastState = game.nextState(nextState);
            assert_1.strict.ok(lastState.gameOver, "game over");
        });
    });
});
//# sourceMappingURL=test.js.map