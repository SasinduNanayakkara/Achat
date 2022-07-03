import React from 'react';
import robot from "../asserts/robot.gif"

const Welcome = () => {
    const username = JSON.parse(localStorage.getItem("user")).username;
  return (
    <div className='flex justify-center items-center flex-col text-white'>
        <img src={robot} alt="robot" className='h-80'/>
        <h1>
            Welcome, <span className='text-amber-300'>{username}</span>
        </h1>
        <h3>Please select a message to start messaging</h3>
    </div>
  )
}

export default Welcome