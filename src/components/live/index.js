import { useEffect, useRef, useState } from "react";
import "./style.css";
import { RandomButton } from "./RandomButton";
import Image from "next/image";

export const Head = (props) => {
  return (
    <header className="head">
      <div className="head-container">
        <div
          className="head-button"
          onClick={() => props.onHandleToggle(false)}
        >
          <Image alt="" src="/images/left-arrow.png" />
        </div>
        <div className="head-primary-info">
          <h2>Text Q&amp;A</h2>
          {/* <h3>last seen 3 mins ago</h3> */}
        </div>
        <ProfilePictureImage />
      </div>
      <div className="divider"></div>
    </header>
  );
};

export const ProfilePictureImage = () => {
  const [showImage, setShowImage] = useState(true);

  const clickProfilePucFunction = () => {
    setShowImage(!showImage);
  };

  return (
    <figure onClick={clickProfilePucFunction} className="head-profile-picture">
      <Image alt="" 
        className={`head-profile-picture1${
          !showImage ? " head-profile-picture--hide" : ""
        }`}
        src="/images/green.jpg"
      />
    </figure>
  );
};

export const ProFilePicture = () => {
  return (
    <picture className="profile-picture-full-size">
      <Image
        src="/images/ryan-young.jpeg"
        alt="Profile Picture"
        srcSet="/images/ryan-young.jpeg 1x,
                            /images/ryan-young.jpeg 2x,
                            /images/ryan-young.jpeg 3x"
      />
    </picture>
  );
};

export const Input = () => {
  return (
    <div className="message">
      <div className="message-container">
        <button className="message-attatch-button">
          <Image alt=""  src="/images/paper-clip-o.png" />
        </button>

        <TextAreaInput />

        <button className="message-submit-button" type="submit">
          <Image alt=""  src="/images/paper-plane-o.png" />
        </button>
      </div>
    </div>
  );
};

const Filler = () => {
  return <div className="filler"></div>;
};

export const TextAreaInput = () => {
  const textAreaRef2 = useRef(null);
  const [val, setVal] = useState("");
  const handleChange2 = (e) => {
    setVal(e.target.value);
  };

  useEffect(() => {
    textAreaRef2.current.style.height = "auto";
    textAreaRef2.current.style.height =
      textAreaRef2.current.scrollHeight + "px";
  }, [val]);

  return (
    <div className="cover1">
      <div className="cover2">
        <textarea
          className="textarea1"
          placeholder="Search by name, message, etc..."
          value={val}
          onChange={handleChange2}
          rows="1"
          ref={textAreaRef2}
        ></textarea>
      </div>
    </div>
  );
};

export const MessageTime = () => {
  return (
    <span>
      <time className="sent-time">08:45</time>
    </span>
  );
};

export const MessageTime2 = () => {
  return (
    <div className="sent-time-container">
      <time className="sent-time-2">11:51</time>
    </div>
  );
};

export const MessageTime3 = () => {
  return (
    <div className="sent-time-container-2">
      <time className="sent-time-2">11:46</time>
    </div>
  );
};

export const MessageShape = () => {
  return <span className="triangle"></span>;
};

export const MessageShape2 = () => {
  return <span className="triangle2"></span>;
};

const MessageSentReceivedImage = () => {
  return (
    <picture>
      <div>
        <Image alt="" 
          className="sent-received-the-image"
          src="/images/purple-landscape.jpg"
        />
      </div>
    </picture>
  );
};

export const Body = () => {
  /* REFER TO backup.js */
  return (
    <div className="body-container">
      <div className="body-received-messages-1">
        <div className="body-received-messages">
          <MessageShape2 />
          <p>
            Does current world events parallel with ancient writings? If so,
            which writing or scroll would be easier for the common person to
            understand, interpret and be able to teach from? 🤔
          </p>
        </div>
        <MessageTime3 />
      </div>

      <div className="body-sent-messages-1">
        <div className="body-sent-messages">
          <MessageShape />
          <p>
            How could I really help those in need? And how do I ensure that my
            hard earned money would go towards those suffering the most and not
            with many or no one publiciznig my deeds? 🙏🙏
          </p>
        </div>
        <div className="sent-time-container">
          <time className="sent-time-2">11:49</time>
        </div>
      </div>

      <div className="body-received-messages-1">
        <div className="body-received-messages">
          <MessageShape2 />
          <p>
            Thank you sir, I sure will 😊
            <br />
            Please elaborate on your point on the organizations influence on the
            rest of the world or industry. Much appreciated. Many thanks.
          </p>
        </div>
        <div>
          <div className="sent-time-container-2">
            <time className="sent-time-2">12:05</time>
          </div>
        </div>
      </div>

      <div className="body-sent-messages-1">
        <div className="body-sent-messages">
          {/* <MessageShape /> */}
          <p>Could I find your teachings online? If so, where?</p>
        </div>
        <div className="sent-time-container">
          <time className="sent-time-2">12:09</time>
        </div>
      </div>

      <div className="body-received-messages-1">
        <div className="body-received-messages">
          <MessageShape2 />
          <p>
            What would you say are some of the best communities to join, if one
            wants to be active in making a real change?
          </p>
        </div>
        <div>
          <div className="sent-time-container-2">
            <time className="sent-time-2">15:33</time>
          </div>
        </div>
      </div>

      <div className="body-sent-messages-1">
        <div className="body-sent-messages">
          {/* <MessageShape /> */}
          <p>Do you do podcasts?</p>
        </div>
        <div className="sent-time-container">
          <time className="sent-time-2">15:40</time>
        </div>
      </div>

      <div className="body-received-messages-1">
        <div className="body-received-messages">
          <MessageShape2 />
          <p>
            So me and my Fiancée have been looking for conversations like this.
            But could you please advise on your first point?
          </p>
        </div>
        <div>
          <div className="sent-time-container-2">
            <time className="sent-time-2">16:19</time>
          </div>
        </div>
      </div>
    </div>
  );
};
