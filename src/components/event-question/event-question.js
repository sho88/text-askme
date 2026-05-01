import Image from "next/image";
import { formatDate } from "@/utils/dates";

const EventQuestionComponent = ({
  user,
  handleAddClick,
  handleDelete,
  ...props
}) => (
  <div key={props._id} className="event__messages-2">
    <div>
      <p>
        <small>
          <b>{props.name} </b>
        </small>
      </p>
      <p>{props.question}</p>
      <small>
        <b>
          <p className="host-answer">{props.hostname} </p>
        </b>
      </small>

      <p className="host-answer">{props.answer}</p>

      <span className="time-stampped">{formatDate(props)}</span>
    </div>
    {user ? (
      <button onClick={() => handleDelete(props._id)}>
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
          onClick={() => handleAddClick(props._id)}
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
        (props.reactions || []).reduce((acc, emoji) => {
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
