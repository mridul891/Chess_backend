"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Game = void 0;
const chess_js_1 = require("chess.js");
const Messages_1 = require("./Messages");
class Game {
    constructor(player1, player2) {
        this.player1 = player1;
        this.player2 = player2;
        this.board = new chess_js_1.Chess();
        this.startTime = new Date();
        this.player1.send(JSON.stringify({
            type: Messages_1.INIT_GAME,
            payload: {
                color: "white",
            },
        }));
        this.player2.send(JSON.stringify({
            type: Messages_1.INIT_GAME,
            payload: {
                color: "black",
            },
        }));
        this.moveCount = 0;
    }
    makeMove(socket, move) {
        // Validation Here
        console.log("1");
        console.log("movenumber is ", this.moveCount);
        if (this.moveCount % 2 === 0 && socket !== this.player1) {
            console.log("2");
            return;
        }
        if (this.moveCount % 2 === 1 && socket !== this.player2) {
            console.log("3");
            return;
        }
        console.log("4");
        try {
            this.board.move(move);
        }
        catch (error) {
            return;
        }
        // Check if the Game is over
        if (this.board.isGameOver()) {
            this.player1.send(JSON.stringify({
                type: Messages_1.GAME_OVER,
                payload: {
                    winner: this.board.turn() === "w" ? "black" : "white",
                },
            }));
            this.player2.send(JSON.stringify({
                type: Messages_1.GAME_OVER,
                payload: {
                    winner: this.board.turn() === "w" ? "black" : "white",
                },
            }));
            return;
        }
        // Formward the board to both the users
        if (this.moveCount % 2 === 0) {
            console.log("5");
            this.player2.send(JSON.stringify({
                type: Messages_1.MOVE,
                payload: move,
            }));
        }
        else {
            console.log("6");
            this.player1.send(JSON.stringify({
                type: Messages_1.MOVE,
                payload: move,
            }));
        }
        this.moveCount++;
    }
}
exports.Game = Game;
