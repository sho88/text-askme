import { useEffect, useRef, useState } from "react";

export default function InputField({ whenInput = () => {} } = {}) {
  const [value, setValue] = useState("");
  const textAreaReference = useRef(null);

  useEffect(() => {
    textAreaReference.current.style.height = "auto";
    textAreaReference.current.style.height =
      textAreaReference.current.scrollHeight + "px";
  }, [value]);

  function handleChange(e) {
    setValue(e.target.value);
    whenInput(value);
  }

  return (
    <div className="cover1">
      <div className="cover2">
        <textarea
          className="textarea1"
          placeholder="Search by name or message..."
          value={value}
          onChange={handleChange}
          onKeyUp={handleChange}
          rows="1"
          ref={textAreaReference}
        ></textarea>
      </div>
    </div>
  );
}
