import React from "react";

interface HeadingProps {
  title: string;
}

const Heading: React.FC<HeadingProps> = ({ title }) => {
  return (
    <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">{title}</h2>
  );
};

export default Heading;
