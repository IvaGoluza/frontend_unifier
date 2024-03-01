import React, { useEffect } from "react";

import { Link } from "react-router-dom";

import "./home.css";
import { routes } from "../../api/paths";

export default function Home() {
  const user = localStorage.getItem("user");

  const par: string[] = [
    "Budi promjena koju želiš vidjeti u svijetu.",
    "Svojim djelima ostavi trag u životima drugih.",
    "Uz našu pomoć lako pronađi prilike za volontersko djelovanje.",
  ];

  const par2: string[] = [
    "Svaki problem je malen uz dobru volju naših volontera!",
    "Lako pronađi volontera koji ti može pomoći.",
    "Sudjeluj u brojnim Unifier radionicama.",
  ];

  useEffect(() => {
    // important so the DOM elements are fully loaded!
    const title = document.getElementById("title");
    const wave = document.getElementById("wave");

    const handleScrolling = () => {
      const value = window.scrollY;
      if (title !== null) title.style.bottom = -value * 0.5 + "px";
      if (wave !== null) wave.style.left = value * 1.5 + "px";
    };

    window.addEventListener("scroll", handleScrolling);
    return () => {
      window.removeEventListener("scroll", handleScrolling);
    };
  }, []);

  return (
    <div className="flex flex-col items-stretch bg-white">
      <section className="relative flex h-[34rem] w-full items-center justify-center overflow-hidden bg-white sm:h-screen">
        <img
          className="absolute bottom-10 sm:bottom-32"
          src="../../../assets/svgs/unifier_people.svg"
          alt="community"
        />
        <img
          id="title"
          className="absolute bottom-0"
          src="../../../assets/svgs/unifier_title.svg"
          alt="unifier title"
        />
        <img className="absolute bottom-0" src="../../../assets/svgs/waveTop.svg" alt="wave" />
        <img id="wave" className="absolute -bottom-10" src="../../../assets/svgs/waveTop.svg" alt="wave" />
      </section>
      <section className="grid w-full translate-y-[-1px] transform grid-cols-1 gap-0 bg-[#1F2340] lg:grid-cols-2 lg:gap-4">
        <div className="col-span-1 flex h-96 flex-col items-center justify-center p-4 md:col-span-1 lg:my-20 lg:ml-32 lg:items-start">
          <div className="text-white">
            <h2 className="mb-1 text-center text-lg lg:text-left lg:text-xl xl:text-2xl">{"ŽELIŠ POMOĆI?"}</h2>
            {par.map((text: string, index: React.Key) => (
              <p key={index} className="text-nowrap text-center text-xs sm:text-sm md:text-lg lg:text-left xl:text-xl">
                {text}
              </p>
            ))}
          </div>
          <div className="text-white">
            <h2 className="mb-1 mt-10 text-center text-lg lg:text-left lg:text-xl xl:text-2xl">{"TRAŽIŠ POMOĆ?"}</h2>
            {par2.map((text: string, index: React.Key) => (
              <p key={index} className="text-nowrap text-center text-xs sm:text-sm md:text-lg lg:text-left xl:text-xl">
                {text}
              </p>
            ))}
          </div>
        </div>
        <div className="col-span-1 mb-20 flex items-center justify-center md:col-span-1 lg:my-20 lg:h-96 lg:justify-start">
          <div className="flex flex-col">
            <Link
              to={routes.USER_REGISTRATION_URL}
              className="mt-5 inline-block rounded-full bg-white px-4 py-2 text-xs font-semibold text-[#1F2340] no-underline transition duration-500 ease-in-out hover:bg-indigo-300 sm:text-sm"
            >
              STVORI VLASTITI PROFIL
            </Link>
            <Link
              to={routes.ORGANIZATION_REGISTRATION_URL}
              className="mt-5 inline-block rounded-full bg-white px-4 py-2 text-xs font-semibold text-[#1F2340] no-underline transition duration-500 ease-in-out hover:bg-indigo-300 sm:text-sm"
            >
              UKLJUČI ORGANIZACIJU
            </Link>
          </div>
          <img
            className="hidden translate-y-[12px] transform lg:block"
            src="../../../assets/svgs/ican_buy_mys_flowers.svg"
            alt="wave"
          />
        </div>
      </section>
      <img className="translate-y-[-2px] rotate-180 transform" src="../../../assets/svgs/waveTop.svg" alt="wave" />
    </div>
  );
}
