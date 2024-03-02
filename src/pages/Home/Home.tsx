import React, { useEffect } from "react";

import { useInView } from "react-intersection-observer";
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

  const par3 =
    "„...dobrovoljno ulaganje osobnog vremena, truda, znanja i vještina kojima se obavljaju usluge ili aktivnosti za dobrobit druge osobe ili za zajedničku dobrobit..., bez postojanja uvjeta isplate, novčane nagrade ili potraživanja druge imovinske koristi.”";

  const par4: string[] = [
    "Volonter može biti fizička osoba starija od 15 godina.",
    "Volontiranje osoba mlađih od 18 godina omogućeno je Zakonom uz pisanu suglasnost zakonskog zastupnika. Volontiranje izvan granica Hrvatske uz pratnju zakonskog zastupnika.",
    "Ograničenje za volontiranje postoji za osobe koje su počinile neka kaznena djela pri volontiranju u aktivnostima s djecom, osobama s invalidnošću, starim i nemoćnim osobama, osobama lišenima poslovne sposobnosti i sl.",
  ];

  const par5: string[] = [
    "VRIJEDNOSTI - život upotpunjen radom na vlastitim uvjerenjima o važnosti pomaganja drugima",
    "RAZUMIJEVANJE - želja za upoznavanjem različitih priča ljudi iz zajednice",
    "KARIJERA - usvajanje znanja i vještina koje mogu pomoći u razvoju karijere",
    "DRUŠTVO - upoznavanje novih ljudi",
    "POŠTIVANJE - podizanje samopoštovanja i samopouzdanja",
    "ZAŠTITA - volontiranje kao bijeg od osjećaja osamljenosti",
  ];

  const { ref: txtSection2, inView: txtSection2IsVisible } = useInView();
  const { ref: txtSection3, inView: txtSection3IsVisible } = useInView();

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
          className="absolute bottom-0 w-full"
          src="../../../assets/svgs/unifier_title.svg"
          alt="unifier title"
        />
        <img className="absolute bottom-0 w-full" src="../../../assets/svgs/waveTop.svg" alt="wave" />
        <img id="wave" className="absolute -bottom-10 w-full" src="../../../assets/svgs/waveTop.svg" alt="wave" />
      </section>
      <section className="grid w-full translate-y-[-1px] transform grid-cols-1 gap-0 bg-[#1F2340] lg:grid-cols-3 lg:gap-4">
        <div className="col-span-1 flex h-96 flex-col items-center justify-center p-4 md:col-span-2 lg:mx-auto lg:my-20 lg:items-start">
          <div
            ref={txtSection2}
            className={`text-white opacity-0 ${txtSection2IsVisible ? "animateTxt duration-700" : "scale-95"}`}
          >
            <h2 className="mb-1 text-center text-lg lg:text-left lg:text-xl xl:text-2xl">{"ŽELIŠ POMOĆI?"}</h2>
            {par.map((text: string, index: React.Key) => (
              <p key={index} className="text-nowrap text-center text-xs sm:text-sm md:text-lg lg:text-left xl:text-xl">
                {text}
              </p>
            ))}
          </div>
          <div className={`text-white opacity-0 ${txtSection2IsVisible ? "animateTxt duration-1000" : "scale-95"}`}>
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
      <section className="grid w-full grid-cols-1 bg-white px-16 py-10 md:grid-cols-9 md:grid-rows-4">
        <article
          ref={txtSection3}
          className="my-1 rounded-[30px] bg-[#FFF634] px-10 py-5 shadow-md md:col-span-9 md:row-span-1"
        >
          <p className="text-nowrap text-center text-xs italic sm:text-sm md:text-lg lg:text-left xl:text-xl">
            {par3}
            <br />
            Zakon o volonterstvu (NN, 58/07. i 22/13.)
          </p>
          <p className="px-5 text-right text-2xl font-bold tracking-wide text-[#9C9606]">VOLONTIRANJE</p>
        </article>
        <aside
          className={`my-1 mr-1 -translate-x-[50px] transform rounded-[30px] bg-[#0F182C] px-10 pb-5 pt-10 shadow-md md:col-span-5 md:row-span-3 ${
            txtSection3IsVisible ? "aside3animate" : ""
          }`}
        >
          <p className="px-5 pb-5 text-center text-2xl font-bold tracking-wide text-white">TKO MOŽE BITI VOLONTER?</p>
          {par4.map((text: string, index: React.Key) => (
            <p
              key={index}
              className="text-nowrap md:text-md py-2 text-center text-xs italic text-white sm:text-sm lg:text-left xl:text-lg"
            >
              {text}
            </p>
          ))}
          <p className="text-nowrap md:text-md pb-2 text-center text-xs italic text-[#FFF634] sm:text-sm lg:text-left xl:text-lg">
            Svaki korisnik volonter dobit će pristup platformi prilaganjem valjane potvrde o nekažnjavanju preuzete s
            e-Građana.
          </p>
        </aside>
        <aside
          className={`relative my-1 ml-1 translate-x-[50px] transform overflow-hidden rounded-[30px] bg-[#F9F9F8] shadow-md md:col-span-4 md:row-span-3 ${
            txtSection3IsVisible ? "aside3animate" : ""
          }`}
        >
          <img className="absolute left-32 top-0 z-0 object-cover" src="../../../assets/svgs/logo.svg" alt="logo" />
          <p className="px-5 pb-6 pt-10 text-center text-2xl font-bold tracking-wide text-[#1F2340]">
            6 motivacijskih kategorija volontiranja
          </p>
          <ul className="list-disc px-10">
            {par5.map((text: string, index: React.Key) => (
              <li
                key={index}
                className="text-nowrap md:text-md py-1 text-center text-xs italic text-[#0F182C] sm:text-sm lg:text-left xl:text-lg"
              >
                {text}
              </li>
            ))}
          </ul>
          <p className="text-nowrap md:text-md w-full py-1 pr-10 text-right text-xs italic text-[#0F182C] sm:text-sm xl:text-lg">
            Clary i Snyder
          </p>
        </aside>
      </section>
    </div>
  );
}
