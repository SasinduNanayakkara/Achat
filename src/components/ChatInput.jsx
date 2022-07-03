import React, {useState} from 'react'
import Picker from "emoji-picker-react";
import {IoMdSend} from "react-icons/io";
import {BsEmojiSmileFill} from "react-icons/bs";
import "../pages/index.css"
const ChatInput = ({handleSendMsg}) => {

    const [emojiPicker, setEmojiPicker] = useState(false);
    const [message, setMessage] = useState("");

    const handleEmojiPickerHideShow = () => {
        setEmojiPicker(!emojiPicker);
    };

    const handleEmojiClick = (event, emoji) => {
        let msg = message;
        msg += emoji.emoji;
        setMessage(msg);
    };

    const sendChat = (event) => {
        event.preventDefault();
        if (message.length > 0) {
            handleSendMsg(message);
            setMessage("");
        }
    }

  return (
    <div className='grid items-center mb-20 bg-slate-700 px-1 pb-2 msgInputContainer rounded-full'>
        <div className="flex items-center px-2 pt-1 text-white gap-4">
            <div className="relative ">
            <BsEmojiSmileFill onClick={handleEmojiPickerHideShow} className='text-xl text-amber-400 cursor-pointer'/>
            {emojiPicker &&  <Picker className="absolute -top-96 bg-slate-600 shadow-lg border-slate-600" onEmojiClick={handleEmojiClick}/>}
            </div>
        </div>
    <form onSubmit={(e) => sendChat(e)} className='w-full rounded-md flex content-center gap-8 bg-slate-700'>
        <input type="text" value={message} onChange={(e) => setMessage(e.target.value)} className='w-5/6 h-3/5 text-white bg-transparent border-none pl-4 text-lg selection:bg-slate-400 focus:outline-none' placeholder='Type Message' id="" />
        <button type="submit" className='py-2 px-8 rounded-full gap-4 flex justify-center items-center bg-amber-500 border-none'>
            <IoMdSend className='text-lg text-black'/>
        </button>
    </form>
    </div>
  )
}

export default ChatInput