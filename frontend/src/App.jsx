import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './components/Header';

// Import your components
import HomePage from './components/HomePage';
import GamePage from './components/GamePage';
import SupportPage from './components/SupportPage';
import Login from './components/Login';
import Register from './components/Register';
import ForgotPassword from './components/ForgotPassword';
import ResetPassword from './components/ResetPassword';
import ForumsPage from './components/ForumsPage';
import ForumDetail from './components/ForumDetails'; 
import PostForum from './components/PostForum';
import ProfilePage from './components/ProfilePage';

export default function App() {
    const [isLoggedIn, setIsLoggedIn] = useState(() => {
        return JSON.parse(localStorage.getItem('isLoggedIn')) || false;
    });
    const [name, setName] = useState(() => {
        return localStorage.getItem('name') || '';
    });
    const [email, setEmail] = useState(() => {
        return localStorage.getItem('email') || '';
    });

    // Update localStorage whenever authentication state changes
    useEffect(() => {
        localStorage.setItem('isLoggedIn', JSON.stringify(isLoggedIn));
        localStorage.setItem('name', name);
        localStorage.setItem('email', email);
    }, [isLoggedIn, name, email]);

    return (
        <BrowserRouter>
            <Header
                isLoggedIn={isLoggedIn}
                setIsLoggedIn={setIsLoggedIn}
                name={name}
                email={email}
                setName={setName}
                setEmail={setEmail}
            />
            <Routes>
                <Route index element={<HomePage />} />
                <Route path="/games" element={<GamePage />} />
                <Route path="/forums" element={<ForumsPage />} />
                <Route path="/forum/:id" element={<ForumDetail author={name}/>} />
                <Route path="/create-forum" element={<PostForum author={name}/>}/>
                <Route path="/support" element={<SupportPage />} />
                <Route
                    path="/login"
                    element={
                        <Login
                            setIsLoggedIn={setIsLoggedIn}
                            setName={setName}
                            setEmail={setEmail}
                        />
                    }
                />
                <Route
                    path="/register"
                    element={
                        <Register
                            setIsLoggedIn={setIsLoggedIn}
                            setName={setName}
                            setEmail={setEmail}
                        />
                    }
                />
                <Route path="/forgotPassword/" element={<ForgotPassword />} />
                <Route path="/resetPassword/" element={<ResetPassword />} />
                <Route path="/profile/" element={<ProfilePage/>} />
            </Routes>
        </BrowserRouter>
    );
}
