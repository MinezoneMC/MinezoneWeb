import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';

export default function Register({ setIsLoggedIn, setName, setEmail }) {
    const [nameInput, setNameInput] = useState('');
    const [emailInput, setEmailInput] = useState('');
    const [passwordInput, setPasswordInput] = useState('');
    const navigate = useNavigate();

    const handleRegister = (e) => {
        e.preventDefault();
        axios.post('http://localhost:8000/signup', {
            name: nameInput,
            email: emailInput,
            password: passwordInput,
        })
            .then(response => {
                setIsLoggedIn(true);
                setName(response.data.name);
                setEmail(response.data.email);
                navigate('/'); // Redirect to home page
            })
            .catch(error => {
                console.error(error);
                alert('Registration failed. Please try again.');
            });
    };

    return (
        <div className="flex flex-col items-center gap-4 h-screen">
            <form onSubmit={handleRegister}
                className='bg-gray-200 flex flex-col justify-center items-center gap-4 p-4 rounded-md shadow-md m-4'>
                <h2 className='text-4xl font-semibold'>Register</h2>
                
                <div className='bg-gray-200'>
                    <input
                        className='rounded-md'
                        placeholder='Name'
                        type="text"
                        value={nameInput}
                        onChange={(e) => setNameInput(e.target.value)}
                        required
                    />
                </div>

                <div className='bg-gray-200'>
                    <input
                        className='rounded-md'
                        placeholder='Email'
                        type="email"
                        value={emailInput}
                        onChange={(e) => setEmailInput(e.target.value)}
                        required
                    />
                </div>

                <div className='bg-gray-200'>
                    <input
                        className='rounded-md'
                        placeholder='Password'
                        type="password"
                        value={passwordInput}
                        onChange={(e) => setPasswordInput(e.target.value)}
                        required
                    />
                </div>

                <button type="submit" className='bg-gradient-to-b from-[#5e99f0] to-[#1c6bbb]
                    p-2 rounded-md'>
                    Register
                </button>

                <p>
                    Already have an account? <Link to="/login">Login here</Link>
                </p>
            </form>
        </div>
    );
}