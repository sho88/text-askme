import { useEffect, useState } from "react";
import Pusher from "pusher-js";
import "./../live/style.css";
import { ProfilePictureImage, TextAreaInput } from "./../live/index.js";

import * as dotenv from "dotenv";

dotenv.config();

// Enable pusher logging - don't include this in production
Pusher.logToConsole = true;

export default function DashboardComponent() {
  return (
    <header className="head">
      <div className="head-container">
        <BurgerMenu />
        <div className="head-primary-info">
          <h1>Text Q&amp;A</h1>
          {/* <h3>last seen 4 mins ago</h3> */}
        </div>
        <WriteNewMessage />
      </div>
      <div className="divider"></div>
    </header>
  );
}

export const DashboardSearch = () => {
  return (
    <div className="dashboard-message">
      <div className="dashboard-search-container">
        <button className="message-attatch-button">
          <img src="/images/paper-clip-o.png"></img>
        </button>

        <TextAreaInput />
      </div>
    </div>
  );
};

export const DashboardBottomNav = () => {
  return (
    <div className="message">
      <div className="dashboard-nav-container">
        <button className="dashboard-bottom-nav-buttons" type="">
          <img src="/images/home.png"></img>
        </button>

        <button className="dashboard-bottom-nav-buttons" type="">
          <img src="/images/cube.png"></img>
        </button>

        <button className="dashboard-bottom-nav-buttons" type="">
          <img src="/images/plus.png"></img>
        </button>

        <button className="dashboard-bottom-nav-buttons" type="">
          <img src="/images/message.png"></img>
        </button>

        <button className="dashboard-bottom-nav-buttons" type="">
          <img src="/images/user.png"></img>
        </button>
      </div>
    </div>
  );
};

export const DashboardBody = (props) => {
  console.log(props);
  const [events, setEvents] = useState(Array.from({ length: 8 }));

  return (
    <div className="body-container">
      <h2>All messages</h2>
      {events.map((event) => (
        <article
          onClick={() => props.onHandleToggle(true)}
          className="all-messages-article-1"
        >
          <div className="all-messages-article">
            <DashBoardArticlePicture />
            <DashboardArticleInfo />
            <DashboardArticleTimeAgo />
          </div>
        </article>
      ))}
    </div>
  );
};

const DashBoardArticlePicture = () => {
  return (
    <picture className="dasboard-article-profile-picture">
      <img src="./../../images/ryan-young.jpeg"></img>
    </picture>
  );
};

const DashboardArticleInfo = () => {
  return (
    <div className="dasboard-article-info-container">
      <h2>Mark Davidson</h2>
      <p>
        fjhb dsfd smv dsc v dsn kjfdbv kjvsjd sbvdskm fdvfd v jbfndv fdm cmbv ds
        v 🔋
      </p>
    </div>
  );
};

const BurgerMenu = () => {
  return (
    <button className="dashboard-burger-line-button">
      <div className="dashboard-burger-line"></div>
      <div className="dashboard-burger-line"></div>
      <div className="dashboard-burger-line"></div>
    </button>
  );
};

const WriteNewMessage = () => {
  return (
    <button className="write-new-message">
      <img src="/images/pen.png"></img>
    </button>
  );
};

const DashboardArticleTimeAgo = () => {
  return (
    <div className="dashboard-article-container-time-ago">
      <time>8 mins ago</time>
    </div>
  );
};

export const DashboardImportantMessagesSection = () => {
  return (
    <div className="dashboard-important-body-container">
      <h2>Important</h2>
      <div className="dashboard-important-body-container-0">
        <ImportandChatContainer />
        <ImportandChatContainer2 />
        <ImportandChatContainer2 />
        <ImportandChatContainer2 />
      </div>
    </div>
  );
};

const ImportandChatContainer = () => {
  return (
    <div className="important-chat-container">
      <picture>
        <img src="images/sophie.png"></img>
      </picture>
      <p>Sophie A.</p>
    </div>
  );
};

const ImportandChatContainer2 = () => {
  return (
    <div className="important-chat-container-2">
      <picture>
        <img src="images/sophie.png"></img>
      </picture>
      <p>Sophie A.</p>
    </div>
  );
};
