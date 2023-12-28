import React, { useContext } from "react";

import { useNavigate } from "react-router-dom";

import { IAuth } from "../../api/auth/IAuth";
import { AuthContext } from "../../context/AuthContext";

export default function LogOut() {
  const { logout } = useContext(AuthContext) as IAuth;
  const navigate = useNavigate();
  const handleLogOut = () => {
    logout();
    navigate("/");
  };
  return (
    <span className="py-3 logged-in-option-container" onClick={handleLogOut}>
      <p>Odjava</p>
    </span>
  );
}
