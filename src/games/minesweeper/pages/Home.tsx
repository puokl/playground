import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Home: React.FC = () => {
  // const navigate = useNavigate();
  // const [selectedLevel, setSelectedLevel] = useState<string>("easy");

  // const handleStartGame = () => {
  //   navigate(`/minesweeper/play/${selectedLevel}`);
  // };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 bg-slate-300">
      <h1 className="mb-10 text-3xl font-bold">MINESWEEPER</h1>
      <div className="mb-8 text-lg text-center sm:text-left">
        <p>
          Welcome to Minesweeper! This classic game challenges you to uncover
          cells without hitting any mines.
        </p>
        <div className="flex flex-col items-center mt-4">
          <p className="text-center">
            <strong>Rules:</strong>
          </p>
          <p className="text-center">Click on a cell to uncover it.</p>
          <p className="text-center">Right-click to flag a potential mine.</p>
          <p className="text-center">Uncover all non-mine cells to win.</p>
        </div>
      </div>
      <div className="flex flex-col items-center text-lg ">
        <label htmlFor="level" className="block mb-2 text-xl font-semibold">
          Select Level:
        </label>
        <ul className="flex flex-col items-center gap-4">
          <li className="my-2 mt-6">
            <Link
              to="play/easy"
              className="w-48 px-4 py-2 my-2 tracking-wider border rounded text-cyan-600 border-cyan-600 md:mt-2 hover:bg-cyan-100 hover:text-cyan-700"
            >
              Easy (10 bombs)
            </Link>
          </li>
          <li className="my-2">
            <Link
              to="play/medium"
              className="w-48 px-4 py-2 my-2 mb-2 tracking-wider border rounded text-lime-600 border-lime-600 md:mt-2 hover:bg-lime-100 hover:text-lime-700"
            >
              Medium (30 bombs)
            </Link>
          </li>
          <li className="my-2">
            <Link
              to="play/hard"
              className="w-48 px-4 py-2 my-2 mb-2 tracking-wider border rounded text-rose-600 border-rose-600 md:mt-2 hover:bg-rose-100 hover:text-rose-700"
            >
              Hard (40 bombs)
            </Link>
          </li>
        </ul>
        {/* <select
          id="level"
          value={selectedLevel}
          onChange={(e) => setSelectedLevel(e.target.value)}
          className="w-48 px-4 py-2 mb-4 tracking-wider border rounded"
        >
          <option value="easy">Easy (10 bombs)</option>
          <option value="medium">Medium (30 bombs)</option>
          <option value="hard">Hard (40 bombs)</option>
        </select>
        <button
          onClick={handleStartGame}
          className="w-48 px-4 py-2 tracking-wider text-white bg-blue-500 border rounded hover:bg-blue-600"
        >
          Start Game
        </button> */}
      </div>
    </div>
  );
};

export default Home;
