import React from 'react'
import {useNavigate} from "react-router-dom"
import logo from "../asserts/chatX.png"
const Home = () => {
    const navigate = useNavigate();
    const onClick = () => {
        navigate("/login");
    }
  return (
    <div className='flex justify-center items-center flex-col bg-gray-700 h-screen'>
        <img src={logo} alt="logo" className='h-2/5 mb-10 transition ease-in-out delay-150 hover:-translate-y-1 duration-700 hover:scale-110' />
        <h2 className='text-white text-xl mb-10'>Instant messages for your loved ones</h2>
        <button className='bg-amber-400 text-black py-4 px-10 border-none cursor-pointer transition ease-in-out delay-150 hover:-translate-y-1 duration-700 hover:scale-110 rounded-lg text-xl font-bold hover:bg-amber-500' onClick={onClick}>Sign in</button>
    </div>
  )
}

export default Home;