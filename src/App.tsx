import React from "react";
import logo from "./logo.svg";
import "./App.css";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import Missing from "./pages/Missing";
import Mastermind from "./games/mastermind";
import Home from "./pages/Home";
import Tetris from "./games/tetris";
import Minesweeper from "./games/minesweeper";
import Nonogram from "./games/nonogram";
// import Tetris from "./games/tetris";
// import Nonogram from "./games/nonogram";
// import Minesweeper from "./games/minesweeper";

function App() {
  return (
    <Routes>
      <Route path="mastermind/*" element={<Mastermind />} />
      <Route path="tetris/*" element={<Tetris />} />
      <Route path="minesweeper/*" element={<Minesweeper />} />
      <Route path="nonogram/*" element={<Nonogram />} />
      {/* Default route can be home or a landing page */}
      <Route path="/" element={<Home />} />
      {/* catch all */}
      <Route path="*" element={<Missing />} />
    </Routes>
  );
}

export default App;
