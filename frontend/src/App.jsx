import React, { useState } from 'react';
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

export default function App() {
    // Authentication state variables
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");

    return (
        <BrowserRouter>
            {/* Pass authentication props to Header */}
            <Header
                isLoggedIn={isLoggedIn}
                setIsLoggedIn={setIsLoggedIn}
                name={name}
                email={email}
            />
            <Routes>
                <Route index element={<HomePage />} />
                <Route path="/games" element={<GamePage />} />
                <Route path="/gift" element={<SupportPage />} />
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
                <Route path="/forgotPassword" element={<ForgotPassword />} />
                <Route path="/resetPassword" element={<ResetPassword />} />
            </Routes>
        </BrowserRouter>
    );
}
