import { useState, useEffect } from "react";
import mainStyle from "@/styles/main.css";
import Image from "next/image";
import { useRouter } from "next/router";
import ReduceBrowserSize from "./ReduceBrowsingSize";
import { auth0 } from "@/lib/auth0";
import { asyncify } from "@/utils";
import LogoutButton from "@/components/auth/LogoutButton";
import LoginButton from "@/components/auth/LoginButton";

export const getServerSideProps = async (context) => {
  const [error, session] = await asyncify(
    auth0.getSession(context.req, context.res)
  );

  if (error) {
    console.error("Error fetching session:", error);
    return {
      props: { session: null },
    };
  }

  return {
    props: { session: session || null },
  };
};

const Intro = ({ session }) => {
  const [user, setUser] = useState(session?.user || null);
  const router = useRouter();
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    setUser(session?.user || null);
  }, [session]);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    // Use passive listener for better scroll performance
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // events go here...
  function handleGuestLoginClick() {
    return router.push("/event-pin");
  }
  function handleHostLoginClick() {
    return router.push("/host-login");
  }
  const handleAboutMe = () => {
    return router.push("/footer/about");
  };

  const handleToDashboard = () => {
    return router.push("/dashboard");
  };

  return (
    <div>
      <ReduceBrowserSize />
      <div className="intro-body-container">
        <div style={{ position: "relative", width: "100%" }}>
          <div className="intro-header-container">
            <Image
              src="/images/logo-text-small.png"
              width={45}
              height={45}
              alt="Picture of the author"
            />
            {user ? <LogoutButton /> : <LoginButton />}
          </div>
          <div
            style={{
              position: "relative",
              height: "400px",
              overflow: "hidden",
            }}
          >
            <Image
              alt="Opening hand..."
              className="qa-opening-hand"
              src="/images/qa-opening-hand.png"
              fill
              style={{ objectFit: "cover" }}
            />
            <Image
              alt="Opening..."
              src="/images/qa-opening.png"
              fill
              style={{ objectFit: "cover" }}
            />
          </div>
          <div className="header-overlay">
            <h1 className="qa-opening-header">
              BRIDGING <br />
              THE <br />
              <span style={{ color: "#124259" }}>GAP</span>
            </h1>
          </div>
        </div>
        <div className="intro-call-to-action">
          {user ? (
            <button
              className="intro-call-to-action-button"
              onClick={handleToDashboard}
            >
              <b>My Dashboard</b>
            </button>
          ) : (
            <button
              className="intro-call-to-action-button"
              onClick={handleGuestLoginClick}
            >
              <b>Start using now!</b>
            </button>
          )}
        </div>
      </div>
      <div className="qa-article-1">
        <div className="intro-additional-section">
          <div className="intro-additional-section-body">
            {user ? (
              <h2>
                Provide seamless interaction with your audience with a live,
                two-way communication. Your audience will submit their questions
                through the app, as you respond to them in real-time! Audiences
                view:
              </h2>
            ) : (
              <h2>
                Experience seamless interaction with live, two-way
                communication. Submit your questions instantly, from the comfort
                of your own home, and watch as speakers respond to you in
                real-time!
              </h2>
            )}
          </div>
        </div>
        <div className="intro-image-section">
          <div className="intro-image-section-image-overlay"></div>
          <Image
            className="intro-image-section-image"
            src="/images/tqa-ss-9.webp"
            alt="pic"
            width={2000}
            height={2000}
          />
          <div className="placeholder">
            {" "}
            <Image
              className="intro-image-section-image"
              src="/images/tqa-ss-1.webp"
              alt="pic"
              width={1000}
              height={1000}
            />
          </div>
          <div className="placeholder-2" style={{ "--scroll-offset": scrollY }}>
            <Image
              className="intro-image-section-image-2"
              src="/images/tqa-ss-6.webp"
              alt="pic"
              width={1000}
              height={1000}
            />
          </div>
          <div className="placeholder-3" style={{ "--scroll-offset": scrollY }}>
            <Image
              className="intro-image-section-image-3"
              src="/images/tqa-ss-5.png"
              alt="pic"
              width={1000}
              height={1000}
            />
          </div>
          <div className="placeholder-4" style={{ "--scroll-offset": scrollY }}>
            {/* <textarea className="intro-image-section-image-4"></textarea> */}
            <Image
              className="intro-image-section-image-4"
              src="/images/tqa-ss-7.png"
              alt="pic"
              width={1000}
              height={1000}
            />
          </div>
        </div>
      </div>

      <div className="intro-footer-container">
        <footer>
          <div className="intro-cta-button-container">
            {user ? (
              <button
                className="intro-call-to-action-button-footer"
                onClick={handleToDashboard}
              >
                <b>My Dashboard</b>
              </button>
            ) : (
              <button
                className="intro-call-to-action-button-footer"
                onClick={handleGuestLoginClick}
              >
                <b>Start using now!</b>
              </button>
            )}
          </div>
          <div className="intro-cta-button-container">
            {user ? (
              <u>
                <br />
                <b>Logout</b>
              </u>
            ) : (
              <u onClick={handleHostLoginClick}>
                <br />
                <b>Host Login</b>
              </u>
            )}
          </div>

          <div className="intro-footer-body">
            <div>
              <div className="intro-footer-body-text" onClick={handleAboutMe}>
                About Us
              </div>
              <div className="intro-footer-body-text">Features</div>
              <div className="intro-footer-body-text">Security & Privacy</div>
              <div className="intro-footer-body-text">App</div>
            </div>
            <div>
              <div className="intro-footer-body-text">Whats New</div>
              <div className="intro-footer-body-text">Help Centre</div>
              <div className="intro-footer-body-text">Contact</div>
              <div className="intro-footer-body-text">Site Map</div>
            </div>
          </div>
          <div className="intro-footer-logo-container">
            <small>
              Designed and developed by {""}
              <a
                href="https://isaac-ola.com/"
                rel="noreferrer"
                style={{ color: "white" }}
              >
                Isaac Ola
              </a>{" "}
              & Sho-Carter Daniel.
              {"  "}
              <br />
              2026 ⓒ TextQ&A
            </small>

            {/* <Image
              className="footer-sole-logo"
              src="/images/logo-text-white.png"
              width={35}
              height={35}
              alt="Picture of the author"
            /> */}
          </div>
        </footer>
      </div>
    </div>
  );
};

export default Intro;
