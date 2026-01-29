import mainStyle from "@/styles/main.css";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { useState } from "react";
import { readDataByParams } from "@/utils/mongo";

const useRoomsHook = () => {
  const [room, setRoom] = useState(null);
  const getRoomByPinCode = async (pinCode) => {
    const room = await readDataByParams("rooms", pinCode);
    console.log(room);
  };

  return {
    room,
    getRoomByPinCode,
  };
};

export default function EventPassword() {
  const router = useRouter();
  const { room, getRoomByPinCode } = useRoomsHook();

  function handleSubmit(ev) {
    ev.preventDefault();

    const formData = new FormData(ev.target);

    const pin = formData.get("pin");

    const cleanPin = +pin;

    getRoomByPinCode(cleanPin);
    // make an if statement. if pin clean, proceed. if not, return errors.

    // if i add a "+" before the string, it converts to a number. so check if it is NaN.
  }

  const handleClick = () => {
    return router.back();
  };

  function handleGuestLoginClick() {
    return router.push("/dashboard");
  }

  return (
    <div className={mainStyle["entire-dashboard-page"]}>
      <div className="head">
        <div className="head-container">
          <button onClick={handleClick} className="burger-menu-2">
            <Image
              className="verify-back-button"
              src="/images/back.png"
              width={25}
              height={23}
              alt="Picture of the author"
            ></Image>
          </button>
        </div>
      </div>

      <form className="pin-form" onSubmit={handleSubmit}>
        <div className="pin-form-container">
          <input
            className="pin-form__input"
            name="pin"
            placeholder="Enter 6-digit Pin"
            type="password"
            maxLength="6"
          />
          <button onClick={handleGuestLoginClick}>
            <b>Verify</b>
          </button>
        </div>
      </form>
    </div>
  );
}
// generate 6-digit pin, via react.
// retrieve event by 6-digit pin
