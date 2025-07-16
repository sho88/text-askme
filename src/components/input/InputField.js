import { useEffect, useRef, useState } from 'react';


export default function InputField({ whenInput = () => { } } = {}) {

  // properties etc...
  const [value, setValue] = useState("");
  const textAreaReference = useRef(null);


  // hooks...
  useEffect(() => {
    textAreaReference.current.style.height = "auto";
    textAreaReference.current.style.height =
      textAreaReference.current.scrollHeight + "px";
  }, [value]);


  // events...
  function handleChange(e) {
    setValue(e.target.value);
    whenInput(value)
  }


  // return to the renderer...
  return (
    <div className="cover1">
      <div className="cover2">
        <textarea
          className="textarea1"
          placeholder="Search by name, message, etc..."
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
