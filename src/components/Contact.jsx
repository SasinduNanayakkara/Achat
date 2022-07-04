import React, {useState, useEffect} from 'react'
import "../pages/index.css"
import logo from "../asserts/chatX.png"

const Contact = ({contacts, currentUser, changeChat}) => {

    const [currentUSername, setCurrentUSername] = useState(undefined);
    const [currentUserImage, setCurrentUserImage] = useState(undefined);
    const [currentUSerSelected, setCurrentUserSelected] = useState(undefined);

    useEffect(() => {
        if (currentUser) {
            setCurrentUSername(currentUser.username);
            setCurrentUserImage(currentUser.avatarImage);
        }
    }, [currentUser]);

    const changeCurrentChat = (index, contact) => {
        setCurrentUserSelected(index);
        changeChat(contact);
    }

  return (
    <>
        {
            currentUserImage && currentUSername && (
                <div className='grid overflow-hidden bg-slate-800 chatContainer'>
                    <div className='flex items-center justify-center gap-4'>
                        <img src={logo} alt="logo" className='h-11' />
                        <h3 className='text-amber-300 text-4xl font-bold'>ChatX</h3>
                    </div>
                    <div className="flex flex-col items-center mt-4 overflow-auto gap-3 bg-slate-800 contacts">
                        {
                            contacts.map((contact, index) => {
                                return (
                                    <div className={`bg-slate-800 min-h-20 w-4/5 cursor-pointer rounded-sm p-2 flex items-center transition-all ease-in-out
                                        ${index === currentUSerSelected ? "bg-slate-500": ""}`}
                                        key={index}
                                        onClick={() => changeCurrentChat(index, contact)}
                                    >
                                        <div className="avatar">
                                            <img src={`data:image/svg+xml;base64,${contact.avatarImage}`} 
                                                alt="avatar"
                                                className='h-12'
                                            />
                                        </div>
                                        <div className="text-white px-5 text-lg">
                                            <h3>{contact.username}</h3>
                                        </div>
                                    </div>
                                )
                            })}
                    </div>
                    <div className="bg-slate-700 flex justify-center mb-4 mx-2 items-center gap-4">
                        <div className="avatar">
                            <img src={`data:image/svg+xml;base64,${currentUserImage}`} 
                                alt="avatar"
                                className='h-16'
                                />                                </div>
                        <div className="username">
                            <h2 className='text-amber-400 text-lg'>{currentUSername}</h2>
                        </div>
                    </div>
                </div>
            )
        }
    </>
  )
}

export default Contact;