import { useEffect, useState } from 'react'
import Pusher from 'pusher-js'

import * as dotenv from 'dotenv'

dotenv.config()


// Enable pusher logging - don't include this in production
Pusher.logToConsole = true;

export default function DashboardComponent() {
  const pusher = new Pusher(process.env.PUSHER_KEY, { cluster: 'mt1' })
  const [messages, setMessages] = useState([])
  const [inputValue, setInputValue] = useState('');
  
  useEffect(() => {
    // remember to move these to environment variables...
    const channel = pusher.subscribe('my-channel')
    channel.bind('my-event', data => {
      console.clear()
      console.log(data)
      setMessages(messages => [...messages, data.message])
    })

    return () => pusher.unsubscribe('my-channel')
  }, [])


  // events go here...
  function handleInputChange(event) {
    setInputValue(event.target.value)
  }

  function handleSubmit(event) {
    event.preventDefault()

    const message = {
      text: inputValue,
      timestamp: new Date().toISOString(),
    }

    pusher.send_event('my-channel', 'my-event', { message })

    setInputValue('')
  }

  return (
    <div>
      <p>This is the dashboard component...</p>
      <div>
        {messages.map((message, index) => (
          <div key={index}>
            <span>{message.timestamp}: </span>
            <span>{message.text}</span>
          </div>
        ))}
      </div>
      <form onSubmit={handleSubmit}>
        <input type="text" value={inputValue} onChange={handleInputChange} />
        <button type="submit">Send</button>
      </form>
    </div>
  )
}
