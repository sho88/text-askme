import "@/styles/event.css";
import "@/styles/globals.css";
import mainStyle from "@/styles/main.css";
import Image from "next/image";

export const EmojiContainer = () => {
  return (
    <div className="emoji-modal-background">
      <div className="emoji-modal">
        <div className="emoji-modal-header-container">
          <h1 className="event__header-2">Tap Reaction</h1>
          <Image
            className="questions-cross"
            src="/images/cross-cancel.png"
            alt="Delete"
            height="10"
            width="10"
          />
        </div>

        <div className="emoji-modal-container">
          <div className="big-heart">❤️</div>
          <div>💯</div>
          <div>💡</div>
          <div>👌</div>
          <div>🙋</div>
          <div>🙏</div>
          <div>❓</div>
          <div>🔥</div>
          <div>💃</div>
          <div>😊</div>
          <div>🚨</div>
          <div>🧠</div>
          <div>🎉</div>
          <div>👀</div>
          <div>👏</div>
          <div>🤷</div>
          <div>‼️</div>
          <div>💭</div>
          <div>✅</div>
          <div className="big-shock">👍</div>
          <div>❗</div>
          <div>🤔</div>
          <div>💪</div>
          <div>👎</div>
        </div>
      </div>
    </div>
  );
};

export default EmojiContainer;
