import { useEffect, useRef, useState } from "react";
import "./style.css";
import { RandomButton } from "./RandomButton";

export const Head = (props) => {
  return (
    <header className="head">
      <div className="head-container">
        <div
          className="head-button"
          onClick={() => props.onHandleToggle(false)}
        >
          <img src="/images/left-arrow.png"></img>
        </div>
        <div className="head-primary-info">
          <h2>Mark Davidson</h2>
          <h3>last seen 3 mins ago</h3>
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
      <img
        className={`head-profile-picture1${
          !showImage ? " head-profile-picture--hide" : ""
        }`}
        src="/images/ryan-young.jpeg"
      ></img>
    </figure>
  );
};

export const ProFilePicture = () => {
  return (
    <picture className="profile-picture-full-size">
      <img
        src="/images/ryan-young.jpeg"
        alt="Profile Picture"
        srcSet="/images/ryan-young.jpeg 1x,
                            /images/ryan-young.jpeg 2x,
                            /images/ryan-young.jpeg 3x"
      ></img>
    </picture>
  );
};

export const Input = () => {
  return (
    <div className="message">
      <div className="message-container">
        <button className="message-attatch-button">
          <img src="/images/paper-clip-o.png"></img>
        </button>

        <TextAreaInput />

        <button className="message-submit-button" type="submit">
          <img src="/images/paper-plane-o.png"></img>
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
          placeholder="Type here..."
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
        <img
          className="sent-received-the-image"
          src="/images/purple-landscape.jpg"
        ></img>
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
            Good afternoon Sir! I thoroughly enjoyed your speech today. I have
            been impacted greatly 🔥🔥🔥. When would you be speaking on the
            topic of Esssenes next? Robert
          </p>
        </div>
        <MessageTime3 />
      </div>

      <div className="body-sent-messages-1">
        <div className="body-sent-messages">
          <p>
            Good morning Rob! I will be speaking on the topic next Wednesday.
            Please tune into my past talks for a more compregensive
            understanding 🙏
          </p>
          <MessageShape />
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
            But into todays talk, it wasn't quite clear to me how they differed
            from the Scribes. I mean, they valued highly ancient scriptures
            right?
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
          <p>
            🤔 That's a very valid point, as I didn't expound on it in todays
            session
          </p>
          <MessageShape />
        </div>
        <div className="sent-time-container">
          <time className="sent-time-2">12:08</time>
        </div>
      </div>

      <div className="body-sent-messages-1">
        <div className="body-sent-messages">
          <p>
            The Essenes were a Jewish "sect". Some were celibate, disdained
            marriage, and adopted children. The scribes adopted a different
            lifestyle.
          </p>
          <MessageShape />
        </div>
        <div className="sent-time-container">
          <time className="sent-time-2">12:09</time>
        </div>
      </div>

      <div className="body-received-messages-1">
        <div className="body-received-messages">
          <MessageShape2 />
          <p>
            Ooh I cannot wait to hear more on what you have to say regarding the
            topic! I feel that we need to labour this topic much more in our
            services, as it's often neglected 🤔
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
          <p>👏👏👏👏👏</p>
          <MessageShape />
        </div>
        <div className="sent-time-container">
          <time className="sent-time-2">15:39</time>
        </div>
      </div>

      <div className="body-sent-messages-1">
        <div className="body-sent-messages">
          <p>
            You are absolutely right sir! But how are doing in general? Have you
            been coming to our services with friends and/of family?
          </p>
          <MessageShape />
        </div>
        <div className="sent-time-container">
          <time className="sent-time-2">15:40</time>
        </div>
      </div>

      <div className="body-received-messages-1">
        <div className="body-received-messages">
          <MessageShape2 />
          <p>
            So me and my Fiancée have been looking for a community like this. We
            just happen to come across your Word on Social Media. Instagram to
            be exact
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
