import Image from "next/image";

export const ModalEventsOptionsComponent = ({
  onModalClose,
  onModalAction, // This is your 'Edit' action
  onDelete, // New prop for deleting
  onView, // New prop for viewing
}) => {
  return (
    <div className="modal">
      <div className="modal__content">
        <button className="modal__close" onClick={onModalClose}>
          <Image
            alt="x"
            src="/images/cross-cancel.png"
            height="18"
            width="18"
          />
        </button>

        <div className="form">
          <div className="form__control">
            <div
              className="button-stack"
              style={{ display: "flex", flexDirection: "column", gap: "10px" }}
            >
              <button className="form-button-style" onClick={onView}>
                View Event
              </button>

              <button className="form-button-style" onClick={onModalAction}>
                Edit Event
              </button>

              <button
                className="form-button-style"
                style={{ backgroundColor: "#ff4d4d", color: "black" }}
                onClick={onDelete}
              >
                Delete Event
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
