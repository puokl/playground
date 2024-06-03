import React from "react";
import Cell from "./Cell";
import { CellType } from "../types/CellTypes";

interface MinesweeperBoardProps {
  board: CellType[][];
  onCellClick: (row: number, col: number) => void;
  onCellRightClick: (row: number, col: number) => void;
}

const MinesweeperBoard: React.FC<MinesweeperBoardProps> = ({
  board,
  onCellClick,
  onCellRightClick,
}) => {
  const numCols = board[0].length;

  let colsClass, widthClass;

  if (numCols === 10) {
    colsClass = "grid-cols-10";
    widthClass = "w-[320px]";
  } else if (numCols === 15) {
    colsClass = "grid-cols-15";
    widthClass = "w-[480px]";
  } else {
    colsClass = "grid-cols-20";
    widthClass = "w-[640px]";
  }

  const handleRightClick = (
    event: React.MouseEvent,
    rowIndex: number,
    colIndex: number
  ) => {
    event.preventDefault();
    onCellRightClick(rowIndex, colIndex);
  };

  return (
    <div className={`grid ${colsClass} ${widthClass} m-4`}>
      {board.map((row, rowIndex) =>
        row.map((cell, colIndex) => (
          <Cell
            key={`${rowIndex}-${colIndex}`}
            cell={cell}
            onClick={() => onCellClick(rowIndex, colIndex)}
            onContextMenu={(event) =>
              handleRightClick(event, rowIndex, colIndex)
            }
          />
        ))
      )}
    </div>
  );
};

export default MinesweeperBoard;
