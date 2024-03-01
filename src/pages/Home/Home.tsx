import React from "react";

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

  const title = document.getElementById("title");
  const wave = document.getElementById("wave");
  window.addEventListener("scroll", function () {
    const value = window.scrollY;
    if (title !== null) title.style.bottom = -value * 0.5 + "px";
    if (wave !== null) wave.style.left = value * 1.5 + "px";
  });

  return (
    <div className="flex flex-col items-center bg-white">
      <section className="relative flex h-screen w-full items-center justify-center overflow-hidden bg-white">
        <img className="absolute bottom-32" src="../../../assets/svgs/unifier_people.svg" alt="community" />
        <img
          id="title"
          className="absolute bottom-0"
          src="../../../assets/svgs/unifier_title.svg"
          alt="unifier title"
        />
        <img className="absolute bottom-0" src="../../../assets/svgs/waveTop.svg" alt="wave" />
        <img id="wave" className="absolute -bottom-10" src="../../../assets/svgs/waveTop.svg" alt="wave" />
      </section>
      <section className="grid w-full grid-cols-2 gap-4 bg-[#1F2340]">
        <div className="col-span-1 my-20 ml-32 flex h-96 flex-col items-start justify-center p-4">
          <div className="text-white">
            <h2 className="mb-1 text-2xl">{"ŽELIŠ POMOĆI?"}</h2>
            {par.map((text: string, index: React.Key) => (
              <p key={index} className="text-nowrap text-left text-lg">
                {text}
              </p>
            ))}
          </div>
          <div className="text-white">
            <h2 className="mb-1 mt-10 text-2xl">{"TRAŽIŠ POMOĆ?"}</h2>
            {par2.map((text: string, index: React.Key) => (
              <p key={index} className="text-nowrap text-left text-lg">
                {text}
              </p>
            ))}
          </div>
        </div>
        <div className=" col-span-1 my-20 flex h-96 items-center justify-start">
          <div className="flex flex-col">
            <Link
              to={routes.USER_REGISTRATION_URL}
              className="mt-5 inline-block rounded-full bg-white px-4 py-2 text-sm font-semibold text-[#1F2340] no-underline hover:bg-indigo-300"
            >
              STVORI VLASTITI PROFIL
            </Link>
            <Link
              to={routes.ORGANIZATION_REGISTRATION_URL}
              className="mt-5 inline-block rounded-full bg-white px-4 py-2 text-sm font-semibold text-[#1F2340] no-underline hover:bg-indigo-300"
            >
              UKLJUČI ORGANIZACIJU
            </Link>
          </div>
          <img
            className="translate-y-[12px] transform"
            src="../../../assets/svgs/ican_buy_mys_flowers.svg"
            alt="wave"
          />
        </div>
      </section>
      <img className="translate-y-[-1px] rotate-180 transform" src="../../../assets/svgs/waveTop.svg" alt="wave" />
    </div>
  );
}
