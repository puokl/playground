import { BoardProps } from "../types/types";
import Cell from "./Cell";
import "../Board.css";

const Board: React.FC<{ board: BoardProps }> = ({ board }) => {
  return (
    <div className="grid mx-auto grid-lg grid-mobile grid-md gap-[1px] border-2 border-solid border-gray-800 bg-purple-900">
      {board.map((row, rowIndex) =>
        row.map((cell, columnIndex) => (
          <Cell key={`${rowIndex}-${columnIndex}`} type={cell[0]} />
        ))
      )}
    </div>
  );
};
export default Board;
