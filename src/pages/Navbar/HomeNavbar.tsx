import React from "react";

import { Link } from "react-router-dom";
import "./HomeNavbar.css";

export default function HomeNavbar() {
  return (
    <nav className="fixed left-0 right-0 top-0 z-10 flex w-full flex-col items-start justify-between bg-white px-10 pt-7">
      <Link to="/login">
        <p className="pl-6 font-sans font-medium text-blue-950 sm:text-base lg:text-lg xl:text-xl">PRIJAVA</p>
      </Link>
      <div className="navLine"></div>
    </nav>
  );
}
