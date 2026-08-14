"use client";
import { useEffect, useState } from "react";
import { pusherClient } from "@/lib/pusher-client";
import { SocketButton } from "./button";

export default function SocketComponent({ roomId: eventId }) {
  // Use the custom hook to initialise Socket.IO connection and handle messages...
  // const { messages, sendMessage } = useSocketIO();
  const [hasNewQuestion, setHasNewQuestion] = useState(false);

  useEffect(() => {
    const channel = pusherClient.subscribe(`event-${eventId}`);
    channel.bind("new-question", () => setHasNewQuestion(true));

    // Clean up subscription on unmount
    return () => {
      channel.unbind_all();
      channel.unsubscribe();
    };
  }, [eventId]);

  return (
    <>
      <SocketButton
        hasNewQuestionProp={hasNewQuestion}
        setHasNewQuestionProp={setHasNewQuestion}
      />
    </>
  );
}
