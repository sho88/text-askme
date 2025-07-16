import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import "./style.css";

export const Head = (props) => {
  return (
    <header className="head">
      <div className="head-container">
        <div
          className="head-button"
          onClick={() => props.onHandleToggle(false)}
        >
          <Image src="/images/left-arrow.png" alt="" height="128" width="128" />
        </div>
        <div className="head-primary-info">
          <h2>{props.title ?? "Text Q&A"}</h2>
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

  return (
    <figure
      onClick={() => setShowImage(!showImage)}
      className="head-profile-picture"
    >
      <Image
        className={`head-profile-picture1${
          !showImage ? " head-profile-picture--hide" : ""
        }`}
        src="/images/green.jpg"
        alt=""
        height="200"
        width="200"
      />
    </figure>
  );
};

export const ProFilePicture = () => {
  return (
    <picture className="profile-picture-full-size">
      <img
        src="/images/ryan-young.jpeg"
        alt="Profile Picture"
        srcSet="/images/ryan-young.jpeg 1x, /images/ryan-young.jpeg 2x, /images/ryan-young.jpeg 3x"
      ></img>
    </picture>
  );
};

export const Input = () => {
  return (
    <div className="message">
      <div className="message-container">
        <button className="message-attatch-button">
          <Image
            src="/images/paper-clip-o.png"
            alt=""
            height="128"
            width="128"
          />
        </button>

        <TextAreaInput />

        <button className="message-submit-button" type="submit">
          <Image
            src="/images/paper-plane-o.png"
            alt=""
            height="128"
            width="128"
          />
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
