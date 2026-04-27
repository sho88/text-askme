"use client";
import { useEffect, useState } from "react";
import { io } from "socket.io-client";

let socket;

// Custom hook for managing Socket.IO connection...
const useSocketIO = () => {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    // Load the Socket.IO client script and establish a connection
    const loadSocketIO = async () => {
      const socket = await fetch("/api/socket");
      await socket.text();
    };

    loadSocketIO();

    // Establish Socket.IO connection
    socket = io();

    // Listen for messages from the server
    socket.on("new-message", handleNewMessage);

    // Clean up socket connection on unmount
    // return () => socket.disconnect();
  }, []);

  const handleNewMessage = messages => setMessages(messages);

  const sendMessage = message => {
    socket.emit("send-message", {
      message,
      timestamp: new Date().toISOString(),
    });
  };

  return { messages, sendMessage };
}

export default function SocketComponent() {
  const [message, setMessage] = useState("");

  // Use the custom hook to initialise Socket.IO connection and handle messages...
  const { messages, sendMessage } = useSocketIO();

  // event handlers come here...
  const handleMessage = () => {
    // Emit the message to the server FIRST
    sendMessage(message);

    // Then clear the input field... This ensures the message is sent before we reset the input.
    setMessage("");
  }

  return (
    <div>
      <textarea
        placeholder='Enter socket message...'
        value={message}
        style={{
          background: "#fff",
          border: "1px solid #ccc",
          resize: "none",
          padding: "8px",
          width: "100%"
        }} 
        onChange={(e) => setMessage(e.target.value)}
        rows="5"></textarea>

      <br />

      <button
        style={{
          background: 'black',
          color: 'white',
          padding: '9px',
          width: '100%'
        }} 
        onClick={handleMessage}>Send</button>

      <div style={{ border: '1px solid #ccc', marginTop: "20px" }}>
        <h3>Messages from server:</h3>
        {messages.length === 0 && <p>No messages received yet.</p>}
        {messages.map((msg, index) => (
          <div key={index} style={{ padding: "10px", borderBottom: "1px solid #eee" }}>
            <p><strong>Message:</strong> {msg.message}</p>
            <p><small><em>Received at: {new Date(msg.timestamp).toLocaleTimeString()}</em></small></p>
          </div>
        ))}
      </div>
    </div>
  );
}
