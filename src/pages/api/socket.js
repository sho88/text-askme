// pages/api/socket.js
import { Server } from "socket.io";


const database = {
  messages: [],
  hasNewMessages: false,
};


export default function handler(req, res) {
  if (!res.socket.server.io) {
    const io = new Server(res.socket.server);
    res.socket.server.io = io;

    io.on("connection", (socket) => {
      setInterval(() => {
        if (database.hasNewMessages) {
          io.emit("new-message", database.messages); // Send a message on connection
          console.log("Emitting new messages to clients:", database.messages);
          database.hasNewMessages = false;
        }
      }, 5000);

      // Listen for messages from clients
      socket.on("send-message", (message) => {
        database.hasNewMessages = true;
        database.messages = [...database.messages, message];
      });

    });

  }

  res.end();
}
