// ProfileSetup.jsx
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function ProfileSetup() {
    const [bio, setBio] = useState('');
    const [profilePic, setProfilePic] = useState(null);
    const navigate = useNavigate();

    const userId = localStorage.getItem('user_id');

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!userId) {
            alert('User ID not found. Please log in again.');
            navigate('/login');
            return;
        }

        const formData = new FormData();
        formData.append('bio', bio);
        if (profilePic) {
            formData.append('profile_pic', profilePic);
        }

        try {
            const response = await axios.post(`http://minezone.site/profile/${userId}/`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            console.log('Profile updated:', response.data);
            navigate('/'); // Redirect to home page or wherever you like
        } catch (error) {
            console.error('Error updating profile:', error);
            alert('Failed to update profile. Please try again.');
        }
    };

    const handleFileChange = (e) => {
        setProfilePic(e.target.files[0]);
    };

    return (
        <div className="flex flex-col items-center gap-4 h-screen">
            <form onSubmit={handleSubmit}
                className='bg-gray-200 flex flex-col justify-center items-center gap-4 p-4 rounded-md shadow-md m-4'>
                <h2 className='text-4xl font-semibold'>Set Up Your Profile</h2>
                <div>
                    <textarea
                        className='rounded-md'
                        placeholder='Bio'
                        value={bio}
                        onChange={(e) => setBio(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <input
                        className='rounded-md'
                        type="file"
                        accept="image/*"
                        onChange={handleFileChange}
                    />
                </div>
                <button type="submit" className='bg-gradient-to-b from-[#5e99f0] to-[#1c6bbb] p-2 rounded-md'>
                    Save Profile
                </button>
            </form>
        </div>
    );
}
