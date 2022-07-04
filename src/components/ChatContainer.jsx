import React, {useState, useEffect, useRef} from 'react';
import axios from 'axios';
import ChatInput from './ChatInput';
import Logout from './Logout';
import "../pages/index.css"
import { getMessagesRoute, sendMessageRoute } from '../utils/APIRoutes';
import {v4 as uuidv4} from "uuid";

const ChatContainer =  ({currentChat, currentUser, socket}) =>  {

    const scrollRef = useRef();
    const [messages, setMessages] = useState([]);
    const [arrivalMsg, setArrivalMsg] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            if(currentChat) {
                const res = await axios.post(getMessagesRoute, {
                    from: currentUser._id,
                    to: currentChat._id,
                });
                setMessages(res.data);
            }
        }
        fetchData();
    }, [currentChat, currentUser]);



    const handleSendMsg = async (msg) => {
        await axios.post(sendMessageRoute, {
            from: currentUser._id,
            to: currentChat._id,
            message: msg,
        });

        socket.current.emit("send-msg", {
            to: currentChat._id,
            from: currentUser._id,
            message: msg,
        });

        const msgs = [...messages];
        msgs.push({fromSelf: true, message: msg});
        setMessages(msgs);
    }

    useEffect(() => {
        if(socket.current) {
            socket.current.on("msg-received", (msg) => {
                setArrivalMsg({fromSelf: false, message: msg});
            });
        }
    },[socket]);

    useEffect(() => {
        arrivalMsg && setMessages((prev) => [...prev, arrivalMsg]);
    }, [arrivalMsg]);

    useEffect(() => {
        scrollRef.current?.scrollIntoView({ behavior: "smooth" });
      }, [messages]);

  return (
    <>
    {
        currentChat && (
    <div className='pt-4 pb-0 chatContentContainer'>
        <div className="flex justify-between items-center py-0 px-8">
            <div className="flex items-center gap-4 ">
                <div className="avatar">
                <img src={`data:image/svg+xml;base64,${currentChat.avatarImage}`} 
                    alt="avatar"
                    className='h-16'
                />
                </div>
                <div className="username">
                    <h3 className='text-white text-lg font-semibold'>{currentChat.username}</h3>
                </div>
            </div>
            <Logout/>
        </div>
        <div className="py-2 px-8 flex flex-col gap-2 overflow-auto chat-msg">
            {
                messages.map(messages => {
                    return (
                        <div ref={scrollRef} key={uuidv4()}>
                            <div className={`flex items-center ${messages.fromSelf ? "justify-end bg-slate-400 send": "justify-start bg-gray-500 received"}`}>
                                <div className="max-w-sm break-words p-4 text-base rounded-lg text-white content">
                                    <p>
                                        {messages.message}
                                    </p>
                                </div>

                            </div>
                        </div>
                    );
                })}
        </div>
        <ChatInput handleSendMsg={handleSendMsg}/>
    </div>
    )
}
    </>
  )
}

export default ChatContainer