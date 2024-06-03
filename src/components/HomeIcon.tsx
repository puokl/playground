import React from "react";
import { Link } from "react-router-dom";
import { RiHome2Line } from "react-icons/ri";

const HomeIcon: React.FC = () => {
  return (
    <div className="absolute z-10 text-black cursor-pointer top-4 right-4 bg-slate-200 rounded-xl">
      <Link to="/" className="">
        <RiHome2Line size={32} />
      </Link>
    </div>
  );
};

export default HomeIcon;
