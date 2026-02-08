import React from "react";
import Image from "next/image";
import { MenuOptionIcon } from "./MenuOptionIcon";
import { MenuOptionTitle } from "./MenuOptionTitle";

export const MenuOpenGuest = ({ onClose }) => {
  return (
    <div>
      <div className="head-menu-container">
        <header className="head">
          <div className="head-container">
            <div>
              <Image
                src="/images/cross-cancel.png"
                width={21}
                height={21}
                alt="Close Menu"
                style={{ opacity: 0 }}
              />
            </div>
            <div>
              <Image
                src="/images/logo-text-small.png"
                width={60}
                height={40}
                alt="Picture of the author"
              />
            </div>
            <div className="head-primary-info" onClick={onClose}>
              <Image
                src="/images/cross-cancel.png"
                width={20}
                height={20}
                alt="Close Menu"
              />
            </div>
          </div>
        </header>
      </div>

      <div className="menu-open-option-xx">
        <div className="menu-open-option">
          <MenuOptionTitle label="Home" menLink={"/"} />
        </div>
        <div className="menu-open-option">
          <MenuOptionTitle label="Visit another room" menLink={"/event-pin"} />
        </div>
        <div className="menu-open-option">
          <MenuOptionTitle label="Login as Host →" menLink={"/host-login"} />
        </div>
      </div>
    </div>
  );
};
