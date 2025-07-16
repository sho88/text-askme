import { RoomInformationComponent } from "../room/information";
import { useState } from "react";
import { ModalEventsOptionsComponent } from "../modal/modal-events-options";
import { useRouter } from "next/router";
// import "@/styles/globals.css";

import "@/styles/globals.css";

export default function RoomsList({ rooms = [], onRoomClick = () => {} } = {}) {
  const [showModal, setShowModal] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const router = useRouter();

  // events go here...
  const handleAddClick = (event) => {
    setShowModal(true);
    setSelectedEvent(event);
  };

  const handleModalClose = () => {
    setShowModal(false);
  };

  const handleModalAction = () => {
    router.push(`/event/${selectedEvent.id}/edit`);
  };

  return (
    <>
      {showModal && (
        <ModalEventsOptionsComponent
          onModalClose={handleModalClose}
          onModalAction={() => {
            console.log("hello");
            handleModalAction();
          }}
        />
      )}

      <div className="dashboard-body-container">
        <h1 className="text-white text-2xl font-oswald font-bold mt-10 mb-5">
          All Rooms
        </h1>

        {rooms.map((room) => (
          <article key={room.id} className="all-messages-article-1">
            <RoomInformationComponent
              {...room}
              // handleAddClick={handleAddClick}
              onRoomClick={onRoomClick}
            />
            <button
              className="dashboard-bottom-test"
              type=""
              // onTouchMove={handleAddClick}
              // onContextMenu={() => {
              onClick={() => {
                handleAddClick(room);
              }}
            >
              ☰
            </button>
          </article>
        ))}
      </div>
    </>
  );
}
