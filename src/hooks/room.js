import { useEffect, useState } from "react";
import * as database from "@/utils/database";

/**
 * Used primarily for retrieving specific room information (and messages)
 * @param {*} roomID
 * @returns
 */
export default function useRoom(roomID) {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    database
      .readData(`rooms/${roomID}/messages`)
      .then((data) => {
        const roomsArray = data
          ? Object.keys(data).map((id) => ({ id, ...data[id] }))
          : [];
        setMessages(roomsArray);
      })
      .catch((error) => {
        // @TODO: Create a generic error handler on the app...
        console.error(error);
      });
  }, [roomID]);

  return { messages };
}
