import React from "react";

import "./FooterCopyright..css";

import { faCopyright } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function FooterCopyright() {
  return (
    <div className="footer-copyright-container">
      <p className="copyright">
        <FontAwesomeIcon icon={faCopyright} className="copyright-icon" />
        UNIFIER • Made with care in Croatia.
      </p>
    </div>
  );
}
