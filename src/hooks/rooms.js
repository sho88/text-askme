import { useEffect, useMemo, useState } from "react";
import * as database from "@/utils/database";
import { asyncify } from "@/utils";

/**
 * Used primarily for retriving rooms
 * @returns Object
 */
export const useRooms = () => {
  const [rooms, setRooms] = useState([]);
  const [errors, setErrors] = useState([]);

  // hooks...
  useEffect(() => {
    async function getData() {
      const [error, data] = await asyncify(database.readData("rooms"));

      if (error) {
        // @TODO: Create a generic error handler on the app...
        console.error(error);
        setErrors([...errors, { error }]);
        return;
      }

      const roomsArray = Object.keys(data).map(id => ({ id, ...data[id] }));
      setRooms( roomsArray );
    }

    // invoke the function to get the data...
    getData();
  });

  return { errors, rooms };
};
