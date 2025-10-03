import { useParams } from 'next/navigation'
import { useEffect } from "react";
import { readDocument } from "@/utils/firestore";

import { DashboardBottomNav } from "@/components/dashboard/DashboardBottomNav";
import HeaderComponent from "@/components/header";
import useRoom from "@/hooks/room";

/**
 * Import the stylesheets here...
*/
import mainStyle from "@/styles/main.css";
import "@/styles/event.css";
import "@/styles/globals.css";

export async function getServerSideProps({ params }) {
  const room = await readDocument("rooms", params.id)
  return { props: { room } }
}


export default function EventSingleComponent({ room }) {

  return (
    <div>
      <div className={mainStyle["entire-dashboard-page"]}>
        <HeaderComponent />

        <div className="event">
          <div className="event__header">
            <h1>{room.title}</h1>
          </div>

          <div className="event__image">
            <img loading="lazy" alt={room.title} src={room.image} />
          </div>

          <div className="event__content">
            <p>{room.description}</p>
          </div>

          <div className="event__footer">
            <p>Footer information goes here...</p>
          </div>

          <div className="event__messages">
            <p>The event messages will go down here...</p>
          </div>
        </div>

        <DashboardBottomNav />
      </div>
    </div>
  )

}
