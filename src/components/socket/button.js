export const SocketButton = ({ hasNewQuestionProp, setHasNewQuestionProp }) => {
  return (
    <>
      <button
        disabled={!hasNewQuestionProp}
        className={
          hasNewQuestionProp ? "socket-button-new" : "socket-button-no-new"
        }
        onClick={() => {
          if (!hasNewQuestionProp) return;

          // will come back to sort this...
          window.scrollTo({ top: 0, behavior: "smooth" });
          window.location.reload();

          // ...and this...
          setHasNewQuestionProp(false);
        }}
      >
        Load Latest Question(s)
      </button>
    </>
  );
};
