import React from "react";

interface TitleTextInModalProps {
  title: string;
  text: string;
}

const TitleTextInModal: React.FC<TitleTextInModalProps> = ({ title, text }) => {
  return (
    <section className="min-w-96 mb-3 w-5/6 md:w-4/5 lg:w-3/5">
      <h2 className="font-bold uppercase text-[#B0A9F9]">{title}</h2>
      <p className="font-semibold leading-5 text-[#1F2340]">{text}</p>
    </section>
  );
};

export default TitleTextInModal;
