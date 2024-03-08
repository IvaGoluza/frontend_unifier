import React from "react";

const Section1: React.FC = () => {
  return (
    <section className="relative flex h-[34rem] w-full items-center justify-center overflow-hidden bg-white sm:h-screen">
      <img className="absolute bottom-10 sm:bottom-32" src="../../../assets/svgs/unifier_people.svg" alt="community" />
      <img
        id="title"
        className="absolute bottom-0 w-full"
        src="../../../assets/svgs/unifier_title.svg"
        alt="unifier title"
      />
      <img className="absolute bottom-0 w-full" src="../../../assets/svgs/waveTop.svg" alt="wave" />
      <img id="wave" className="absolute -bottom-10 w-full" src="../../../assets/svgs/waveTop.svg" alt="wave" />
    </section>
  );
};

export default Section1;
