// UserProfilePage.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

export default function UserProfilePage() {
    const { userId } = useParams();
    const [profile, setProfile] = useState(null);

    useEffect(() => {
        // Fetch the user's profile data
        axios.get(`http://localhost:8000/profile/${userId}/`)
            .then(response => {
                setProfile(response.data);
            })
            .catch(error => {
                console.error('Error fetching profile:', error);
            });
    }, [userId]);

    if (!profile) {
        return <div>Loading...</div>;
    }

    return (
        <div className="flex flex-col items-center gap-4 h-screen bg-gray-100 p-4">
            <div className='bg-white flex flex-col justify-center items-center gap-4 p-4 rounded-md shadow-md m-4'>
                {profile.profile_pic ? (
                    <img
                        src={`http://localhost:8000${profile.profile_pic}`}
                        alt="Profile"
                        className='h-32 w-32 object-cover rounded-full'
                    />
                ) : (
                    <div className='h-32 w-32 bg-gray-300 rounded-full flex items-center justify-center'>
                        <span className='text-gray-700 text-xl'>No Image</span>
                    </div>
                )}
                <h3 className='text-2xl font-semibold'>{profile.user_name}</h3>
                <p className='text-gray-700'>{profile.bio}</p>
            </div>
        </div>
    );
}
