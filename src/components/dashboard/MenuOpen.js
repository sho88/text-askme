import Link from "next/link";
import { MenuOptionIcon } from "./MenuOptionIcon";
import { MenuOptionTitle } from "./MenuOptionTitle";

export const MenuOpen = () => {
  return (
    <div className="menu-open-option-container">
      <div className="menu-open-option">
        <MenuOptionTitle label="Home" id="special" />
        <MenuOptionIcon imageUrl={"images/fn-home-4.png"} />
      </div>
      <div className="menu-open-option">
        <MenuOptionTitle label="New Event" id="special" />

        <MenuOptionIcon imageUrl={"images/fn-plus-4.png"} />
      </div>
      <div className="menu-open-option">
        <MenuOptionTitle label="Sign Out" id="special" />

        <MenuOptionIcon imageUrl={"images/fn-user-4.png"} />
      </div>

      {/* <div className="menu-open-option">
        <MenuOptionTitle label="Pinned messages" id="special" />
        <MenuOptionIcon imageUrl={"images/fn-write2.png"} />
      </div>
      <div className="menu-open-option">
        <MenuOptionTitle label="Network" id="special" />
        <MenuOptionIcon imageUrl={"images/fn-write2.png"} />
      </div>
      <div className="menu-open-option">
        <MenuOptionTitle label="Security" id="special" />
        <MenuOptionIcon imageUrl={"images/fn-write2.png"} />
      </div>
      <div className="menu-open-option">
        <MenuOptionTitle label="Settings" id="special" />
        <MenuOptionIcon imageUrl={"images/fn-write2.png"} />
      </div> */}
    </div>
  );
};
