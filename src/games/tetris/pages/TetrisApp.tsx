import React, { useEffect, useState } from "react";
import Board from "../components/Board";
import Display from "../components/Display";
import StartButton from "../components/StartButton";
import { createBoard, checkCollision } from "../utils/gameHelpers";
import { useBoard } from "../hooks/useStage";
import { usePlayer } from "../hooks/usePlayer";
import { useInterval } from "../hooks/useInterval";
import { useGameStatus } from "../hooks/useGameStatus";
import MobileControls from "../components/MobileControls";
import { BoardProps } from "../types/types";
import { Link } from "react-router-dom";
import { RiHome2Line } from "react-icons/ri";
import HomeIcon from "../../../components/HomeIcon";

type TetrisProps = {};

const TetrisApp: React.FC<TetrisProps> = () => {
  const [dropTime, setDropTime] = useState<number | null>(null);
  const [gameOver, setGameOver] = useState<boolean>(false);
  const [player, updatePlayerPos, resetPlayer, playerRotate] = usePlayer();
  const [board, setBoard, rowsCleared] = useBoard(player, resetPlayer);
  const [score, setScore, rows, setRows, level, setLevel] = useGameStatus(
    rowsCleared as number
  );
  const [showMobileControls, setShowMobileControls] = useState(false);

  const toggleMobileControls = () => {
    setShowMobileControls(!showMobileControls);
  };

  const movePlayer = (dir: number) => {
    if (!checkCollision(player, board as BoardProps, { x: dir, y: 0 })) {
      updatePlayerPos({ x: dir, y: 0, collided: false });
    }
  };

  const startGame = () => {
    // Reset everything
    (setBoard as React.Dispatch<React.SetStateAction<BoardProps>>)(
      createBoard()
    );
    setDropTime(1000);
    resetPlayer();
    setScore(0);
    setLevel(0);
    setRows(0);
    setGameOver(false);
  };

  const drop = () => {
    // Increase level when player has cleared 10 rows
    if (rows > (level + 1) * 10) {
      setLevel((prev) => prev + 1);
      // increase speed
      setDropTime(1000 / (level + 1) + 200);
    }

    if (!checkCollision(player, board as BoardProps, { x: 0, y: 1 })) {
      updatePlayerPos({ x: 0, y: 1, collided: false });
    } else {
      // Game over
      if (player.pos.y < 1) {
        console.log("GAME OVER!!!");
        setGameOver(true);
        setDropTime(null);
      }
      updatePlayerPos({ x: 0, y: 0, collided: true });
    }
  };

  const keyUp = (event: React.KeyboardEvent<HTMLDivElement>) => {
    const { keyCode } = event;
    if (!gameOver) {
      // activate interval when releases down arrow.
      if (keyCode === 40) {
        console.log("inside keyUp, interval on");
        setDropTime(1000 / (level + 1));
      }
    }
  };

  const dropPlayer = () => {
    // deactivate interval when arrow down
    console.log("inside drop player, interval off");
    setDropTime(null);
    drop();
  };

  useInterval(() => {
    drop();
  }, dropTime);

  const move = (event: React.KeyboardEvent<HTMLDivElement>) => {
    const { keyCode } = event;
    if (!gameOver) {
      if (keyCode === 37) {
        // 37 = left
        movePlayer(-1);
        console.log("move left");
      } else if (keyCode === 39) {
        // 39 = right
        movePlayer(1);
        console.log("move right");
      } else if (keyCode === 40) {
        // 40 = down
        dropPlayer();
        console.log("move ");
      } else if (keyCode === 38) {
        // 38 = up
        playerRotate(board as BoardProps, 1);
      }
    }
  };

  //SECTION - MOBILE CONTROLLERS

  const moveMobile = (keyCode: number) => {
    if (!gameOver) {
      if (keyCode === 37) {
        movePlayer(-1);
        console.log("move left");
      } else if (keyCode === 39) {
        movePlayer(1);
        console.log("move right");
      } else if (keyCode === 40) {
        dropPlayer();
        console.log("move down");
      } else if (keyCode === 38) {
        playerRotate(board as BoardProps, 1);
      }
    }
  };

  const keyUpMobile = (keyCode: number) => {
    if (!gameOver) {
      if (keyCode === 40) {
        console.log("inside keyUp, interval on");
        setDropTime(1000 / (level + 1));
      }
    }
  };

  const handleMoveLeft = () => {
    moveMobile(37);
  };

  const handleMoveRight = () => {
    moveMobile(39);
  };

  const handleMoveDown = () => {
    moveMobile(40);
    keyUpMobile(40);
  };

  const handleRotate = () => {
    moveMobile(38);
  };

  return (
    <div
      className="flex flex-col w-full min-h-screen lg:flex-row bg-slate-300"
      role="button"
      tabIndex={0}
      onKeyDown={(e) => move(e)}
      onKeyUp={keyUp}
    >
      {/* <Link
        to="https://mastermind-topaz.vercel.app"
        className="absolute z-10 text-black top-4 right-4 bg-slate-200 rounded-xl"
      >
        <RiHome2Line size={32} />
      </Link> */}
      <HomeIcon />
      <div className="flex items-center justify-center flex-grow-[4] ">
        <Board board={board as BoardProps} />
      </div>
      <aside className="flex flex-col items-center justify-between flex-grow-[1] bg-slate-400 lg:flex-0 lg:w-2/6">
        {gameOver ? (
          <div className="flex flex-col items-center p-2 mt-4 lg:mt-20">
            <Display gameOver={gameOver} text="GAME OVER!" />
            <Display gameOver={gameOver} text={`You scored ${score} points`} />
          </div>
        ) : (
          <div className="flex flex-col items-center m-2 lg:my-20">
            {showMobileControls && (
              <MobileControls
                onMoveLeft={handleMoveLeft}
                onMoveRight={handleMoveRight}
                onMoveDown={handleMoveDown}
                onRotate={handleRotate}
              />
            )}
            <button onClick={toggleMobileControls} className="mb-4 lg:mb-20">
              {showMobileControls
                ? "Hide Mobile Controls"
                : "Show Mobile Controls"}
            </button>
            <div className="flex flex-row justify-center gap-2 lg:flex-col lg:w-4/5 lg:min-w-64">
              <Display text={`Score: ${score}`} gameOver={gameOver} />
              <Display text={`Rows: ${rows}`} gameOver={gameOver} />
              <Display text={`Level: ${level}`} gameOver={gameOver} />
            </div>
          </div>
        )}
        <StartButton startGame={startGame} />
      </aside>
    </div>
  );
};
export default TetrisApp;
