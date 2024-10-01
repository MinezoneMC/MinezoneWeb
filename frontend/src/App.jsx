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
import ProfileSetup from './components/ProfileSetup';
import ProfilePage from './components/ProfilePage';
import UserProfile from './components/UserProfile';

export default function App() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [profilePic, setProfilePic] = useState('');

    useEffect(() => {
        // Load user data from localStorage
        const storedIsLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
        const storedName = localStorage.getItem('name');
        const storedEmail = localStorage.getItem('email');
        const storedProfilePic = localStorage.getItem('profile_pic');
        setIsLoggedIn(storedIsLoggedIn);
        setName(storedName);
        setEmail(storedEmail);
        setProfilePic(storedProfilePic);
    }, []);

    return (
        <BrowserRouter>
            <Header
                isLoggedIn={isLoggedIn}
                setIsLoggedIn={setIsLoggedIn}
                name={name}
                email={email}
                setName={setName}
                setEmail={setEmail}
                profilePic={profilePic}
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
                            setProfilePic={setProfilePic}
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
                <Route path="/forgotPassword" element={<ForgotPassword />} />
                <Route path="/resetPassword" element={<ResetPassword />} />
                <Route path="/profile-setup" element={<ProfileSetup />} />
                <Route path="/profile" element={<ProfilePage setProfilePic={setProfilePic} />} />
                <Route path="/users/:userId" element={<UserProfile />} />
            </Routes>
        </BrowserRouter>
    );
}
