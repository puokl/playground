import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  getColorClass,
  getColorClassDark,
  pegColors,
} from "../utils/colorUtil";
import Modal from "../components/Modal";
import HomeIcon from "../../../components/HomeIcon";

type Attempt = {
  guess: string[];
  feedback: { correctPosition: number; correctColor: number };
};

const MastermindApp: React.FC = () => {
  const MAXATTEMPT: number = 10;
  const CODELENGTH: number = 4;

  const [secretCode, setSecretCode] = useState<string[]>([]);
  const [activePeg, setActivePeg] = useState<number | null>(null);
  const [currentAttemptNumber, setCurrentAttemptNumber] = useState<number>(0);
  const [isGameOver, setIsGameOver] = useState<boolean>(false);
  const [hasWon, setHasWon] = useState<boolean>(false);
  const [currentPeg, setCurrentPeg] = useState(0);
  const [attempts, setAttempts] = useState<Attempt[]>(
    Array(MAXATTEMPT).fill({
      guess: Array(CODELENGTH).fill(""),
      feedback: { correctPosition: 0, correctColor: 0 },
    })
  );
  const [currentGuess, setCurrentGuess] = useState<string[]>(
    Array(CODELENGTH).fill("")
  );

  const navigate = useNavigate();
  const goToHome = () => {
    navigate("/");
  };

  const generateRandomCode = (): string[] => {
    let code: string[] = [];
    for (let i = 0; i < CODELENGTH; i++) {
      const randomIndex: number = Math.floor(Math.random() * pegColors.length);
      code.push(pegColors[randomIndex]);
    }
    return code;
  };

  const handlePegClick = (pegIndex: number) => {
    if (activePeg === pegIndex) {
      setActivePeg(null);
    } else {
      setActivePeg(pegIndex);
    }
  };

  const selectColor = (color: string) => {
    if (activePeg !== null) {
      const newGuess = [...currentGuess];
      newGuess[activePeg] = color;
      setCurrentGuess(newGuess);
      setActivePeg(null);
    }
  };

  const generateFeedback = (guess: string[]) => {
    let correctPosition = 0;
    let correctColor = 0;
    const secretCodeCopy = [...secretCode];
    // Check for correct position and color
    guess.forEach((color, index) => {
      if (color === secretCode[index]) {
        correctPosition++;
        secretCodeCopy[index] = "-"; // Mark this as counted
      }
    });
    // Check for correct color but wrong position
    guess.forEach((color, index) => {
      if (color !== secretCode[index] && secretCodeCopy.includes(color)) {
        correctColor++;
        secretCodeCopy[secretCodeCopy.indexOf(color)] = "-";
      }
    });

    return { correctPosition, correctColor };
  };

  const submitGuess = () => {
    // Check if any pegs are not selected
    if (currentGuess.some((color) => color === "")) {
      alert("Please choose the color for all pegs before submitting.");
      return;
    }
    const feedback = generateFeedback(currentGuess);
    setAttempts((prevAttempts) =>
      prevAttempts.map((attempt, index) =>
        index === currentAttemptNumber
          ? { guess: currentGuess, feedback }
          : attempt
      )
    );
    const isWinningGuess = currentGuess.every(
      (color, index) => color === secretCode[index]
    );
    if (isWinningGuess) {
      setHasWon(true);
    } else if (currentAttemptNumber + 1 >= MAXATTEMPT) {
      setIsGameOver(true);
    } else {
      setCurrentAttemptNumber(currentAttemptNumber + 1);
    }
    setCurrentPeg(0);
    setCurrentGuess(Array(CODELENGTH).fill(""));
  };

  const selectColorFromPalette = (selectedColor: string, pegIndex: number) => {
    if (pegIndex !== -1 && currentPeg < CODELENGTH) {
      const newGuess = [...currentGuess];
      newGuess[pegIndex] = selectedColor;
      setCurrentGuess(newGuess);
      setCurrentPeg((prevPeg) => prevPeg + 1);
    } else {
      console.log("Please select a specific peg manually.");
    }
  };

  const startGame = () => {
    setSecretCode(generateRandomCode());
    setAttempts(
      Array(MAXATTEMPT).fill({
        guess: Array(CODELENGTH).fill(""),
        feedback: { correctPosition: 0, correctColor: 0 },
      })
    );
    setCurrentAttemptNumber(0);
    setIsGameOver(false);
    setHasWon(false);
  };

  useEffect(() => {
    startGame();
  }, []);

  return (
    <div className="relative w-screen min-h-screen">
      <HomeIcon />

      <div className="min-h-full bg-slate-300 md:py-10 md:px-10 md:pt-10 ">
        <div className="min-h-full md:flex md:items-center bg-slate-400 ">
          {/* PEGS SELECTION AREA */}
          <div className="p-2 mx-2 lg:w-1/2 md:max-h-96 md:w-2/5">
            {/* {automatic selection} */}
            <div className="flex flex-col items-center justify-center h-24 mb-4 space-x-2 md:text-lg">
              {currentGuess.includes("") ? (
                <p className="w-full mb-4 text-center">
                  Choose the color of peg n. {currentGuess.indexOf("") + 1}:
                </p>
              ) : (
                <p className="mb-2 italic">You can change the colors below</p>
              )}
              <div className="flex space-x-2">
                {pegColors.map((color) => {
                  const index = currentGuess.indexOf("");

                  return (
                    <div
                      key={color}
                      className={`w-8 h-8 rounded-full md:w-8 md:h-8 ${getColorClass(
                        color
                      )} hover:${getColorClassDark(color)} block m-0`}
                      onClick={() => selectColorFromPalette(color, index)}
                    ></div>
                  );
                })}
              </div>
            </div>
            <div className="flex flex-col items-center justify-center h-4 mb-4 space-x-2">
              <p className="text-xs text-center md:text-md lg:text-lg">
                Click on the peg to manually choose or modify the color
              </p>
            </div>
            <div className="flex items-center justify-center space-x-8 ">
              <div className="flex space-x-2 ">
                {currentGuess.map((color, pegIndex) => (
                  <div
                    key={pegIndex}
                    className={`relative w-6 h-6 md:w-8 md:h-8 rounded-full border-2 border-gray-600 ${
                      activePeg === pegIndex ? "scale-125" : ""
                    } ${getColorClass(
                      color
                    )} hover:cursor-pointer hover:opacity-75`}
                    onClick={() => handlePegClick(pegIndex)}
                  ></div>
                ))}
              </div>
              <button
                onClick={submitGuess}
                className="p-2 text-sm text-white bg-teal-600 rounded"
                disabled={isGameOver}
              >
                Check
              </button>
            </div>

            <div className="w-auto h-16 md:pt-2">
              <div className="flex flex-col items-center justify-center w-auto mt-4 rounded bg-slate-400 mx-28">
                {activePeg !== null && (
                  <p className="mb-2 text-xs md:text-md lg:text-lg">
                    Choose the color of peg n. {activePeg + 1}:
                  </p>
                )}

                {activePeg !== null && (
                  <div className="flex space-x-2 ">
                    {pegColors.map((color) => (
                      <div
                        key={color}
                        className={`w-6 h-6 rounded-full md:w-8 md:h-8 ${getColorClass(
                          color
                        )}`}
                        onClick={() => selectColor(color)}
                      ></div>
                    ))}
                  </div>
                )}
              </div>
            </div>
            <div className="flex-col items-center hidden w-auto p-2 py-4 m-4 mt-32 border rounded-md md:flex bg-slate-300">
              <div className="flex items-center">
                <div className="w-4 h-4 mr-2 bg-red-600 rounded-full"></div> =
                correct color in correct position
              </div>
              <div className="flex items-center justify-start ">
                <div className="w-4 h-4 mr-2 bg-white rounded-full"></div> =
                correct color in wrong position
              </div>
            </div>
          </div>
          {/* BOARD */}
          <div className="h-full px-10 py-6 md:mx-auto md:w-3/5 lg:w-1/2">
            <div className="w-2/3 p-4 mx-auto my-auto bg-orange-800 rounded-lg shadow-lg md:w-fit">
              {attempts.map((attempt, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between pl-2 mb-2 bg-orange-700 rounded-lg shadow-md md:pl-4"
                >
                  {/* Guess Pegs Section */}
                  <div className="flex space-x-5 md:pr-6 lg:pr-8">
                    {[...Array(CODELENGTH)].map((_, pegIndex) => (
                      <div
                        key={pegIndex}
                        className={`md:w-7 md:h-7 lg:w-8 lg:h-8 w-6 h-6 ml-2 md:ml-4 lg:ml-6 rounded-full border-2 border-gray-600 ${getColorClass(
                          attempt.guess[pegIndex]
                        )} hover:shadow-lg transition-all duration-200`}
                        onClick={
                          index === currentAttemptNumber
                            ? () => handlePegClick(pegIndex)
                            : undefined
                        }
                      >
                        {attempt.guess[pegIndex] === "" && (
                          <div className="w-full h-full rounded-full bg-orange-950"></div>
                        )}
                      </div>
                    ))}
                  </div>
                  {/* Feedback Section */}
                  <div className="grid grid-cols-2 grid-rows-2 gap-1 p-1 ml-2 mr-2 bg-orange-700 border border-gray-600 rounded-lg shadow-inner md:ml-4 md:mr-4">
                    {/* Default empty pegs */}
                    {Array(
                      CODELENGTH -
                        attempt.feedback.correctPosition -
                        attempt.feedback.correctColor
                    )
                      .fill(null)
                      .map((_, i) => (
                        <div
                          key={i}
                          className="w-4 h-4 rounded-full md:w-5 md:h-5 bg-orange-950"
                        ></div>
                      ))}
                    {/* Colored pegs based on feedback */}
                    {Array(attempt.feedback.correctPosition)
                      .fill("red-500")
                      .map((color, i) => (
                        <div
                          key={i}
                          className={`md:w-5 md:h-5 w-4 h-4 rounded-full border border-black bg-${color}`}
                        ></div>
                      ))}
                    {Array(attempt.feedback.correctColor)
                      .fill("white")
                      .map((color, i) => (
                        <div
                          key={i}
                          className={`md:w-5 md:h-5 w-4 h-4 rounded-full border border-black bg-${color}`}
                        ></div>
                      ))}
                  </div>
                </div>
              ))}
            </div>
            <div className="flex flex-col items-center w-auto p-2 m-4 mt-8 border rounded-md md:hidden bg-slate-300">
              <div className="flex items-center ">
                <div className="w-4 h-4 mr-2 bg-red-600 rounded-full"></div>
                <span> = correct color in correct position</span>
              </div>
              <div className="flex items-center">
                <div className="w-4 h-4 mr-2 bg-white rounded-full"></div>
                <span> = correct color in wrong position</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Results */}
      {isGameOver && (
        <Modal
          title="Game Over!"
          message="The correct code was:"
          colors={secretCode}
          onRestart={startGame}
          onGoHome={goToHome}
          getColorClass={getColorClass}
        />
      )}
      {hasWon && (
        <Modal
          title="Congratulations! You won!"
          message="You guessed the right code!"
          colors={secretCode}
          onRestart={startGame}
          onGoHome={goToHome}
          getColorClass={getColorClass}
        />
      )}
    </div>
  );
};
export default MastermindApp;
