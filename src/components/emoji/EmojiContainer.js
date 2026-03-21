import Image from "next/image";

export const EmojiContainer = ({ onModalClose, onEmojiSelect }) => {
  const emojis = [
    "❤️",
    "💯",
    "💡",
    "😂",
    "🙋",
    "🙏",
    "❓",
    "🔥",
    "💃",
    "😊",
    "🚨",
    "🧠",
    "🎉",
    "👀",
    "👏",
    "🤷",
    "🤣",
    "💭",
    "✅",
    "‼️",
    "🤯",
    "💀",
    "🤭",
    "👍",
    "⏳",
    "👌",
    "❗",
    "🤔",
    "👎",
  ];

  return (
    <div className="emoji-modal-background">
      <div className="emoji-modal">
        <div className="emoji-modal-header-container">
          <h1 className="event__header-2">Tap Reaction</h1>
          <Image
            className="questions-cross"
            src="/images/cross-cancel.png"
            alt="Close"
            height="10"
            width="10"
            style={{ cursor: "pointer" }}
            onClick={onModalClose}
          />
        </div>

        <div className="emoji-modal-container">
          {emojis.map((emoji) => {
            // This logic checks which emoji we are currently looking at
            // and gives it the special "Big" class from your CSS if needed.
            let className = "";
            if (emoji === "❤️") className = "big-heart";
            else if (emoji === "👍") className = "emoji-thumbs-up";

            return (
              <div
                key={emoji}
                className={className}
                style={{ cursor: "pointer" }}
                onClick={() => {
                  onEmojiSelect(emoji); // This tells the main page which one you picked
                  onModalClose(); // This closes the pop-up
                }}
              >
                {emoji}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default EmojiContainer;
