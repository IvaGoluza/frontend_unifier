import React, { useContext } from "react";

import "./UserMenu.css";
import UserMenuLoggedIn from "./UserMenuLoggedIn";
import UserMenuNotLoggedIn from "./UserMenuNotLoggedIn";
import { IAuth } from "../../api/auth/IAuth";
import { AuthContext } from "../../context/AuthContext";

type UserMenuProps = {
  handleUserProfileClose: () => void;
};

export default function UserMenu({ handleUserProfileClose }: UserMenuProps) {
  const { currentUser } = useContext(AuthContext) as IAuth;
  return (
    <div className="usermenu-container" onMouseLeave={handleUserProfileClose}>
      {currentUser ? <UserMenuLoggedIn /> : <UserMenuNotLoggedIn />}
    </div>
  );
}
