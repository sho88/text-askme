import { pusherClient } from "@/lib/pusher-client";
import { useEffect, useState } from "react";

export const usePusher = (room) => {
  const [questions, setQuestions] = useState([]); // where fetched questions will be stored
  const [error, setError] = useState(true);

  // for initial fetching questions

  useEffect(() => {
    if (!room) return;
    const fetchingRooms = async () => {
      try {
        const res = await fetch(
          `/api/database?collection=questions&eventId=${room._id}`
        );
        const data = await res.json();
        setQuestions(data);
      } catch (err) {
        console.error(err, "error message i wrote");
      }
    };

    fetchingRooms();
  }, [room._id]);

  // for live pusher enabling
  useEffect(() => {
    const channel = pusherClient.subscribe(`room-${room?._id}`);

    // posting
    channel.bind("question-created", (data) => {
      setQuestions((prev) => {
        if (prev.some((p) => p._id === data._id)) return prev;
        return [...prev, data];
      });
    });

    // deleting
    channel.bind("question-deleted", ({ id }) => {
      setQuestions((prev) => prev.filter((p) => p._id !== id));
    });

    // editing. to be written

    return () => {
      channel.unbind_all();
      pusherClient.unsubscribe(`room-${room?._id}`);
    };
  }, [room?._id]);

  return {
    questions,
    setQuestions,
    room,
    error,
  };
};

export default usePusher;
