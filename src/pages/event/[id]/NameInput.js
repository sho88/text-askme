import InputField from "@/components/input/InputField";
import { createData } from "@/utils/database";
import Image from "next/image";
import { useState } from "react";
import "@/styles/main.css";
import "@/styles/globals.css";

export const NameInput = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  const handleChange = async (e) => {
    e.preventDefault();
    const newData = { name, description };

    // fetch('', {
    //   method: '',
    //   headers: {'application-type' : 'application/json'},
    //   body: JSON.stringify(newData).
    //   then()
    // })

    const [errors, id] = await asyncify(createData("/events/", newData));
    console.log(errors, id);
  };

  return (
    <div>
      <div className="edit-page-container">
        <form>
          <h1 className="text-white text-2xl font-oswald font-bold mb-5">
            Edit Event
          </h1>
          <input
            className="edit-page-input"
            placeholder="New event name...."
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
          ></input>
          <textarea
            className="edit-page-input"
            placeholder="New description name..."
            required
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          ></textarea>
          <button className="form-submit-button">Update Changes</button>
        </form>
        <p className="temp-delete">
          {name}
          <br />
          {description}
        </p>
      </div>
    </div>
  );
};

export default NameInput;
