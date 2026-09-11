import { react, useEffect, useState } from "react";
import { pusherClient } from "@/lib/pusher-client";

export const usePusher = (room) => {
  const [questions, setQuestions] = useState([]);
  useEffect(() => {
    if (!room?._id) return;

    const channel = pusherClient.subscribe(`room-${room?._id}`);

    channel.bind("question-created", (data) => {
      setQuestions((prev) => {
        if (prev.some((q) => q._id === data._id)) return prev;
        return [...prev, data];
      });
    });

    channel.bind("question-deleted", ({ id }) => {
      setQuestions((prev) => prev.filter((p) => p._id !== id));
    });

    return () => {
      channel.unbind_all();
      pusherClient.unsubscribe(`room-${room?._id}`);
    };
  }, [room?._id]);
  return {
    questions,
    setQuestions,
  };
};

export default usePusher;
