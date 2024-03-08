import React, { useEffect, useState } from "react";

import { nanoid } from "nanoid";
import { useInView } from "react-intersection-observer";
import { Link } from "react-router-dom";

import "./home.css";

import { routes } from "../../api/paths";
import Slider from "../../components/7stepsUnifier/Slider";
import YTEmbed from "../../components/YTembed/YTEmbed";

export default function Home() {
  const user = localStorage.getItem("user");

  const imgs = [1, 2, 3, 4, 5, 6, 7, 8, 9];

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

  const par6: string[][] = [
    [
      "Pravo na sklapanje ugovora o volontiranju u pisanom obliku, te potvrdu o volontiranju.",
      "Unifier za svaku dogovorenu volontersku akciju generira navedene dokumente i možete ih lako preuzeti.",
    ],
    [
      "Pravo na prikladnu edukaciju, stručnu pomoć i podršku tijekom volontiranja.",
      "Unifier povezuje volontersku zajednicu, potiče upoznavanje volontera, te organiziranje edukativnih radionica.",
    ],
    [
      "Pravo na zaštitu privatnosti i osobnih podataka.",
      "Određeni osobni podaci dostupni su isključivo administratoru stranice.",
    ],
  ];

  const par7: string[][] = [
    [
      "Pravo na detaljni opis poslova i aktivnosti volontiranja.",
      "Pravo na stjecanje novih znanja, vještina i kompetencija kroz volontiranje.",
      "Pravo na potvrdu o kompetencijama stečenima volontiranjem u slučajevima dugotrajnog volontiranja, ako je zatraži.",
    ],
    [
      "Unifier Vam pruža mogućnost lakog pregleda traženih volonterskih aktivnosti i sklapanje dogovora pružanja pomoći korisnicima u potrebi.",
    ],
  ];

  const par8: string[] = [
    "Pravo na upoznavanje s uvjetima volontiranja, aktivnostima koje će obavljati, uslugama koje će pružati i pravima koja im pripadaju.",
    "Detaljniji dokumenti za upoznavanje volonterskih prava, pa i samog volonterstva mogu se preuzeti na Unifier stranicama.",
  ];

  const par9 =
    "Unifier je nastao suradnjom studenata FER-a i ERF-a. Glavni cilj bio je kreirati platformu koja će omogućiti umrežavanje organizacija, neprofitnih udruženja i pojedinaca za različite humanitarne, ekološke, socijalne i obrazovne projekte. Želimo istaknuti važnost volontiranja kao načina za doprinos zajednici i osobni razvoj. Posebnost Unifier-a je pružanje mogućnosti oglašavanja volonterskih akcija, korisnici mogu i sami zatražiti neku pomoć volontera stvaranjem zahtjeva za pomoć. Unifier je mjesto gdje se svaka ideja pomoći može ostvariti. Postani dio naše priče!";

  const { ref: txtSection2, inView: txtSection2IsVisible } = useInView();
  const { ref: txtSection3, inView: txtSection3IsVisible } = useInView();
  const { ref: slider, inView: sliderIsVisible } = useInView();

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

  const [isClassAdded, setClassAdded] = useState(false);
  const [isGoLeft, setGoLeft] = useState(false);

  const handleButtonClick = () => {
    setClassAdded(!isClassAdded);
  };

  const handleLeftButtonClick = () => {
    setGoLeft(!isGoLeft);
    setClassAdded(false);
  };

  const [activeSlider, setActiveSlider] = useState<number | null>(null);

  const slidersData = [
    {
      bgColor: "#B0A9F9",
      text: [
        "Koristite Unifier za oglašavanje svojih volonterskih akcija, traženje volonterskih prilika, pronalazak volontera koji Vam mogu pomoći ili radionica na kojima možete sudjelovati.",
        "Stvorite vlastiti profil ili prijavite svoju organizaciju.",
      ],
      number: 1,
      textColor: "#0F182C",
      letter: "U",
    },
    {
      bgColor: "#0F182C",
      text: [
        "Ako tražite volontersku pomoć:",
        "Objavite zahtjev za pomoć, a zatim pregledajte profile volontera koji su se prijavili na Vaš zahtjev, te odaberite one koji Vam odgovaraju.",
        "Pregledajte aktivne oglase volonterskih akcija i radionica, te se prijavite na one koji Vas zanimaju.",
      ],
      number: 2,
      textColor: "#FFFFFF",
      letter: "N",
    },
    {
      bgColor: "#F8F26C",
      text: [
        "Ako želite volontirati:",
        "Objavite oglase kojima predstavljate svoj rad, pregledajte korisnike koji se prijave na Vaš oglas, te odaberite one kojima ćete pomoći ili koji će sudjelovati na Vašim radionicama.",
        "Pregledajte aktivne zahtjeve za pomoć, te se prijavite na zahtjev ako se slaže s Vašim područjem djelovanja.",
      ],
      number: 3,
      textColor: "#0F182C",
      letter: "I",
    },
    {
      bgColor: "#F9F9F8",
      text: [
        "Ako predstavljate organizaciju:",
        "Promovirajte svoje područje djelovanja. Potražite volontere za svoje akcije ili platformu iskoristite za objavu svojih volonterskih akcija na koje se korisnici mogu prijaviti.",
      ],
      number: 4,
      textColor: "#0F182C",
      letter: "F",
    },
    {
      bgColor: "#99D7E8",
      text: [
        "Sve dogovorene akcije na jednom mjestu:",
        "Detalji o svakoj dogovorenoj akciji nalaze se na jednom mjestu uz mogućnost pisanja/preuzimanja potvrde o volontiranju.",
        "Lako pregledajte sve svoje dogovorene akcije, te arhivirajte one koje Vam više nisu bitne.",
      ],
      number: 5,
      textColor: "#0F182C",
      letter: "I",
    },
    {
      bgColor: "#B0A9F9",
      text: [
        "Korisnički profili",
        "Organizacije i volonteri mogu stvoriti vrlo detaljne i zanimljive Unifier profile kako bi promovirali svoje djelovanje. Na profile možete pohraniti određene potvrde, skupljati značke, objaviti slike i tekstove svojih volonterskih akcija. Na profilu se prikazuju i poruke koje su o Vama napisali korisnici kojima ste pomogli.",
      ],
      number: 6,
      textColor: "#0F182C",
      letter: "E",
    },
    {
      bgColor: "#0F182C",
      text: [
        "Nikada ne sumnjaj u to da mala grupa ljudi može promijeniti svijet. Uistinu, to je jedino što ga je ikada i mijenjalo.",
        "Margaret Mead",
      ],
      number: 7,
      textColor: "#FFFFFF",
      letter: "R",
    },
  ];

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
            className={`text-white opacity-0 ${txtSection2IsVisible ? "animateTxt duration-700" : "scale-90"}`}
          >
            <h2 className="mb-1 text-center text-lg lg:text-left lg:text-xl xl:text-2xl">ŽELIŠ POMOĆI?</h2>
            {par.map((text: string, index: React.Key) => (
              <p key={index} className="text-nowrap text-center text-xs sm:text-sm md:text-lg lg:text-left xl:text-xl">
                {text}
              </p>
            ))}
          </div>
          <div className={`text-white opacity-0 ${txtSection2IsVisible ? "animateTxt duration-1000" : "scale-90"}`}>
            <h2 className="mb-1 mt-10 text-center text-lg lg:text-left lg:text-xl xl:text-2xl">TRAŽIŠ POMOĆ</h2>
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
      <section className="grid w-full grid-cols-1 bg-white px-16 py-10 md:grid-cols-9 md:grid-rows-4 lg:my-32">
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
          onClick={handleButtonClick}
        >
          &gt;
        </button>
        <button
          className={`top-2/5 absolute left-3 ${
            isClassAdded ? "block" : "hidden"
          } text-5xl font-bold text-[#0F182C] md:hidden`}
          onClick={handleLeftButtonClick}
        >
          &lt;
        </button>
      </section>
      <img
        className="w-full translate-y-[-2px] rotate-180 transform"
        src="../../../assets/svgs/purpleWave.svg"
        alt="wave"
      />
      <h2 className="mt-16 flex flex-row items-end px-[6.5rem] text-left text-lg font-bold text-[#0F182C] lg:mt-32 lg:text-xl xl:text-2xl">
        <img className="" src="../../../assets/svgs/sm_flower_dark.svg" alt="wave" />
        UNIFIER POZNAJE PRAVA VOLONTERA
      </h2>

      <section className="mb-16 mt-3 grid w-full grid-cols-1 bg-white px-16 pb-10 lg:mb-32 lg:grid-cols-3 lg:grid-rows-5">
        <article className="m-1 rounded-[30px] bg-[#99D7E8] px-10 py-10 shadow-md md:col-span-1 md:row-span-5">
          {par6.map((text: string[], index: React.Key) => (
            <section
              key={index}
              className="text-nowrap py-1 text-center text-xs text-[#0F182C] sm:text-sm md:text-base lg:text-left xl:text-lg "
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
              className="text-nowrap translate-y-1 transform text-center text-xs font-bold leading-tight text-white sm:text-sm md:text-base lg:text-left"
            >
              {text}
            </p>
          ))}
          <p className="text-nowrap pt-1 text-center text-xs italic leading-tight text-[#FFF634] sm:text-sm md:text-base lg:text-left">
            {par7[1][0]}
          </p>
        </article>
        <article className="m-1 rounded-[30px] bg-[#B0A9F9] px-10 py-10 text-[#0F182C] shadow-md md:col-span-1 md:row-span-3">
          <p className="text-nowrap pt-1 text-center text-xs font-bold leading-tight sm:text-sm md:text-base lg:text-left">
            {par8[0]}
          </p>
          <p className="text-nowrap pt-1 text-center text-xs italic leading-tight sm:text-sm md:text-base lg:text-left">
            {par8[1]}
          </p>
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
        className="mx-auto my-24 mb-16 flex w-full flex-col items-center bg-white px-16 pb-10 lg:w-[70vw]"
      >
        <div className="flex flex-col items-start">
          <h2 className="mt-16 flex flex-row items-end text-left text-lg font-bold text-[#0F182C] lg:text-xl xl:text-2xl">
            <img className="" src="../../../assets/svgs/sm_flower_dark.svg" alt="wave" />O NAMA
          </h2>
          <p>{par9}</p>
        </div>
        <img className="mt-2 w-96" src="../../../assets/images/dean.jpg" alt="unifierTeam" />
      </section>
    </div>
  );
}
