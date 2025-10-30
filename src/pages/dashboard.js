import { useRouter } from "next/navigation";
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
  const { rooms } = useRooms();
  const [term, setTerm] = useState("");

  // the equivalent to computed properties...for expensive calculations...
  const filteredRooms = useMemo(() => {
    if (term.trim().length < 1) return rooms;

    const filter = rooms.filter((room) => 
      room.description.toLocaleLowerCase().includes(term.toLocaleLowerCase()) ||
      room.title.toLocaleLowerCase().includes(term.toLocaleLowerCase())
    );

    return filter;
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

        <RoomsList rooms={filteredRooms} whenRoomClick={handleRoomClick} />

        <DashboardBottomNav />
      </div>
    </div>
  );
}
