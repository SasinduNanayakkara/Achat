import React, {useState, useEffect} from 'react'
import "../pages/index.css"
const Contact = ({contacts, currentUser}) => {

    const [currentUSername, setCurrentUSername] = useState(undefined);
    const [currentUserImage, setCurrentUserImage] = useState(undefined);
    const [currentUSerSelected, setCurrentUserSelected] = useState(undefined);

    useEffect(() => {
        if (currentUser) {
            setCurrentUSername(currentUser.username);
            setCurrentUserImage(currentUser.image);
        }
    }, [currentUser]);

    const changeCurrentChat = (index, contact) => {

    }
  return (
    <>
        {
            currentUserImage && currentUSername && (
                <div className='grid overflow-hidden bg-slate-600 chatContainer'>
                    <div className='flex items-center justify-center gap-4'>
                        <img src="" alt="logo" className='h-8' />
                        <h3 className='text-white'>Achat</h3>
                    </div>
                    <div className="flex flex-col items-center overflow-auto gap-3 bg-slate-600">
                        {
                            contacts.map((contact, index) => {
                                return (
                                    <div className={`contact 
                                        ${index === currentUSerSelected ? "selected": ""}`}
                                        key={index}
                                    >
                                        <div className="avatar">
                                            <img src={`data:image/svg+xml;base64,${contact.avatarImage}`} 
                                            alt="avatar" />
                                        </div>
                                        <div className="username">
                                            <h3>{contact.username}</h3>
                                        </div>
                                    </div>
                                )
                            })}
                    </div>
                    <div className="currentUser">
                        <div className="avatar">
                            <img src={`data:image/svg+xml;base64,${currentUserImage}`} 
                                alt="avatar" />                                </div>
                        <div className="username">
                            <h2>{currentUSername}</h2>
                        </div>
                    </div>
                </div>
            )
        }
    </>
  )
}

export default Contact;