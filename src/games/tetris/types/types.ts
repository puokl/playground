export interface DisplayProps {
  gameOver: boolean;
  text: string;
}

export interface Tetromino {
  shape: (number | string)[][];
  color: string;
}

export interface PlayerState {
  collided: boolean;
  pos: { x: number; y: number };
  tetromino: Tetromino["shape"];
}

export type BoardProps = [number, string][][];

export type CellStatusProps = [number, string];
