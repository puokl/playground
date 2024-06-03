import React from "react";
import {
  RiArrowLeftLine,
  RiArrowRightLine,
  RiArrowDownLine,
} from "react-icons/ri";
import { BsArrowCounterclockwise } from "react-icons/bs";
import "../MobileController.css";

const MobileControls: React.FC<{
  onMoveLeft: () => void;
  onMoveRight: () => void;
  onMoveDown: () => void;
  onRotate: () => void;
}> = ({ onMoveLeft, onMoveRight, onMoveDown, onRotate }) => (
  <div className="flex justify-center mb-4 ">
    <div className="keys">
      <div className="up arr" onClick={onRotate}>
        <BsArrowCounterclockwise size={24} />
      </div>
      <br />
      <div className="left arr" onClick={onMoveLeft}>
        <RiArrowLeftLine />
      </div>
      <div className="down arr" onClick={onMoveDown}>
        <RiArrowDownLine />
      </div>
      <div className="right arr" onClick={onMoveRight}>
        <RiArrowRightLine />
      </div>
    </div>
  </div>
);

export default MobileControls;
