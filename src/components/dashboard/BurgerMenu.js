import React, { useState } from "react";
import { MenuOpen } from "./MenuOpen";

export const BurgerMenu = () => {
  const [sideMenu, setSideMenu] = useState(true);

  const clickSideMenuFunction = () => {
    setSideMenu(!sideMenu);
  };

  return (
    <div onClick={clickSideMenuFunction} className="burger-menu-2">
      <div className="dashboard-burger-line"></div>
      <div className="dashboard-burger-line"></div>
      <div className="dashboard-burger-line"></div>
      <div
        className={`side-menu-expanded${
          !sideMenu ? " burger-menu-2--hide" : ""
        }`}
      >
        <div className="dashboard-burger-line-button">
          <MenuOpen />
        </div>
      </div>
    </div>
  );
};
