import { useState, useRef } from "react";
import "./style.css";
import Image from "next/image";
import { createData } from "@/utils/database";
import { uploadImageToFirebase } from "@/utils/storage";

export const ModalComponent = ({ onModalClose }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const fileInputRef = useRef(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    console.log(file);
    if (file) {
      setImageFile(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData();
    formData.append("name", title);
    formData.append("description", description);
    if (imageFile) {
      formData.append("image", imageFile);
    }

    createData("/rooms", formData, {
      name: "Biblical Hebrew Challenge",
      description: "Read through Genesis 1-6 in Biblical Hebrew.",
    })
      .then(() => {
        console.log("Its working");
        uploadImageToFirebase({ name, description, imageFile });
        setLoading(false);
        onModalClose();
      })
      .catch((error) => {
        console.error("Error creating data:", error);
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
                required
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
                placeholder="Enter description"
                required
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              ></textarea>
            </label>
          </div>

          <div className="form__control">
            <label htmlFor="image-upload">
              <button
                className="upload-button-style"
                type="button"
                onClick={() => fileInputRef.current.click()}
                disabled={loading}
              >
                Upload Image ⬆
              </button>
            </label>
            <input
              id="image-upload"
              type="file"
              accept="image/*"
              ref={fileInputRef}
              onChange={handleImageChange}
              style={{ display: "none" }}
            />
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
