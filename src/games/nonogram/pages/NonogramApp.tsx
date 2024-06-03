import { useState, useEffect } from "react";
import GameGrid from "../components/GameGrid";
import HintsDisplay from "../components/HintsDisplay";
import ErrorCount from "../components/ErrorCount";
import ToggleSwitch from "../components/ToggleSwitch";
import { Cell, HintInfo } from "../types/types";
import nonogramsDataEasy from "../data/levels/easy.json";
import nonogramsDataMedium from "../data/levels/medium.json";
import nonogramsDataHard from "../data/levels/hard.json";
import nonogramsDataMaster from "../data/levels/master.json";
import { useParams } from "react-router-dom";
import { LIVES } from "../utils/constants";
import HomeIcon from "../../../components/HomeIcon";

const levelData: { [key: string]: any } = {
  easy: nonogramsDataEasy,
  medium: nonogramsDataMedium,
  hard: nonogramsDataHard,
  master: nonogramsDataMaster,
};

const NonogramApp = () => {
  const { level } = useParams<{ level: string }>();
  const [grid, setGrid] = useState<Cell[][]>([]);
  const [horizontalHints, setHorizontalHints] = useState<HintInfo[][]>([]);
  const [verticalHints, setVerticalHints] = useState<HintInfo[][]>([]);
  const [errors, setErrors] = useState(LIVES);
  const [toggleSwitchChecked, setToggleSwitchChecked] = useState(true);

  let numCols = 10;
  if (level === "medium") {
    numCols = 15;
  } else if (level === "hard") {
    numCols = 20;
  } else if (level === "master") {
    numCols = 25;
  }

  useEffect(() => {
    // initialize board game depending on the level chosen on home page
    console.log("level", level);
    if (level && levelData[level]) {
      const gameData = levelData[level][0];
      const initialGrid = gameData.grid.map((row: number[]) =>
        row.map((value) => ({
          isFilled: false,
          colorClass: "",
          solution: value === 1,
          hintIndex: null,
          hintPart: null,
        }))
      );
      setGrid(initialGrid);
      setHorizontalHints(calculateHints(initialGrid, "horizontal"));
      setVerticalHints(calculateHints(initialGrid, "vertical"));
    }
  }, [level]);

  // control behaviour of user's click on a cell in the grid
  const handleCellClick = (row: number, column: number) => {
    const newGrid = [...grid];
    const cell = newGrid[row][column];

    if (errors === 0) {
      alert("Game Over! You've run out of lives.");
      return;
    }

    if (cell.colorClass || cell.showX) {
      return;
    }

    const buttonColor = toggleSwitchChecked ? "red" : "black";

    if (!cell.isFilled) {
      // Check if the move is incorrect
      if (
        (buttonColor === "red" && cell.solution) ||
        (buttonColor === "black" && !cell.solution)
      ) {
        setErrors(errors - 1);

        // Temporarily set the color to green for ux
        cell.colorClass = "bg-green-500";

        setGrid(newGrid);

        setTimeout(() => {
          // cell.colorClass = cell.solution ? "bg-black" : "bg-red-500";
          cell.colorClass = cell.solution ? "bg-black" : "bg-white";
          cell.showX = !cell.solution;
          setGrid([...newGrid]);

          if (errors - 1 === 0) {
            alert("Game Over! You've run out of errors.");
          }
        }, 500);

        return;
      }
    }

    // If the move is correct, fill the cell with the correct color
    cell.isFilled = true;
    // cell.colorClass = buttonColor === "black" ? "bg-black" : "bg-red-500";
    cell.colorClass = buttonColor === "black" ? "bg-black" : "bg-white";
    cell.showX = buttonColor === "red";
    setGrid(newGrid);

    updateHints(row, column, newGrid);

    if (checkForWin(newGrid)) {
      alert("Congratulations! You've won!");
      renderWinningMatrix();
    }
  };

  // hints are the number on the border of the grid to show how many occurrencies there are in a row or column
  const calculateHints = (
    grid: Cell[][],
    direction: "horizontal" | "vertical"
  ): HintInfo[][] => {
    const hints: HintInfo[][] = [];
    const length = direction === "horizontal" ? grid.length : grid[0].length;

    for (let i = 0; i < length; i++) {
      let currentCount = 0;
      let hintIndex = 0;
      let hintPart = 0; //

      const currentHints: HintInfo[] = []; // to store hints for the current row/column

      for (let j = 0; j < length; j++) {
        const cell = direction === "horizontal" ? grid[i][j] : grid[j][i];
        if (cell.solution) {
          currentCount++;
          cell.hintIndex = i; // Assuming horizontal hints
          cell.hintPart = hintPart; // Assign current hintPart
        } else if (currentCount > 0) {
          hintIndex++;
          hintPart = 0; // Reset hintPart for a new sequence
          currentHints.push({ value: currentCount, color: "" }); // Push currentCount as a hint value
          currentCount = 0;
        }
      }

      if (currentCount > 0) {
        currentHints.push({ value: currentCount, color: "" }); // Push the last sequence's count
      }

      // Add the collected hints for the row/column
      if (currentHints.length > 0) {
        hints.push(currentHints);
      } else {
        hints.push([{ value: 0, color: "" }]); // Push 0 if no hints found
      }
    }
    console.log("hints", hints);
    return hints;
  };

  const updateHints = (row: number, column: number, newGrid: Cell[][]) => {
    if (horizontalHints && horizontalHints[row]) {
      const horizontalHintFilled = checkHintFilled(
        horizontalHints[row].map((hint) => hint.value),
        true,
        row,
        newGrid
      );
      console.log("horizontalHints", horizontalHints);
      setHorizontalHints((prevHints) =>
        prevHints.map((hints, idx) =>
          idx === row
            ? hints.map((hint, hintIdx) => ({
                value: hint.value,
                color: horizontalHintFilled[hintIdx]
                  ? "text-red-500"
                  : hint.color,
              }))
            : hints
        )
      );
    }

    if (verticalHints && verticalHints[column]) {
      const verticalHintFilled = checkHintFilled(
        verticalHints[column].map((hint) => hint.value),
        false,
        column,
        newGrid
      );
      setVerticalHints((prevHints) =>
        prevHints.map((hints, idx) =>
          idx === column
            ? hints.map((hint, hintIdx) => ({
                value: hint.value,
                color: verticalHintFilled[hintIdx]
                  ? "text-red-500"
                  : hint.color,
              }))
            : hints
        )
      );
    }
  };

  // check the hints value to change color if fulfilled
  const checkHintFilled = (
    hints: (number | string)[],
    row: boolean,
    index: number,
    newGrid: Cell[][]
  ): boolean[] => {
    let hintPart = 0;
    let count = 0;
    const filled = new Array(hints.length).fill(false);

    for (let i = 0; i < (row ? newGrid[index].length : newGrid.length); i++) {
      const cell = row ? newGrid[index][i] : newGrid[i][index];
      console.log("Cell:", cell.isFilled, cell.colorClass);

      if (cell.isFilled && cell.colorClass === "bg-black") {
        count++;
      } else {
        if (count >= Number(hints[hintPart])) {
          filled[hintPart] = true;
          hintPart++;
        }
        count = 0;
      }
    }

    // Check the last hint if cells are filled at the end of the grid row/column
    if (count >= Number(hints[hintPart])) {
      filled[hintPart] = true;
    }
    console.log("filled", filled);
    return filled;
  };

  const checkForWin = (grid: Cell[][]): boolean => {
    return grid.every((row) =>
      row.every((cell) =>
        cell.solution ? cell.colorClass === "bg-black" : true
      )
    );
  };

  const renderWinningMatrix = () => {
    const newGrid = grid.map((row) =>
      row.map((cell) => ({
        ...cell,
        colorClass: cell.solution ? "bg-black" : cell.colorClass,
      }))
    );
    setGrid(newGrid);
  };

  const handleToggleSwitchChange = () => {
    setToggleSwitchChecked(!toggleSwitchChecked);
  };

  return (
    <div className="relative flex flex-col items-center h-screen bg-slate-300">
      <HomeIcon />
      <div className="flex justify-center mt-20">
        <div className="flex bg-gray-200 w-fit">
          <div className="flex flex-col justify-end bg-gray-200">
            <HintsDisplay horizontalHints={horizontalHints} grid={grid} />
          </div>
          <div className="flex flex-col">
            <div className="flex flex-row justify-start">
              <HintsDisplay verticalHints={verticalHints} grid={grid} />
            </div>
            <GameGrid
              grid={grid}
              toggleCell={handleCellClick}
              numCols={numCols}
            />
          </div>
        </div>
      </div>
      <ErrorCount errors={errors} />
      <ToggleSwitch onChange={handleToggleSwitchChange} />
    </div>
  );
};
export default NonogramApp;
