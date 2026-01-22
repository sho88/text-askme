// import { useEffect, useState } from "react";
// import * as database from "@/pages/api/database";
// import { readDocument } from "@/utils/firestore";
// import { asyncify } from "@/utils";

// /**
//  * Used primarily for retrieving specific room information (and messages)
//  * @param String roomID
//  * @returns
//  */

// const useRoom = (roomID) => {
//   const [messages, setMessages] = useState([]);
//   const [room, setRoom] = useState(null);

//   useEffect(() => {
//     const getRoomByID = async () => {
//       try {
//         const document = await readDocument("rooms", roomID);
//         setRoom(document);
//       } catch (error) {
//         console.error("error", error);
//       } finally {
//         return room;
//       }
//     };
//     getRoomByID();
//   }, [room, roomID]);

//   return { messages, room };
// };

// export default useRoom;

// export default function useRoom(roomID) {
//   const [messages, setMessages] = useState([])
//   const [room, setRoom] = useState(null)

//   useEffect(() => {
//     async function getRoomByID() {
//       try {
//         const document = await readDocument("rooms", roomID);
//         setRoom(document);
//       } catch (error) {
//         console.error("ERROR:", error);
//       } finally {
//         return room;
//       }
//     }

//     getRoomByID();
//   }, [room, roomID]);

//   return { messages, room };
// }

import { useEffect, useState } from "react";

/**
 * Used primarily for retrieving specific room information (and messages)
 * @param {string} roomID
 * @returns {object} { messages, room }
 */
const useRoom = (roomID) => {
  const [messages, setMessages] = useState([]);
  const [room, setRoom] = useState(null);

  useEffect(() => {
    // Only run if we actually have a roomID
    if (!roomID) return;

    const getRoomByID = async () => {
      try {
        // 1. Fetch from your API route instead of calling Firestore directly
        const response = await fetch(
          `/api/database?collection=rooms&id=${roomID}`
        );

        if (!response.ok) {
          throw new Error("Failed to fetch room data");
        }

        const data = await response.json();

        // 2. Update state with the returned data
        setRoom(data);

        // Note: If your API also returns messages, set them here
        if (data.messages) {
          setMessages(data.messages);
        }
      } catch (error) {
        console.error("Error fetching room:", error);
      }
    };

    getRoomByID();
  }, [roomID]); // Removed 'room' from dependency to prevent infinite loops

  return { messages, room };
};

export default useRoom;
