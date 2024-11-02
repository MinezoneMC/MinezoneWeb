import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useLocation } from 'react-router-dom';

export default function ResetPassword() {
    const [passwordInput, setPasswordInput] = useState('');
    const [confirmPasswordInput, setConfirmPasswordInput] = useState('');
    const [message, setMessage] = useState('');
    const navigate = useNavigate();
    const location = useLocation();
    const [userId, setUserId] = useState('');
    const [token, setToken] = useState('');

    useEffect(() => {
        const queryParams = new URLSearchParams(location.search);
        const id = queryParams.get('id');
        const tokenParam = queryParams.get('token');
        if (id && tokenParam) {
            setUserId(id);
            setToken(tokenParam);
        } else {
            setMessage('Invalid password reset link.');
        }
    }, [location.search]);

    const handleResetPassword = (e) => {
        e.preventDefault();
        if (passwordInput !== confirmPasswordInput) {
            setMessage('Passwords do not match.');
            return;
        }

        axios.post('http://minezone.site/api/resetPassword/', {
            id: userId,
            token: token,
            password: passwordInput,
        })
            .then(response => {
                console.log('Response data:', response.data);
                if (response.data.success) {
                    setMessage('Your password has been reset successfully.');
                    // Optionally redirect to login page after a delay
                    setTimeout(() => {
                        navigate('/login');
                    }, 3000);
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
            {message && <p>{message}</p>}
            {!message.includes('successfully') && (
                <form onSubmit={handleResetPassword}
                    className='bg-gray-200 flex flex-col justify-center items-center gap-4 p-4 rounded-md shadow-md
                    m-4'>
                    <h2 className='text-4xl font-semibold'>Reset Password</h2>
                    <div>
                        <input
                            className='rounded-md'
                            placeholder='New Password'
                            type="password"
                            value={passwordInput}
                            onChange={(e) => setPasswordInput(e.target.value)}
                            required
                        />
                    </div>
                    <div>
                        <input
                            className='rounded-md'
                            placeholder='Confirm New Password'
                            type="password"
                            value={confirmPasswordInput}
                            onChange={(e) => setConfirmPasswordInput(e.target.value)}
                            required
                        />
                    </div>
                    <button type="submit" className='bg-gradient-to-b from-[#5e99f0] to-[#1c6bbb] p-2 rounded-md'>
                        Reset Password
                    </button>
                </form>
            )}
        </div>
    );
}
