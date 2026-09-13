import React, { useState } from "react";
import { MenuOpenGuest } from "./MenuOpenGuest";

export const BurgerMenuGuest = () => {
  const [sideMenu, setSideMenu] = useState(false);

  const toggleMenu = () => {
    setSideMenu(!sideMenu);
  };

  return (
    <div onClick={toggleMenu} className="burger-menu-2">
      <div className="dashboard-burger-line"></div>
      <div className="dashboard-burger-line"></div>
      <div className="dashboard-burger-line-half"></div>

      <div
        onClick={(e) => e.stopPropagation()}
        className={`side-menu-expanded ${sideMenu ? "active" : ""}`}
      >
        <div className="dashboard-burger-line-button">
          <MenuOpenGuest onClose={toggleMenu} />
        </div>
      </div>
    </div>
  );
};
