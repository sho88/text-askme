import { useEffect, useState } from "react"

export const RandomButton = () => {

    const[messages, setMessages] = useState([])

    useEffect(() => {
        const eventSource = new EventSource( 'https://text-qanda-720b5eca6135.herokuapp.com/api/sse' )
        eventSource.addEventListener('message', event => setMessages(JSON.parse(event.data)))
        eventSource.addEventListener('error', error => console.log(error))
    }, [])

    return (
        <div>
            {messages.map((message, key) => {
                return (
                    <div key={key}>
                        {message.body}
                    </div>
                )
            })}
            <button className="abcde">Random text ipsum</button>
        </div>
    )
}



