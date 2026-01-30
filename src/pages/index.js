import { useState, useEffect } from "react"; // Add this
import mainStyle from "@/styles/main.css";
import Image from "next/image";
import { useRouter } from "next/router";
import ReduceBrowserSize from "./ReduceBrowsingSize";

const Intro = () => {
  const router = useRouter();
  const [scrollY, setScrollY] = useState(0);

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
  return (
    <div>
      <ReduceBrowserSize />
      <div>
        <div style={{ position: "relative", width: "100%" }}>
          <div className="intro-header-container">
            <Image
              src="/images/logo-text-small.png"
              width={45}
              height={45}
              alt="Picture of the author"
            />
            <button className="qa-button" onClick={handleHostLoginClick}>
              Host Login
            </button>
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
              BRIDGE <br />
              THE <br />
              <span style={{ color: "#124259" }}>GAP</span>
            </h1>
          </div>
        </div>
        <div className="intro-call-to-action">
          <button
            className="intro-call-to-action-button"
            onClick={handleGuestLoginClick}
          >
            <b>Start using now!</b>
          </button>
        </div>
      </div>
      <div className="qa-article-1">
        <div className="qa-article-2">
          <div>
            <div className="qa-article-3">
              Travel insurance for a short trip?
              {/* <Image
                className="delete-question"
                src="/images/cross-cancel.png"
                alt="cross"
                height="10"
                width="10"
              /> */}
            </div>
          </div>

          <div className="qa-article-3">
            What are the most important cultural etiquette rules to research
            before visiting a Middle Eastern country?
          </div>
          <div className="qa-article-reactions">👍❤️2</div>

          <div className="qa-article-3">
            In light of recent global health changes, what documentation—such as
            digital health passes or specific proof of recovery—is currently
            necessary for entry into most major European Union countries, and
            how far in advance should these be verified?
          </div>
          <div className="qa-article-reactions">👍❤️2</div>

          <div className="qa-article-3">Best travel apps?</div>
          <div className="qa-article-reactions">🙏❗5</div>

          <div className="qa-article-3">
            Can I use my mobile data without extra fees?
          </div>
          <div className="qa-article-reactions">🙏❗5</div>

          <h2 className="qa-heading-2">
            Tuned into a live speech, seminar, or podcast? Submit your questions
            to get them instantly answered by the host.
          </h2>

          <div className="qa-article-3">
            Best vitamins for marathon recovery?
          </div>
          <div className="qa-article-reactions">👏✅2</div>
          <div className="qa-article-3">Best leg stretches?</div>
          <div className="qa-article-3">
            How can I balance a high-volume marathon training plan with a
            full-time desk job to ensure I am getting enough sleep and active
            recovery to prevent the onset of chronic overtraining syndrome?
          </div>
          <div className="qa-article-reactions">👍❤️7</div>
          <div className="qa-article-3">
            Carbon plate shoes worth the high cost?
          </div>
          <div className="qa-article-3">
            What role does iron deficiency play in marathon fatigue, and should
            runners get regular blood tests to monitor their ferritin levels
            during training?
          </div>
          <div className="qa-article-reactions">✍️🥰4</div>
          <h2 className="qa-heading-2">
            Your text questions are instantly visible to the host, enabling for
            a qucik response via live speech.
          </h2>
        </div>

        <div className="intro-additional-section">
          <div className="intro-additional-section-body">
            <h2>
              You get the benefits of asking your speaker live questions, in
              which they'll respond to you in real-time!
              <br />
              <br />
              Here's what you'll see on yur device...
            </h2>
          </div>
        </div>
        <div className="intro-image-section">
          <div className="intro-image-section-image-overlay"></div>
          <Image
            className="intro-image-section-image"
            src="/images/tqa-ss-8.webp"
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
              <div className="intro-footer-body-text">About Us</div>
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
                Isaac Ola.
              </a>
              {"  "}2026 ⓒ TextQ&A
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
