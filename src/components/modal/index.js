import { useState } from "react";
import "./style.css";
import Image from "next/image";
import { createData } from "@/utils/database";

export const ModalComponent = ({ onModalClose }) => {
  const [title, setTitle] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    setLoading(true);

    createData("/rooms", {
      name: "Biblical Hebrew Challenge",
      description: "Read through Genesis 1-6 in Biblical Hebrew.",
    }).then(() => {
      console.log("Its working");
      setLoading(false);
    });
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
          <div className="form__control">
            <label>
              <input
                name="title"
                className="form-input-style"
                placeholder="Enter your title"
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
                placeholder="Enter password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              ></textarea>
            </label>
          </div>

          <div className="form__control">
            <label>
              {!loading && (
                <button className="form-button-style" type="submit">
                  Create Event
                </button>
              )}
              {loading && (
                <button className="form-button-style" type="submit" disabled>
                  Loading
                </button>
              )}
            </label>
          </div>
        </form>
      </div>
    </div>
  );
};
