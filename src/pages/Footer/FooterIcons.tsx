import React from "react";

import { faFacebookF, faInstagram, faTiktok, faTwitter } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import "./FooterIcons.css";

export default function FooterIcons() {
  return (
    <div className="footer-icons-container">
      <FontAwesomeIcon icon={faFacebookF} className="footer-icon" />
      <FontAwesomeIcon icon={faInstagram} className="footer-icon" />
      <FontAwesomeIcon icon={faTwitter} className="footer-icon" />
      <FontAwesomeIcon icon={faTiktok} className="footer-icon" />
    </div>
  );
}
