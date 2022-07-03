import React, { useEffect } from 'react'
import {Link, useNavigate} from "react-router-dom";
import axios from 'axios';
import {loginRoute} from "../utils/APIRoutes"
import logo from "../asserts/chatX.png"
import {ToastContainer, toast} from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import { useState } from 'react';

const Login = () => {

    const navigate = useNavigate();
    const [values, setValues] = useState({
        username: "",
        password: "",
    });

    const toastOptions = {
        position: "top-right",
        autoClose: 5000,
        pauseOnHover: true,
        draggalble: true,
        theme: "dark",
    }

    useEffect(() => {
        if(localStorage.getItem("user")) {
            navigate("/chat");
        }
    })
    

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (handleValidation()) {
            const {username, password} = values;
            const {data} = await axios.post(loginRoute, {
                username,
                password,
            });
            if (data.status === false) {
                toast.error(data.message, toastOptions);
            }
            else {
                localStorage.setItem("user", JSON.stringify(data.user));
                navigate("/chat");
            }
        }
    }

    const handleValidation = () => {
        const {password, username} = values;

        if(username.length === 0) {
            toast.error("Username is required", {
                position: "top-right",
                autoClose: 5000,
                pauseOnHover: true,
                draggable: true,
                theme: "dark"
            });
            return false;
        }
        else if(password.length ===  0) {
            toast.error("Password is required", {
                position: "top-right",
                autoClose: 5000,
                pauseOnHover: true,
                draggable: true,
                theme: "dark"
            });
            return false;
        }
        else {
            return true;
        }
        
    }
    const handleChange = (event) => {
        setValues({ ...values, [event.target.name]: event.target.value });
    }


  return (
    <>
        <div className='h-screen w-full  flex flex-col justify-center gap-4 items-center bg-gray-700'>
            <form onSubmit={(event) => handleSubmit(event)} className='flex flex-col gap-8 bg-slate-500 rounded-lg p-20'>
                <div className='flex items-center gap-4 justify-center'>
                    <img src={logo} className='h-20' alt="" />
                </div>
                <input type="text" onChange={(e) => handleChange(e)} placeholder='Username' name='username' className="bg-transparent p-4 border-2 border-transparent rounded-lg text-white w-full text-base focus:border-2 focus:border-slate-700 focus:outline-none" />
                <input type="password" onChange={(e) => handleChange(e)} placeholder='Password' name='password' className="bg-transparent p-4 border-2 border-transparent rounded-lg text-white w-full text-base focus:border-2 focus:border-slate-700 focus:outline-none" />
                <button type="submit" className='bg-amber-400 text-black py-4 px-8 border-none cursor-pointer rounded-lg text-lg font-bold hover:bg-amber-500'>Login</button>
                <span className='text-white'>
                    Don't have an account ? <Link to="/register" className='hover:text-amber-500'>Create One</Link>
                </span>
            </form>
        </div>
        <ToastContainer/>
    </>
  )
}

export default Login;