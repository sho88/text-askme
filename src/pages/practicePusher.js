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

  // return (
  //   <div style={{ padding: "20px", maxWidth: "500px" }}>
  //     <h3>Messages from friends go here:</h3>

  //     <div
  //       style={{
  //         border: "1px solid #ccc",
  //         padding: "10px",
  //         borderRadius: "8px",
  //         minHeight: "200px",
  //         marginBottom: "15px",
  //         display: "flex",
  //         flexDirection: "column",
  //         gap: "8px",
  //       }}
  //     >
  //       {messages.length === 0 ? (
  //         <p style={{ color: "#888" }}>No messages yet...</p>
  //       ) : (
  //         messages.map((msg, idx) => (
  //           <div key={idx}>
  //             <strong>{msg.isMe ? "You: " : "Friend: "}</strong>
  //             {typeof msg === "object"
  //               ? msg.text || msg.message || JSON.stringify(msg)
  //               : msg}
  //           </div>
  //         ))
  //       )}
  //     </div>

  //     <form onSubmit={handleSubmit} style={{ display: "flex", gap: "8px" }}>
  //       <input
  //         placeholder="Type message here"
  //         type="text"
  //         value={inputText}
  //         onChange={(e) => setInputText(e.target.value)}
  //         style={{ flex: 1, padding: "8px" }}
  //       />
  //       <button type="submit" style={{ padding: "8px 16px" }}>
  //         Send
  //       </button>
  //     </form>
  //   </div>
  // );

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
        {messages.map((msg, theKey) => (
          <div key={theKey}>
            {/* <strong>{msg.isMe ? "You: " : "Friend: "}</strong> */}
            {typeof msg === "object"
              ? msg.text || msg.message || JSON.stringify(msg)
              : msg}
          </div>
        ))}
      </div>
    </div>
  );
};

export default PracticePusher;
