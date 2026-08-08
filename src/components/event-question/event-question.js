import Image from "next/image";
import { formatDate } from "@/utils/dates";

const EventQuestionComponent = ({
  room,
  user,
  handleAddClick,
  handleDelete,
  theQuestion,
}) => (
  <div key={theQuestion._id} className="event__messages-2">
    <div>
      <p>
        <small>
          <b>{theQuestion.name} </b>
        </small>
      </p>
      <p>{theQuestion.question}</p>
      <small>
        <b>
          <p className="host-answer">{theQuestion.hostname} </p>
        </b>
      </small>

      <p className="host-answer">{theQuestion.answer}</p>

      <span className="time-stampped">{formatDate(theQuestion)}</span>
    </div>

    {user && user.sub === room.author ? (
      <button onClick={() => handleDelete(theQuestion._id)}>
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
        <Image
          onClick={() => handleAddClick(theQuestion._id)}
          className="emoji-on-question-bar"
          src="/images/select-emoji-5.png"
          alt="React"
          height="15"
          width="15"
        />
      </button>
    )}

    <div className="reactions-container">
      {Object.entries(
        (theQuestion.reactions || []).reduce((acc, emoji) => {
          acc[emoji] = (acc[emoji] || 0) + 1;
          return acc;
        }, {})
      ).map(([emoji, count]) => (
        <div key={emoji} className="reaction-badge">
          <span>{emoji}</span>
          {count > 1 && <span className="reaction-count">{count}</span>}
        </div>
      ))}
    </div>
  </div>
);

export default EventQuestionComponent;
