import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function ProfilePage({ setProfilePic }) {
    const [bio, setBio] = useState('');
    const [profilePic, setLocalProfilePic] = useState('');
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [editing, setEditing] = useState(false);
    const [newProfilePic, setNewProfilePic] = useState(null);

    const userId = localStorage.getItem('user_id');

    useEffect(() => {
        // Fetch user profile
        axios.get(`http://localhost:8000/profile/${userId}/`)
            .then(response => {
                setBio(response.data.bio);
                setLocalProfilePic(response.data.profile_pic);
                setName(response.data.user.name);
                setEmail(response.data.user.email);
            })
            .catch(error => {
                console.error('Error fetching profile:', error);
            });
    }, [userId]);

    const handleEditToggle = () => {
        setEditing(!editing);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('bio', bio);
        if (newProfilePic) {
            formData.append('profile_pic', newProfilePic);
        }
        try {
            const response = await axios.post(`http://localhost:8000/profile/${userId}/`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            setBio(response.data.bio);
            setLocalProfilePic(response.data.profile_pic);
            setProfilePic(response.data.profile_pic); // Update header
            localStorage.setItem('profile_pic', response.data.profile_pic);
            setEditing(false);
            setNewProfilePic(null);
        } catch (error) {
            console.error('Error updating profile:', error);
            alert('Failed to update profile. Please try again.');
        }
    };

    const handleFileChange = (e) => {
        setNewProfilePic(e.target.files[0]);
    };

    return (
        <div className="flex flex-col items-center gap-4 p-8">
            <h2 className="text-4xl font-semibold">My Profile</h2>
            {profilePic && (
                <img
                    src={`http://localhost:8000${profilePic}`}
                    alt="Profile"
                    className="w-32 h-32 rounded-full object-cover"
                />
            )}
            <p>Name: {name}</p>
            <p>Email: {email}</p>
            <p>Bio: {bio}</p>
            <button onClick={handleEditToggle} className="bg-blue-500 text-white px-4 py-2 rounded">
                {editing ? 'Cancel' : 'Edit Profile'}
            </button>
            {editing && (
                <form onSubmit={handleSubmit} className="flex flex-col gap-4 mt-4">
                    <textarea
                        className="rounded-md p-2 border border-gray-300"
                        value={bio}
                        onChange={(e) => setBio(e.target.value)}
                    />
                    <input
                        type="file"
                        accept="image/*"
                        onChange={handleFileChange}
                    />
                    <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded">
                        Save Changes
                    </button>
                </form>
            )}
        </div>
    );
}
