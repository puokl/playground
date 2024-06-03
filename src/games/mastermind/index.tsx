import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Missing from "../../pages/Missing";
import MastermindApp from "./pages/MastermindApp";

const Mastermind: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="play" element={<MastermindApp />} />
      {/* catch all */}
      <Route path="*" element={<Missing />} />
    </Routes>
  );
};

export default Mastermind;
