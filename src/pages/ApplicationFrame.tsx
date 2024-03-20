import React from "react";

import { Outlet } from "react-router-dom";

import Footer from "./Footer/Footer";
import HomeNavbar from "./Navbar/HomeNavbar";
import Navbar from "./Navbar/Navbar";

export default function ApplicationFrame() {
  const user = localStorage.getItem("user");
  return (
    <div className="flex min-h-screen flex-col">
      {user !== null && <Navbar />}
      {user === null && <HomeNavbar />}
      <div className="flex-grow">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
}
