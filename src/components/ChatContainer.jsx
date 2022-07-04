import React, {useState, useEffect} from 'react';
import axios from 'axios';
import ChatInput from './ChatInput';
import Logout from './Logout';
import Messages from './Messages';
import "../pages/index.css"
import { getMessagesRoute, sendMessageRoute } from '../utils/APIRoutes';

const ChatContainer =  ({currentChat, currentUser}) =>  {

    const [messages, setMEssages] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const res = await axios.post(getMessagesRoute, {
                from: currentUser._id,
                to: currentChat._id,
            });
            setMEssages(res.data);
            console.log("messageData " + res.data);
            console.log("currentUser " + currentUser._id);
            console.log("currentChat " + currentChat._id);
        }
        fetchData();
    }, [currentChat, currentUser]);



    const handleSendMsg = async (msg) => {
        await axios.post(sendMessageRoute, {
            from: currentUser._id,
            to: currentChat._id,
            message: msg,
        })
    }
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
        <div className="py-2 px-8 flex flex-col gap-2 overflow-auto">
            {
                messages.map(messages => {
                    return (
                        <div>
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