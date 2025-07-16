import dayjs from "dayjs"

export default function RoomMessagesComponent({ messages = [] } = {}) {

  // utility functions...
  function renderCorrectDate(date) {
    return dayjs(date).format('ddd, DD MMMM YYYY, HH:mm:ss')
  }


  // return to the renderer...
  return (
    <div className="body-container">
      {messages.map(message => (
        <div className="body-received-messages-1" key={message.id} data-testid={"received-message-" + message.id}>
          <div className="body-received-messages">
            <span className="triangle2"></span>;
            <p>{message.question || message.message}</p>
          </div>

          <div className="received-time-container-2">
            <time className="sent-time-1" style={{ color: 'white' }}>
              {renderCorrectDate(message.date)}
            </time>
          </div>
        </div>
      ))}
    </div>
  )
}
