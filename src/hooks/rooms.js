import { useEffect, useState } from "react";
import * as database from "@/utils/database";

/**
 * Used primarily for retriving rooms
 * @returns Object
 */
export const useRooms = () => {
  const [rooms, setRooms] = useState([]);
  const [errors, setErrors] = useState([]);

  // hooks...
  useEffect(() => {
    database
      .readData("rooms")
      .then((data) => {
        const roomsArray = data
          ? Object.keys(data).map((id) => ({ id, ...data[id] }))
          : [];
        setRooms(roomsArray);
      })
      .catch((error) => {
        // @TODO: Create a generic error handler on the app...
        console.error(error);
        setErrors([...errors, { error }]);
      });
  });

  return { rooms };
};
