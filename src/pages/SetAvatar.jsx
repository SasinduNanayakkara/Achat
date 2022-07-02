import React, { useState, useEffect } from 'react'
import {useNavigate} from "react-router-dom";
import axios from 'axios';
import {ToastContainer, toast} from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import {setAvatarRoute} from '../utils/APIRoutes';
import loader from "../asserts/loding.gif";
import {Buffer} from "buffer"
const SetAvatar = () => {

    const api = "https://api.multiavatar.com/4534";
    const navigate = useNavigate();

    const [avatars, setAvatars] = useState([]);
    const [isloading, setIsLoading] = useState(true);
    const [selectedAvatar, setSelectedAvatar] = useState(null);

    const toastOptions = {
        position: "top-right",
        autoClose: 5000,
        pauseOnHover: true,
        draggalble: true,
        theme: "dark",
    }

    useEffect(() => {
        async function navigateTo()  {
            if (!localStorage.getItem("user")) {
                navigate("/login");
            }
        }
        navigateTo();
    });
    const setProfilePicture = async () => {
        if(selectedAvatar === null) {
            toast.error("Please select an Avatar", toastOptions);
        }
        else {
            const user = await JSON.parse(localStorage.getItem("user"));
            const {data} = await axios.post(`${setAvatarRoute}/${user._id}`, {
                image: avatars[selectedAvatar],
            });

            if(data.isSet) {
                user.isAvatarImageSet = true;
                user.avatarImage = data.image;
                localStorage.setItem("user", JSON.stringify(user));
                navigate("/chat");
            }
            else {
                toast.error("Error setting avatar. Please try again", toastOptions);
            }
        }
    }

    useEffect( () => {
        async function fetchData() {
        const data = [];
        for (let i = 0; i < 4; i++) {
            const image = await axios.get(
                `${api}/${Math.round(Math.random() * 1000)}`
            );
            const buffer = new Buffer(image.data);
            data.push(buffer.toString("base64"));
        }
        setAvatars(data);
        setIsLoading(false);
    }
    fetchData();
}, []);

  return (
    <>
    {
        isloading ? 
        <div className='flex justify-center items-center flex-col gap-12 bg-gray-700 h-screen w-full'>
        <img src={loader} alt="loader" className='bg-gray-700'/>
        </div>
        : (

            <div className='flex justify-center items-center flex-col gap-12 bg-gray-700 h-screen w-full'>
            <div className='flex justify-center text-4xl'>
                <h1 className='text-white '>Pick an avatar as your profile picture</h1>
            </div>
            <div className='flex gap-8'>
                {avatars.map((avatar, index) => {
                        return (
                            <div 
                                key={index} 
                                className={`avatar ${selectedAvatar === index ? "border-4 border-amber-400 rounded-full transition ease-in-out" : ""
                                }`}
                            >
                                <img 
                                    src={`data:image/svg+xml;base64,${avatar}`} 
                                    alt="avatar"
                                    className='border-2 border-transparent h-24'
                                    onClick={() => setSelectedAvatar(index)} 
                                    />
                            </div>
                        );
                    })}
            </div>
            <button className='py-4 px-8 border-none bg-amber-400 font-bold cursor-pointer rounded-lg text-lg hover:bg-amber-500' onClick={setProfilePicture}>Set as Profile Picture</button>
        </div>
    )}
        <ToastContainer/>
    </>
  )
}

export default SetAvatar;