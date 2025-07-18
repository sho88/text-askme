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
      {/* <Image
        // RESUME WORK HERE
        className="whats-this"
        src="/images/opening-animation-logo.webp"
        width={400}
        height={1000}
        alt="Picture of the author"
      /> */}
      <form className="form-section" onSubmit={handleSubmit}>
        <div className="form-container">
          <div>
            <input
              className="form-input-style"
              placeholder="Enter email"
              type="email"
            />
          </div>

          <div>
            <input
              className="form-input-style"
              placeholder="Enter password"
              type="password"
            />
          </div>

          <div>
            <button className="form-button-style">Login</button>
          </div>
        </div>
      </form>
      <div className="logo-size"></div>
    </div>
  );
}
