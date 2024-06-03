import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Missing from "../../pages/Missing";
import MinesweeperApp from "./pages/MinesweeperApp";

const Minesweeper: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="play/easy" element={<MinesweeperApp difficulty="easy" />} />
      <Route
        path="play/medium"
        element={<MinesweeperApp difficulty="medium" />}
      />
      <Route path="play/hard" element={<MinesweeperApp difficulty="hard" />} />

      {/* catch all */}
      <Route path="*" element={<Missing />} />
    </Routes>
  );
};

export default Minesweeper;
