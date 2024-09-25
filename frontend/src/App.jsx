import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './components/Header';

// Import your components
import HomePage from './components/HomePage';
import GamePage from './components/GamePage';
import SupportPage from './components/SupportPage';

export default function App() {
    return (
        <>
            <Header />
            <BrowserRouter>
                <Routes>
                    <Route index element={<HomePage />} />
                    <Route path="/games" element={<GamePage />} />
                    <Route path="/gift" element={<SupportPage />} />
                </Routes>
            </BrowserRouter>
        </>
    );
}
