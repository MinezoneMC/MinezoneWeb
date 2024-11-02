import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

export default function ForgotPassword() {
    const [emailInput, setEmailInput] = useState('');
    const [message, setMessage] = useState('');

    const handleForgotPassword = (e) => {
        e.preventDefault();
        axios.post('http://minezone.site/api/forgotPassword/', {
            email: emailInput,
        })
            .then(response => {
                console.log('Response data:', response.data);
                if (response.data.success) {
                    setMessage('A password reset link has been sent to your email.');
                } else {
                    setMessage('Error: ' + response.data.message);
                }
            })
            .catch(error => {
                console.error(error);
                setMessage('An error occurred. Please try again.');
            });
    };

    return (
        <div className="flex flex-col items-center gap-4 h-screen">
            <form onSubmit={handleForgotPassword}
                className='bg-gray-200 flex flex-col justify-center items-center gap-4 p-4 rounded-md shadow-md
                m-4'>
                <h2 className='text-4xl font-semibold'>Forgot Password</h2>
                <div>
                    <input
                        className='rounded-md'
                        placeholder='Enter your email'
                        type="email"
                        value={emailInput}
                        onChange={(e) => setEmailInput(e.target.value)}
                        required
                    />
                </div>
                <button type="submit" className='bg-gradient-to-b from-[#5e99f0] to-[#1c6bbb] p-2 rounded-md'>
                    Send Reset Link
                </button>
                {message && <p>{message}</p>}
                <p>
                    Remembered your password? <Link to="/login">Login here</Link>
                </p>
            </form>
        </div>
    );
}
