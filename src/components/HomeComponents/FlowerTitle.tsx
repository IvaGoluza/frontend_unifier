import React from "react";

interface FlowerTitleProps {
  title: string;
  cssClasses?: string;
}

const FlowerTitle: React.FC<FlowerTitleProps> = ({ title, cssClasses }) => {
  return (
    <h2
      className={`mt-16 flex flex-row items-end text-left text-lg font-bold text-[#0F182C] lg:text-xl xl:text-2xl ${cssClasses}`}
    >
      <img className="" src="../../../assets/svgs/sm_flower_dark.svg" alt="wave" />
      {title}
    </h2>
  );
};

export default FlowerTitle;
