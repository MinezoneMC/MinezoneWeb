import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

export default function UserProfilePage() {
    const [bio, setBio] = useState('');
    const [profilePic, setProfilePic] = useState(null);
    const [name, setName] = useState('');
    // const [email, setEmail] = useState('');
    const { id } = useParams();

    useEffect(() => {
        // Fetch the user's profile data
        axios.get(`http://localhost:8000/users/${id}/`)
            .then(response => {
                setBio(response.data.bio || '');
                setProfilePic(response.data.profile_pic);
                setName(response.data.name);
                // setEmail(response.data.email);  // Uncomment if you include email in the response
            })
            .catch(error => {
                console.error('Error fetching profile:', error);
            });
    }, [id]);

    return (
        <div className="flex flex-col items-center gap-4 h-screen bg-gray-100 p-4">
            <h2 className='text-4xl font-semibold'>{name}'s Profile</h2>
            <div className='bg-white flex flex-col justify-center items-center gap-4 p-4 rounded-md shadow-md m-4'>
                {profilePic ? (
                    <img
                        src={`http://localhost:8000${profilePic}`}
                        alt="Profile"
                        className='h-32 w-32 object-cover rounded-full'
                    />
                ) : (
                    <div className='h-32 w-32 bg-gray-300 rounded-full flex items-center justify-center'>
                        <span className='text-gray-700 text-xl'>No Image</span>
                    </div>
                )}
                <h3 className='text-2xl font-semibold'>{name}</h3>
                {/* Uncomment if you include email in the response and want to display it */}
                {/* <p className='text-gray-700'>{email}</p> */}
                <p className='text-gray-700'>{bio}</p>
            </div>
        </div>
    );
}
