import { useEffect, useState } from "react";
import { useSocket } from "../hooks/useSocket";
import Button from "./button";
import Chessboard from "./Chessboard";
import { Chess } from "chess.js";

export const INIT_GAME = "init_game";
export const GAME_OVER = "game_over";
export const MOVE = "move";

const Game = () => {
  const socket = useSocket();
  const [chess, setChess] = useState(new Chess());
  const [board, setBoard] = useState(chess.board());
  const [gameStarted, setGameStarted] = useState(false);
  useEffect(() => {
    if (!socket) return;

    socket.onmessage = (event) => {
      const message = JSON.parse(event.data);

      switch (message.type) {
        case INIT_GAME:
          setBoard(chess.board());
          break;
        case MOVE:
          const move = message.payload;
          chess.move(move);
          setBoard(chess.board());
          break;
        case GAME_OVER:
          console.log("Game is over ");
          break;
      }
    };
  }, [socket]);

  if (!socket) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex justify-center items-center gap-10 pt-10">
      <div>
        <Chessboard
          setBoard={setBoard}
          chess={chess}
          socket={socket}
          board={board}
        />
      </div>
      <div>
        <h1 className="text-4xl font-bold mb-4">Chess By Crytek</h1>
        {gameStarted ? (
          ""
        ) : (
          <Button
            onClick={() => {
              setGameStarted(true);
              socket.send(JSON.stringify({ type: INIT_GAME }));
            }}
          >
            Play
          </Button>
        )}
      </div>
    </div>
  );
};

export default Game;
