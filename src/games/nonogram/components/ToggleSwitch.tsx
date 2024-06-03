import React from "react";

interface ToggleSwitchProps {
  onChange: () => void;
}

const ToggleSwitch: React.FC<ToggleSwitchProps> = ({ onChange }) => {
  return (
    <div>
      <label className="inline-flex items-center cursor-pointer mt-4">
        <span className="mr-3 text-sm font-medium text-gray-700 ">Empty</span>
        <input
          type="checkbox"
          value=""
          className="sr-only peer"
          onChange={onChange}
        />
        <div className="relative w-11 h-6 bg-gray-200 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-fullafter:content-[''] after:absolute after:top-[2px] after:start-[2px]  after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
        <span className="text-sm font-medium text-gray-700 ms-3">Full</span>
      </label>
    </div>
  );
};

export default ToggleSwitch;
