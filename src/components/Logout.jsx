import React from 'react'
import {useNavigate} from "react-router-dom";
import {BiPowerOff} from "react-icons/bi"
const Logout = () => {

  const navigate = useNavigate();
  const handleClick = async () => {
    localStorage.clear();
    navigate("/login");
  };
  return (
    <div>
      <button className='flex justify-center items-center p-2 rounded-sm cursor-pointer border-none text-amber-500 bg-amber-400'>
        <BiPowerOff className='text-black font-bold text-base' onClick={handleClick}/>
      </button>
    </div>
  )
}

export default Logout;