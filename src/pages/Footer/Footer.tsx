import React from "react";

import FooterCopyright from "./FooterCopyright";
import FooterIcons from "./FooterIcons";

import "./Footer.css";

export default function Footer() {
  return (
    <div className="footer-container">
      <FooterIcons />
      <hr />
      <FooterCopyright />
    </div>
  );
}
