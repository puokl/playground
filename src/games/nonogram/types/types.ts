export interface Cell {
  isFilled: boolean;
  colorClass: string;
  solution: boolean;
  hintIndex: number | null; // Hint index in the hints array
  hintPart: number | null; // Part of the hint it belongs to
  showX?: boolean;
}

export interface HintInfo {
  value: number | string;
  color?: string; // Background color
}
