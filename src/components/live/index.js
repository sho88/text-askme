import "./style.css"




export const Head = () => {
    return (
        <header className="head">
            <div className="head-container">
                <div className="head-button"></div>
                <div className="head-primary-info">
                    <h1>Isaac Olarewaju</h1>
                    <h3>last seen 4 mins ago</h3>
                </div>
                <figure className="head-profile-picture">
                    <img src="/images/ryan-young.jpeg"></img>
                </figure>
            </div>
            <div className="divider"></div>
        </header>
    )
}






export const Input = () => {
    return (
        <div className="message">
            <button className="message-attatch">At</button>
            <form className="message-input">
                <input type="text" placeholder="   Type message"></input>
            </form>
            <button className="message-submit-button" type="submit">Su</button>
        </div>
    )
}




export const MessageTime = () => {
    return (
        <span>
            <time className="sent-time">08:45</time>
        </span>
        
    )
}


export const MessageShape = () => {
    return (
        <span className="triangle"></span>
    )
}

export const MessageShape2 = () => {
    return (
        <span className="triangle2"></span>
    )
}



export const Body = () => {
    return (
        <div className="body-container">

            

            <div className="body-sent-messages">
                    <MessageShape />
                    <p>lorem ipwvej.</p>
                    <MessageTime />
            </div>
            <div className="body-received-messages">
                    <p>This message is receieved. efjvdscdashc vdscjv j vlorem ipsum feb e mesfe fmevwfemf vwfew fmnbewvf jhvej.</p>
                    <MessageTime />
                    <MessageShape2 />
            </div>
            <div className="body-sent-messages">
                <MessageShape />
                <p>This is a sent message. orem ipsum feb e mesfe fmevwfemf vwfew fmnbewvf jhvej.<MessageTime /></p>
            </div>
            <div className="body-received-messages">
                    <p>Love ❤️<MessageTime /></p>
                    <MessageShape2 />
            </div>
            <div className="body-sent-messages">
                    <MessageShape />
                    <p>lorem ipwvej.<MessageTime /></p>
            </div>
            <div className="body-received-messages">
                    <p>This message is receieved. efjvdscdashc vdscjv j vlorem ipsum feb e mesfe fmevwfemf vwfew fmnbewvf jhvej.<MessageTime /></p>
                    <MessageShape2 />
            </div>
            <div className="body-sent-messages">
                <MessageShape />
                <p>lorem ipsum feb e mesfe fmevwfemf vwfew fmnbewvf jhvej.<MessageTime /></p>
            </div>
            <div className="body-received-messages">
                    <p>Love ❤️<MessageTime /></p>
                    <MessageShape2 />
            </div>
            <div className="body-sent-messages">
                    <MessageShape />
                    <p>lorem ipwvej.<MessageTime /></p>
            </div>
            <div className="body-received-messages">
                    <p>This message is receieved. efjvdscdashc vdscjv j vlorem ipsum feb e mesfe fmevwfemf vwfew fmnbewvf jhvej.<MessageTime /></p>
                    <MessageShape2 />
            </div>
            <div className="body-sent-messages">
                <MessageShape />
                <p>lorem ipsum feb e mesfe fmevwfemf vwfew fmnbewvf jhvej.<MessageTime /></p>
            </div>
            <div className="body-received-messages">
                    <p>Love ❤️ <MessageTime /></p>
                    <MessageShape2 />
            </div>
            <div className="body-received-messages">
                    <p>This message is receieved. efjvdscdashc vdscjv j vlorem ipsum feb e mesfe fmevwfemf vwfew fmnbewvf jhvej.<MessageTime /></p>
                    <MessageShape2 />
            </div>
            <div className="body-sent-messages">
                <MessageShape />
                <p>lorem ipsum feb e mesfe fmevwfemf vwfew fmnbewvf jhvej. <MessageTime /></p>
            </div>
            <div className="body-received-messages">
                    <p>Love ❤️ <MessageTime /> </p>
                    <MessageShape2 />
            </div>
        </div>
    )
}



