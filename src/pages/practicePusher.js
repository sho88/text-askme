import React, { useState, useEffect } from "react";
import useRoom from "@/hooks/room";
import { auth0 } from "@/lib/auth0";
import "@/styles/main.css";
import "@/styles/event.css";
import "@/styles/globals.css";

export const getServerSideProps = async (context) => {
  const { req, res } = context;

  try {
    const theSession = await auth0.getSession(req, res);
    return {
      props: {
        session: theSession || null,
      },
    };
  } catch (err) {
    console.error(err, "Operation failed.");
    return { props: { session: null } };
  }
};

export const PracticePusher = ({ session }) => {
  const [user, setUser] = useState(session?.user);

  // Fix 2: Pass an object with an _id key to match room?._id inside useRoom
  const room = { _id: "test-room" };

  // import useRoom with necessary functions and values
  const { questions, error, createQuestionApi, deleteQuestionApi } =
    useRoom(room);

  const [inputText, setInputText] = useState("");
  const [isLoading, setisLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      text: inputText,
      author: user?.sub,
      authorName: user?.name || user?.email || "Unknown",
      eventId: room._id,
    };

    setisLoading(true);
    await createQuestionApi(payload);
    setInputText("");
    setisLoading(false);
  };

  return (
    <div className="practice-container">
      {/* User Header Section */}
      <div className="user-banner">
        {user ? (
          <p>
            Logged in as <strong>{user.name || user.email}</strong> |{" "}
            <a href="/api/auth/logout">Logout</a>
          </p>
        ) : (
          <p>
            Posting as <strong>Anonymous</strong> |{" "}
            <a href="/auth/login?returnTo=/dashboard">Login / Sign Up</a>
          </p>
        )}
      </div>

      {/* Error State Banner */}
      {error && (
        <div className="error-banner">An error occurred loading questions.</div>
      )}

      {/* Input Form */}
      <form onSubmit={handleSubmit}>
        <input
          required
          value={inputText}
          placeholder="Type your question here..."
          onChange={(e) => setInputText(e.target.value)}
          className="practice-input"
          disabled={isLoading}
        />
        <button
          type="submit"
          className="practice-send"
          disabled={isLoading || !inputText.trim()}
        >
          {isLoading ? "Sending..." : "Send"}
        </button>
      </form>

      {/* Messages List */}
      <div className="list-of-messages-practice">
        {questions.length === 0 ? (
          <p>No questions yet. Be the first to ask!</p>
        ) : (
          questions.map((msg) => (
            <div key={msg._id} className="message-card">
              <div className="message-header">
                <strong>{msg.authorName || "Anonymous"}</strong>
                <span className="timestamp">
                  {new Date(msg.createdAt).toLocaleTimeString()}
                </span>
              </div>
              <p className="message-body">{msg.text}</p>
              {
                <button
                  className="delete-btn"
                  onClick={() => deleteQuestionApi(msg._id)}
                >
                  Delete
                </button>
              }
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default PracticePusher;
