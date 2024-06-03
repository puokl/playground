import React from "react";
import { useNavigate } from "react-router-dom";

const Home: React.FC = () => {
  const navigate = useNavigate();

  const startGame = () => {
    navigate("/mastermind/play");
  };
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 bg-slate-300 lg:flex-row">
      <div className="flex flex-col items-center justify-center p-4">
        <h1 className="mb-4 text-4xl font-bold">MASTERMIND</h1>

        <p className="mb-6 text-center">
          Mastermind is a classic code-breaking game where the goal is to guess
          the secret code.
        </p>

        <h2 className="mb-1 font-bold tracking-widest font-inter">GOAL</h2>
        <p className="mb-8">
          Crack the secret code consisting of a sequence of colored pegs.
        </p>
        <h2 className="mb-2 font-bold tracking-widest font-inter">RULES</h2>
        <div className="mb-8">
          <ul className="ml-6 list-disc">
            <li>
              The secret code is a combination of four colored pegs, chosen from
              a set of six colors.
            </li>
            <li>
              Arrange your guesses on the board and receive feedback after each
              attempt.
            </li>
            <li>
              Feedback consists of two elements: red pegs and white pegs.
              <ul className="ml-6 list-disc">
                <li>
                  A <strong>red peg</strong>{" "}
                  <div className="inline-block w-3 h-3 bg-red-500 rounded-full md:w-4 md:h-4 bg-gradient-to-br from-bg-red-500-light to-bg-red-700-dark"></div>{" "}
                  indicates a correct color in the correct position.
                </li>
                <li>
                  A <strong>white peg</strong>{" "}
                  <div className="inline-block w-3 h-3 md:w-4 md:h-4 rounded-full bg-white border-black border-[1px]"></div>{" "}
                  indicates a correct color but in the wrong position.
                </li>
              </ul>
            </li>
            <li>
              Use the feedback to refine your guesses and crack the code within
              the given number of attempts.
            </li>
            <li>
              Be strategic! Each guess brings you closer to revealing the secret
              code.
            </li>
          </ul>
        </div>

        <div className="flex items-center justify-center w-full my-4 lg:my-6">
          <button
            onClick={startGame}
            className="px-4 py-2 mx-auto text-white rounded bg-cyan-700 "
          >
            Start Game
          </button>
        </div>
      </div>
      <div className="lg:pl-6">
        <img
          src="/master.jpeg"
          alt="Mastermind board"
          className="mt-4 max-h-60 lg:ml-4 lg:mt-0"
        />
      </div>
    </div>
  );
};

export default Home;
