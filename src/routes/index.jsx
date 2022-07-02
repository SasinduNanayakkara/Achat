import React from 'react'
import { BrowserRouter, Routes, Route} from "react-router-dom";
import Chat from '../pages/Chat';
import Login from '../pages/Login';
import Register from '../pages/Register';
import SetAvatar from '../pages/SetAvatar';
export const PageRoute = () => {
    return (
        <div>
            <BrowserRouter>
                <Routes>
                    <Route path="/register" element={<Register />} />
                    <Route path="/login" element={<Login />} /> 
                    <Route path="/chat" element={<Chat />} />
                    <Route path="/avatar" element={<SetAvatar />} />

                </Routes>
            </BrowserRouter>
        </div>
    )
}

export default PageRoute;