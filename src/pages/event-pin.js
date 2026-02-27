import mainStyle from "@/styles/main.css";
import { useRouter } from "next/router"; // Changed to next/router for Pages directory
import Image from "next/image";
import { useState } from "react";

export default function EventPassword() {
  const router = useRouter();

  const handleSubmit = async (ev) => {
    ev.preventDefault();
    const formData = new FormData(ev.target);
    const pin = formData.get("pin");

    try {
      // Call the new verification route
      const res = await fetch(`/api/verify-pin?pinCode=${pin}`);
      const result = await res.json();

      if (result.success) {
        // redirects to the actual events-page
        // attempting to declare that this is a "guest" incoming, so make necessary changes
        router.push(`/events/${result.eventId}?fromPin=true`);
        // router.push(`/events/${id}`);
      } else {
        alert("Invalid PIN. Please check with your host.");
      }
    } catch (error) {
      console.error("Verification error:", error);
    }
  };

  const handleClick = () => router.back();

  return (
    <div>
      <div className="head">
        <div className="head-container">
          <button onClick={handleClick} className="burger-menu-2">
            <Image
              className="verify-back-button"
              src="/images/back.png"
              width={25}
              height={23}
              alt="Back"
            />
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
            required
          />
          <button type="submit">
            <b>Verify</b>
          </button>
        </div>
      </form>
    </div>
  );
}
