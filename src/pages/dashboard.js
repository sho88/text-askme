import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";
import { DashboardBottomNav } from "@/components/dashboard/DashboardBottomNav";
import { DashboardSearch } from "@/components/dashboard/DashboardSearch";
import { useRooms } from "@/hooks/rooms";
import mainStyle from "@/styles/main.css";
import RoomsList from "@/components/rooms/RoomsList";
import HeaderComponent from "@/components/header";

export default function DashboardPageComponent() {
  // hooks go here...
  const router = useRouter();
  const { rooms } = useRooms();

  // state related properties...
  const [term, setTerm] = useState("");

  // utility functions
  const filteredRooms = useMemo(
    function filteredRooms() {
      if (term.trim().length < 1) return rooms;
      return rooms.filter(
        (room) =>
          room.description
            .toLocaleLowerCase()
            .includes(term.toLocaleLowerCase()) ||
          room.name.toLocaleLowerCase().includes(term.toLocaleLowerCase())
      );
    },
    [rooms, term]
  );

  // events go here...
  function handleRoomClick(id) {
    return router.push(`/events/${id}`);
  }

  function handleInput(input) {
    setTerm(input);
  }

  // return the renderer...
  return (
    <div>
      <div className={mainStyle["entire-dashboard-page"]}>
        <HeaderComponent />

        <DashboardSearch whenInput={handleInput} />

        <RoomsList rooms={filteredRooms} onRoomClick={handleRoomClick} />

        <DashboardBottomNav />
      </div>
    </div>
  );
}
