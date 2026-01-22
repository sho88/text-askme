import { RoomInformationComponent } from "../room/information";
import { useState } from "react";
import { ModalEventsOptionsComponent } from "../modal/modal-events-options";
import { useRouter } from "next/router";
import Image from "next/image";
import { deleteDocument } from "@/utils/api";
import "@/styles/globals.css";

export default function RoomsList({
  rooms = [],
  whenRoomClick,
  onNewDataCreated,
}) {
  const [showModal, setShowModal] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const router = useRouter();

  const handleAddClick = (event) => {
    setShowModal(true);
    setSelectedEvent(event);
  };

  const handleModalClose = (shouldRefresh) => {
    setShowModal(false);
    if (shouldRefresh && onNewDataCreated) {
      onNewDataCreated();
    }
  };

  const handleEditAction = () => {
    const id = selectedEvent?._id || selectedEvent;
    router.push(`/events/${id}/edit`);
  };

  // THE DELETE LOGIC
  const handleDeleteAction = async () => {
    const id = selectedEvent?._id || selectedEvent;
    if (window.confirm("Are you sure you want to delete this room?")) {
      const success = await deleteDocument("rooms", id);
      if (success) {
        handleModalClose(true); // Close and refresh dashboard
      } else {
        alert("Delete failed.");
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
