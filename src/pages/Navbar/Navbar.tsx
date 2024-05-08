import React, { useState, useContext, useEffect } from "react";

import { faBars, faUser, faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useLocation } from "react-router-dom";

import MenuItems from "./MenuItems";
import UserMenu from "./UserMenu";
import { IAuth } from "../../api/auth/IAuth";
import { routes } from "../../api/paths";
import { AuthContext } from "../../context/AuthContext";

import "./Navbar.css";

export default function Navbar() {
  const [menuItemList, setMenuItemList] = useState<
    {
      name: string;
      active: boolean;
      path: string;
      viewers: string[];
    }[]
  >([
    {
      name: "UNIFIER",
      active: true,
      path: routes.HOMEPAGE_URL,
      viewers: ["ALL"],
    },
    {
      name: "Moji oglasi",
      active: true,
      path: routes.MY_ADVERTS_URL,
      viewers: ["VOLUNTEER"],
    },
    {
      name: "Moji zahtjevi",
      active: true,
      path: routes.MY_REQUESTS_URL,
      viewers: ["PERSON_IN_NEED", "ASSOCIATION"],
    },
    {
      name: "Volonterske prilike",
      active: true,
      path: routes.VOLUNTEER_CHANCES_URL,
      viewers: ["VOLUNTEER"],
    },
    {
      name: "Volonterski oglasi",
      active: true,
      path: routes.VOLUNTEER_ADVERTS_URL,
      viewers: ["PERSON_IN_NEED", "ASSOCIATION"],
    },
    {
      name: "Zahtjevi za pomoć",
      active: true,
      path: routes.REQUESTS_URL,
      viewers: ["VOLUNTEER"],
    },
    {
      name: "Dogovori",
      active: true,
      path: routes.DEALS_URL,
      viewers: ["PERSON_IN_NEED", "VOLUNTEER", "VOLUNTEER_AND_PERSON_IN_NEED"],
    },
    {
      name: "Zahtjevi",
      active: true,
      path: routes.ADMIN_REQUESTS,
      viewers: ["ADMIN"],
    },
    {
      name: "Oglasi",
      active: true,
      path: routes.ADMIN_ADVERTS,
      viewers: ["ADMIN"],
    },
    {
      name: "Korisnici",
      active: true,
      path: routes.ADMIN_USERS,
      viewers: ["ADMIN"],
    },
  ]);

  const [menuActive, setMenuActive] = useState(false);
  const [userMenuActive, setUserMenuActive] = useState(false);
  const [currentPath, setCurrentPath] = useState<string>(window.location.pathname);
  const location = useLocation();

  const { currentUser } = useContext(AuthContext) as IAuth;

  const handleMenuClick = () => setMenuActive((prevMenuActive) => !prevMenuActive);

  const handleUserProfileClick = () => {
    setUserMenuActive((prevValue) => !prevValue);
  };

  const handleUserProfileClose = () => setUserMenuActive(false);

  const menuIcon = menuActive ? faXmark : faBars;
  const linkListClassName = menuActive ? "link-list active" : "link-list";

  useEffect(() => {
    setCurrentPath(window.location.pathname);
    setMenuItemList((prevMenuItemList) => {
      const newMenuItemList = [...prevMenuItemList];
      newMenuItemList.forEach((item) => {
        item.active = item.path === window.location.pathname;
      });
      return newMenuItemList;
    });
  }, [location.pathname]);

  const filterList = () => {
    let userRole = currentUser !== null ? currentUser.userType : "NOT_LOGGED_IN";
    //userRole = userRole === undefined && currentUser?.role === "ADMINISTRATOR" ? "ADMIN" : "NOT_LOGGED_IN";
    if (userRole === undefined) userRole = "NOT_LOGGED_IN";
    if (currentUser?.role === "ADMINISTRATOR") userRole = "ADMIN";
    return menuItemList.filter((item) => {
      for (let i = 0; i < item.viewers.length; i++) {
        if (item.viewers[i] === "ALL") return true;
        if (item.viewers[i] === userRole) return true;
      }

      return false;
    });
  };

  return (
    <nav className="navbar-container border-b-2">
      <div className="page-link-container">
        <MenuItems setMenuActive={setMenuActive} menuItemList={filterList()} linkListClassName={linkListClassName} />
        <div className="menu-container">
          <FontAwesomeIcon icon={menuIcon} className="menu-icon" onClick={handleMenuClick} />
        </div>
      </div>
      <div className="navbar-icon-container">
        <div className="user-profile-container">
          <FontAwesomeIcon
            icon={faUser}
            className="navbar-icon"
            /*onMouseOver={handleUserProfileClick}*/
            onClick={handleUserProfileClick}
          />
          {userMenuActive && <UserMenu handleUserProfileClose={handleUserProfileClose} />}
        </div>
      </div>
    </nav>
  );
}
