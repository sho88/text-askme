import { BurgerMenu } from "../dashboard/BurgerMenu";
import { WriteNewMessage } from "../dashboard/WriteNewMessage";
import Image from "next/image";

// @TODO: This should be moved to a header...
export default function HeaderComponent() {
  return (
    <header className="head">
      <div className="head-container">
        <BurgerMenu />
        <div className="head-primary-info">
          <Image
            src="/images/logo-text-white-bubble-2.png"
            width={70}
            height={50}
            alt="Picture of the author"
          />
        </div>
        <WriteNewMessage />
      </div>
      <div className="divider"></div>
    </header>
  );
}
