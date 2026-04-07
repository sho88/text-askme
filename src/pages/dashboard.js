import { useRouter } from "next/router";
import { useEffect, useMemo, useState } from "react";
import { DashboardBottomNav } from "@/components/dashboard/DashboardBottomNav";
import { DashboardSearch } from "@/components/dashboard/DashboardSearch";
import { useEvents } from "@/hooks/useEvents";
import RoomsList from "@/components/rooms/RoomsList";
import HeaderComponent from "@/components/header";
import EmptyDashboard from "@/components/dashboard/EmptyDashboard";
import mainStyle from "@/styles/main.css";
import { auth0 } from "@/lib/auth0";
import GuestHeader from "@/components/header/GuestHeader";
import ReduceBrowserSize from "./ReduceBrowsingSize";

export const getServerSideProps = async (context) => {
  const { req, res } = context;

  try {
    const theSession = await auth0.getSession(req, res);
    return {
      props: {
        session: theSession || null,
      },
    };
  } catch (err) {
    console.err(err, "Operation failed.");
    return { props: { session: null } };
  }
};

export default function DashboardPageComponent({ session }) {
  const [user, setUser] = useState(session?.user || null);
  const router = useRouter();
  const { eventId } = router.query;
  const { events } = useEvents(eventId, user);
  const [term, setTerm] = useState("");

  useEffect(() => {
    setUser(session?.user || null);
  }, [session]);

  const filteredRooms = useMemo(() => {
    const reverseOrder = [...events].reverse();

    if (term.trim().length < 1) {
      return reverseOrder;
    } else {
      return reverseOrder.filter((room) => {
        return (
          room.description?.toLowerCase().includes(term.toLowerCase()) ||
          room.title?.toLowerCase().includes(term.toLowerCase())
        );
      });
    }
  }, [events, term]);

  const handleInput = (input) => setTerm(input);
  const handleRoomClick = (id) => router.push(`/events/${id}`);

  return (
    <div>
      <ReduceBrowserSize />
      {user ? (
        <div>
          <HeaderComponent />
          <DashboardSearch whenInput={handleInput} />
          {events.length > 0 ? (
            <RoomsList
              eventsProp={filteredRooms}
              whenRoomClick={handleRoomClick}
            />
          ) : (
            <EmptyDashboard />
          )}

          <DashboardBottomNav />
        </div>
      ) : (
        <div>
          <GuestHeader />
          <div className="dashboard-body-container">
            <div className="event__header">
              <br />
              <h1>Woah... ⛔✋</h1>
            </div>
            <br />
            <p>You will need to be signed in to get full access to Text QA.</p>
            <br />
            <button>
              <a href="/auth/login?returnTo=/dashboard">
                Login or sign up here
              </a>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
