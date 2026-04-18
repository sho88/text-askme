import Image from "next/image";

export const ModalEventsOptionsComponent = ({
  onModalClose,
  onModalAction,
  onDelete,
  onView,
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
                View Topic
              </button>

              <button className="form-button-style" onClick={onModalAction}>
                Edit Topic
              </button>

              <button className="form-button-style-delete" onClick={onDelete}>
                <b>Delete Topic</b>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
