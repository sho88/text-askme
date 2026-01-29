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
      // 1. Verify if questions exist for this PIN
      const res = await fetch(`/api/questions?pinCode=${pin}`);
      const result = await res.json();

      if (result.success && result.data.length > 0) {
        // 2. Redirect to dashboard and pass the eventId in the URL
        const firstQuestion = result.data[0];
        router.push(`/dashboard?eventId=${firstQuestion.eventId}`);
      } else {
        alert("Invalid PIN or no questions found for this event.");
      }
    } catch (error) {
      console.error("Login error:", error);
    }
  };

  const handleClick = () => router.back();

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
