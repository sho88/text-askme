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
    <div>

      <form className="pin-form" onSubmit={handleSubmit}>
        <label className="pin-form__label">
          Please enter Event PIN
          <input className="pin-form__input" name="pin" type="number" />
        </label>

        <button>Verify</button>
      </form>

    </div>
  )

}