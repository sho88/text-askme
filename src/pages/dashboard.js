import { useRouter } from "next/router";
import { useEffect, useMemo, useState } from "react";
import { DashboardBottomNav } from "@/components/dashboard/DashboardBottomNav";
import { DashboardSearch } from "@/components/dashboard/DashboardSearch";
import { useRooms } from "@/hooks/rooms";
import RoomsList from "@/components/rooms/RoomsList";
import HeaderComponent from "@/components/header";
import EmptyDashboard from "@/components/dashboard/EmptyDashboard"; // New Import
import mainStyle from "@/styles/main.css";
import { auth0 } from "@/lib/auth0";
import { asyncify } from "@/utils";
import GuestHeader from "@/components/header/GuestHeader";
import ReduceBrowserSize from "./ReduceBrowsingSize";

export const getServerSideProps = async (context) => {
  const [error, session] = await asyncify(
    auth0.getSession(context.req, context.res)
  );

  if (error) {
    console.error("Error fetching session:", error);
    return { props: { session: null } };
  }

  return { props: { session: session || null } };
};

export default function DashboardPageComponent({ session }) {
  const [user, setUser] = useState(session?.user || null);
  const router = useRouter();
  const { eventId } = router.query;
  const { rooms } = useRooms(eventId, user); // Pass user to filter by owner
  const [term, setTerm] = useState("");

  useEffect(() => {
    setUser(session?.user || null);
  }, [session]);

  const filteredRooms = useMemo(() => {
    // Slice(0) creates a copy so we don't mutate the original array
    const reverseOrder = [...rooms].reverse();

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
  }, [rooms, term]);

  const handleInput = (input) => setTerm(input);
  const handleRoomClick = (id) => router.push(`/events/${id}`);

  return (
    <div>
      <ReduceBrowserSize />
      {user ? (
        <div>
          <HeaderComponent />
          <DashboardSearch whenInput={handleInput} />
          {rooms.length > 0 ? (
            <RoomsList rooms={filteredRooms} whenRoomClick={handleRoomClick} />
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
