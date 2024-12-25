import { Route, Routes } from "react-router-dom";
import "./App.css";
import Landing from "./screnes/Landing";
import Game from "./screnes/Game";

function App() {
  return (
    <div className="h-screen w-screen bg-[#302E2B] text-white border border-red-600">
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/game" element={<Game />} />
      </Routes>
    </div>
  );
}

export default App;
