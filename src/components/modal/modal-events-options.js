import Image from "next/image";

export const ModalEventsOptionsComponent = ({
  onModalClose,
  onModalAction,
}) => {
  const handleSubmit = (e) => {
    e.preventDefault();

    onModalAction();
    // router.push("/event/" + params.id + "/edit");
  };

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

        <form onSubmit={handleSubmit} className="form">
          {/* <div className="form__control">
              <label>
                <input
                  name="title"
                  className="form-input-style"
                  placeholder="Edit title"
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
              </label>
            </div>
  
            <div className="form__control">
              <label>
                <textarea
                  className="form-input-style"
                  name="description"
                  placeholder="Change password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                ></textarea>
              </label>
            </div> */}

          <div className="form__control">
            <label>
              <button className="form-button-style" type="submit">
                Edit Event
              </button>
              <button className="form-button-style">Delete Event</button>
            </label>
          </div>
        </form>
      </div>
    </div>
  );
};
