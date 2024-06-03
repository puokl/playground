import { Cell, HintInfo } from "../types/types";

interface HintsDisplayProps {
  horizontalHints?: HintInfo[][];
  verticalHints?: HintInfo[][];
  grid: Cell[][];
}

const HintsDisplay: React.FC<HintsDisplayProps> = ({
  horizontalHints,
  verticalHints,
  grid,
}) => {
  return (
    <div className="flex">
      {/* Render vertical hints */}
      <div className="flex flex-row justify-end ">
        {verticalHints &&
          verticalHints.map((hints, index) => (
            <div
              key={index}
              className="flex flex-col justify-end mb-1 shadow-inner"
            >
              {hints.map((hint, idx) => (
                <div
                  key={idx}
                  className={`w-6 h-4 ${
                    hint.color ? hint.color : ""
                  } flex items-start justify-center text-sm`}
                >
                  {/* {hint.value} */}
                  {hint.value !== 0 ? hint.value : ""}
                </div>
              ))}
            </div>
          ))}
      </div>

      {/* Render horizontal hints */}
      <div className="">
        {horizontalHints &&
          horizontalHints.map((hints, index) => (
            <div
              key={index}
              className="flex flex-row justify-end mr-1 shadow-inner"
            >
              {hints.map((hint, idx) => (
                <div
                  key={idx}
                  className={`w-4 h-6 ${
                    hint.color ? hint.color : ""
                  } flex items-center justify-center text-sm`}
                >
                  {hint.value !== 0 ? hint.value : ""}
                </div>
              ))}
            </div>
          ))}
      </div>
    </div>
  );
};

export default HintsDisplay;
