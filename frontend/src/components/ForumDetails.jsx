import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, Link } from 'react-router-dom';

export default function ForumDetail({ author }) {
    const [forum, setForum] = useState(null);
    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState('');
    const { id } = useParams();

    useEffect(() => {
        const fetchForumAndComments = async () => {
            try {
                const forumResponse = await axios.get(`http://minezone.site/api/forum/${id}/`);
                setForum(forumResponse.data);

                const commentsResponse = await axios.get(`http://minezone.site/api/forums/${id}/comments/`);
                setComments(commentsResponse.data);
            } catch (error) {
                console.error('Error fetching forum details:', error);
            }
        };

        fetchForumAndComments();
    }, [id]);

    const handleCommentSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(`http://minezone.site/api/forums/${id}/comments/`, {
                content: newComment,
                author: author
            });
            setComments([...comments, response.data]);
            setNewComment('');
        } catch (error) {
            console.error('Error posting comment:', error);
        }
    };

    if (!forum) {
        return <div>Loading...</div>;
    }

    return (
        <div className="w-screen flex justify-center mt-10">
            <div className="flex flex-col h-max w-11/12 p-8 bg-[#11141E] text-white">
                <h1 className="text-3xl sm:text-[4rem] font-bold mb-4">{forum.title}</h1>
                <p className="text-gray-300 mb-8">
                    by <Link to={`/users/${forum.author_id}`} className="text-blue-500 hover:underline">
                        {forum.author}
                    </Link> on {new Date(forum.created_at).toLocaleString()}
                </p>
                <div className="bg-gray-800 p-6 rounded-lg mb-8">
                    <p className="text-lg">{forum.content}</p>
                </div>

                <h2 className="text-2xl font-semibold mb-4">Comments</h2>
                {comments.map((comment) => (
                    <div key={comment.id} className="bg-gray-700 p-4 rounded-lg mb-4">
                        <p>{comment.content}</p>
                        <p className="text-sm text-gray-400 mt-2">
                            by <Link to={`/users/${comment.author_id}`} className="text-blue-400 hover:underline">
                                {comment.author}
                            </Link> on {new Date(comment.created_at).toLocaleString()}
                        </p>
                    </div>
                ))}

                <form onSubmit={handleCommentSubmit} className="mt-8">
                    <textarea
                        value={newComment}
                        onChange={(e) => setNewComment(e.target.value)}
                        className="w-full p-2 rounded-lg bg-gray-700 text-white"
                        rows="4"
                        placeholder="Write a comment..."
                    ></textarea>
                    <button type="submit" className="mt-2 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600">
                        Post Comment
                    </button>
                </form>
            </div>
        </div>
    );
}
