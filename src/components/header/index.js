import { BurgerMenu } from "../dashboard/BurgerMenu";
import { BackButton } from "../dashboard/BackButton";
import { useRouter } from "next/router";
import Image from "next/image";

// @TODO: This should be moved to a header...
export default function HeaderComponent() {
  const router = useRouter();
  const handleClick = () => {
    return router.push("/dashboard");
  };
  return (
    <header className="head">
      <div className="head-container">
        <BackButton />
        <div className="head-primary-info">
          <Image
            onClick={handleClick}
            src="/images/logo-text-small.png"
            width={60}
            height={40}
            alt="Text QA Logo"
          />
        </div>
        <BurgerMenu />
      </div>
    </header>
  );
}
