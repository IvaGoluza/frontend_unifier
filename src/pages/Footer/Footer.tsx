import React from "react";

import FooterCopyright from "./FooterCopyright";
import FooterIcons from "./FooterIcons";

import "./Footer.css";

export default function Footer() {
  return (
    <>
      <img className="w-full translate-y-2 transform" src="../../../assets/svgs/waveTop.svg" alt="wave" />
      <div className="flex flex-col items-center justify-end bg-[#1F2340] px-10 md:flex-row">
        <img className="mx-2 my-8 h-20" src="../../../assets/images/suz_logo_light.png" alt="sveucilisteZG" />
        <img className="mx-2 my-8 h-[3.25rem]" src="../../../assets/images/FER_light_logo.png" alt="fer" />
        <img
          className="translate h-40 translate-y-3 transform"
          src="../../../assets/images/ERF_light_logo.png"
          alt="erf"
        />
      </div>
      <div id="footer" className="footer-container ">
        <FooterIcons />
        <FooterCopyright />
      </div>
    </>
  );
}
