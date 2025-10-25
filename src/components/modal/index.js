import { useState, useRef, useEffect } from "react";
import "./style.css";
import Image from "next/image";
import { uploadImageToFirebase } from "@/utils/storage";
import {
  createDocument,
  updateDocument,
  deleteDocument,
} from "@/utils/firestore";

export const ModalComponent = ({ onModalClose }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const fileInputRef = useRef(null);

  // events will go here ==========================================================================

  /**
   * WHEN the user has made a change to the image (via drag and drop or upload)
   * IF the file doesn't exist...THEN ignore (by returning)
   * OTHERWISE set the image "state"
   */
  const handleImageChange = (e) => {
    const file = e.target.files[0];

    if (!file) return;

    setImageFile(file);
    console.log(`The image file is:`, file);
  };

  /**
   * WHEN the user submits the form
   * THEN set the loading "state" to true
   * THEN prepare the FormData object and populate it with the title, description and image "state"
   */
  const handleSubmit = async (e) => {
    e.preventDefault();

    // FIRST, set the loading "state" to true to disable the button below...
    setLoading(true);

    // THEN, take the form element fields, and populate the FormData object...
    const formData = new FormData(e.target);

    let newEvent = null; // Declaring outside try block so it's accessible in catch

    try {
      // AFTERWARDS, create the data, in the database...
      newEvent = await createDocument("rooms", {
        title: formData.get("title"),
        description: formData.get("description"),
        image: formData.get("image"),
      });

      // THEN, upload the image to firebase with the newEvent.id as the unique key/identifier...
      const newEventImage = await uploadImageToFirebase({
        id: newEvent.id,
        title,
        description,
        imageFile,
      });

      // IF there is no image url (in the case it's unsuccessful), THEN, return...
      if (!newEventImage || !newEventImage.url)
        throw new Error("Failed to upload image.");

      // THEN, update the document with the new firestore storage image url...
      await updateDocument("rooms", newEvent.id, { image: newEventImage.url });
      if (!updateDocument)
        throw new Error("Failed to update document with image URL.");

      // THEN, emit this upwards to the parent component...
      onModalClose({ ...newEvent, image: newEventImage.url });
    } catch (error) {
      // IF there is an error...
      console.error("Error creating data:", error);
      // Rollback logic: If a document was created but subsequent steps failed, delete it.
      if (newEvent && newEvent.id) {
        await deleteDocument("rooms", newEvent.id);
        console.log(`Cleaned up orphaned document: ${newEvent.id}`);
      }
    } finally {
      // FINALLY, set loading "state" to false, to release the disabled button...
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
                className="form-input-style-textarea"
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
              name="image"
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
                <button className="form-button-style" type="submit">
                  Creating Event...
                </button>
              )}
            </label>
          </div>
        </form>
      </div>
    </div>
  );
};
