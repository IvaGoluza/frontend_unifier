import React, { useEffect, useState } from "react";

import { nanoid } from "nanoid";
import { useInView } from "react-intersection-observer";

import "./home.css";

import { imgs, par, par2, par3, par4, par5, par6, par7, par8, par9, slidersData } from "./HomeData";
import { routes } from "../../api/paths";
import Slider from "../../components/7stepsUnifier/Slider";
import FlowerTitle from "../../components/HomeComponents/FlowerTitle";
import RegistrationLink from "../../components/HomeComponents/RegistrationLink";
import Section1 from "../../components/HomeComponents/Section1";
import { TextSection } from "../../components/HomeComponents/TextSection";
import YTEmbed from "../../components/YTembed/YTEmbed";

export default function Home() {
  const { ref: txtSection2, inView: txtSection2IsVisible } = useInView();
  const { ref: txtSection3, inView: txtSection3IsVisible } = useInView();
  const { ref: slider, inView: sliderIsVisible } = useInView();

  const [isClassAdded, setClassAdded] = useState(false);
  const [isGoLeft, setGoLeft] = useState(false);
  const [activeSlider, setActiveSlider] = useState<number | null>(null);

  useEffect(() => {
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
      <Section1 />
      <section className="grid w-full translate-y-[-1px] transform grid-cols-1 gap-0 bg-[#1F2340] lg:grid-cols-3 lg:gap-4">
        <div
          ref={txtSection2}
          className="col-span-1 flex h-96 flex-col items-center justify-center p-4 md:col-span-2 lg:mx-auto lg:my-20 lg:items-start"
        >
          <TextSection title={"ŽELIŠ POMOĆI?"} paragraphs={par} isVisible={txtSection2IsVisible} duration={200} />
          <TextSection title={"TRAŽIŠ POMOĆ"} paragraphs={par2} isVisible={txtSection2IsVisible} duration={2000} />
        </div>
        <div className="col-span-1 mb-20 flex items-center justify-center md:col-span-1 lg:my-20 lg:h-96 lg:justify-start">
          <div className="flex flex-col">
            <RegistrationLink to={routes.USER_REGISTRATION_URL} text={"STVORI VLASTITI PROFIL"} />
            <RegistrationLink to={routes.ORGANIZATION_REGISTRATION_URL} text={"UKLJUČI ORGANIZACIJU"} />
          </div>
          <img
            className="hidden translate-y-[12px] transform lg:block"
            src="../../../assets/svgs/ican_buy_mys_flowers.svg"
            alt="wave"
          />
        </div>
      </section>
      <img className="translate-y-[-2px] rotate-180 transform" src="../../../assets/svgs/waveTop.svg" alt="wave" />
      <section className="grid w-full grid-cols-1 bg-white px-8 py-10 sm:px-16 md:grid-cols-9 md:grid-rows-4 lg:my-32">
        <article
          ref={txtSection3}
          className="my-1 rounded-[30px] bg-[#FFF634] px-10 py-5 shadow-md md:col-span-9 md:row-span-1"
        >
          <p className="text-nowrap text-center text-xs italic sm:text-sm md:text-lg lg:text-left xl:text-xl">
            {par3}
            <br />
            Zakon o volonterstvu (NN, 58/07. i 22/13.)
          </p>
          <p className="px-5 text-center text-2xl font-bold tracking-wide text-[#9C9606] sm:text-right">VOLONTIRANJE</p>
        </article>
        <aside
          className={`my-1 mr-1 rounded-[30px] bg-[#0F182C] px-10 pb-5 pt-10 shadow-md md:col-span-5 md:row-span-3 ${
            txtSection3IsVisible ? "aside3animate -translate-x-[50px] transform" : ""
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
          className={`relative my-1 ml-1 overflow-hidden rounded-[30px] bg-[#F9F9F8] shadow-md md:col-span-4 md:row-span-3 ${
            txtSection3IsVisible ? "aside3animate translate-x-[50px] transform" : ""
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
                className="text-nowrap md:text-md py-1 text-left text-xs italic text-[#0F182C] sm:text-sm xl:text-lg"
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
      <img className="w-full" src="../../../assets/svgs/purpleWave.svg" alt="wave" />
      <section className="relative flex h-[70vh] w-full translate-y-[-1px] transform items-center overflow-hidden bg-[#B0A9F9] px-16 py-10">
        <div
          id="image-scroll"
          className={`scrollImg flex w-fit translate-x-0 transform gap-3 transition-transform duration-[2.5s] ease-in-out md:hover:translate-x-[-150%] lg:hover:translate-x-[-80%] ${
            isClassAdded ? "mobileScrollImg translate-x-[-150%]" : ""
          } ${isGoLeft ? "translate-x-0" : ""}`}
        >
          {imgs.map((number) => (
            <img
              key={nanoid()}
              className="imgScroll object-right-center h-96 w-2/3 object-cover py-2 sm:w-1/2 md:w-1/3 lg:w-1/5"
              src={`../../assets/images/homepageImgScroll/img${number}.png`}
              draggable="false"
              alt="gallery"
            />
          ))}
        </div>
        <button
          className={`top-2/5 absolute left-3 ${
            isClassAdded ? "hidden" : "block"
          } text-5xl font-bold text-[#0F182C] md:hidden`}
          onClick={() => setClassAdded(!isClassAdded)}
        >
          &gt;
        </button>
        <button
          className={`top-2/5 absolute left-3 ${
            isClassAdded ? "block" : "hidden"
          } text-5xl font-bold text-[#0F182C] md:hidden`}
          onClick={() => {
            setGoLeft(!isGoLeft);
            setClassAdded(false);
          }}
        >
          &lt;
        </button>
      </section>
      <img
        className="w-full translate-y-[-2px] rotate-180 transform"
        src="../../../assets/svgs/purpleWave.svg"
        alt="wave"
      />
      <FlowerTitle title={"UNIFIER POZNAJE PRAVA VOLONTERA"} cssClasses={"sm:px-[6.5rem] self-center sm:self-start"} />

      <section className="mb-16 mt-3 grid w-full grid-cols-1 bg-white px-8 pb-10 sm:px-16 lg:mb-32 lg:grid-cols-3 lg:grid-rows-5">
        <article className="m-1 rounded-[30px] bg-[#99D7E8] px-10 py-10 shadow-md md:col-span-1 md:row-span-5">
          {par6.map((text: string[], index: React.Key) => (
            <section
              key={index}
              className="text-nowrap py-1 text-left text-xs text-[#0F182C] sm:text-sm md:text-base xl:text-lg "
            >
              <p className="font-bold leading-tight">{text[0]}</p>
              <p className="italic leading-tight">{text[1]}</p>
            </section>
          ))}
        </article>
        <article className="m-1 rounded-[30px] bg-[#0F182C] px-10 py-10 shadow-md md:col-span-1 md:row-span-4">
          {par7[0].map((text: string, index: React.Key) => (
            <p
              key={index}
              className="text-nowrap translate-y-1 transform text-left text-xs font-bold leading-tight text-white sm:text-sm md:text-base"
            >
              {text}
            </p>
          ))}
          <p className="text-nowrap pt-1 text-left text-xs italic leading-tight text-[#FFF634] sm:text-sm md:text-base">
            {par7[1][0]}
          </p>
        </article>
        <article className="m-1 rounded-[30px] bg-[#B0A9F9] px-10 py-10 text-[#0F182C] shadow-md md:col-span-1 md:row-span-3">
          <p className="text-nowrap pt-1 text-left text-xs font-bold leading-tight sm:text-sm md:text-base">
            {par8[0]}
          </p>
          <p className="text-nowrap pt-1 text-left text-xs italic leading-tight sm:text-sm md:text-base">{par8[1]}</p>
        </article>
      </section>
      <img className="w-full" src="../../../assets/svgs/waveTop.svg" alt="wave" />
      <section
        id="unifier"
        className="flex h-fit min-h-[90vh] w-full translate-y-[-1px] transform flex-col-reverse items-center overflow-hidden bg-[#1F2340] py-10 md:flex-row md:items-start md:justify-between md:px-16 lg:min-h-[80vh] lg:px-32 lg:pt-20"
      >
        <div>
          <p className="italic text-white">Unifier u 7 koraka</p>
          <div
            ref={slider}
            className={`flex w-80 flex-col lg:w-fit ${
              sliderIsVisible ? "lg:h-80" : "lg:h-16"
            } transition-all duration-[2000ms] lg:flex-row`}
          >
            {slidersData.map((slider, index) => (
              <Slider
                key={index}
                bgColor={slider.bgColor}
                text={slider.text}
                number={slider.number}
                textColor={slider.textColor}
                letter={slider.letter}
                showParagraph={index === activeSlider}
                onSliderClick={() => setActiveSlider(index === activeSlider ? null : index)}
              />
            ))}
          </div>
        </div>
        <div className="flex w-fit flex-col-reverse items-center justify-center lg:flex-col">
          <YTEmbed embedId="kmg8EAD-Kjw?si=meM8Hi84dx73dhPH" />
          <img className="mt-10" src="../../../assets/svgs/unifierYT.svg" alt="unifierYouTube" />
        </div>
      </section>
      <img className="translate-y-[-2px] rotate-180 transform" src="../../../assets/svgs/waveTop.svg" alt="wave" />
      <section
        id="about"
        className="mx-auto mb-16 mt-24 flex w-full flex-col items-center bg-white px-10 pb-10 sm:px-16 lg:w-[70vw]"
      >
        <div className="flex flex-col items-start">
          <FlowerTitle title={"O NAMA"} />
          <p>{par9}</p>
        </div>
        <img className="mt-2 w-96" src="../../../assets/images/dean.jpg" alt="unifierTeam" />
      </section>
    </div>
  );
}
