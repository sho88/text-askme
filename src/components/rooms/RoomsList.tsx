import { RoomInformationComponent } from "../room/information";
import { useState } from "react";
import { ModalEventsOptionsComponent } from "../modal/modal-events-options";
import { useRouter } from "next/router";
import Image from "next/image";
import useEvents from "@/hooks/useEvents";
import "@/styles/globals.css";
import "@/styles/main.css";

type RoomListProps = {
  // eventsProps: Array<any>;
  eventsProp: any[];
  whenRoomClick: (roomId: string) => void;
}

type EventType = {
  _id: string;
}

export default function RoomsList({
  eventsProp = [],
  whenRoomClick,
}: RoomListProps) {
  const [showModal, setShowModal] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<null | EventType>(null);
  const router = useRouter();

  // Passing 'null' for room initially because the hook needs a room object, but here we are managing a LIST of rooms.

  const { deleteEventTwo } = useEvents(null, "rooms");

  const handleAddClick = (room: EventType) => {
    setShowModal(true);
    setSelectedEvent(room);
  };

  const handleModalClose = (shouldRefresh: boolean) => {
    if (shouldRefresh) {}
    // come back to this...
    setShowModal(false);
  };

  const handleEditAction = () => {
    const id = selectedEvent?._id;
    router.push(`/events/${id}/edit`);
  };

  const handleDeleteAction = async () => {
    const id = selectedEvent?._id;

    if (window.confirm("Are you sure you want to delete this topic?")) {
      try {
        await deleteEventTwo(id);
        alert("Topic Deleted");
        handleModalClose(true);
      } catch (err) {
        alert("Delete failed: " + err.message);
      } finally {
        router.reload();
      }
    }
  };

  const handleOnView = () => {
    router.push(`/events/${selectedEvent?._id}`);
  };

  return (
    <>
      {showModal && (
        <ModalEventsOptionsComponent
          onModalClose={() => handleModalClose(false)}
          onModalAction={handleEditAction}
          onDelete={handleDeleteAction}
          onView={handleOnView}
        />
      )}

      <div className="dashboard-body-container">
        {eventsProp.map((event) => (
          <article key={event._id} className="all-messages-article-1">
            <RoomInformationComponent
              {...event}
              id={event._id}
              handleClick={whenRoomClick}
            />
            <button
              className="dashboard-bottom-test"
              onClick={() => handleAddClick(event)}
            >
              <Image
                src="/images/fn-settings-6.png"
                width={15}
                height={14}
                alt="Settings"
                style={{ opacity: 0.45 }}
              />
            </button>
          </article>
        ))}
      </div>
    </>
  );
}
