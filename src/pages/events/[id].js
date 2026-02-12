import { useState, useEffect } from "react";
import Image from "next/image";
import { DashboardBottomNav } from "@/components/dashboard/DashboardBottomNav";
import HeaderComponent from "@/components/header";
import SubmitQuestionsContainer from "@/components/submit-questions-container/SubmitQuestionsContainer";
import { useRouter } from "next/router";

import { useContext } from "react";
import Provider, { TheFatherContext } from "@/context/app";

import mainStyle from "@/styles/main.css";
import "@/styles/event.css";
import "@/styles/globals.css";
import GuestHeader from "@/components/header/GuestHeader";
import ScrollToTopButton from "@/components/scroll-to-top-button/ScrollToTopButton";

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
//
//
// DUE TO BE FLIPPED THE OTHER WAY - default will soon be "guest" when host logins and users are sorted with Sho
// SO, logic below will be flipped. Work to be done!
//
//
const HeaderComponent2 = () => (
  <header style={{ borderBottom: "2px solid red", padding: "10px" }}>
    <button>← Back</button> <button>☰ Menu</button>
    <span> (Host Header)</span>
  </header>
);

const ButtonsComponent = () => {
  const { dispatch, state } = useContext(TheFatherContext);

  const isGuest = state.role === "guest";

  return (
    <div style={{ padding: "20px" }}>
      This is proof that you do not need always need to reference state and
      dispatch when rendering...
      {!isGuest && <HeaderComponent2 />}
      <h2>Current SETUP: {state.role.toUpperCase()}</h2>
      <p>
        Status:{" "}
        {isGuest ? "Access restricted to Guest view." : "You have full access."}
      </p>
      <div style={{ margin: "20px 0" }}>
        <button
          onClick={() => dispatch({ type: "SET_ROLE", payload: "guest" })}
        >
          Switch to Guest
        </button>
        <br />
        <br />
        <button onClick={() => dispatch({ type: "SET_ROLE", payload: "host" })}>
          Switch to Host
        </button>
      </div>
      <hr />
      <p>Counter: {state.count}</p>
      <button onClick={() => dispatch({ type: "increment" })}>Add 1</button>
      {/* 2. Only show Bottom Nav if User is Host */}
      {/* {!isGuest && <DashboardBottomNav />} */}
    </div>
  );
};

function EventSingleComponent({ room }) {
  const { dispatch, state } = useContext(TheFatherContext);
  const [questions, setQuestions] = useState([]);

  // ADDED FROM GEMINI
  const router = useRouter(); // Put this at the top with other hooks

  useEffect(() => {
    if (router.query.fromPin === "true") {
      dispatch({ type: "SET_ROLE", payload: "guest" });
    }
  }, [router.query.fromPin, dispatch]);
  // ADDED FROM GEMINI

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

    // Changing 'instant' to 'smooth' creates the glide effect
    window.scrollTo({ top: 0, behavior: "smooth" });

    const formData = new FormData(e.target);
    const formValues = Object.fromEntries(formData.entries());

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

  const isGuest = state.role === "guest";

  const handleToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleToBottom = () => {
    window.scrollTo({
      top: document.documentElement.scrollHeight,
      behavior: "smooth",
    });
  };

  return (
    <div>
      <div className={mainStyle["entire-dashboard-page"]}>
        {!isGuest ? <HeaderComponent /> : <GuestHeader />}

        <div className="event">
          <div className="event__container">
            <div className="background-2"></div>
            {isGuest ? (
              <div
                onClick={handleToBottom}
                className="pop-up-indicator"
                id="hideMe"
              >
                Scroll down to Ask Questions
              </div>
            ) : (
              <div
                onClick={handleToBottom}
                className="pop-up-indicator"
                id="hideMe"
              >
                Scroll down to Answer Questions
              </div>
            )}

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
              </div>
            </div>

            <br />

            {/* <button
              onClick={() => dispatch({ type: "SET_ROLE", payload: "guest" })}
              style={{ border: "2px", borderStyle: "solid" }}
            >
              Guest Version
            </button> */}
            {/* 
            <br />

            <button
              onClick={() => dispatch({ type: "SET_ROLE", payload: "host" })}
              style={{ border: "2px", borderStyle: "solid" }}
            >
              Switch to Host
            </button> */}

            <div className="event__messages">
              <h2 className="event__header-2">
                Questions ({questions.length})
              </h2>

              {questions.map((msgObj) => (
                <div key={msgObj._id} className="event__messages-2">
                  <p>{msgObj.question}</p>
                  <button onClick={() => handleDelete(msgObj._id)}>
                    {!isGuest && (
                      <Image
                        className="questions-cross"
                        src="/images/cross-cancel.png"
                        alt="Delete"
                        height="10"
                        width="10"
                      />
                    )}
                  </button>
                </div>
              ))}
            </div>
            <ScrollToTopButton>
              <div className="scroll-to-top">
                <button onClick={handleToTop}>
                  <Image
                    src="/images/up-arrow-3.png"
                    alt="Up arrow"
                    height="33"
                    width="33"
                  />
                </button>
              </div>
            </ScrollToTopButton>

            <SubmitQuestionsContainer>
              <form onSubmit={handleSubmit}>
                <div className="submit-questions-container">
                  {isGuest ? (
                    <textarea
                      name="question"
                      className="submit-questions-textarea"
                      placeholder="Ask a question here..."
                      required
                    ></textarea>
                  ) : (
                    <textarea
                      name="question"
                      className="submit-questions-textarea"
                      placeholder="Answer audience's questions here..."
                      required
                    ></textarea>
                  )}

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
        {!isGuest && <DashboardBottomNav />}
      </div>
    </div>
  );
}

export const exportThis = ({ room }) => {
  return (
    <Provider>
      <EventSingleComponent room={room} />
      {/* <ButtonsComponent /> */}
    </Provider>
  );
};

export default exportThis;
