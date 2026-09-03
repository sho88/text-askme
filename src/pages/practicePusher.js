import React, { useState, useEffect } from "react";
import { pusherClient } from "@/lib/pusher-client";
import "@/styles/main.css";
import "@/styles/event.css";
import "@/styles/globals.css";
import PageLoader from "next/dist/client/page-loader";

export const PracticePusher = () => {
  const [inputText, setInputText] = useState("");
  const [messages, setMessages] = useState([]);

  const eventId = "test-room";

  useEffect(() => {
    if (!pusherClient) return;

    const channel = pusherClient.subscribe(`event-${eventId}`);
    channel.bind("new-question", (data) => {
      setMessages((prev) => [...prev, data]);
    });

    return () => {
      channel.unbind_all();
      pusherClient.unsubscribe(`event-${eventId}`);
    };
  }, [eventId]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!inputText.trim()) return;

    const payload = {
      text: inputText,
      eventId: eventId,
    };

    try {
      await fetch("/api/database?collection=questions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });
    } catch (err) {
      console.log(err, "error! fix code!");
    }
    setInputText("");
  };

  return (
    <div className="practice-container">
      <div>
        <br />
        <br />
        <br />
        <input
          required
          value={inputText}
          placeholder="type here!"
          onChange={(e) => setInputText(e.target.value)}
          className="practice-input"
        ></input>
      </div>
      <br />
      <button className="practice-send" onClick={handleSubmit}>
        Send
      </button>
      <br />
      <br />
      <br />
      <div className="list-of-messages-practice">
        {messages.map((singleMessage, ourKey) => (
          <div key={ourKey}>
            {/* But Who is sending? */}
            {typeof singleMessage === "object"
              ? singleMessage.text ||
                singleMessage.message ||
                JSON.stringify(singleMessage)
              : singleMessage}
          </div>
        ))}
      </div>
    </div>
  );
};

export default PracticePusher;
