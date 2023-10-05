import { useEffect, useRef, useState } from "react"
import "./style.css"
import { RandomButton } from "./RandomButton"
import { RandomDiv } from "./random-div"









export const Head = () => {
    


    return (
        <header className="head">
            <div className="head-container">
                <div className="head-button">
                    <img src="/images/left-arrow.png"></img>
                </div>
                <div className="head-primary-info">
                    <h1>Clive Stephenson</h1>
                    <h3>last seen 4 mins ago</h3>
                </div>
              <ProfilePictureImage />
            </div>
            <div className="divider"></div>
        </header>
    )
}











const ProfilePictureImage = () => {
    const[showImage, setShowImage] = useState(true)

    const clickProfilePucFunction = () => {
        setShowImage(!showImage)
    }


    return (
        <figure onClick={clickProfilePucFunction} className="head-profile-picture" >
            <img className={`head-profile-picture1${!showImage ? ' head-profile-picture--hide' : ''}`} src="/images/ryan-young.jpeg"></img>
        </figure>
    )
}










export const ProFilePicture = () => {
    return (
        <picture className="profile-picture-full-size">
            <img    src="/images/ryan-young.jpeg"
                    alt="Profile Picture"
                    srcSet="/images/ryan-young.jpeg 1x,
                            /images/ryan-young.jpeg 2x,
                            /images/ryan-young.jpeg 3x">
            </img>
        </picture>
    )
}





export const Input = () => {
    return (
        <div className="message">
            <div className="message-container">
                <button className="message-attatch-button">
                    <img src="/images/paper-clip-o.png"></img>
                </button>
                
                <TextAreaInput />
                
                <button className="message-submit-button" type="submit">
                    <img src="/images/paper-plane-o.png"></img>
                </button>
            </div>
            
        </div>
    )
}

   


   /*export const TextArea = () => {
    const textAreaRef = useRef(null);
    const[val, setVal] = useState("");
    const handleChange = (e) => {
        setVal(e.target.value);
    }

    useEffect(() => {
        textAreaRef.current.style.height = textAreaRef.current.scrollHeight + "px";
    }, [val])

    return (
        <div className="textarea-container">
            <div className="message-input">
                <textarea className="message-textarea" placeholder="Type message" type="text" value={val} onChange={handleChange} rows="1" ref={textAreaRef}></textarea>
            </div>
        </div>
        
    )
}*/



const Filler = () => {
    return (
        <div className="filler"></div>
    )
}






export const TextAreaInput = () => {
        const textAreaRef2 = useRef(null);
        const [val, setVal] = useState("");
        const handleChange2 = (e) => {
            setVal(e.target.value);
        }


        useEffect(() => {
            textAreaRef2.current.style.height = "auto";
            textAreaRef2.current.style.height = textAreaRef2.current.scrollHeight + "px";
        }, [val])


    return (
        <div className='whatnot0'>
            <div className="whatnot1">
                <textarea className="textarea1" placeholder="Type message" value={val} onChange={handleChange2} rows="1" ref={textAreaRef2}></textarea>
            </div>
        </div>

    );
}








export const MessageTime = () => {
    return (
        <span>
            <time className="sent-time">08:45</time>
        </span>
        
    )
}


export const MessageTime2 = () => {
    return (
        <div className="sent-time-container">
            <time className="sent-time-2">11:45</time>
        </div>
        
    )
}


export const MessageTime3 = () => {
    return (
        <div className="sent-time-container-2">
            <time className="sent-time-2">11:45</time>
        </div>
        
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





const MessageSentReceivedImage = () => {
    return (
        <picture>
            <div>
                <img className="sent-received-the-image" src="/images/purple-landscape.jpg"></img>
            </div>
        </picture>
    )
}





export const Body = () => {
    return (
        <div className="body-container">




            




            <div className="body-sent-messages-1">
                <div className="body-sent-messages">
                        <p>lorem ipwve jlll ll.l iiii dmscv dsdscm dsvcdsmch vdscdsm chvdsmsj wdjdiid dsdsb k 🔥</p>
                        <MessageShape />

                </div><MessageTime2 /></div>

           



                <div className="body-received-messages-1">
                 <div className="body-received-messages">
                    <MessageShape2 />
                        <p>This message is receieved. efjvdscdashc vdscjv j vlorem ipsum feb e mesfe fmevwfemf vwfew fmnbewvf jhvej. and ❤️</p>
                        </div><MessageTime3 /></div>

   



                        <div className="body-sent-messages-1">
                <div className="body-sent-messages">
                        <p>lorem ipwve jlll ll.l iiii dmscv dsdscm dsvcdsmch vdscdsm chvdsmsj wdjdiid dsdsb k 😂😂😂😂😂😂😂😂😂</p>
                        <MessageShape />

                </div><MessageTime2 /></div>

           



            <div className="body-received-messages-1">
                <div className="body-received-messages">
                    <MessageShape2 />
                        <p>This message is receieved. efjvdscdashc vdscjv j vlorem ipsum feb e mesfe 🔥🔥</p>
                        </div><MessageTime3 /></div>





                        <div className="body-sent-messages-1">
                <div className="body-sent-messages">
                        <p>🔋🔋🔋🔋🔋</p>
                        <MessageShape />

                </div><MessageTime2 /></div>

           



            <div className="body-received-messages-1">
                <div className="body-received-messages">
                    <MessageShape2 />
                        <p>This message is receieved. efjvdscdashc vdscjv j vlorem ipsum feb e mesfe fmevwfemf vwfew fmnbewvf jhvej. and ❤️</p>
                        </div><MessageTime3 /></div>

   



                        <div className="body-sent-messages-1">
                <div className="body-sent-messages">
                        <p>lorem ipwve jlll ll.l iiii dmscv dsdscm dsvcdsmch vdscdsm chvdsmsj wdjdiid dsdsb k</p>
                        <MessageShape />

                </div><MessageTime2 /></div>

           



            <div className="body-received-messages-1">
                <div className="sent-received-images">
                        <MessageSentReceivedImage />
                        <p>This message is receieved. ef❤️</p>
                        </div><MessageTime3 /></div>





        
                        <div className="body-sent-messages-1">
                <div className="body-sent-messages">
                        <p>lorem ipwve jlll ll.l iiii dmscv dsdscm dsvcdsmch vdscdsm chvdsmsj wdjdiid dsdsb k</p>
                        <MessageShape />

                </div><MessageTime2 /></div>

           



            <div className="body-received-messages-1">
                <div className="body-received-messages">
                    <MessageShape2 />
                        <p>This message is receieved. efjvdscdashc vdscjv j vlorem ipsum feb e mesfe fmevwfemf vwfew fmnbewvf jhvej. and ❤️</p>
                        </div><MessageTime3 /></div>

   



                        <div className="body-sent-messages-1">
                <div className="body-sent-messages">
                        <p>lorem ipwve jlll ll.l iiii dmscv dsdscm dsvcdsmch vdscdsm chvdsmsj wdjdiid dsdsb k</p>
                        <MessageShape />

                </div><MessageTime2 /></div>

           



            <div className="body-received-messages-1">
                <div className="body-received-messages">
                    <MessageShape2 />

                        <p>This message is receieved. efjvdscdashc vdscjv j vlorem ipsum feb e mesfe fmevwfemf vwfew fmnbewvf jhvej. and ❤️</p>
                        </div><MessageTime3 /></div>



            

                        {/*<RandomButton />*/}
                        {/*<RandomDiv />*/}
                        
                
                 



        </div>
    )
}










