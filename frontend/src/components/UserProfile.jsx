import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

export default function UserProfile() {
    const { userId } = useParams();
    const [profile, setProfile] = useState(null);

    useEffect(() => {
        axios.get(`http://localhost:8000/profile/${userId}/`)
            .then(response => {
                setProfile(response.data);
            })
            .catch(error => {
                console.error('Error fetching user profile:', error);
            });
    }, [userId]);

    if (!profile) {
        return <div>Loading...</div>;
    }

    return (
        <div className="flex flex-col items-center gap-4 p-8">
            {profile.profile_pic && (
                <img
                    src={`http://localhost:8000${profile.profile_pic}`}
                    alt="Profile"
                    className="w-32 h-32 rounded-full object-cover"
                />
            )}
            <h2 className="text-4xl font-semibold">{profile.user.name}</h2>
            <p>Email: {profile.user.email}</p>
            <p>Bio: {profile.bio}</p>
            {/* Optionally, display other information or user's posts */}
        </div>
    );
}
