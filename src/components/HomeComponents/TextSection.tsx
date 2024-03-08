import React from "react";

export interface TextSectionProps {
  title: string;
  paragraphs: string[];
  isVisible: boolean;
  duration: number;
}

export const TextSection: React.FC<TextSectionProps> = ({ title, paragraphs, isVisible, duration }) => {
  return (
    <div
      className={`mb-10 text-white opacity-0 ${isVisible ? "animateTxt duration-[" + duration + "ms]" : "scale-90"}`}
    >
      <h2 className="mb-1 text-center text-lg lg:text-left lg:text-xl xl:text-2xl">{title}</h2>
      {paragraphs.map((text, index) => (
        <p key={index} className="text-nowrap text-center text-xs sm:text-sm md:text-lg lg:text-left xl:text-xl">
          {text}
        </p>
      ))}
    </div>
  );
};
