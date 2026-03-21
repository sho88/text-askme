import { useEffect, useState } from "react";

const BASE_PATH = "/api/database";

// Redo this whole file. Make it into a custom hook
export const api = {
  get: (col, query = "") =>
    fetch(`${BASE_PATH}?collection=${col}&${query}`).then((r) => r.json()),
  post: (col, data) =>
    fetch(`${BASE_PATH}?collection=${col}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    }).then((r) => r.json()),
  put: (col, id, data) =>
    fetch(`${BASE_PATH}?collection=${col}&id=${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    }).then((r) => r.ok),
  delete: (col, id) =>
    fetch(`${BASE_PATH}?collection=${col}&id=${id}`, {
      method: "DELETE",
    }).then((r) => r.ok),
};

export const createDocument = (collection, data) => api.post(collection, data);
// src/utils/api.js

export const updateDocument = async (collection, id, data) => {
  const response = await fetch(
    `/api/database?collection=${collection}&id=${id}`,
    {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    }
  );

  // We return response.ok (which is true if status is 200-299)
  return response.ok;
};
export const deleteDocument = (collection, id) => api.delete(collection, id);

//
//
//
//
//
//
//
//
//
//

// const useEvents = (room) => {
//   const [events, setEvents] = useState([]);
//   const [error, setError] = useState(false);
//   // optional loading state possible

//   // GET method
//   useEffect(() => {
//     const fetchingEvent = async () => {
//       if (!room._id) return;

//       try {
//         const res = await fetch(`/api/database?${collection}&eventId=${room._id}`);
//         if (!res.ok) {
//           throw new Error("This operation has failed. Error");
//         }
//         const data = await res.json();
//         setEvents(data);
//       } catch (err) {
//         console.error(err.message);
//         setError(true);
//       }
//     };
//     fetchingEvent();
//   }, [collection, room?._id]);

// // POST method
//   const postingEvent = async (newEventData) => {

//     if (!newEventData) return;
//     try {
//       const res = await fetch(`/api/database?${collection}`, {
//         method: "POST",
//         headers: {
//           "content-type" : "application/JSON"
//         },
//         body: JSON.stringify(newEventData)
//         })
//       const data = res.json()
//       if (!res.ok) { throw new Error("No collection has been found.") }
//     }

//     catch (err) {
//       console.error(err.message)
//       setError(true)
//     }

//   }

// return data();

// };
