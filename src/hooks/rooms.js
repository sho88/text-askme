// import { useState, useEffect } from "react";
// import { useRouter } from "next/router";

// export const useRooms = (id) => {
//   const router = useRouter();
//   const [rooms, setRooms] = useState([]);

//   useEffect(() => {
//     const fetchingRooms = async () => {
//       try {
//         const res = await fetch(
//           `/api/database?collection=rooms${id ? `&id=${id}` : []}`
//         );

//         const data = await res.json();

//         setRooms(Array.isArray(data) ? data : [data]);
//       } catch (err) {
//         console.error(
//           "Cannot fetch any rooms. There's been an error somewhere",
//           err
//         );
//       }
//     };
//     fetchingRooms();
//   }, [id]);

//   return { rooms };
// };

// export default useRooms;

//TODO

import { useState, useEffect } from "react";

export const useRooms = (id) => {
  const [rooms, setRooms] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchingOurRooms = async () => {
      try {
        const res = await fetch(
          `/api/database?collection=rooms${id ? `&id=${id}` : []}`
        );

        const data = await res.json();

        setRooms(Array.isArray(data) ? data : [data]);
      } catch (err) {
        console.error(err);
        setError(err);
      }
    };

    fetchingOurRooms();
  }, [id]);

  return { rooms, error };
};

export default useRooms;

// Create isLoading functionality                     LOADING
// Create refreshRooms functionality                  REFRESH
// Create functioning error catching in set states    ERROR
