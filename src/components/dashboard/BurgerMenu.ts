import React, { useState } from "react";
import { MenuOpen } from "./MenuOpen";

export const BurgerMenu = () => {
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
          <MenuOpen onClose={toggleMenu} />
        </div>
      </div>
    </div>
  );
};
