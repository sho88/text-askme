import { useState, useEffect, useMemo } from "react";
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
import EmojiContainer from "@/components/emoji/EmojiContainer";
import { formatDate } from "@/utils/dates";
import useRoom from "@/hooks/room";

export const getServerSideProps = async ({ params }) => {
  try {
    const { readData } = await import("@/utils/mongo");
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

export function EventSingleComponent({ room }) {
  // initialise the hooks here...
  const { questions, setQuestions, createQuestionApi, deleteQuestionApi } =
    useRoom(room);

  const router = useRouter();
  const { dispatch, state } = useContext(TheFatherContext);
  const [showModal, setShowModal] = useState(false);
  const isGuest = useMemo(() => state.role === "guest", [state.role]);

  // useEffects etc go here...
  // This tells the browser: "If the modal is open, hide the scrollbar. If not, show it."
  useEffect(() => {
    document.body.style.overflow = showModal ? "hidden" : "unset";
  }, [showModal]);

  useEffect(() => {
    if (router.query.fromPin === "true") {
      dispatch({ type: "SET_ROLE", payload: "guest" });
    }
  }, [router.query.fromPin, dispatch]);

  // events handlers go here...
  const handleAddClick = () => {
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

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Changing 'instant' to 'smooth' creates the glide effect
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
      {!room ? <p>Loading. Please wait...</p> : null}

      <div>
        {!isGuest ? <HeaderComponent /> : <GuestHeader />}

        {showModal && <EmojiContainer onModalClose={handleModalClose} />}

        <div className="event">
          <div className="event__container">
            <div className="background-2"></div>
            <div
              onClick={handleToBottom}
              className="pop-up-indicator"
              id="hideMe"
            >
              <span>
                {isGuest
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
              </div>
              <div className="event__content">
                <p>{room.description}</p>
              </div>
            </div>

            <br />

            <div className="event__messages">
              <h2 className="event__header-2">
                Questions ({questions.length})
              </h2>
              {/* <button className="random1ne" onClick={handleModalClose}>
                HIDE
              </button> */}

              {questions.map((msgObj) => (
                <div key={msgObj._id} className="event__messages-2">
                  <div>
                    <p>{msgObj.question}</p>
                    <span className="time-stampped">
                      {/* {formatDate(msgObj) || "18:04"} */}
                      19.05
                    </span>
                  </div>

                  {!isGuest ? (
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
                        onClick={handleAddClick}
                        className="emoji-on-question-bar"
                        src="/images/select-emoji-5.png"
                        alt="Up arrow"
                        height="15"
                        width="15"
                      />
                    </button>
                  )}
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
                        name="question"
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

        {!isGuest && <DashboardBottomNav />}
      </div>
    </div>
  );
}

export const exportThis = ({ room }) => {
  return (
    <Provider>
      <EventSingleComponent room={room} />
    </Provider>
  );
};

export default exportThis;
