import { BoardProps, PlayerState } from "../types/types";

export const BOARD_WIDTH: number = 12;
export const BOARD_HEIGHT: number = 20;

export const createBoard = (): BoardProps =>
  Array.from(Array(BOARD_HEIGHT), () => Array(BOARD_WIDTH).fill([0, "clear"]));

export const checkCollision = (
  player: PlayerState,
  board: BoardProps,
  { x: moveX, y: moveY }: { x: number; y: number }
) => {
  for (let y = 0; y < player.tetromino.length; y += 1) {
    for (let x = 0; x < player.tetromino[y].length; x += 1) {
      // 1. Check we're on an actual Tetromino cell
      if (player.tetromino[y][x] !== 0) {
        if (
          // 2. Check move is inside the height
          !board[y + player.pos.y + moveY] ||
          // 3. Check move is inside the width
          !board[y + player.pos.y + moveY][x + player.pos.x + moveX] ||
          // 4. Check cell isn't set to clear
          board[y + player.pos.y + moveY][x + player.pos.x + moveX][1] !==
            "clear"
        ) {
          return true;
        }
      }
    }
  }
  return false;
};
