import React from "react";
import { Cell } from "../types/types";
import { FaTimes } from "react-icons/fa";

interface GameGridProps {
  grid: Cell[][];
  toggleCell: (row: number, col: number) => void;
  numCols: number;
}

const GameGrid: React.FC<GameGridProps> = ({ grid, toggleCell, numCols }) => {
  const columnWidth = `repeat(${numCols}, minmax(0, 1fr))`;
  console.log("grid in gamegrid", grid);
  return (
    <div
      className={`grid bg-white`}
      style={{ gridTemplateColumns: columnWidth }}
    >
      {grid.map((row, rowIndex) =>
        row.map((cell, colIndex) => (
          <div
            key={`${rowIndex}-${colIndex}`}
            className={`w-6 h-6 border border-gray-200 relative flex items-center justify-center ${
              cell.colorClass
            } ${colIndex % 5 === 0 ? "border-l-2  border-gray-200" : ""} 
            ${rowIndex % 5 === 0 ? "border-t-2  border-gray-200" : ""} 
              `}
            onClick={() => toggleCell(rowIndex, colIndex)}
          >
            {cell.showX && <FaTimes className="text-stone-500" />}
          </div>
        ))
      )}
    </div>
  );
};

export default GameGrid;
