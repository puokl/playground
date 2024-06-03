import React from "react";
import { TETROMINOS } from "../utils/tetrominos";

interface CellProps {
  type: keyof typeof TETROMINOS | number;
}

const Cell: React.FC<CellProps> = ({ type }) => {
  const getColor = (type: keyof typeof TETROMINOS) => {
    return TETROMINOS[type]
      ? `rgba(${TETROMINOS[type].color}, 0.8)`
      : "rgba(0, 0, 0, 0.8)";
  };

  return (
    <div
      className={`w-auto ${
        type === 0
          ? ""
          : "border-b-1 border-r-4 border-t-4 border-l-1 text-white "
      }`}
      style={{
        background:
          typeof type === "string" ? getColor(type) : "rgba(0, 0, 0, 0.8)",
        borderBottomColor: `rgba(${TETROMINOS[type]?.color}, 0.1)`,
        borderRightColor: `rgba(${TETROMINOS[type]?.color}, 1)`,
        borderTopColor: `rgba(${TETROMINOS[type]?.color}, 1)`,
        borderLeftColor: `rgba(${TETROMINOS[type]?.color}, 0.3)`,
      }}
    ></div>
  );
};

export default React.memo(Cell);
