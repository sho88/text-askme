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

    if (!file) return;

    setImageFile(file);
    console.log(`The image file is:`, file)
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    
    // if there is an image file, then upload it to the form data
    if (imageFile) formData.append("image", imageFile);
    

    // create the data, in the database
    try {
      await createData("/rooms", formData, {
        name: "Biblical Hebrew Challenge",
        description: "Read through Genesis 1-6 in Biblical Hebrew.",
      })
  
      console.log("Its working");
      // now upload the image to firebase...
      uploadImageToFirebase({ title, description, imageFile });
      setLoading(false);
    } catch (error) {
      // in case there is an error
      console.error("Error creating data:", error);
    } finally {
      // then trigger the function prop to close this modal...
      setLoading(false);
    }
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

          <hr />

          <pre>{JSON.stringify({ title, description }, null, 2)}</pre>
        </form>
      </div>
    </div>
  );
};
