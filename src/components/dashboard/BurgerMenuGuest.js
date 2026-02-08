import React, { useState } from "react";
import { MenuOpenGuest } from "./MenuOpenGuest";

export const BurgerMenuGuest = () => {
  const [sideMenu, setSideMenu] = useState(false);

  const toggleMenu = () => {
    setSideMenu(!sideMenu);
  };

  return (
    /* The parent wrapper handles the click to open/close */
    <div onClick={toggleMenu} className="burger-menu-2">
      <div className="dashboard-burger-line"></div>
      <div className="dashboard-burger-line"></div>
      <div className="dashboard-burger-line"></div>

      <div
        /* stopPropagation prevents clicking the menu from closing itself immediately */
        onClick={(e) => e.stopPropagation()}
        className={`side-menu-expanded ${sideMenu ? "active" : ""}`}
      >
        <div className="dashboard-burger-line-button">
          {/* We pass toggleMenu as a prop so the 'X' button in MenuOpen can close it */}
          <MenuOpenGuest onClose={toggleMenu} />
        </div>
      </div>
    </div>
  );
};
