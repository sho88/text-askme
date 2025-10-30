import "@/components/live/style.css";
import { useRouter } from "next/router";
import ReduceBrowserSize from "./ReduceBrowsingSize";

export default function Index() {
  // states and other properties go here...
  const router = useRouter();

  // events go here...
  const handleSubmit = (e) => {
    e.preventDefault();
    return router.push("/dashboard");
  };

  return (
    <div className="form-page">
      <ReduceBrowserSize />
      <form className="form-section" onSubmit={handleSubmit}>
        <div className="form-container">
          <div className="form-container-2">
            <input
              className="form-input-style"
              placeholder="Enter email"
              type="email"
            />
          </div>

          <div className="form-container-2">
            <input
              className="form-input-style"
              placeholder="Enter password"
              type="password"
            />
          </div>

          <div>
            <button className="form-button-style">Login as Host</button>
          </div>
          <div>
            <button className="form-button-style">Login as Guest</button>
          </div>
        </div>
      </form>
      <div className="logo-size"></div>
      <p>
        <br />
        Tap <u>here</u> to create an account
      </p>
    </div>
  );
}
