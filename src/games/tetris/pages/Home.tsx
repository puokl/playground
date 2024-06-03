import React from "react";
import { Link } from "react-router-dom";

const Home: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 bg-slate-300">
      <h1 className="mb-4 text-4xl font-bold">TETRIS</h1>
      <div className="mb-8 md:text-lg">
        <p className="mb-2">
          Tetris is a classic puzzle game where you manipulate tetrominoes to
          create horizontal lines without gaps.
        </p>
        <p className="mb-2">
          Earn points by clearing lines and challenge yourself as the game
          speeds up!
        </p>
      </div>
      <div className="mb-8">
        <h2 className="mb-2 text-xl font-bold">How to Play:</h2>
        <ul className="ml-6 list-disc">
          <li>
            Use arrow keys (← → ↓) to move tetrominoes left, right, and down.
          </li>
          <li>Press the up arrow key (↑) to rotate tetrominoes.</li>
          <li>
            For mobile, tap on "show mobile controls" to display controls.
          </li>
        </ul>
      </div>
      <div className="mb-8">
        <h2 className="mb-2 text-xl font-bold">Scoring:</h2>
        <p>
          Points are awarded based on the number of lines cleared
          simultaneously:
        </p>
        <ul className="ml-6 list-disc">
          <li>1 line cleared = 40 points</li>
          <li>2 lines cleared = 100 points</li>
          <li>3 lines cleared = 300 points</li>
          <li>4 lines cleared (Tetris) = 1200 points</li>
        </ul>
      </div>
      <div className="mb-8">
        <h2 className="mb-2 text-xl font-bold">Levels:</h2>
        <p>The game progresses through levels as you clear lines:</p>
        <ul className="ml-6 list-disc">
          <li>Every 10 lines cleared will advance you to the next level.</li>
          <li>
            As the level increases, the speed of the falling tetrominoes will
            also increase, making the game more challenging.
          </li>
        </ul>
      </div>

      <Link
        to="/tetris/play"
        className="flex items-center justify-center h-10 p-2 px-6 text-white transition duration-300 rounded-md bg-cyan-600 hover:bg-cyan-700"
      >
        Play Now
      </Link>
    </div>
  );
};

export default Home;
