"use client";
import { useEffect, useState } from "react";
import { pusherClient } from "@/lib/pusher-client";
import { SocketButton } from "./button";
import useEvents from "@/hooks/useEvents";

export const SocketComponent = ({ roomId }) => {
  // Use the custom hook to initialise Socket.IO connection and handle messages...
  // const { messages, sendMessage } = useSocketIO();
  const [hasNewQuestion, setHasNewQuestion] = useState(false);

  useEffect(() => {
    const channel = pusherClient.subscribe(`event-${roomId}`);
    channel.bind("new-question", () => setHasNewQuestion(true));

    return () => {
      channel.unsubscribe();
      channel.unbind_all();
    };
  }, [roomId]);

  // Clean up subscription on unmount
  return (
    <>
      {/* use a button to tell host of new questions are waiting... */}
      <SocketButton
        hasNewQuestionProp={hasNewQuestion}
        setHasNewQuestionProp={setHasNewQuestion}
      />
      {/* or just refresh the page each time a new question pops up */}
      {/* {hasNewQuestion && window.location.reload()} */}
    </>
  );
};

export default SocketComponent;
