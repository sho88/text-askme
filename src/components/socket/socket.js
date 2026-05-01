"use client";
import { useEffect, useState } from "react";
import { pusherClient } from "@/lib/pusher-client";

export default function SocketComponent({ roomId: eventId }) {
  // Use the custom hook to initialise Socket.IO connection and handle messages...
  // const { messages, sendMessage } = useSocketIO();
  const [hasNewQuestion, setHasNewQuestion] = useState(false);

  useEffect(() => {
    const channel = pusherClient.subscribe(`event-${eventId}`);
    console.log(`I am listening to and have subscribed to channel: event-${eventId}...`);

    channel.bind("new-question", data => {
      console.log("Received data from Pusher:", data);
      setHasNewQuestion(true);
    });

    // Clean up subscription on unmount
    return () => {
      channel.unbind_all();
      channel.unsubscribe();
    };
  }, [eventId]);

  return (
    <>
      <button disabled={!hasNewQuestion} style={{
        background: hasNewQuestion ? 'red' : 'black',
        borderRadius: '30px',
        color: 'white',
        cursor: hasNewQuestion ? 'pointer' : 'default',
        padding: '9px',
        opacity: hasNewQuestion ? 1 : 0.5,
        transition: 'background 0.3s, opacity 0.3s',
        width: '100%'
      }} onClick={() => {
        if (!hasNewQuestion) return;
        
        // will come back to sort this...
        window.scrollTo({ top: 0, behavior: "smooth" });
        window.location.reload();
        
        // ...and this...
        setHasNewQuestion(false);
      }}>
        Load New Question(s)
      </button>
    </>
  );
}
