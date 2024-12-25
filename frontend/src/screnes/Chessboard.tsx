import { Color, PieceSymbol, Square } from "chess.js";
import { useState } from "react";
import { MOVE } from "./Game";

const Chessboard = ({
  setBoard,
  chess,
  board,
  socket,
}: {
  setBoard: any;
  chess: any;
  board: ({
    square: Square;
    type: PieceSymbol;
    color: Color;
  } | null)[][];
  socket: WebSocket;
}) => {
  const [from, setFrom] = useState<Square | null>(null);
  const [to, setTo] = useState<Square | null>(null);

  return (
    <div>
      {board.map((row, i) => {
        return (
          <div key={i} className="flex ">
            {row.map((square, j) => {
              const squareRepresetation = (String.fromCharCode(97 + (j % 8)) +
                "" +
                Math.floor(8 - i)) as Square;
              return (
                <div
                  key={j}
                  className={`w-16 h-16 ${
                    (i + j) % 2 == 0 ? "bg-[#EBECD0]" : "bg-[#739552] "
                  } text-black`}
                  onClick={() => {
                    if (!from) {
                      setFrom(squareRepresetation);
                    } else {
                      setFrom(squareRepresetation);
                      console.log({
                        from,
                        to: squareRepresetation,
                      });
                      
                      socket.send(
                        JSON.stringify({
                          type: "move",
                          payload: {
                            from,
                            to: squareRepresetation,
                          },
                        })
                      );
                      chess.move({from,to: squareRepresetation});
                      setBoard(chess.board());
                      setFrom(null);
                    }
                  }}
                >
                  <div className="inline-flex justify-center items-center h-full w-full">

                    {square ? <img src={`/${square?.color==="b" ? square.type :square.type+" w"}.png`} />
                    // {square?.color==="b" ?  b: <img src={`./${square?.type} w.png`} />}
                     : null}

                  </div>
                </div>
              );
            })}
          </div>
        );
      })}
    </div>
  );
};

export default Chessboard;
