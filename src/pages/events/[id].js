import { useState, useEffect, useMemo } from "react";
import Image from "next/image";
import { DashboardBottomNav } from "@/components/dashboard/DashboardBottomNav";
import HeaderComponent from "@/components/header";
import SubmitQuestionsContainer from "@/components/submit-questions-container/SubmitQuestionsContainer";
import { useRouter } from "next/router";
import { useContext } from "react";
import Provider, { TheFatherContext } from "@/context/app";
import "@/styles/main.css";
import "@/styles/event.css";
import "@/styles/globals.css";
import GuestHeader from "@/components/header/GuestHeader";
import ScrollToTopButton from "@/components/scroll-to-top-button/ScrollToTopButton";
import EmojiContainer from "@/components/emoji/EmojiContainer";
import { formatDate } from "@/utils/dates";
import useRoom from "@/hooks/room";
import { auth0 } from "@/lib/auth0";
import { asyncify } from "@/utils";
import { updateDocument } from "@/utils/api";
import ReduceBrowserSize from "../ReduceBrowsingSize";

// 1. THE MERGED SERVER FUNCTION
export const getServerSideProps = async (context) => {
  const { params, req, res } = context;
  try {
    // Get Room Data
    const { readData } = await import("@/utils/mongo");
    const roomData = await readData("rooms", params.id);
    if (!roomData) return { notFound: true };

    // Get Auth0 Session
    const [, session] = await asyncify(auth0.getSession(req, res));

    return {
      props: {
        room: JSON.parse(JSON.stringify(roomData)),
        session: session || null,
      },
    };
  } catch (err) {
    console.error("SSR Error:", err);
    return { notFound: true };
  }
};

export function EventSingleComponent({ room, session }) {
  // LEARN HOW GETTING OF PIN WAS DONE
  console.log("Event PIN:", room?.pin);
  const { questions, setQuestions, createQuestionApi, deleteQuestionApi } =
    useRoom(room);
  const [user, setUser] = useState(session?.user || null);

  const router = useRouter();
  const { dispatch, state } = useContext(TheFatherContext);
  const [showModal, setShowModal] = useState(false);
  const [selectedQuestionId, setSelectedQuestionId] = useState(null);

  useEffect(() => {
    setUser(session?.user || null);
  }, [session]);

  // useEffects etc go here...
  // This tells the browser: "If the modal is open, hide the scrollbar. If not, show it."
  useEffect(() => {
    document.body.style.overflow = showModal ? "hidden" : "unset";
  }, [showModal]);

  const handleAddClick = (questionId) => {
    setSelectedQuestionId(questionId); // Remember which question we are reacting to
    setShowModal(true);
  };

  const handleDelete = async (id) => {
    const deleteQuestion = await deleteQuestionApi(id);

    if (!deleteQuestion.success) {
      console.error("Failed to delete question:", deleteQuestion.message);
      return;
    }
  };

  const handleModalClose = () => {
    setShowModal(false);
  };

  const handleEmojiSelect = async (emoji) => {
    if (!selectedQuestionId) return;

    // Find the current question to see existing reactions
    const question = questions.find((q) => q._id === selectedQuestionId);
    const currentReactions = question.reactions || [];

    // Add the new emoji to the array
    const updatedReactions = [...currentReactions, emoji];

    // Update the database (using your updateDocument utility)
    const success = await updateDocument("questions", selectedQuestionId, {
      reactions: updatedReactions,
    });

    if (success) {
      // Update local state so the UI changes immediately
      setQuestions((prev) =>
        prev.map((q) =>
          q._id === selectedQuestionId
            ? { ...q, reactions: updatedReactions }
            : q
        )
      );
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    window.scrollTo({ top: 0, behavior: "smooth" });

    const formData = new FormData(e.target);
    const formValues = Object.fromEntries(formData.entries());

    const create = await createQuestionApi({
      ...formValues,
      eventId: room._id,
      pin: Number(room.pin),
    });

    if (!create.success) {
      console.error("Failed to create question:", create.message);
      return;
    }

    e.target.reset();
  };

  const handleToBottom = () => {
    window.scrollTo({
      top: document.documentElement.scrollHeight,
      behavior: "smooth",
    });
  };

  const handleToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // rendering
  return (
    <div>
      <ReduceBrowserSize />
      {!room ? <p>Loading. Please wait...</p> : null}

      <div>
        {user ? <HeaderComponent /> : <GuestHeader />}

        {/* In your JSX, update the EmojiContainer call: */}
        {showModal && (
          <EmojiContainer
            onModalClose={handleModalClose}
            onEmojiSelect={handleEmojiSelect}
          />
        )}

        <div className="event">
          <div className="event__container">
            <div className="background-2"></div>
            <div
              onClick={handleToBottom}
              className="pop-up-indicator"
              id="hideMe"
            >
              <span>
                {!user
                  ? "Scroll down to Ask Questions"
                  : "Scroll down to Answer Questions"}
              </span>
            </div>

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
                {/* RESTYLE THIS EVENT PIN PRINT */}

                {user && <p className="event__pin">Event pin: {room.pin}</p>}
              </div>
              <div className="event__content">
                <p>{room.description}</p>
              </div>
            </div>

            <br />

            <div className="event__messages">
              <h2 className="event__header-2">{questions.length} questions</h2>

              {questions.map((msgObj) => (
                <div key={msgObj._id} className="event__messages-2">
                  <div>
                    <p>
                      <small>
                        <b>{msgObj.name} </b>
                      </small>
                    </p>
                    <p>{msgObj.question}</p>
                    <small>
                      <b>
                        <p className="host-answer">{msgObj.hostname} </p>
                      </b>
                    </small>

                    <p className="host-answer">{msgObj.answer}</p>

                    <span className="time-stampped">{formatDate(msgObj)}</span>
                  </div>
                  {user ? (
                    <button onClick={() => handleDelete(msgObj._id)}>
                      <Image
                        className="questions-cross"
                        src="/images/cross-cancel.png"
                        alt="Delete"
                        height="10"
                        width="10"
                      />
                    </button>
                  ) : (
                    <button>
                      {/* TODO - create handleEmoji for functionality */}
                      <Image
                        onClick={() => handleAddClick(msgObj._id)} // Pass the ID here
                        className="emoji-on-question-bar"
                        src="/images/select-emoji-5.png"
                        alt="React"
                        height="15"
                        width="15"
                      />
                    </button>
                  )}
                  {/* And display the reactions below the question: */}
                  <div className="reactions-container">
                    {msgObj.reactions?.map((r, i) => (
                      <span key={i}>{r}</span>
                    ))}
                  </div>
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
                  {!user ? (
                    <div className="four">
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

                      <textarea
                        name="name"
                        className="submit-name-textarea"
                        placeholder="Submit name (optional)"
                      ></textarea>
                    </div>
                  ) : (
                    <div className="four">
                      <textarea
                        hidden="hidden"
                        name="hostname"
                        placeholder="Answer audience's questions here..."
                      >
                        Host says:
                      </textarea>
                      <textarea
                        name="answer"
                        className="submit-questions-textarea"
                        placeholder="Answer audience's questions here..."
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
                  )}
                </div>
              </form>
            </SubmitQuestionsContainer>
          </div>
          <div className="random-box"></div>
        </div>

        {user && <DashboardBottomNav />}
      </div>
    </div>
  );
}

export const exportThis = ({ room, session }) => {
  return (
    <Provider>
      <EventSingleComponent room={room} session={session} />
    </Provider>
  );
};

export default exportThis;
