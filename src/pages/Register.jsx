import React, {useState} from 'react'
import axios from 'axios';
import {Link, useNavigate} from "react-router-dom";
import { toast, ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import { registerRoute } from '../utils/APIRoutes';
import logo from "../asserts/chatX.png"
const  Register = () => {

    const navigate = useNavigate();
    const [values, setValues] = useState({
        username: "",
        email: "",
        password: "",
        conPassword: ""
    });

    const toastOptions = {
        position: "top-right",
        autoClose: 5000,
        pauseOnHover: true,
        draggable: true,
        theme: "dark"
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        // alert("form");
        if (handleValidation()){
            const {password, username, email} = values;
            const {data} = await axios.post(registerRoute, {
                username,
                email,
                password,
            });
            if (data.status === false) {
                toast.error(data.message, toastOptions);
            }
            else {
                localStorage.setItem("user", JSON.stringify(data.user));
                navigate("/login");
            }
        }
        
        
    }


    const handleValidation = () => {
        const {password, conPassword, username, email} = values;

        if(password !== conPassword) {
            toast.error("Passwords do not match", {
                position: "top-right",
                autoClose: 5000,
                pauseOnHover: true,
                draggable: true,
                theme: "dark"
            });
            return false;
        }
        else if(username.length < 3) {
            toast.error("Username must be at least 3 characters", {
                position: "top-right",
                autoClose: 5000,
                pauseOnHover: true,
                draggable: true,
                theme: "dark"
            });
            return false;
        }
        else if(password.length < 6) {
            toast.error("Password must be at least 6 characters", {
                position: "top-right",
                autoClose: 5000,
                pauseOnHover: true,
                draggable: true,
                theme: "dark"
            });
            return false;
        }
        else if(email === "") {
            toast.error("Email is required", {
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
        setValues({...values, [event.target.name]: event.target.value});
    }

  return (
    <>
        <div className='h-screen w-full  flex flex-col justify-center gap-4 items-center bg-gray-700'>
        <form onSubmit={(event) => handleSubmit(event)} className='flex flex-col gap-8 bg-gray-600 rounded-3xl px-20 py-12'>
            <div className='flex items-center gap-4 justify-center'>
                <img src={logo} alt="" className='h-20'/>
            </div>
            <input type="text" placeholder='Username' name='username' onChange={(e) => handleChange(e)} className='bg-transparent text-white p-4 rounded-sm w-full text-base focus:border-1 focus:border-slate-500 outline-none' />
            <input type="email" placeholder='Email' name='email' onChange={(e) => handleChange(e)} className='bg-transparent text-white p-4 border-1 rounded-sm w-full text-base focus:border-1 focus:border-slate-500 outline-none' />
            <input type="password" placeholder='Password' name='password' onChange={(e) => handleChange(e)} className='bg-transparent text-white p-4 border-1 rounded-sm w-full text-base focus:border-1 focus:border-slate-500 outline-none' />
            <input type="password" placeholder='Confirm Password' name='conPassword' onChange={(e) => handleChange(e)} className='bg-transparent text-white p-4 border-1 rounded-sm w-full text-base focus:border-1 focus:border-slate-500 outline-none' />
            
            <button type='submit' className='py-4 px-8 border-none bg-amber-400 font-bold cursor-pointer rounded-lg text-lg hover:bg-amber-500'>Create User</button>

            <span className='text-white'>
                Already have an account ? <Link to="/login" className='hover:text-amber-500'>Login</Link>
            </span>
        </form>
        </div>
        <ToastContainer/>
    </>
  )
}

export default Register;