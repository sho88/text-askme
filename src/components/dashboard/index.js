import { useState } from "react";
import "./../live/style.css";
import { BurgerMenu } from "./BurgerMenu";
import { DashboardArticleInfo } from "./DashboardArticleInfo";
import { WriteNewMessage } from "./WriteNewMessage";

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
  const [events, setEvents] = useState([
    {
      __id: 1,
      header: 'Eugene Davidson on World Peace',
      body: `
        Please expand on Joe Biden’s contributions to the rest of the world.
        Please explain in a b share more on what you mean 🤔
      `
    },

    {
      __id: 2,
      header: 'Israel events Q and A',
      body: `
        Why is it important for the people of Israel to dwell in the land when there is no theocracy?
      `
    },
  ]);

  return (
    <div className="dashboard-body-container">
      <h2>All messages</h2>

      {events.map((event) => (
        <article
          key={event.__id}
          onClick={() => props.onHandleToggle(true)}
          className="all-messages-article-1"
        >
          <div className="all-messages-article">
            <DashboardArticleInfo event={event} />
          </div>
        </article>
      ))}
    </div>
  );
};
