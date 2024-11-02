// ProfilePage.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function ProfilePage({ isLoggedIn, name, email, setName }) {
    const [bio, setBio] = useState('');
    const [profilePic, setProfilePic] = useState(null);
    const [profilePicPreview, setProfilePicPreview] = useState(null);
    const [isEditing, setIsEditing] = useState(false);
    const [message, setMessage] = useState('');
    const userId = localStorage.getItem('user_id');

    useEffect(() => {
        // Fetch the user's profile data
        axios.get(`http://minezone.site/api/profile/${userId}/`)
            .then(response => {
                setBio(response.data.bio || '');
                setProfilePic(response.data.profile_pic);
            })
            .catch(error => {
                console.error('Error fetching profile:', error);
            });
    }, [userId]);

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        setProfilePic(file);

        // Preview the image
        const reader = new FileReader();
        reader.onloadend = () => {
            setProfilePicPreview(reader.result);
        };
        reader.readAsDataURL(file);
    };

    const handleSave = (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('bio', bio);
        if (profilePic && typeof profilePic !== 'string') {
            formData.append('profile_pic', profilePic);
        }

        axios.post(`http://minezone.site/api/${userId}/`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        })
            .then(response => {
                setMessage('Profile updated successfully.');
                setIsEditing(false);

                // Update the profilePic state with the new image URL
                setProfilePic(response.data.profile_pic);

                // Reset the profilePicPreview
                setProfilePicPreview(null);

                // Update bio
                setBio(response.data.bio || '');

                // Optionally update the name if it's editable
                if (response.data.user && response.data.user.name) {
                    setName(response.data.user.name);
                }
            })
            .catch(error => {
                console.error('Error updating profile:', error);
                setMessage('Failed to update profile. Please try again.');
            });
    };

    if (!isLoggedIn) {
        return <p>Please log in to view your profile.</p>;
    }

    return (
        <div className="flex flex-col items-center gap-4 h-screen bg-gray-100 p-4">
            <h2 className='text-4xl font-semibold'>My Profile</h2>
            {message && <p>{message}</p>}
            {isEditing ? (
                <form onSubmit={handleSave}
                    className='bg-white flex flex-col justify-center items-center gap-4 p-4 rounded-md shadow-md m-4'>
                    <div>
                        <label className='block text-gray-700 text-sm font-bold mb-2'>Bio</label>
                        <textarea
                            className='rounded-md border p-2 w-full'
                            value={bio}
                            onChange={(e) => setBio(e.target.value)}
                            required
                        />
                    </div>
                    <div>
                        <label className='block text-gray-700 text-sm font-bold mb-2'>Profile Picture</label>
                        <input
                            className='rounded-md border p-2'
                            type="file"
                            accept="image/*"
                            onChange={handleFileChange}
                        />
                        {profilePicPreview && (
                            <img src={profilePicPreview} alt="Profile Preview" className='mt-2 h-32 w-32 object-cover rounded-full' />
                        )}
                    </div>
                    <button type="submit" className='bg-blue-500 text-white px-4 py-2 rounded-md'>
                        Save
                    </button>
                    <button type="button" onClick={() => setIsEditing(false)} className='text-gray-500 mt-2'>
                        Cancel
                    </button>
                </form>
            ) : (
                <div className='bg-white flex flex-col justify-center items-center gap-4 p-4 rounded-md shadow-md m-4'>
                    {profilePic ? (
                        <img
                            src={
                                profilePicPreview && !isEditing
                                    ? profilePicPreview
                                    : profilePic.startsWith('http') || profilePic.startsWith('data:')
                                        ? profilePic
                                        : `http://minezone.site${profilePic}`
                            }
                            alt="Profile"
                            className='h-32 w-32 object-cover rounded-full'
                        />
                    ) : (
                        <div className='h-32 w-32 bg-gray-300 rounded-full flex items-center justify-center'>
                            <span className='text-gray-700 text-xl'>No Image</span>
                        </div>
                    )}
                    <h3 className='text-2xl font-semibold'>{name}</h3>
                    <p className='text-gray-700'>{email}</p>
                    <p className='text-gray-700'>{bio}</p>
                    <button onClick={() => setIsEditing(true)} className='bg-blue-500 text-white px-4 py-2 rounded-md mt-4'>
                        Edit Profile
                    </button>
                </div>
            )}
        </div>
    );
}
