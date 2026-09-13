import { useState, useRef } from "react";
import { useRouter } from "next/router";
import "@/styles/main.css";
import useEvents from "@/hooks/useEvents";
import Image from "next/image";
import { uploadImage } from "@/utils/storage";

export const EditEventForm = ({ initialData }) => {
  const router = useRouter();
  const [name, setName] = useState(initialData?.title || "");
  const [description, setDescription] = useState(initialData?.description);
  const [imageFile, setImageFile] = useState(null);
  const [image, setImage] = useState(initialData?.image);
  const fileInputRef = useRef(null);
  const [display, setDisplay] = useState(true);

  const [loading, setLoading] = useState(false);

  const { editEvent } = useEvents(null, "rooms");

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setImageFile(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const uploadResult = await uploadImage({ imageFile });

    if (!uploadResult?.url) {
      throw new Error(
        "Image upload failed. Cloudinary did not return back a URL."
      );
    }

    const updatedFields = {
      title: name,
      description: description,
      image: uploadResult.url,
    };

    const updatedChanges = await editEvent(initialData._id, updatedFields);

    try {
      if (updatedChanges) {
        alert("Changes saved successfully!");
        router.push("/dashboard");
      } else {
        alert("Failed to update event. ERROR.");
      }
    } catch (error) {
      console.error("Update error:", error);
    } finally {
      setLoading(false);
    }
  };

  const hideCurrentImage = () => {
    setDisplay((prevDisplay) => !prevDisplay);
  };

  const replaceImage = () => {
    fileInputRef.current.click();
  };

  return (
    <div className="edit-page-container">
      <form onSubmit={handleSubmit}>
        <h1 className="text-white text-2xl font-oswald font-bold mb-5">
          Edit Event
        </h1>
        <label>
          <div className="event__header-2">New Topic Name</div>

          <input
            className="edit-page-input"
            placeholder="Type in new topic name..."
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </label>
        <label>
          <div className="event__header-2">New Description</div>
          <textarea
            className="edit-page-input"
            style={{ minHeight: "150px" }}
            placeholder="Type in new description..."
            required
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </label>

        <label>
          <div className="event__header-2">Upload New Image</div>

          <div className="edit-page-input-replace-image">
            <Image
              className="event__image"
              loading="lazy"
              src={image || "/images/placeholder.png"}
              height={1000}
              width={1000}
              style={{
                objectFit: "cover",
                borderRadius: "18px",
                display: display ? "block" : "none",
              }}
            />
            <div className="change-image-overlay"></div>
            <button
              type="button"
              onClick={() => {
                hideCurrentImage();
                replaceImage();
              }}
              disabled={loading}
              className="replace-image-button"
            >
              {imageFile ? "Image Uploaded ✅" : "Replace Image ⬆"}
            </button>
          </div>
        </label>

        <input
          type="file"
          accept="image/*"
          ref={fileInputRef}
          onChange={handleImageChange}
          style={{ display: "none" }}
          // required
        />

        <button
          className="intro-call-to-action-button"
          disabled={loading}
          style={{ width: "100%" }}
        >
          <b>{loading ? "Saving..." : "Update Changes"}</b>
        </button>
      </form>

      <div className="random-filler" />
    </div>
  );
};
export default EditEventForm;
