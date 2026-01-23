import mainStyle from "@/styles/main.css";
import Image from "next/image";
import { useRouter } from "next/router";

const intro = () => {
  const router = useRouter();

  // events go here...
  function handleGuestLoginClick() {
    return router.push("/event-pin");
  }
  function handleHostLoginClick() {
    return router.push("/host-login");
  }
  return (
    <div>
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
              className="qa-opening-hand"
              src="/images/qa-opening-hand.png"
              fill
              style={{ objectFit: "cover" }}
            />
            <Image
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
              How can this be applied today?
              <Image
                className="delete-question"
                src="/images/cross-cancel.png"
                alt="cross"
                height="10"
                width="10"
              />
            </div>
          </div>
          <div className="qa-article-3">
            fdf dsfvdsjf vsjm jbdhsfdsfv dshjfv dshfv dsfjhv dsfjhdsv jdshfv
            dsfv dsfvdsjvf mdsvdfs vsf sfg dsjf vsjm jbdhsfdsfv dshjfv dshfv
            dsfjhv dsfjhdsv jdshfv dsfv dsfvdsjvf mdsvdfs vsf sfg dsjf vsjm
            jbdhsfdsfv dshjfv dshfv dsfjhv dsfjhdsv jdshfv dsfv dsfvdsjvf
            mdsvdfs vsf sfg
            <Image
              className="delete-question"
              src="/images/cross-cancel.png"
              alt="cross"
              height="10"
              width="10"
            />
          </div>
          <div className="qa-article-reactions">👍❤️2</div>
          <div className="qa-article-3">
            fdf dsfvdsjf vsjm fdg fdgfdsg fd fdsb vdwhn
            <Image
              className="delete-question"
              src="/images/cross-cancel.png"
              alt="cross"
              height="10"
              width="10"
            />
          </div>
          <div className="qa-article-reactions">🙏❗5</div>
          <h2 className="qa-heading-2">
            Text QA allows you to ask questions to the speaker in real-time!
            Worry no more about being unheard or shy to speak!
          </h2>
          <div className="qa-article-3">
            fdf dsfvdsjf vsjm
            <Image
              className="delete-question"
              src="/images/cross-cancel.png"
              alt="cross"
              height="10"
              width="10"
            />
          </div>
          <div className="qa-article-reactions">👏✅2</div>
          <div className="qa-article-3">
            fscsa
            <Image
              className="delete-question"
              src="/images/cross-cancel.png"
              alt="cross"
              height="10"
              width="10"
            />
          </div>
          <div className="qa-article-3">
            G jms bjcd, c,d? sfdsfv dshjfv dshfv dsfjhv dsfjhdsv jdshfv dsfv
            dsfvdsjvf mdsvdfs vsf sfg dsjf vsjm jbdhsfdsfv dshjfv dshfv dsfjhv
            dsfjhds
            <Image
              className="delete-question"
              src="/images/cross-cancel.png"
              alt="cross"
              height="10"
              width="10"
            />
          </div>
          <div className="qa-article-reactions">👍❤️7</div>
          <div className="qa-article-3">
            fdf dsfvdsjf vsjm fdg fdgfdsg fd fdsb vdwhn
            <Image
              className="delete-question"
              src="/images/cross-cancel.png"
              alt="cross"
              height="10"
              width="10"
            />
          </div>
          <div className="qa-article-3">
            fdf dsfvdsjf vsjm
            <Image
              className="delete-question"
              src="/images/cross-cancel.png"
              alt="cross"
              height="10"
              width="10"
            />
          </div>
          <div className="qa-article-reactions">✍️🥰4</div>
          <h2 className="qa-heading-2">
            Here, the speaker will answer your question or comment in real-time!
            benefit of using this service. say a benefit of using this service.
            say a benefit of using this service.
          </h2>
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
              <div className="intro-footer-body-text">What's New</div>
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
              {"  "}Text QA 2026ⓒ
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

export default intro;
