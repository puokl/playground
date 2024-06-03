import { DisplayProps } from "../types/types";

const Display: React.FC<DisplayProps> = ({ gameOver, text }) => {
  return (
    <div
      className={`box-border flex items-center ${
        gameOver ? "text-red-500" : "text-gray-300"
      } bg-black border-4 border-solid border-gray-800 rounded-lg mb-2 py-2 px-4 md:min-w-1/3 lg:min-w-1/2`}
    >
      {text}
    </div>
  );
};

export default Display;
