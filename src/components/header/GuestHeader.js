import { BackButton } from "../dashboard/BackButton";
import Image from "next/image";
import { BurgerMenuGuest } from "../dashboard/BurgerMenuGuest";

export const GuestHeader = () => {
  return (
    <header className="head">
      <div className="head-container">
        <div style={{ maxWidth: "21px", minWidth: "21px" }}></div>
        <div className="head-primary-info">
          <Image
            src="/images/logo-text-small.png"
            width={60}
            height={40}
            alt="Picture of the author"
          />
        </div>
        <BurgerMenuGuest />
      </div>
    </header>
  );
};

export default GuestHeader;
