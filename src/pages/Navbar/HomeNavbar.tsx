import React from "react";

import { Link } from "react-router-dom";
import "./HomeNavbar.css";

export default function HomeNavbar() {
  return (
    <nav className="fixed left-0 right-0 top-0 z-10 flex w-full items-end justify-between bg-white px-10 pt-7">
      <Link to="/login">
        <p className="pb-2 pl-6 font-sans text-lg font-medium text-blue-950">PRIJAVA</p>
      </Link>
      <div className="navLine"></div>
    </nav>
  );
}
