import React from "react";

import "./home.css";
import { Link } from "react-router-dom";

import { routes } from "../../api/paths";
import Accordion from "../../components/Accordion/Accordion";
import Slideshow from "../../components/Slideshow/Slideshow";

export default function Home() {
  const user = localStorage.getItem("user");
  const par: string[] = [
    "Budi promjena koju želiš vidjeti u svijetu.",
    "Svojim djelima ostavi trag u životima drugih.",
    "Uz našu pomoć lako pronađi prilike za volontiranje.",
  ];

  const par2: string[] = [
    "Svaki problem je malen uz dobru volju naših volontera!",
    "Lako pronađi volontera koji ti treba.",
  ];

  const par3: string[] = [
    "Trudimo se ubrzati i olakšati proces traženja pomoći,",
    " a volonterima pružamo prilike za djelovanje.",
    "U par koraka postani dio naše priče!",
  ];

  const categoriesText: string[] = [
    "Naš glavni cilj je omogućiti brzo pružanje pomoći.",
    "Jednostavno napravite oglas i zatražite/ponudite pomoć.",
    "Odaberite neke od ponuđenih kategorija ",
    "kojim pripada pomoć koju čekate ili želite pružiti.",
    "UNIFIER će Vam pomoći organizirati dogovore i umanjiti čekanje!",
  ];

  return (
    <>
      <div className="bannerhome relative w-full">
        <img src="../../../assets/images/hp1.png" alt="unifier-home" className="h-full object-cover" />
        <div className="par absolute bottom-10 left-56 text-white">
          <h2 className="mb-4 text-3xl">{"ŽELIŠ POMOĆI?"}</h2>
          {par.map((text: string, index: React.Key) => (
            <p key={index} className="text-lg leading-normal">
              {text}
            </p>
          ))}
        </div>
        <div className="par2 absolute right-60 top-12 text-end text-white">
          <h2 className="mb-4 text-3xl">{"TREBAŠ POMOĆ?"}</h2>
          {par2.map((text: string, index: React.Key) => (
            <p key={index} className="text-lg leading-normal">
              {text}
            </p>
          ))}
        </div>
      </div>

      <div className="home">
        <div className="home1">
          <div className="par3">
            <div className="text-gray par3p text-center">
              {par3.map((text: string, index: React.Key) => (
                <p key={index} className="text-lg leading-normal">
                  {text}
                </p>
              ))}
            </div>
            {user === null && (
              <Link
                to={routes.USER_REGISTRATION_URL}
                className="mt-5 inline-block rounded-lg bg-orange-500 p-4 font-medium text-white no-underline hover:bg-orange-400"
              >
                REGISTRIRAJ SE
              </Link>
            )}
          </div>
          <div className="roundImage">
            <div className="roundImage1"></div>
            <div className="roundImage2"></div>
            <div className="roundImage3"></div>
          </div>
        </div>
        <div className="slidesHome">
          <Slideshow images="sl" title="upoznaj UNIFIER" number={7} />
        </div>
        <div className="categorySlides">
          <Slideshow images="cat" title="kategorije pomoći" number={6} />
          <div className="par3 text-center text-2xl">
            {categoriesText.map((text: string, index: React.Key) => (
              <p key={index} className="text-lg leading-normal">
                {text}
              </p>
            ))}
          </div>
        </div>
      </div>
      <div className="how">
        <h1 className="text-7xl font-bold text-orange-600">Kako?</h1>
        <Accordion />
      </div>
    </>
  );
}
