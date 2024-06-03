import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Missing from "../../pages/Missing";
import TetrisApp from "./pages/TetrisApp";

const Tetris: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="play" element={<TetrisApp />} />
      {/* catch all */}
      <Route path="*" element={<Missing />} />
    </Routes>
  );
};

export default Tetris;
