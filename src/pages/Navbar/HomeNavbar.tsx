import React from "react";

import { Link } from "react-router-dom";
import "./HomeNavbar.css";

export default function HomeNavbar() {
  return (
    <nav className="fixed left-0 right-0 top-0 z-10 flex w-full flex-col items-start justify-between bg-white px-10 pt-7">
      <div className="flex w-full flex-row justify-between sm:m-auto lg:w-2/3">
        <Link to="/login">
          <p className="mx-1 font-sans font-medium text-blue-950 sm:text-base lg:text-lg xl:text-xl">PRIJAVA</p>
        </Link>
        <a
          href="#unifier"
          className="mx-1 hidden font-sans font-medium text-blue-950 sm:block sm:text-base lg:text-lg xl:text-xl"
        >
          UNIFIER
        </a>
        <a href="#about" className="mx-1 font-sans font-medium text-blue-950 sm:text-base lg:text-lg xl:text-xl">
          O NAMA
        </a>
        <a href="#footer" className="mx-1 font-sans font-medium text-blue-950 sm:text-base lg:text-lg xl:text-xl">
          INFO
        </a>
      </div>
      <div className="navLine"></div>
    </nav>
  );
}
