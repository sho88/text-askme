import { useState, useRef } from "react";
import "./style.css";
import Image from "next/image";
import { uploadImage } from "@/utils/storage";
// 1. Import your new hook (assuming it's in a hooks folder)
import useEvents from "@/hooks/useEvents";

export const ModalComponent = ({ onModalClose }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const fileInputRef = useRef(null);

  // 2. Call your hook at the top level
  // We pass an empty object {} initially because we don't have a room yet
  const { postingEventsFive } = useEvents({}, "rooms");

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setImageFile(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // 1. Upload the image FIRST to get the URL
      // (This is better logic so you don't create a "broken" room with no image)
      const uploadResult = await uploadImage({ imageFile });

      if (!uploadResult?.url) {
        throw new Error("Image upload failed");
      }

      // 2. Use your hook's 'postingEvent' to save everything at once
      const newRoomData = {
        title,
        description,
        image: uploadResult.url,
        pin: Math.ceil(Math.random() * 1000000),
      };

      // This calls the logic we built in your hook!
      await postingEventsFive(newRoomData);

      // 3. Success: Close modal
      onModalClose(newRoomData);
    } catch (error) {
      console.error("Error creating data:", error);
      alert("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="modal">
      <div className="modal__content">
        {/* ... (Close button stays the same) ... */}
        <button className="modal__close" onClick={() => onModalClose(null)}>
          <Image
            alt="x"
            src="/images/cross-cancel.png"
            height="18"
            width="18"
          />
        </button>

        <form onSubmit={handleSubmit} className="form">
          <input
            className="form-input-style"
            placeholder="Enter your topic title"
            type="text"
            required
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />

          <textarea
            className="form-input-style-textarea"
            placeholder="Enter topic description"
            required
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />

          <button
            className="upload-button-style"
            type="button"
            onClick={() => fileInputRef.current.click()}
            disabled={loading}
          >
            {imageFile ? "Image Uploaded ✅" : "Upload topic image ⬆"}
          </button>

          <input
            type="file"
            accept="image/*"
            ref={fileInputRef}
            onChange={handleImageChange}
            style={{ display: "none" }}
            required
          />

          <button
            className="form-button-style"
            type="submit"
            disabled={loading}
          >
            {loading ? "Creating..." : "Create Topic"}
          </button>
        </form>
      </div>
    </div>
  );
};
