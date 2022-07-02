import React, {userState, useEffect, useState} from 'react'
import "./index.css"
import {useNavigate} from "react-router-dom"
import axios from 'axios';
import {allUsersRoute} from "../utils/APIRoutes";
import Contact from "../components/Contact";
const Chat = () => {

  const navigate = useNavigate();
  const [contacts, setContacts] = useState([]);
  const [currentUser, setCurrentUser] = useState(undefined);

  useEffect(() => {
    async function navigateTo()  {
      if (!localStorage.getItem("user")) {
          navigate("/login");
      }
      else {
        setCurrentUser(JSON.parse(localStorage.getItem("user")));
      }
  }
  navigateTo();
  })

  useEffect(() => {
    async function getContacts() { 
      if (currentUser) {
        if (currentUser.isImageSet) {
          const data = await axios.get(`${allUsersRoute}/${currentUser._id}`);
          setContacts(data.data);
        }
        else {
          navigate("/avatar");
        }
        }
      }
    getContacts();
  }, [currentUser]);
  return (
    <>
      <div className='h-screen w-full flex flex-col justify-center gap-4 items-center bg-gray-700'>
        <div className='h-4/5 w-4/5 bg-slate-600 grid grid-cols-2 container'>
          <Contact contacts={contacts} currentUser={{currentUser}}/>
        </div>
      </div>
    </>
  )
}

export default Chat