import React from "react";

interface SliderProps {
  bgColor: string;
  text: string[];
  number: number;
  textColor: string;
  letter: string;
  showParagraph: boolean;
  onSliderClick: () => void;
}

const Slider: React.FC<SliderProps> = ({ bgColor, text, number, textColor, letter, showParagraph, onSliderClick }) => {
  const containerColors = {
    backgroundColor: bgColor,
    color: textColor,
  };
  return (
    <div
      style={containerColors}
      className={`relative mb-1 border border-white transition-all duration-1000 lg:mb-0 lg:mr-1 ${
        showParagraph ? "h-64 lg:h-full lg:w-64" : "h-12 lg:h-full lg:w-12"
      } rounded-[15px]`}
    >
      {text.map((paragraph, index) => (
        <p
          key={index}
          className={`text-wrap mt-2 w-full pl-2 pr-1 font-semibold leading-tight ${
            showParagraph ? "opacity-100 transition delay-500" : "opacity-0"
          }`}
        >
          {paragraph}
        </p>
      ))}
      <div
        className="absolute bottom-2 left-[7px] flex h-8 w-8 cursor-pointer items-center justify-center rounded-full border border-white bg-[#1F2340] font-bold text-white"
        onClick={onSliderClick}
      >
        {number}
      </div>
      <p className="absolute -right-9 bottom-2 flex w-[2.875rem] items-center justify-center text-2xl font-bold text-white lg:bottom-[-2rem] lg:left-0">
        {letter}
      </p>
    </div>
  );
};

export default Slider;
