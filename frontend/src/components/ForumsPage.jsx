import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

export default function ForumsPage() {
    const [forums, setForums] = useState([]);

    useEffect(() => {
        const fetchForums = async () => {
            try {
                const response = await axios.get('http://localhost:8000/forum');
                setForums(response.data);
            } catch (error) {
                console.error('Error fetching forums:', error);
            }
        };

        fetchForums();
    }, []);

    return (
        <div className="w-screen flex justify-center mt-10 h-auto sm:h-[80rem]">
            <div className="flex flex-col h-max w-11/12 p-8 bg-[#11141E]">
                <h1 className="text-3xl sm:text-[5rem] font-bold text-white mb-8">FORUMS</h1>
                <p className="text-base sm:text-4xl text-gray-50 mb-8">
                    Welcome to the Minezone Forums! Here you can discuss anything related to the server, 
                    post suggestions, report bugs, and more. We encourage you to be respectful and follow the rules.
                </p>

                {forums.map((forum) => (
                    <Link to={`/forum/${forum.id}`} key={forum.id} className="mb-4">
                        <div className="bg-gray-200 rounded-lg p-4 shadow-md hover:bg-gray-300 transition duration-300">
                            <h2 className="text-2xl font-semibold">{forum.title}</h2>
                            <p className="text-gray-600">by {forum.author} on {new Date(forum.created_at).toLocaleString()}</p>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
}