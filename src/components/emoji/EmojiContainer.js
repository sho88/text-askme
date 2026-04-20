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
            let className = "";
            if (emoji === "❤️") className = "big-heart";
            else if (emoji === "👍") className = "emoji-thumbs-up";

            return (
              <div
                key={emoji}
                className={className}
                onClick={() => {
                  onEmojiSelect(emoji);
                  onModalClose();
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
