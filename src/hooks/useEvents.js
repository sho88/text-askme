// Hook responsible for EVENTS

import { useEffect, useState } from "react";

export const useEvents = (event, collection, id, user) => {
  const [events, setEvents] = useState([]);
  const [error, setError] = useState(false);
  // optional loading state in thought

  // GET method
  // GET method
  // GET method
  useEffect(() => {
    const fetchingEvents = async () => {
      try {
        const res = await fetch(`/api/database?collection=rooms&id=${""}`);
        if (!res.ok) {
          throw new Error("Res is not okay. Operation failed.");
        }
        const data = await res.json();

        const makeSureArray = Array.isArray(data) ? data : [data];
        setEvents(makeSureArray);
      } catch (err) {
        console.error("Error fetching rooms", err.message);
      }
    };
    fetchingEvents();
  }, [id, user?.sub]);

  // POST method
  // POST method
  // POST method
  const postingEventsFive = async (payload) => {
    if (!payload) return;
    try {
      const res = await fetch(`/api/database?collection=${collection}`, {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(payload),
      });
      if (!res.ok) {
        throw new Error("Res is not okay. Operation failed.");
      }
      const data = await res.json();
      const actualData = (previous) => {
        const finalData = [...previous, data];
        return finalData;
      };

      setEvents(theData);
    } catch (err) {
      console.error(err.message);
      setError(true);
    }
  };

  // EDIT (PUT) method
  // EDIT (PUT) method
  // EDIT (PUT) method
  const editEvent = async (id, updatedPayload) => {
    if (!id || !updatedPayload) return;

    try {
      const res = await fetch(
        `/api/database?collection=${collection}&id=${id}`,
        {
          method: "PUT",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify(updatedPayload),
        }
      );
      if (!res.ok) {
        throw new Error("Operation failed. Res is not okay.");
      }
      const newData = await res.json();

      const replacingData = (prev) => {
        const theFunction = prev.map((callBack) =>
          callBack._id === id ? newData : prev
        );
        return theFunction;
      };

      setEvents(replacingData);
      return true;
    } catch (err) {
      console.error(err.message);
      setError(true);
      return false;
    }
  };

  // DELETE method
  // DELETE method
  // DELETE method
  const deleteEventTwo = async (id) => {
    if (!id) return;
    try {
      const res = await fetch(
        `/api/database?collection=${collection}&id=${id}`,
        {
          method: "DELETE",
        }
      );

      if (!res.ok) {
        throw new Error("Res is not okay. Failed to delete event. ERROR");
      }

      const deleteFunction = (prev) => {
        const thisOne = prev.filter((callBack) => callBack._id !== id);
        return thisOne;
      };

      setEvents(deleteFunction);
    } catch (err) {
      console.error(err.message);
      setError(true);
      return false;
    }
  };

  return {
    events,
    setEvents,
    postingEventsFive,
    deleteEventTwo,
    event,
    editEvent,
    collection,
  };
};

export default useEvents;
