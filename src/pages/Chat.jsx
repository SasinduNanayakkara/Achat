import React, {useEffect, useState} from 'react'
import "./index.css"
import {useNavigate} from "react-router-dom"
import axios from 'axios';
import {allUsersRoute} from "../utils/APIRoutes";
import Contact from "../components/Contact";
import Welcome from '../components/Welcome';
import ChatContainer from '../components/ChatContainer';
const Chat = () => {

  const navigate = useNavigate();
  const [contacts, setContacts] = useState([]);
  const [currentUser, setCurrentUser] = useState(undefined);
  const [currentChat, setCurrentChat] = useState(undefined);
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    async function navigateTo()  {
      if (!localStorage.getItem("user")) {
          navigate("/login");
      }
      else {
        setCurrentUser(JSON.parse(localStorage.getItem("user")));
        setIsLoaded(true);
      }
  }
  navigateTo();
  },[navigate]);
  
  useEffect(() => {
    const fetchData = async () => {
      if(currentUser) {
        if (currentUser.isImageSet) {
          const res = await axios.get(`${allUsersRoute}/${currentUser._id}`);
          console.log("yes");
          console.log(res.data);
          setContacts(res.data);
        }
        else {
          navigate("/avatar");
        }
      }
    }
    fetchData();
  }, [currentUser, navigate]);

  console.log(currentUser);

  const handleChatChange = (chat) => {
    setCurrentChat(chat);
  }

  return (
    <>
      <div className='h-screen w-full flex flex-col justify-center gap-4 items-center bg-gray-700'>
        <div className='h-4/5 w-4/5 bg-slate-600 grid grid-cols-2 container'>
          <Contact 
            contacts={contacts} 
            currentUser={currentUser} 
            changeChat={handleChatChange}
          />
          {
            isLoaded && currentChat === undefined ? (
              <Welcome />
            ) : (
              <ChatContainer currentChat={currentChat} currentUser={currentUser}/>
            )
          }
        </div>
      </div>
    </>
  )
}

export default Chat;