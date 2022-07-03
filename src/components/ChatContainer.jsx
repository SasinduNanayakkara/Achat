import React from 'react';
import axios from 'axios';
import ChatInput from './ChatInput';
import Logout from './Logout';
import Messages from './Messages';
import { sendMessageRoute } from '../utils/APIRoutes';

const ChatContainer =  ({currentChat, currentUser}) =>  {

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
    <div className='p-4'>
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
        <div className="chatMessages">
            
        </div>
        <ChatInput handleSendMsg={handleSendMsg}/>
    </div>
    )
}
    </>
  )
}

export default ChatContainer