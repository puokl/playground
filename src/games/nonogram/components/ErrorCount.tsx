import React from "react";
import { LIVES } from "../utils/constants";
import { FaHeart, FaRegHeart } from "react-icons/fa";

interface LivesProps {
  errors: number;
}

const ErrorCount: React.FC<LivesProps> = ({ errors }) => {
  const fullHearts = LIVES - errors;
  const emptyHearts = LIVES - fullHearts;

  const emptyHeartsJSX = Array.from({ length: emptyHearts }, (_, index) => (
    <FaHeart key={`full-${index}`} className="text-red-500" />
  ));

  const fullHeartsJSX = Array.from({ length: fullHearts }, (_, index) => (
    <FaRegHeart key={`empty-${index}`} className="text-gray-300" />
  ));

  const hearts = [...emptyHeartsJSX, ...fullHeartsJSX];

  return <div className="flex items-center mt-8 mb-6">{hearts}</div>;
};

export default ErrorCount;
