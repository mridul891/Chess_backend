import { useNavigate } from "react-router-dom";
import board from "../assets/chessBoard.png";
import Button from "./button";
const Landing = () => {
  const navigate = useNavigate();
  return (
    <div className="mt-10">
      <div className="grid grid-col-1 justify-center items-center   md:grid-cols-2 ">
        <div className="  flex justify-center">
          <img src={board} alt="chess board" className="min-h-[20rem]  " />
        </div>
        <div className="mt-10 flex flex-col   gap-4 items-center">
          <h1 className="font-bold text-4xl ">Play Chess Online on #2 Site</h1>
          <Button onClick={() => navigate("/game")}>Play Online</Button>
        </div>
      </div>
    </div>
  );
};

export default Landing;
