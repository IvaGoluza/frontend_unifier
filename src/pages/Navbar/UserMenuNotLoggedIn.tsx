import React from "react";

import "./UserMenuNotLoggedIn.css";
import { Link } from "react-router-dom";

export default function UserMenuNotLoggedIn() {
  return (
    <div className="not-logged-in-container">
      <Link to="/login">
        <p>prijava</p>
      </Link>
    </div>
  );
}
