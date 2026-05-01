import { useState, useRef } from "react";
import Image from "next/image";
import { uploadImage } from "@/utils/storage";
import useEvents from "@/hooks/useEvents";

export const ModalComponent = ({ onModalClose }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const fileInputRef = useRef(null);

  const { postingEventsFive } = useEvents(null, "rooms");

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setImageFile(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const uploadResult = await uploadImage({ imageFile });

      if (!uploadResult?.url) {
        throw new Error(
          "Image upload failed. Cloudinary did not return back a URL."
        );
      }

      const newRoomData = {
        title,
        description,
        image: uploadResult.url,
        pin: Math.ceil(Math.random() * 1000000),
      };

      await postingEventsFive(newRoomData);

      onModalClose(newRoomData);
    } catch (error) {
      console.error("Error creating data:", error.message);
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
            {imageFile ? "Image Uploaded ✅" : "Upload topic image* ⬆"}
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
