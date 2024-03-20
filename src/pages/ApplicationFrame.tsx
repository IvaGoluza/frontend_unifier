import React from "react";
import { Outlet, useLocation } from "react-router-dom";
import Footer from "./Footer/Footer";
import HomeNavbar from "./Navbar/HomeNavbar";
import Navbar from "./Navbar/Navbar";

export default function ApplicationFrame() {
<<<<<<< HEAD
  const user = localStorage.getItem("user");
=======
  const location = useLocation();
  const isMyRequestsPage = location.pathname === "/my-requests2";

>>>>>>> origin/petra-moji-zahtjevi
  return (
    <div className="flex min-h-screen flex-col">
      {user !== null && <Navbar />}
      {user === null && <HomeNavbar />}
      <div className="flex-grow">
        <Outlet />
      </div>
      {!isMyRequestsPage && <Footer />}
    </div>
  );
}
