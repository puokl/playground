import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Game from "./pages/Game";
import Missing from "../../pages/Missing";

const Mastermind: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="play" element={<Game />} />
      {/* catch all */}
      <Route path="*" element={<Missing />} />
    </Routes>
  );
};

export default Mastermind;
