import { useState, useEffect } from "react";
import Image from "next/image";
import { DashboardBottomNav } from "@/components/dashboard/DashboardBottomNav";
import HeaderComponent from "@/components/header";
import SubmitQuestionsContainer from "@/components/submit-questions-container/SubmitQuestionsContainer";
import GuestHeader from "@/components/header/GuestHeader";
import ScrollToTopButton from "@/components/scroll-to-top-button/ScrollToTopButton";
import EmojiContainer from "@/components/emoji/EmojiContainer";
import useRoom from "@/hooks/room";
import { auth0 } from "@/lib/auth0";
import ReduceBrowserSize from "../reduce-browsing-size";
import SocketComponent from "@/components/socket/socket";
import EventQuestionComponent from "@/components/event-question/event-question";

import "@/styles/main.css";
import "@/styles/event.css";
import "@/styles/globals.css";

export const getServerSideProps = async (context) => {
  const { params, req, res } = context;

  try {
    const { readData } = await import("@/utils/mongo");
    const theSession = await auth0.getSession(req, res);
    const theData = await readData("rooms", params.id);
    if (!theData)
      return {
        notFound: true,
      };

    return {
      props: {
        room: JSON.parse(JSON.stringify(theData)),
        session: theSession || null,
      },
    };
  } catch (err) {
    console.error(err, "Operation failed. ERROR");
    return { notFound: true };
  }
};

export function EventSingleComponent({ room, session }) {
  console.log("Event PIN:", room?.pin);

  // initialise hooks and states here...
  const { questions, createQuestionApi, deleteQuestionApi, updateQuestionApi } =
    useRoom(room);

  const [selectedQuestionId, setSelectedQuestionId] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [user, setUser] = useState(session?.user || null);

  // effects come here...
  useEffect(() => {
    setUser(session?.user || null);
  }, [session]);

  // event handlers come here...
  const handleAddClick = (questionId) => {
    setSelectedQuestionId(questionId);
    setShowModal(true);
  };

  const handleDelete = async (id) => {
    const deleteQuestion = await deleteQuestionApi(id);
  };

  const handleModalClose = () => {
    setShowModal(false);
  };

  const handleEmojiSelect = async (emoji) => {
    if (!selectedQuestionId) return;

    const question = questions.find((q) => q._id === selectedQuestionId);
    const currentReactions = question.reactions || [];
    const updatedReactions = [...currentReactions, emoji];

    await updateQuestionApi(selectedQuestionId, {
      reactions: updatedReactions,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    window.scrollTo({ top: 0, behavior: "smooth" });

    const formData = new FormData(e.target);
    const formValues = Object.fromEntries(formData.entries());

    await createQuestionApi({
      ...formValues,
      eventId: room._id,
      pin: Number(room.pin),
    });

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

  // render comes here...
  return (
    <div>
      <ReduceBrowserSize />
      {!room ? <p>Loading. Please wait...</p> : null}

      <div>
        {user ? <HeaderComponent /> : <GuestHeader />}

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

            <div className="event__details layer-3">
              <div className="event__header">
                <h1>{room.title || room.name}</h1>

                {user && <p className="event__pin">Event pin: {room.pin}</p>}
              </div>
              <div className="event__content">
                <p>{room.description}</p>
              </div>
            </div>

            <br />

            <div className="event__messages">
              <h2 className="event__header-2">{questions.length} questions</h2>

              {user && <SocketComponent roomId={room._id} />}

              {questions.map((questionObject) => (
                <EventQuestionComponent
                  {...questionObject}
                  key={questionObject._id}
                  user={user}
                  handleDelete={handleDelete}
                  handleAddClick={handleAddClick}
                />
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

export default EventSingleComponent;
