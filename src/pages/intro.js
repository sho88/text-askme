import mainStyle from "@/styles/main.css";
import Image from "next/image";

const intro = () => {
  return (
    <div>
      <div>
        <div style={{ position: "relative", width: "100%" }}>
          <div>
            <button className="qa-button">Host Login</button>
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
              BRIDGE
              <br />
              THE
              <br />
              GAP
            </h1>
          </div>
        </div>
      </div>

      <div className="qa-article-1">
        <div className="qa-article-2">
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
          <h2 className="qa-heading-2">
            Just say what you want here. say a benefit of using this service
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
            fdf dsfvdsjf vsjm jbdhsfdsfv dshjfv dshfv dsfjhv dsfjhdsv jdshfv
            dsfv dsfvdsjvf mdsvdfs vsf sfg dsjf vsjm jbdhsfdsfv dshjfv dshfv
            dsfjhv dsfjhds
            <Image
              className="delete-question"
              src="/images/cross-cancel.png"
              alt="cross"
              height="10"
              width="10"
            />
          </div>
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
          <h2 className="qa-heading-2">
            Just say what you want here. say a benefit of using this service.
            say a benefit of using this service. say a benefit of using this
            service.
          </h2>
        </div>
      </div>
    </div>
  );
};

export default intro;
