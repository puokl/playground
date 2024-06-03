import React from "react";

interface ModalProps {
  title: string;
  message: string;
  colors: string[];
  onRestart: () => void;
  onGoHome: () => void;
  getColorClass: (color: string) => string;
}

const Modal: React.FC<ModalProps> = ({
  title,
  message,
  colors,
  onRestart,
  onGoHome,
  getColorClass,
}) => {
  return (
    <div className="absolute inset-0 flex items-center justify-center min-h-screen bg-gray-700 bg-opacity-50">
      <div className="p-4 bg-slate-200 rounded">
        <p className="flex justify-center font-bold text-red-500">{title}</p>
        <p className="flex justify-center mt-2">{message}</p>
        <div className="flex justify-center mt-2 space-x-2">
          {colors.map((color, index) => (
            <div
              key={index}
              className={`w-6 h-6 rounded-full ${getColorClass(color)}`}
            ></div>
          ))}
        </div>
        <div className="flex justify-center mt-8 space-x-4">
          <button
            onClick={onRestart}
            className="px-4 py-2 text-white bg-blue-500 rounded"
          >
            Restart Game
          </button>
          <button
            onClick={onGoHome}
            className="px-4 py-2 text-white bg-gray-500 rounded"
          >
            Go to Home
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
