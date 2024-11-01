import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';

export default function Login({ setIsLoggedIn, setName, setEmail }) {
    const [emailInput, setEmailInput] = useState('');
    const [passwordInput, setPasswordInput] = useState('');
    const navigate = useNavigate();

    const handleLogin = (e) => {
        e.preventDefault();
        axios.post('http://minezone.site/api/login/', {
            email: emailInput,
            password: passwordInput,
        })
            .then(response => {
                console.log('Response data:', response.data);
                setIsLoggedIn(true);
                setName(response.data.user);
                setEmail(response.data.email);
                localStorage.setItem('isLoggedIn', true);
                localStorage.setItem('name', response.data.user);
                localStorage.setItem('email', response.data.email);
                localStorage.setItem('user_id', response.data.user_id);
                navigate('/'); // Redirect to home page
            })
            .catch(error => {
                console.error(error);
                alert('Login failed. Please check your credentials.');
            });
    };

    return (
        <div className="flex flex-col items-center gap-4 h-screen">
            <form onSubmit={handleLogin}
                className='bg-gray-200 flex flex-col justify-center items-center gap-4 p-4 rounded-md shadow-md
                m-4'>
                <h2 className='text-4xl font-semibold'>Login</h2>
                <div>
                    <input
                        className='rounded-md'
                        placeholder='Email'
                        type="email"
                        value={emailInput}
                        onChange={(e) => setEmailInput(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <input
                        className='rounded-md'
                        placeholder='Password'
                        type="password"
                        value={passwordInput}
                        onChange={(e) => setPasswordInput(e.target.value)}
                        required
                    />
                </div>
                <button type="submit" className='bg-gradient-to-b from-[#5e99f0] to-[#1c6bbb] p-2 rounded-md'>
                    Login
                </button>
                <p>
                    Don't have an account? <Link to="/register">Register here</Link>
                </p>
                <p>
                    Forgot your password? <Link to="/forgotPassword">Reset it here</Link>
                </p>
            </form>
        </div>
    );
}
