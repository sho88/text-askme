import { useState, useRef } from "react";
import "./style.css";
import Image from "next/image";
import { uploadImage } from "@/utils/storage";
import { createDocument, updateDocument, deleteDocument } from "@/utils/api";

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
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    let newEvent = null;

    try {
      // 1. Create document in MongoDB (Initial save)
      // We await this to get the _id back from Mongo
      newEvent = await createDocument("rooms", {
        title,
        description,
        image: null,
        pin: Math.ceil(Math.random() * 1000000),
      });

      if (!newEvent || !newEvent._id) {
        throw new Error("Failed to create document in MongoDB.");
      }

      // 2. Upload the image to your server
      const uploadResult = await uploadImage({
        imageFile,
      });

      // 3. Update MongoDB document with the new image URL
      const updateSuccess = await updateDocument("rooms", newEvent._id, {
        image: uploadResult.url,
      });

      if (!updateSuccess) {
        throw new Error("Failed to update document with image URL.");
      }

      // Success: Close modal and pass updated data back to parent
      onModalClose({ ...newEvent, image: uploadResult.url });
    } catch (error) {
      console.error("Error creating data:", error);
      // Rollback: If anything failed after creating the doc, delete it to keep DB clean
      if (newEvent && newEvent._id) {
        await deleteDocument("rooms", newEvent._id);
      }
      alert("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="modal">
      <div className="modal__content">
        <button className="modal__close" onClick={() => onModalClose(null)}>
          <Image
            alt="x"
            src="/images/cross-cancel.png"
            height="18"
            width="18"
          />
        </button>

        <form onSubmit={handleSubmit} className="form">
          <div className="form__control">
            <input
              className="form-input-style"
              placeholder="Enter your title"
              type="text"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>

          <div className="form__control">
            <textarea
              className="form-input-style-textarea"
              placeholder="Enter description"
              required
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            ></textarea>
          </div>

          <div className="form__control">
            <button
              className="upload-button-style"
              type="button"
              onClick={() => fileInputRef.current.click()}
              disabled={loading}
            >
              {imageFile ? "Image Uploaded ✅" : "Upload Image ⬆"}
            </button>
            <input
              type="file"
              accept="image/*"
              ref={fileInputRef}
              onChange={handleImageChange}
              style={{ display: "none" }}
              required // Added required so users must pick an image
            />
          </div>

          <div className="form__control">
            <button
              className="form-button-style"
              type="submit"
              disabled={loading}
            >
              {loading ? "Creating..." : "Create Topic"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
