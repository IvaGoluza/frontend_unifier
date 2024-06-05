import React, { Dispatch, SetStateAction, useEffect, useState } from "react";

import { nanoid } from "nanoid";
import { Link } from "react-router-dom";

type MenuItemsProps = {
  setMenuActive: Dispatch<SetStateAction<boolean>>;
  linkListClassName: string;
  menuItemList: {
    name: string;
    active: boolean;
    path: string;
    viewers: string[];
    subItems?: { name: string; path: string }[];
  }[];
};

export default function MenuItems({ setMenuActive, linkListClassName, menuItemList }: MenuItemsProps) {
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);
  const [isMobile, setIsMobile] = useState<boolean>(window.innerWidth <= 768);
  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth <= 768;
      setIsMobile(mobile);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const clickHandler = (
    e: React.MouseEvent<HTMLAnchorElement | HTMLElement, MouseEvent>,
    hasSubItems: boolean,
    name: string,
    path?: string
  ) => {
    if (isMobile && path === "#") {
      e.preventDefault();
      if (hasSubItems) {
        setHoveredItem(name);
      } else setMenuActive(false);
    } else {
      setMenuActive(false);
    }
  };
  return (
    <ul className={linkListClassName}>
      {menuItemList.map((listItem) => (
        <li
          key={nanoid()}
          className={listItem.active ? "active list-item" : "list-item"}
          onMouseEnter={() => !isMobile && setHoveredItem(listItem.name)}
          onMouseLeave={() => !isMobile && setHoveredItem(null)}
          onClick={(e) => clickHandler(e, listItem.subItems !== undefined, listItem.name, listItem.path)}
        >
          <Link
            to={listItem.path ? listItem.path : "#"}
            onClick={(e) => clickHandler(e, listItem.subItems !== undefined, listItem.name, listItem.path)}
          >
            {listItem.name}
          </Link>
          {listItem.subItems && hoveredItem === listItem.name && (
            <ul className="submenu">
              {listItem.subItems.map((subItem) => (
                <li key={nanoid()} className="submenu-item">
                  <Link to={subItem.path} onClick={() => setMenuActive(false)}>
                    {subItem.name}
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </li>
      ))}
    </ul>
  );
}
