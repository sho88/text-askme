import { useState } from "react";
import { useRouter } from "next/router";
import { updateDocument } from "@/utils/api";
import "@/styles/main.css";
import useEvents from "@/hooks/useEvents";

export default function NameInput({ initialData }) {
  const router = useRouter();
  const [name, setName] = useState(initialData?.title || "");
  const [description, setDescription] = useState(
    initialData?.description || ""
  );
  const [loading, setLoading] = useState(false);
  // const { editEvent } = useEvents(null, "rooms");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const updatedFields = {
      title: name,
      description: description,
    };

    try {
      // const success = await editEvent(initialData._id, updatedFields);
      const success = await updateDocument(
        "rooms",
        initialData._id,
        updatedFields
      );

      if (success) {
        alert("Changes saved successfully!");
        router.push("/dashboard"); // Redirect back to dashboard after saving
      } else {
        alert("Failed to update event. ERROR");
      }
    } catch (error) {
      console.error("Update error:", error);
    } finally {
      setLoading(false);
    }
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
          <div>
            <small>
              &nbsp; &nbsp; &nbsp; Please note: Images cannot be changed at this
              time
            </small>
            <br />
          </div>
        </label>

        <button
          className="intro-call-to-action-button"
          disabled={loading}
          style={{ width: "100%" }}
        >
          <b>{loading ? "Saving..." : "Update Changes"}</b>
        </button>
      </form>
    </div>
  );
}
