import React from "react";

interface StartButtonProps {
  startGame: () => void;
}

const StartButton: React.FC<StartButtonProps> = ({ startGame }) => (
  <button
    className="box-border w-1/4 p-2 mx-auto mb-6 text-lg text-white bg-gray-900 rounded-lg outline-none cursor-pointer min-h-10 lg:w-1/2 font-pixel"
    onClick={startGame}
  >
    Start Game
  </button>
);

export default StartButton;
