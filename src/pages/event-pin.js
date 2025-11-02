import mainStyle from "@/styles/main.css";
import HeaderComponent from "@/components/header";

export default function EventPassword() {
  function handleSubmit(ev) {
    ev.preventDefault();

    const formData = new FormData(ev.target);

    // @TODO: take the "pin" property...

    // @TODO: ensure that it's a number...if it isn't, then return

    // @TODO: ensure that it's 6 digits long...

    console.log(formData.get("pin"));
  }

  return (
    <div className={mainStyle["entire-dashboard-page"]}>
      <form className="pin-form" onSubmit={handleSubmit}>
        <div className="pin-form-container">
          <input
            className="pin-form__input"
            name="pin"
            type="number"
            placeholder="Enter pin"
          />
          <button>Verify</button>
        </div>
      </form>
    </div>
  );
}
