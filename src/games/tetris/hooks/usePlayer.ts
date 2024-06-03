import { useState, useCallback } from "react";
import { TETROMINOS, randomTetromino } from "../utils/tetrominos";
import { BOARD_WIDTH, checkCollision } from "../utils/gameHelpers";
import { BoardProps, PlayerState } from "../types/types";

export const usePlayer = (): [
  PlayerState,
  (update: { x: number; y: number; collided: boolean }) => void,
  () => void,
  (board: BoardProps, dir: number) => void
] => {
  const [player, setPlayer] = useState<PlayerState>({
    pos: { x: 0, y: 0 },
    tetromino: TETROMINOS[0].shape,
    collided: false,
  });

  const rotate = (matrix: BoardProps, dir: number) => {
    // Make the rows to become cols
    const rotatedTetro = matrix.map((_, index) =>
      matrix.map((column) => column[index])
    );
    // Reverse each row to get a rotated matrix
    if (dir > 0) return rotatedTetro.map((row) => row.reverse());
    return rotatedTetro.reverse();
  };

  //REVIEW -
  const playerRotate = (board: BoardProps, dir: number) => {
    const clonedPlayer = JSON.parse(JSON.stringify(player));
    clonedPlayer.tetromino = rotate(clonedPlayer.tetromino, dir);

    const pos = clonedPlayer.pos.x;
    let offset = 1;
    while (checkCollision(clonedPlayer, board, { x: 0, y: 0 })) {
      clonedPlayer.pos.x += offset;
      offset = -(offset + (offset > 0 ? 1 : -1));
      if (offset > clonedPlayer.tetromino[0].length) {
        rotate(clonedPlayer.tetromino, -dir);
        clonedPlayer.pos.x = pos;
        return;
      }
    }
    setPlayer(clonedPlayer);
  };

  const updatePlayerPos = ({
    x,
    y,
    collided,
  }: {
    x: number;
    y: number;
    collided: boolean;
  }) => {
    console.log("x", x);
    console.log("y", y);
    setPlayer(
      (prev) => (
        console.log("prev", prev),
        {
          ...prev,
          pos: { x: prev.pos.x + x, y: prev.pos.y + y },
          collided,
        }
      )
    );
    console.log("player", player);
  };

  const resetPlayer = useCallback(() => {
    setPlayer({
      pos: { x: BOARD_WIDTH / 2 - 2, y: 0 },
      tetromino: randomTetromino().shape,
      collided: false,
    });
  }, []);

  return [player, updatePlayerPos, resetPlayer, playerRotate];
};
