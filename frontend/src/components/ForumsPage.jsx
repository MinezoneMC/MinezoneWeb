import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

export default function ForumsPage({ isLoggedIn }) {
    const [forums, setForums] = useState([]);

    useEffect(() => {
        const fetchForums = async () => {
            try {
                const response = await axios.get('http://localhost:8000/forum/');
                console.log('Forum data:', response.data);
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
                <div className="flex justify-between items-center mb-8">
                    <h1 className="text-3xl sm:text-[5rem] font-bold text-white">FORUMS</h1>
                    {isLoggedIn ?
                        <Link to="/create-forum" className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600">
                            Create New Post
                        </Link>
                        :
                        <Link to="/login" className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600">
                            Login to Post
                        </Link>
                    }
                </div>
                <p className="text-base sm:text-4xl text-gray-50 mb-8">
                    Welcome to the Minezone Forums! Here you can discuss anything related to the server,
                    post suggestions, report bugs, and more. We encourage you to be respectful and follow the rules.
                </p>

                {forums.map((forum) => (
                    <Link to={`/forum/${forum.id}`} key={forum.id} className="mb-4">
                        <div className="bg-gray-200 rounded-lg p-4 shadow-md hover:bg-gray-300 transition duration-300">
                            <h2 className="text-2xl font-semibold">{forum.title}</h2>
                            <p className="text-gray-600">
                                by <Link to={`/users/${forum.author_id}`} className="text-blue-500 hover:underline">
                                    {forum.author}
                                </Link> on {new Date(forum.created_at).toLocaleString()}
                            </p>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
}
