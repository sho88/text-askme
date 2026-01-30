import { useState, useEffect } from "react";
import Image from "next/image";
import { DashboardBottomNav } from "@/components/dashboard/DashboardBottomNav";
import HeaderComponent from "@/components/header";
import SubmitQuestionsContainer from "@/components/submit-questions-container/SubmitQuestionsContainer";
import mainStyle from "@/styles/main.css";
import "@/styles/event.css";
import "@/styles/globals.css";

export const getServerSideProps = async ({ params }) => {
  try {
    const { start, readData } = await import("@/utils/mongo");
    await start();
    const roomData = await readData("rooms", params.id);

    if (!roomData) return { notFound: true };

    return {
      props: {
        room: JSON.parse(JSON.stringify(roomData)),
      },
    };
  } catch (err) {
    console.error("SSR Error:", err);
    return { notFound: true };
  }
};

export default function EventSingleComponent({ room }) {
  const [questions, setQuestions] = useState([]);

  // FETCH: Only get questions for THIS room ID
  useEffect(() => {
    const fetchQuestions = async () => {
      if (!room?._id) return;
      const res = await fetch(`/api/questions?eventId=${room._id}`);
      const result = await res.json();
      if (result.success) setQuestions(result.data);
    };
    fetchQuestions();
  }, [room?._id]);

  const handleDelete = async (id) => {
    const res = await fetch(`/api/questions?id=${id}`, { method: "DELETE" });
    if (res.ok) {
      setQuestions(questions.filter((q) => q._id !== id));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const formValues = Object.fromEntries(formData.entries());

    // ATTACH ID: Add the current room's ID to the payload
    const payload = {
      ...formValues,
      eventId: room._id,
      pin: Number(room.pin),
    };

    try {
      const res = await fetch("/api/questions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        const result = await res.json();
        setQuestions((prev) => [result.data, ...prev]);
        e.target.reset();
      }
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  if (!room) return <p>Loading. Please wait...</p>;

  return (
    <div>
      <div className={mainStyle["entire-dashboard-page"]}>
        <HeaderComponent />
        <div className="event">
          <div className="event__container">
            <div className="background-2"></div>
            <div className="layer-1">
              <div>
                <div className="layer-1-filter"></div>
                <div className="layer-2-filter"></div>
                <Image
                  className="event__image"
                  loading="lazy"
                  alt={room.title || room.name || "Event Image"}
                  src={room.image || "/images/placeholder.png"}
                  height={1000}
                  width={1000}
                />
              </div>
            </div>
            <div className="layer-3">
              <div className="event__header">
                <h1>{room.title || room.name}</h1>
              </div>
              <div className="event__content">
                <p>{room.description}</p>
                <p className="emphasis">
                  <i>Submit questions below</i>
                </p>
              </div>
            </div>

            <div className="event__messages">
              <h2 className="event__header-2">
                Questions ({questions.length})
              </h2>
              {questions.map((msgObj) => (
                <div key={msgObj._id} className="event__messages-2">
                  <p>{msgObj.question}</p>
                  <button onClick={() => handleDelete(msgObj._id)}>
                    <Image
                      className="questions-cross"
                      src="/images/cross-cancel.png"
                      alt="Delete"
                      height="10"
                      width="10"
                    />
                  </button>
                </div>
              ))}
            </div>

            <SubmitQuestionsContainer>
              <form onSubmit={handleSubmit}>
                <div className="submit-questions-container">
                  <textarea
                    name="question"
                    className="submit-questions-textarea"
                    placeholder="Ask a question here..."
                    required
                  ></textarea>
                  <button className="submit-questions-button" type="submit">
                    <Image
                      src="/images/fn-send.png"
                      alt="Paper plane"
                      height="50"
                      width="50"
                    />
                  </button>
                </div>
              </form>
            </SubmitQuestionsContainer>
          </div>
          <div className="random-box"></div>
        </div>
        <DashboardBottomNav />
      </div>
    </div>
  );
}
