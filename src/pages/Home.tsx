import React from "react";
import { Link } from "react-router-dom";

function Home() {
  return (
    <div className="flex flex-col items-center justify-center h-screen px-4 text-white bg-slate-400">
      <div className="mb-16 text-4xl font-bold text-center">
        Welcome to Phuoc's Playground!
      </div>
      <p className="mb-12 text-lg text-center">
        Explore and enjoy various games. Click on the links below to play!
      </p>
      <div className="flex flex-col space-y-4">
        <Link
          to="/mastermind/"
          className="flex items-center justify-center w-40 h-10 p-2 text-white transition duration-300 bg-teal-600 rounded-md hover:bg-teal-700"
        >
          Mastermind
        </Link>
        <Link
          to="/tetris"
          className="flex items-center justify-center w-40 h-10 p-2 text-white transition duration-300 bg-teal-600 rounded-md hover:bg-teal-700"
        >
          Tetris
        </Link>

        <a
          href="/minesweeper"
          className="flex items-center justify-center h-10 p-2 text-white transition duration-300 bg-sky-600 rounded-md hover:bg-sky-700"
        >
          Minesweeper
        </a>
        <a
          href="/nonogram"
          className="flex items-center justify-center w-40 h-10 p-2 text-white transition duration-300 bg-cyan-600 rounded-md hover:bg-cyan-700"
        >
          Nonogram
        </a>
      </div>
    </div>
  );
}

export default Home;
