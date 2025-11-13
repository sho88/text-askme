import { readDocument } from "@/utils/firestore";
import Image from "next/image";
import { DashboardBottomNav } from "@/components/dashboard/DashboardBottomNav";
import HeaderComponent from "@/components/header";
import SubmitQuestionsContainer from "@/components/submit-questions-container/SubmitQuestionsContainer";

/**
 * Import the stylesheets here...
 */
import mainStyle from "@/styles/main.css";
import "@/styles/event.css";
import "@/styles/globals.css";

export async function getServerSideProps({ params }) {
  const room = await readDocument("rooms", params.id);
  return { props: { room } };
}

export default function EventSingleComponent({ room }) {
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
                  alt={room.title}
                  src={room.image}
                  height={100}
                  width={100}
                />
              </div>
            </div>
            <div className="layer-3">
              <div className="event__header">
                <h1>{room.title}</h1>
              </div>

              <div className="event__content">
                <p>
                  {room.description} The event messages will go down here... The
                  event messages will go down here... The event messagesThe
                  event messages will go down here... The event messages
                </p>
                <p className="emphasis">
                  <i>Submit questions below</i>
                </p>
              </div>

              {/* There is currently no footer input in the form, nor footer functionality, thus, no footer information to display */}
              {/* <div className="event__footer">
            <p>Footer information goes here...</p>
          </div> */}
            </div>

            <div className="event__messages">
              <h2 className="event__header-2">Questions</h2>
              <div className="event__messages-2">
                And this is just a ranom question I could be talking abot? Give
                more content? Just giving it a few more words and that, with a
                question mark at the end of the question?
              </div>
              <div className="event__messages-2">
                And this is just a ranom question I could be talking abot? Give
                more content? Just giving it a few more words and that, with a
                question mark at the end of the question?
              </div>
              <div className="event__messages-2">
                And this is just a ranom question I could be talking abot? Give
                more content? Just giving it a few more words and that, with a
                question mark at the end of the question?
              </div>
            </div>
            <SubmitQuestionsContainer>
              <form>
                <div className="submit-questions-container">
                  <textarea
                    className="submit-questions-textarea"
                    placeholder="Submit questions here..."
                    required
                  ></textarea>
                  <button className="submit-questions-button">
                    <Image
                      src="/images/fn-send.png"
                      alt=""
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
