import React, { useState, useEffect } from "react";
import MinesweeperBoard from "../components/MinesweeperBoard";
import { generateBoard } from "../components/Board";
import { CellType } from "../types/CellTypes";
import { useNavigate } from "react-router-dom";
import Modal from "../components/Modal";
import HomeIcon from "../../../components/HomeIcon";

interface MinesweeperAppProps {
  difficulty: "easy" | "medium" | "hard";
}

const MinesweeperApp: React.FC<MinesweeperAppProps> = ({ difficulty }) => {
  const [gameOver, setGameOver] = useState(false);
  const [isWon, setIsWon] = useState(false);
  const [flagCount, setFlagCount] = useState(0);
  const [revealedCount, setRevealedCount] = useState(0);
  const [isGameWon, setIsGameWon] = useState(false);
  const [board, setBoard] = useState(
    generateBoard(
      // row
      difficulty === "easy" ? 10 : difficulty === "medium" ? 15 : 20,
      // cols
      difficulty === "easy" ? 10 : difficulty === "medium" ? 15 : 20,
      // bombs
      difficulty === "easy" ? 10 : difficulty === "medium" ? 30 : 40
    )
  );

  const [bombCount, setBombCount] = useState(
    difficulty === "easy" ? 10 : difficulty === "medium" ? 30 : 40
  );

  const navigate = useNavigate();

  const handleCellClick = (row: number, col: number) => {
    if (gameOver) return;

    const newBoard = [...board];

    // Check if the clicked cell is already open or flagged
    if (!newBoard[row][col].isOpen && !newBoard[row][col].isFlagged) {
      // If the cell is a bomb, reveal all bombs and set game over
      if (newBoard[row][col].isBomb) {
        revealAllBombs(newBoard);
        setGameOver(true);
        alert("Game over! You clicked on a bomb.");
      } else {
        // If the cell is not a bomb, reveal the cell
        newBoard[row][col].isOpen = true;

        // If the cell is empty, recursively reveal adjacent empty cells
        if (newBoard[row][col].value === 0) {
          revealAdjacentEmptyCells(newBoard, row, col);
        }
        setRevealedCount((prevCount) => prevCount + 1);
        setBoard(newBoard);
      }
    }
  };

  const handleCellRightClick = (row: number, col: number) => {
    const newBoard = [...board];
    // newBoard[row][col].isFlagged = !newBoard[row][col].isFlagged;
    const currentCell = newBoard[row][col];
    if (!currentCell.isFlagged && flagCount < bombCount) {
      currentCell.isFlagged = true;
      setFlagCount((prevCount) => prevCount + 1);
    } else if (currentCell.isFlagged) {
      currentCell.isFlagged = false;
      setFlagCount((prevCount) => prevCount - 1);
    }
    setBoard(newBoard);
  };

  const revealAllBombs = (board: CellType[][]) => {
    // Iterate through the entire board to reveal all bombs
    for (let i = 0; i < board.length; i++) {
      for (let j = 0; j < board[i].length; j++) {
        if (board[i][j].isBomb) {
          board[i][j].isOpen = true;
        }
      }
    }
  };

  const revealAdjacentEmptyCells = (
    board: CellType[][],
    row: number,
    col: number
  ) => {
    for (let dx = -1; dx <= 1; dx++) {
      for (let dy = -1; dy <= 1; dy++) {
        const newRow = row + dx;
        const newCol = col + dy;

        if (
          newRow >= 0 &&
          newRow < board.length &&
          newCol >= 0 &&
          newCol < board[0].length
        ) {
          if (!board[newRow][newCol].isOpen) {
            board[newRow][newCol].isOpen = true;

            // Recursively reveal adjacent empty cells
            if (board[newRow][newCol].value === 0) {
              revealAdjacentEmptyCells(board, newRow, newCol);
            }
          }
        }
      }
    }
  };

  const checkWinCondition = () => {
    const nonBombCells = board.flat().filter((cell) => !cell.isBomb);
    const revealedNonBombCells = nonBombCells.filter((cell) => cell.isOpen);

    if (revealedNonBombCells.length === nonBombCells.length) {
      // alert("You won!");
      console.log("check win condition");
      setIsGameWon(true);
    }
  };

  const restartGame = () => {
    setBoard(
      generateBoard(
        difficulty === "easy" ? 10 : difficulty === "medium" ? 15 : 20,
        difficulty === "easy" ? 10 : difficulty === "medium" ? 15 : 20,
        difficulty === "easy" ? 10 : difficulty === "medium" ? 30 : 40
      )
    );
    setBombCount(
      difficulty === "easy" ? 10 : difficulty === "medium" ? 30 : 40
    );
    setFlagCount(0);
    setGameOver(false);
    setIsGameWon(false);
    setIsWon(false);
  };

  const goHome = () => {
    navigate("/");
  };

  const capitalizeFirstLetter = (string: string): string => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  useEffect(() => {
    checkWinCondition();
  }, [revealedCount]);

  useEffect(() => {
    if (isGameWon && !gameOver) {
      setIsWon(true);
    }
  }, [isGameWon, gameOver]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-slate-300">
      <HomeIcon />

      <h1 className="mb-4 text-2xl font-bold">MINESWEEPER</h1>
      <div className="grid grid-cols-2 gap-1 mb-4">
        <div className="flex justify-start">
          <span className="mr-2 font-semibold">Level:</span>
        </div>
        <div className="flex justify-center">
          <span>{capitalizeFirstLetter(difficulty)}</span>
        </div>
        <div className="flex justify-start">
          <span className="mr-2 font-semibold">Bombs:</span>
        </div>
        <div className="flex justify-center">
          <span>{bombCount}</span>
        </div>
        <div className="flex justify-start">
          <span className="mr-2 font-semibold">Flags:</span>
        </div>
        <div className="flex justify-center">
          <span>{flagCount}</span>
        </div>
      </div>

      <MinesweeperBoard
        board={board}
        onCellClick={handleCellClick}
        onCellRightClick={handleCellRightClick}
      />

      {gameOver && (
        <Modal
          message="Game Over"
          isVisible={gameOver}
          restartGame={restartGame}
          goHome={goHome}
        />
      )}

      {isWon && (
        <Modal
          message="You won!"
          isVisible={isWon}
          restartGame={restartGame}
          goHome={goHome}
        />
      )}
    </div>
  );
};

export default MinesweeperApp;
