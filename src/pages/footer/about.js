import { useState, useEffect } from "react";
import mainStyle from "@/styles/main.css";
import Image from "next/image";
import { useRouter } from "next/router";
import ReduceBrowserSize from "./../ReduceBrowsingSize";

export const about = () => {
  const router = useRouter();

  function handleGuestLoginClick() {
    return router.push("/event-pin");
  }
  function handleHostLoginClick() {
    return router.push("/host-login");
  }
  const handleAboutMe = () => {
    return router.push("/footer/about");
  };

  const handleHomepage = () => {
    return router.push("/");
  };

  return (
    <div className="intro-body-container">
      <ReduceBrowserSize />
      <div style={{ position: "relative", width: "100%" }}>
        <div className="intro-header-container">
          <Image
            onClick={handleHomepage}
            src="/images/logo-text-small.png"
            width={45}
            height={45}
            alt="Picture of the author"
          />
          <button className="qa-button" onClick={handleHomepage}>
            Start Using →
          </button>
        </div>

        <div className="footer-conatiner">
          <div className="footer-conatiner-2">
            <br />
            <br />
            <div>
              <div className="event__header">About Us</div>
              <div>
                jgfd svmjdv dsmv jvh jgfd svmjdv dsmv jvh jgfd svmjdv dsmv jvh
                jgfd svmjdv dsmv jvh jgfd svmjdv dsmv jvh jgfd svmjdv dsmv jvh
                jgfd svmjdv dsmv jvh v dsmv jvh jgfd svmjdv dsmv jvh jgfd svmjdv
                dsmv jvh jgfd svmjdv dsmv jvh v dsmv jvh jgfd svmjdv dsmv jvh
                jgfd svmjdv dsmv jvh jgfd svmjdv dsmv jvh
                <br />
                <br />
                <br />
              </div>
            </div>
            <div>
              <div className="event__header">How it was founded</div>
              <div>
                jgfd svmjdv dsmv jvh jgfd svmjdv dsmv jvh jgfd svmjdv dsmv jvh
                jgfd svmjdv dsmv jvh jgfd svmjdv dsmv jvh jgfd svmjdv dsmv jvh
                jgfd svmjdv dsmv jvh v dsmv jvh jgfd svmjdv dsmv jvh jgfd svmjdv
                dsmv jvh jgfd svmjdv dsmv jvh v dsmv jvh jgfd svmjdv dsmv jvh
                jgfd svmjdv dsmv jvh jgfd svmjdv dsmv jvh
              </div>
            </div>
            <br />
            <br />
            <div>
              <div className="event__header">Our service to you</div>
              <div>
                jgfd svmjdv dsmv jvh jgfd svmjdv dsmv jvh jgfd svmjdv dsmv jvh
                jgfd svmjdv dsmv jvh jgfd svmjdv dsmv jvh jgfd svmjdv dsmv jvh
                jgfd svmjdv dsmv jvh v dsmv jvh jgfd svmjdv dsmv jvh jgfd svmjdv
                dsmv jvh jgfd svmjdv dsmv jvh v dsmv jvh jgfd svmjdv dsmv jvh
                jgfd svmjdv dsmv jvh jgfd svmjdv dsmv jvh
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="intro-footer-container">
        <footer>
          <div className="intro-cta-button-container">
            <button
              className="intro-call-to-action-button-footer"
              onClick={handleGuestLoginClick}
            >
              <b>Start using now!</b>
            </button>
          </div>
          <div className="intro-cta-button-container">
            <u onClick={handleHostLoginClick}>
              <br />
              <b>Host Login</b>
            </u>
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

export default about;
