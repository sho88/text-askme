import { useRouter } from "next/router";
import { useEffect, useMemo, useState } from "react";
import { DashboardBottomNav } from "@/components/dashboard/DashboardBottomNav";
import { DashboardSearch } from "@/components/dashboard/DashboardSearch";
import { useRooms } from "@/hooks/rooms";
import mainStyle from "@/styles/main.css";
import RoomsList from "@/components/rooms/RoomsList";
import HeaderComponent from "@/components/header";

export default function DashboardPageComponent() {
  // hooks go here...
  const router = useRouter();
  const { eventId } = router.query; // Grabs the eventId passed from the PIN page

  // Updated: Destructure refreshRooms but keep the logic exactly as it was
  // Pass eventId to the hook to fetch only the room matching the PIN result
  const { rooms } = useRooms(eventId);
  const [term, setTerm] = useState("");

  // the equivalent to computed properties...for expensive calculations...
  const filteredRooms = useMemo(() => {
    // 1. Ensure we have an array
    const roomList = Array.isArray(rooms) ? rooms : [];

    // 2. Create a shallow copy and reverse it (Newest First)
    // We use [...roomList] because .reverse() modifies the original array
    const sortedRooms = [...roomList].reverse();

    if (term.trim().length < 1) {
      return sortedRooms;
    } else {
      const filtered = sortedRooms.filter((callBack) => {
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
