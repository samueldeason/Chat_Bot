import React, { useState, useEffect } from 'react'
import '../Styles/main.css'
import { response } from '../utils/FetchChat'

const Messages = () => {
    const bottomOfPage = document.getElementById("inputfield")
    const [messages, setMessages] = useState(JSON.parse(localStorage.getItem("Messages")) || [{
        bot: true,
        msg: "My name is Aco, I can chat with you online, be your friend, and help you anytime.",
        id: 0
    }])
    const [yourMsg, setYourMsg] = useState("")


    const sendMsg = () => {
        console.log(yourMsg)
        const updatedMsgArray =[...messages, {
            bot:false,
            msg: yourMsg,
            id: messages.length
        }]
        setMessages(updatedMsgArray);
        
    }

    useEffect(() => {
        const lastMsg = messages[messages.length - 1]
        if(lastMsg.bot === false){
            console.log("wait till your done")
            response(lastMsg.msg, messages, setMessages)
           localStorage.setItem("Messages", JSON.stringify(messages))
        }
    }, [messages])


    return (
        <div className="container">
            <div className="header">
                <div className="avatar"><img src="chatbot.png"/></div>
                <p>Chat Bot</p>
            </div>
            <div className="messages">
                {messages.map(({bot, msg, id}) => (
                    <div key={id} className='text'>
                        <p className={bot === true ? 'botMsg' : 'yourMsg'}>
                            {msg}
                        </p>
                    </div>
                ))}
            </div>
            <div id="inputfield">
                    <input onChange={(e)=> setYourMsg(e.target.value)} type="text" placeholder="Message..." style={{width: "70%", height: "40px", borderRadius:'15px', paddingLeft: '30px', marginRight: '5px', marginBottom:'10px', fontSize:"20px"}}/>
                    <button onClick={sendMsg} style={{width: '17%', height: '40px', backgroundColor: '#2A6DEF', borderRadius:'10px', fontSize:"20px", color:"white", padding:"0px", margin:"0px"}}>&#10148;</button>
            </div>
            
        </div>
        
    )
}

export default Messages
