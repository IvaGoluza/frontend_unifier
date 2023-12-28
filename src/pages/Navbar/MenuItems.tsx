import React, { Dispatch, SetStateAction } from "react";

import { nanoid } from "nanoid";
import { Link } from "react-router-dom";

type MenuItemsProps = {
  setMenuActive: Dispatch<SetStateAction<boolean>>;
  linkListClassName: string;
  menuItemList: {
    name: string;
    active: boolean;
    path?: string;
    viewers: string[];
  }[];
};

export default function MenuItems({ setMenuActive, linkListClassName, menuItemList }: MenuItemsProps) {
  return (
    <ul className={linkListClassName}>
      {menuItemList.map(
        (
          listItem: {
            active: boolean;
            name: string;
            path?: string;
            viewers: string[];
          },
          index: React.Key
        ) => (
          <Link
            key={nanoid()}
            to={listItem.path ? listItem.path : "#"}
            className={listItem.active ? "active list-item" : "list-item"}
          >
            <li
              key={index}
              onClick={() => {
                setMenuActive(false);
              }}
              className={listItem.active ? "active" : ""}
            >
              {listItem.name}
            </li>
          </Link>
        )
      )}
    </ul>
  );
}
