import { RoomInformationComponent } from "../room/information";
import { useState } from "react";
import { ModalEventsOptionsComponent } from "../modal/modal-events-options";
import { useRouter } from "next/router";
import Image from "next/image";
import useEvents from "@/hooks/useEvents";
import "@/styles/globals.css";
import "@/styles/main.css";

export default function RoomsList({
  rooms = [],
  whenRoomClick,
  onNewDataCreated,
}) {
  const [showModal, setShowModal] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const router = useRouter();

  // 1. Initialize the hook
  // We pass 'null' for room initially because the hook needs a room object,
  // but here we are managing a LIST of rooms.

  const { deleteEventTwo } = useEvents(null, "rooms");

  const handleAddClick = (room) => {
    setShowModal(true);
    setSelectedEvent(room);
  };

  const handleModalClose = (shouldRefresh) => {
    setShowModal(false);
    if (shouldRefresh && onNewDataCreated) {
      onNewDataCreated();
    }
  };

  const handleEditAction = () => {
    const id = selectedEvent?._id;
    router.push(`/events/${id}/edit`);
  };

  // 2. USE THE HOOK METHOD HERE
  const handleDeleteAction = async () => {
    const id = selectedEvent?._id;

    if (window.confirm("Are you sure you want to delete this tpoic?")) {
      try {
        // Use the function from your useEvents hook
        await deleteEventTwo(id);

        // Close modal and tell the parent to refresh the list
        handleModalClose(true);
      } catch (err) {
        alert("Delete failed: " + err.message);
      }
    }
  };

  return (
    <>
      {showModal && (
        <ModalEventsOptionsComponent
          onModalClose={() => handleModalClose(false)}
          onModalAction={handleEditAction}
          onDelete={handleDeleteAction}
          onView={() => router.push(`/events/${selectedEvent?._id}`)} // Add this line!
        />
      )}

      <div className="dashboard-body-container">
        {rooms.map((room) => (
          <article key={room._id} className="all-messages-article-1">
            <RoomInformationComponent
              {...room}
              id={room._id}
              handleClick={whenRoomClick}
            />
            <button
              className="dashboard-bottom-test"
              onClick={() => handleAddClick(room)}
            >
              <Image
                src="/images/fn-settings-6.png"
                width={15}
                height={14}
                alt="Settings"
                style={{ opacity: 0.5 }}
              />
            </button>
          </article>
        ))}
      </div>
    </>
  );
}

// 6 23 49
