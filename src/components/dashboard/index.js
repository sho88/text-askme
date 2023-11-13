import { useEffect, useState } from "react";
import Pusher from "pusher-js";
import "./../live/style.css";
import { ProfilePictureImage, TextAreaInput } from "./../live/index.js";
import { DashboardBottomNav } from "./DashboardBottomNav";
import { BurgerMenu } from "./BurgerMenu";
import { DashboardArticleTimeAgo } from "./DashboardArticleTimeAgo";
import { DashboardArticleInfo } from "./DashboardArticleInfo";
import { DashBoardArticlePicture } from "./DashboardArticlePicture";
import { WriteNewMessage } from "./WriteNewMessage";
import { DashboardSearch } from "./DashboardSearch";

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

export const DashboardBody = (props) => {
  console.log(props);
  const [events, setEvents] = useState(Array.from({ length: 8 }));

  return (
    <div className="dashboard-body-container">
      <h2>All messages</h2>
      {events.map((event) => (
        <article
          onClick={() => props.onHandleToggle(true)}
          className="all-messages-article-1"
        >
          <div className="all-messages-article">
            {/* <DashBoardArticlePicture /> */}
            <DashboardArticleInfo />
            {/* <DashboardArticleTimeAgo /> */}
          </div>
        </article>
      ))}
    </div>
  );
};
