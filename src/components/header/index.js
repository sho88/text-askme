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
            src="/images/logo-text-small.png"
            width={60}
            height={40}
            alt="Picture of the author"
          />
        </div>
        <WriteNewMessage />
      </div>
    </header>
  );
}
