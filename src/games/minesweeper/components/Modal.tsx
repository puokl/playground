import React from "react";

interface ModalProps {
  message: string;
  isVisible: boolean;
  restartGame: () => void;
  goHome: () => void;
}

const Modal: React.FC<ModalProps> = ({
  message,
  isVisible,
  restartGame,
  goHome,
}) => {
  if (!isVisible) return null;

  return (
    <div className="w-1/3 flex flex-col items-center justify-center">
      <p className="mt-4 mb-2 text-2xl font-bold text-red-500">{message}</p>
      <div className="flex gap-2 mt-2 w-full justify-around">
        <button
          onClick={restartGame}
          className="inline-flex text-white bg-cyan-600 hover:bg-cyan-800 focus:ring-4 focus:outline-none focus:ring-cyan-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:focus:ring-cyan-900 my-4"
        >
          Play Again
        </button>
        <button
          onClick={goHome}
          className="inline-flex text-white bg-cyan-600 hover:bg-cyan-800 focus:ring-4 focus:outline-none focus:ring-cyan-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:focus:ring-cyan-900 my-4"
        >
          Home
        </button>
      </div>
    </div>
  );
};

export default Modal;
