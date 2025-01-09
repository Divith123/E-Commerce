// *********************
// IN DEVELOPMENT
// *********************

import React from "react";
import { FaArrowUp } from "react-icons/fa6";

interface StatsElementProps {
  title: string; // Title should be a string
  value: number | string; // Value can be a number or a formatted string
  change?: number; // Optional, represents percentage change
}

const StatsElement: React.FC<StatsElementProps> = ({ title, value, change = 0 }) => {
  return (
    <div className="w-80 h-32 bg-blue-500 text-white flex flex-col justify-center items-center rounded-md max-md:w-full">
      <h4 className="text-xl text-white">{title}</h4>
      <p className="text-2xl font-bold">{value}</p>
      {/* <p className="text-green-300 flex gap-x-1 items-center">
        <FaArrowUp />
        {change}% Since last month
      </p> */}
    </div>
  );
};

export default StatsElement;
