import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function PostForum({author}) {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [user, setUser] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        try {
            const response = await axios.post('http://minezone.site/forum/', {
                title,
                content,
                author
            });
            console.log('Forum post created:', response.data);
            navigate('/forums'); // Redirect to forums page after successful post
        } catch (err) {
            console.error('Error creating forum post:', err);
            setError('Failed to create forum post. Please try again.');
        }
    };

    return (
        <div className="w-screen flex justify-center mt-10">
            <div className="flex flex-col h-max w-11/12 p-8 bg-[#11141E] text-white">
                <h1 className="text-3xl sm:text-[4rem] font-bold mb-8">Create New Forum Post</h1>
                {error && <p className="text-red-500 mb-4">{error}</p>}
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label htmlFor="title" className="block text-lg mb-2">Title</label>
                        <input
                            type="text"
                            id="title"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            required
                            className="w-full p-2 rounded-lg bg-gray-700 text-white"
                        />
                    </div>
                    <div>
                        <label htmlFor="content" className="block text-lg mb-2">Content</label>
                        <textarea
                            id="content"
                            value={content}
                            onChange={(e) => setContent(e.target.value)}
                            required
                            rows="6"
                            className="w-full p-2 rounded-lg bg-gray-700 text-white"
                        ></textarea>
                    </div>
                    <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600">
                        Create Post
                    </button>
                </form>
            </div>
        </div>
    );
}