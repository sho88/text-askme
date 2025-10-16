import { useEffect, useState } from "react";
import * as database from "@/utils/database";
import { readDocument } from "@/utils/firestore";
import { asyncify } from "@/utils";

/**
 * Used primarily for retrieving specific room information (and messages)
 * @param String roomID
 * @returns
 */

const useRoom = (roomID) => {
  const [messages, setMessages] = useState([]);
  const [room, setRoom] = useState(null);

  useEffect(() => {
    const getRoomByID = async () => {
      try {
        const document = await readDocument("rooms", roomID);
        setRoom(document);
      } catch (error) {
        console.error("error", error);
      } finally {
        return room;
      }
    };
    getRoomByID();
  }, [room, roomID]);

  return { messages, room };
};

export default useRoom;

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
