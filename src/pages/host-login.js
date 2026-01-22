import "@/components/live/style.css";
import mainStyle from "@/styles/main.css";
import { useRouter } from "next/router";
import ReduceBrowserSize from "./ReduceBrowsingSize";
import Image from "next/image";
import FadeOutElement from "./FadeOutElement";

export default function Index() {
  // states and other properties go here...
  const router = useRouter();

  const handleClick = () => {
    return router.back();
  };

  // events go here...
  function handleGuestLoginClick() {
    return router.push("/event-pin");
  }

  function handleSubmit(e) {
    e.preventDefault();

    const formData = new FormData(e.target);

    // @TODO: Prepare data to login (using Firebase Authentication)
    const data = {
      email: formData.get("email"),
      password: formData.get("password"),
    };

    const isEmpty = Object.values(data).some((value) => !value);

    if (isEmpty) {
      console.error("You need to login with email and password");
      return;
    }

    return router.push("/dashboard");
  }

  return (
    <div className="form-page">
      {/* <FadeOutElement /> */}
      <ReduceBrowserSize />

      <div className="">
        <div className="">
          <button onClick={handleClick} className="burger-menu-2">
            <Image
              className="test276"
              src="/images/back.png"
              width={25}
              height={23}
              alt="Picture of the author"
            ></Image>
          </button>
        </div>
      </div>

      <form className="form-section" onSubmit={handleSubmit}>
        <div className="form-container">
          <div className="form-container-2">
            <input
              aria-required="true"
              className="form-input-style"
              name="email"
              placeholder="Enter email"
              required
              type="email"
            />
          </div>

          <div className="form-container-2">
            <input
              aria-required="true"
              className="form-input-style"
              name="password"
              placeholder="Enter password"
              required
              type="password"
            />
          </div>

          <div className="login-form-button-style-container">
            <button className="login-form-button-style">
              <b>Login as Host</b>
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
