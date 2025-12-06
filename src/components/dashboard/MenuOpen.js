import Link from "next/link";
import { MenuOptionIcon } from "./MenuOptionIcon";
import { MenuOptionTitle } from "./MenuOptionTitle";
import { BurgerMenu } from "../dashboard/BurgerMenu";
import { WriteNewMessage } from "../dashboard/WriteNewMessage";
import Image from "next/image";

export const MenuOpen = () => {
  return (
    <div>
      <div className="head-menu-container">
        <header className="head">
          <div className="head-container">
            <p></p>
            <div className="head-primary-info">
              <br />
              <Image
                src="/images/cross-cancel.png"
                width={20}
                height={20}
                alt="Picture of the author"
              />
            </div>
          </div>
        </header>
      </div>

      <div className="menu-open-option-xx">
        <div className="menu-open-option">
          <MenuOptionTitle label="Home" id="special" />
          <MenuOptionIcon imageUrl={"/images/fn-home-5.png"} />
        </div>
        <div className="menu-open-option">
          <MenuOptionTitle label="New Event" id="special" />

          <MenuOptionIcon imageUrl={"/images/fn-plus-5.png"} />
        </div>
        <div className="menu-open-option">
          <MenuOptionTitle label="Sign Out" id="special" />

          <MenuOptionIcon imageUrl={"/images/fn-user-5.png"} />
        </div>
      </div>
      <div></div>
    </div>
  );
};
