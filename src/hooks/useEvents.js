import { useEffect, useState } from "react";

const useEvents = (room, collection) => {
  const [events, setEvents] = useState([]);
  const [error, setError] = useState(false);
  // optional loading state in thought

  // GET method
  // GET method
  // GET method
  useEffect(() => {
    const fetchingEvent = async () => {
      if (!room || !collection) return;
      try {
        const res = await fetch(
          `/api/database?collection=${collection}&eventId=${room._id}`
        );
        if (!res.ok) {
          throw new Error("Res is not okay. Operation failed. Error.");
        }
        const data = await res.json();
        setEvents(data);
      } catch (err) {
        console.error(err.message);
        setError(true);
      }
    };
    fetchingEvent();
  }, [collection, room?._id]);

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
      setEvents(actualData);
    } catch (err) {
      console.error(err.message);
      setError(true);
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
        throw new Error("Res is not okay. Failed to update event. ERROR");
      }

      const updatedData = await res.json();

      // Update the local state to show the change immediately
      setEvents((prev) => {
        return prev.map((item) => {
          // If the ID matches, swap the old item for the new 'updatedData'
          // Otherwise, just keep the item as it was
          return item._id === id ? updatedData : item;
        });
      });
    } catch (err) {
      console.error(err.message);
      setError(true);
    }
  };

  return {
    events,
    setEvents,
    postingEventsFive,
    deleteEventTwo,
    editEvent,
    room,
    collection,
  };
};

export default useEvents;
