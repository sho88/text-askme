import { useRouter } from "next/router";
import { useEffect, useMemo, useState } from "react";
import { DashboardBottomNav } from "@/components/dashboard/DashboardBottomNav";
import { DashboardSearch } from "@/components/dashboard/DashboardSearch";
import { useRooms } from "@/hooks/rooms";
import mainStyle from "@/styles/main.css";
import RoomsList from "@/components/rooms/RoomsList";
import HeaderComponent from "@/components/header";
import { Auth0Provider } from "@auth0/auth0-react";

{
  /* <Auth0Provider
    domain="YOUR_AUTH0_DOMAIN"
    clientId="YOUR_AUTH0_CLIENT_ID"
    authorizationParams={{
      redirect_uri: window.location.origin
    }}
  >
    <App />
  </Auth0Provider> */
}

export default function DashboardPageComponent() {
  // hooks go here...
  const router = useRouter();
  const { eventId } = router.query; // Grabs the eventId passed from the PIN page

  // Pass eventId to the hook to fetch only the room matching the PIN result
  const { rooms } = useRooms(eventId);
  const [term, setTerm] = useState("");

  // the equivalent to computed properties...for expensive calculations...
  const filteredRooms = useMemo(() => {
    // no need to make another const, as rooms is already an array. we made sure of this in the custom hook itself.
    const reverseOrder = rooms.reverse();

    if (term.trim().length < 1) {
      return reverseOrder;
    } else {
      const filtered = reverseOrder.filter((callBack) => {
        return (
          callBack.description
            ?.toLocaleLowerCase()
            .includes(term.toLocaleLowerCase()) ||
          callBack.title?.toLocaleLowerCase().includes(term.toLocaleLowerCase())
        );
      });
      return filtered;
    }
  }, [rooms, term]);

  // events go here...
  const handleInput = (input) => {
    setTerm(input);
  };

  const handleRoomClick = (id) => {
    return router.push(`/events/${id}`);
  };

  // return the renderer...
  return (
    <div>
      <div className={mainStyle["entire-dashboard-page"]}>
        <HeaderComponent />
        <DashboardSearch whenInput={handleInput} />
        {/* Updated: Added onNewDataCreated prop only */}
        <RoomsList
          rooms={filteredRooms}
          whenRoomClick={handleRoomClick}
          // onNewDataCreated={refreshRooms}
        />
        <DashboardBottomNav />
      </div>
    </div>
  );
}
