import { useState } from "react";
import { useRouter } from "next/router";
import { updateDocument } from "@/utils/api";
import "@/styles/main.css";

export default function NameInput({ initialData }) {
  const router = useRouter();
  const [name, setName] = useState(initialData?.title || "");
  const [description, setDescription] = useState(
    initialData?.description || ""
  );
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const updatedFields = {
      title: name,
      description: description,
    };

    try {
      // updateDocument(collection, id, data)
      const success = await updateDocument(
        "rooms",
        initialData._id,
        updatedFields
      );

      if (success) {
        alert("Changes saved successfully!");
        router.push("/dashboard"); // Redirect back to dashboard after saving
      } else {
        alert("Failed to update event.");
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
          Event Name
          <input
            className="edit-page-input"
            placeholder="New event name...."
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </label>

        <label>
          Event Description
          <textarea
            className="edit-page-input"
            style={{ minHeight: "150px" }}
            placeholder="New description name..."
            required
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </label>
        <button className="form-submit-button" disabled={loading}>
          {loading ? "Saving..." : "Update Changes"}
        </button>
      </form>
    </div>
  );
}
