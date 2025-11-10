import mainStyle from "@/styles/main.css";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function EventPassword() {
  const router = useRouter();
  function handleSubmit(ev) {
    ev.preventDefault();

    const formData = new FormData(ev.target);

    // @TODO: take the "pin" property...

    // @TODO: ensure that it's a number...if it isn't, then return

    // @TODO: ensure that it's 6 digits long...

    console.log(formData.get("pin"));
  }

  const handleClick = () => {
    return router.back();
  };

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
            // type="number"
            placeholder="Enter 6-digit Pin"
            type="password"
            maxlength="6"
          />
          <button>Verify</button>
        </div>
      </form>
    </div>
  );
}
// generate 6-digit pin, via react.
// retrieve event by 6-digit pin
