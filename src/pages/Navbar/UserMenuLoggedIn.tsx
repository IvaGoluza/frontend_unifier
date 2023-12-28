import React, { useContext } from "react";

import "./UserMenuLoggedIn.css";

import { Link } from "react-router-dom";

import LogOut from "./LogOut";
import { IAuth } from "../../api/auth/IAuth";
import { routes } from "../../api/paths";
import { AuthContext } from "../../context/AuthContext";

export default function UserMenuLoggedIn() {
  const { currentUser } = useContext(AuthContext) as IAuth;

  return (
    <div className="logged-in-container">
      <Link to={routes.PROFILE_URL}>
        <span className="logged-in-option-container">Profil</span>
      </Link>
      {currentUser?.userType === "VOLUNTEER" && currentUser?.role === "USER" && (
        <Link to={routes.RECENSIONS_URL}>
          <span className="logged-in-option-container">Recenzije</span>
        </Link>
      )}
      {currentUser?.userType !== "VOLUNTEER" && (
        <Link to={routes.NOTES_URL}>
          <span className="logged-in-option-container">Poruke volontera</span>
        </Link>
      )}
      <LogOut />
    </div>
  );
}
