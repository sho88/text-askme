// import React, { useState, useEffect } from "react";
// import Pusher from "pusher-js";
// import "@/styles/main.css";
// import "@/styles/event.css";
// import "@/styles/globals.css";

// export const practicePusher = () => {
//   const [message, setMessage] = useState("");
//   let allMessages = [];

//   useEffect(() => {
//     Pusher.logToConsole = true;

//     const pusher = new Pusher(
//       process.env.NEXT_PUBLIC_PUSHER_KEY,
//       process.env.NEXT_PUBLIC_PUSHER_CLUSTER
//     );

//     const channel = pusherClient.subscribe(`event-${roomId}`);
//     channel.bind("new-question", (data) => allMessages.push(data));
//     setMessage(allMessages);
//   }, []);

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     await fetch("http://localhost:3000/practicePusher", {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({
//         message,
//       }),
//     });

//     setMessage("");
//   };

//   return (
//     <div>
//       <div>Messages from friends go here....</div>

//       <br />
//       <br />

//       <form onSubmit={handleSubmit}>
//         <label>Message:</label>
//         <input
//           placeholder="type message Here"
//           type="text"
//           value={message}
//           onChange={(e) => setMessage(e.target.value)}
//         ></input>
//         <br /> <br />
//         <button>Send</button>
//       </form>
//     </div>
//   );
// };

// export default practicePusher;

import React, { useState, useEffect } from "react";
import { pusherClient } from "@/lib/pusher-client";
import "@/styles/main.css";
import "@/styles/event.css";
import "@/styles/globals.css";

export default function PracticePusher() {
  const [inputText, setInputText] = useState("");
  const [messages, setMessages] = useState([]);

  // Replace with a dynamic ID or router parameter if needed
  const roomId = "test-room";

  useEffect(() => {
    if (!pusherClient) return;

    // Subscribe to the Pusher channel
    const channel = pusherClient.subscribe(`event-${roomId}`);

    // Listen for incoming messages from Pusher (friends)
    channel.bind("new-question", (data) => {
      setMessages((prev) => [...prev, data]);
    });

    return () => {
      channel.unbind_all();
      pusherClient.unsubscribe(`event-${roomId}`);
    };
  }, [roomId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!inputText.trim()) return;

    const payload = {
      text: inputText,
      eventId: roomId,
    };

    // Optimistically display your own message immediately
    // setMessages((prev) => [...prev, { ...payload, isMe: true }]);

    // Clear input right away
    setInputText("");

    try {
      await fetch("/api/database?collection=questions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
    } catch (error) {
      console.error("Failed to send message:", error);
    }
  };

  return (
    <div style={{ padding: "20px", maxWidth: "500px" }}>
      <h3>Messages from friends go here:</h3>

      <div
        style={{
          border: "1px solid #ccc",
          padding: "10px",
          borderRadius: "8px",
          minHeight: "200px",
          marginBottom: "15px",
          display: "flex",
          flexDirection: "column",
          gap: "8px",
        }}
      >
        {messages.length === 0 ? (
          <p style={{ color: "#888" }}>No messages yet...</p>
        ) : (
          messages.map((msg, idx) => (
            <div
              key={idx}
              style={{
                alignSelf: msg.isMe ? "flex-end" : "flex-start",
                background: msg.isMe ? "#0070f3" : "#e5e5ea",
                color: msg.isMe ? "#fff" : "#000",
                padding: "8px 12px",
                borderRadius: "12px",
                maxWidth: "70%",
              }}
            >
              <strong>{msg.isMe ? "You: " : "Friend: "}</strong>
              {typeof msg === "object"
                ? msg.text || msg.message || JSON.stringify(msg)
                : msg}
            </div>
          ))
        )}
      </div>

      <form onSubmit={handleSubmit} style={{ display: "flex", gap: "8px" }}>
        <input
          placeholder="Type message here"
          type="text"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          style={{ flex: 1, padding: "8px" }}
        />
        <button type="submit" style={{ padding: "8px 16px" }}>
          Send
        </button>
      </form>
    </div>
  );
}
