import React from "react";
import { useNavigate } from "react-router-dom";

const Home: React.FC = () => {
  const navigate = useNavigate();

  const handleSelectLevel = (level: string) => {
    navigate(`/nonogram/play/${level}`);
  };

  return (
    <div className="p-4 text-center landing-page bg-slate-300">
      <h1 className="mb-4 text-4xl font-bold">NONOGRAM</h1>
      <div className="mx-6 md:mx-20 mb-8  text-center md:text-lg">
        <p className="mb-2">
          Nonogram is a picture logic puzzle where you fill in cells to reveal
          the hidden picture.
        </p>
        <p className="mb-2">
          Follow the rules and challenge yourself to complete the puzzle!
        </p>
      </div>
      <div className="mx-4 md:mx-20 mb-8">
        <h2 className="mb-2 text-xl font-bold">How to Play:</h2>
        <ul className="ml-6 list-disc text-left">
          <li>
            Each puzzle consists of a grid with numbers along the top and left
            sides. These numbers provide clues for filling in the cells.
          </li>
          <li>
            The numbers indicate groups of filled cells in each row or column.
            For example, "3 2" means there are groups of three and two filled
            cells, separated by at least one empty cell.
          </li>
          <li>
            Your goal is to use the provided clues to determine which cells
            should be filled in to create an image.
          </li>
          <li>
            Click on cells to fill them. Use the toggle button to switch between
            cells to be selected (e.g., filled with color) and cells to be
            discarded (e.g., marked with an 'X').
          </li>
          <li>
            If an error is made, the filled cells will turn green. You have a
            limited number of errors allowed, so use them wisely.
          </li>
          <li>
            Complete the puzzle by filling in all the correct cells according to
            the clues, revealing the hidden picture!
          </li>
        </ul>
      </div>
      <div className="mx-20 mb-8">
        <h2 className="mb-2 text-xl font-bold">Goals:</h2>
        <p className="mb-2">
          The objective of the game is to correctly fill in the grid to reveal
          the hidden picture using the clues provided.
        </p>
      </div>
      <p className="mb-6 text-lg">
        Choose a difficulty level to start the game.
      </p>
      <div className="flex flex-col items-center justify-center">
        <button
          onClick={() => handleSelectLevel("easy")}
          className="w-48 px-4 py-2 my-2 tracking-wider border rounded text-cyan-800 border-cyan-800 md:mt-2 hover:bg-cyan-100 hover:text-cyan-950 font-bold"
        >
          Easy
        </button>
        <button
          onClick={() => handleSelectLevel("medium")}
          className="w-48 px-4 py-2 my-2 tracking-wider border rounded text-cyan-800 border-cyan-800 md:mt-2 hover:bg-cyan-100 hover:text-cyan-950 font-bold"
        >
          Medium
        </button>
        <button
          onClick={() => handleSelectLevel("hard")}
          className="w-48 px-4 py-2 my-2 tracking-wider border rounded text-cyan-800 border-cyan-800 md:mt-2 hover:bg-cyan-100 hover:text-cyan-950 font-bold"
        >
          Hard
        </button>
        <button
          onClick={() => handleSelectLevel("master")}
          className="w-48 px-4 py-2 my-2 tracking-wider border rounded text-cyan-800 border-cyan-800 md:mt-2 hover:bg-cyan-100 hover:text-cyan-950 font-bold"
        >
          Master
        </button>
      </div>
    </div>
  );
};

export default Home;
