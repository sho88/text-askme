import { RoomInformationComponent } from "../room/information";
import { useState } from "react";
import { ModalEventsOptionsComponent } from "../modal/modal-events-options";
import { useRouter } from "next/router";
import Image from "next/image";

import "@/styles/globals.css";

export default function RoomsList({ rooms = [] } = {}) {
  const [showModal, setShowModal] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const router = useRouter();

  // events go here...
  const handleAddClick = (event) => {
    setShowModal(true);
    setSelectedEvent(event);
  };

  const handleClick = (roomID) => {
    router.push(`/event/${roomID}`);
  };

  const handleModalClose = () => {
    setShowModal(false);
  };

  const handleModalAction = () => {
    router.push(`/event/${selectedEvent}/edit`);
  };

  return (
    <>
      {showModal && (
        <ModalEventsOptionsComponent
          onModalClose={handleModalClose}
          onModalAction={handleModalAction}
        />
      )}

      <div className="dashboard-body-container">
        {/* <h1 className="text-navy text-2xl font-oswald font-bold mt-10 mb-5">
          All Rooms
        </h1> */}

        {rooms.map((room) => (
          <article key={room.id} className="all-messages-article-1">
            <RoomInformationComponent {...room} handleClick={handleClick} />
            <button
              className="dashboard-bottom-test"
              type=""
              onClick={() => {
                handleAddClick(room);
              }}
            >
              <Image
                src="/images/fn-settings-4.png"
                width={15}
                height={14}
                alt="Picture of the author"
              />
            </button>
          </article>
        ))}
      </div>
    </>
  );
}
