export const Body = () => {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const eventSource = new EventSource(
      "https://text-qanda-720b5eca6135.herokuapp.com/api/sse"
    );
    eventSource.addEventListener("message", (event) =>
      setMessages(JSON.parse(event.data))
    );
    eventSource.addEventListener("error", (error) => console.log(error));
  }, []);

  useEffect(() => {
    console.log(messages);
  }, [messages]);

  return (
    /*DELETE SOON / THIS IS JUST FOR SHOW*/
    <div className="body-container">
      <div className="body-received-messages-1">
        <div className="body-received-messages">
          <p>
            dhsadv sadhvsa bfm dds mbds dsds mds for show and tnkd sd kjnsw dc
          </p>
        </div>
      </div>

      <>
        {/* THIS IS THE REASON WHY THE MESSAGES WERE PRINTING PLAINLY IN THE WEBSITE */}
        <pre>{JSON.stringify(messages, null, 2)}</pre>
      </>
    </div>
  );
};
