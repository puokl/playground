import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Missing from "../../pages/Missing";
import NonogramApp from "./pages/NonogramApp";

const Nonogram: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="play/:level" element={<NonogramApp />} />
      {/* catch all */}
      <Route path="*" element={<Missing />} />
    </Routes>
  );
};

export default Nonogram;
