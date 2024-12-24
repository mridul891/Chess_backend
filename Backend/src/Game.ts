import { WebSocket } from "ws";

export class Game {
  public player1: WebSocket;
  public player2: WebSocket;
  private board: string;
  private moves: string[];
  private startTime: Date;

  constructor(player1: WebSocket, player2: WebSocket) {
    this.player1 = player1;
    this.player2 = player2;
    this.board = "";
    this.moves = [];
    this.startTime = new Date();
  }

  makeMove(socket: WebSocket, move: string) {
    // Validation Here 


    // Is this user Turn 

    // Is this a valid move 

    // Update the move

    // Push the move 

    // Check if the Game is over 

    // Formward the board to both the users 
  }
}
