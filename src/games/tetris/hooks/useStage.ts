import { useState, useEffect } from "react";
import { createBoard } from "../utils/gameHelpers";
import { BoardProps, CellStatusProps, PlayerState } from "../types/types";

export const useBoard = (player: PlayerState, resetPlayer: () => void) => {
  const [board, setBoard] = useState<BoardProps>(createBoard());
  const [rowsCleared, setRowsCleared] = useState(0);

  useEffect(() => {
    setRowsCleared(0);
    const sweepRows = (newBoard: any[]) =>
      newBoard.reduce((acc, row) => {
        if (row.findIndex((cell: CellStatusProps) => cell[0] === 0) === -1) {
          setRowsCleared((prev) => {
            return prev + 1;
          });
          acc.unshift(new Array(newBoard[0].length).fill([0, "clear"]));
          return acc;
        }
        acc.push(row);
        return acc;
      }, []);

    const updateBoard = (prevBoard: BoardProps) => {
      const newBoard = prevBoard.map((row) =>
        row.map((cell) => (cell[1] === "clear" ? [0, "clear"] : cell))
      );

      player.tetromino.forEach((row, y) => {
        row.forEach((value, x) => {
          if (value !== 0) {
            newBoard[y + player.pos.y][x + player.pos.x] = [
              value,
              `${player.collided ? "merged" : "clear"}`,
            ];
          }
        });
      });

      if (player.collided) {
        resetPlayer();
        return sweepRows(newBoard);
      }
      return newBoard;
    };

    setBoard((prev) => updateBoard(prev));
  }, [
    player.collided,
    player.pos.x,
    player.pos.y,
    player.tetromino,
    resetPlayer,
  ]);

  return [board, setBoard, rowsCleared];
};
