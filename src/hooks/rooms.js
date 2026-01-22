import { useEffect, useState } from "react";

// 1. Ensure the function name is 'useRooms' (plural) to match your export
export const useRooms = (id) => {
  // 2. Initialize with an empty array [] instead of null
  const [rooms, setRooms] = useState([]);

  useEffect(() => {
    const fetchRooms = async () => {
      try {
        const response = await fetch(
          `/api/database?collection=rooms${id ? `&id=${id}` : ""}`
        );
        const data = await response.json();

        // 3. Ensure we are setting an array
        setRooms(Array.isArray(data) ? data : [data]);
      } catch (error) {
        console.error("Fetch error:", error);
        setRooms([]); // Fallback to empty array on error
      }
    };

    fetchRooms();
  }, [id]);

  return { rooms };
};

export default useRooms;
