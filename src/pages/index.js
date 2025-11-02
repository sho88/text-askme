import "@/components/live/style.css";
import { useRouter } from "next/router";
import ReduceBrowserSize from "./ReduceBrowsingSize";

export default function Index() {
  // states and other properties go here...
  const router = useRouter();

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
      <ReduceBrowserSize />
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

          <div>
            <button className="form-button-style">Login as Host</button>
          </div>
        </div>
      </form>

      <div>
        <button className="form-button-style" onClick={handleGuestLoginClick}>
          Login as Guest
        </button>
      </div>

      <div className="logo-size"></div>
      {/* <p>
        <br />
        Tap <u>here</u> to create an account
      </p> */}
    </div>
  );
}
