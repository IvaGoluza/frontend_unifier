import React from "react";
import { Outlet, useLocation } from "react-router-dom";
import Footer from "./Footer/Footer";
import Navbar from "./Navbar/Navbar";

export default function ApplicationFrame() {
  const location = useLocation();
  const isMyRequestsPage = location.pathname === "/my-requests2";

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <div className="flex-grow">
        <Outlet />
      </div>
      {!isMyRequestsPage && <Footer />}
    </div>
  );
}
