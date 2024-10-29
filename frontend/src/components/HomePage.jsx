import React, { useState, useEffect } from 'react';
import axios from 'axios';
import PostItem from './PostItem';

export default function HomePage() {
    const [details, setDetails] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const postsPerPage = 5; // Number of posts per page

    useEffect(() => {
        axios.get('http://18.222.210.193:8000')
            .then(res => {
                setDetails(res.data.posts);
            })
            .catch(err => {
                console.error(err);
            });
    }, []);

    const indexOfLastPost = currentPage * postsPerPage;
    const indexOfFirstPost = indexOfLastPost - postsPerPage;
    const currentPosts = details.slice(indexOfFirstPost, indexOfLastPost);
    const totalPages = Math.ceil(details.length / postsPerPage);

    return (
        <div className='flex flex-col w-screen items-center bg-black'>
            <div className='max-w-screen-xl'>
                {currentPosts.length === 0 ? (
                    <p>No posts available.</p>
                ) : (
                    currentPosts.map((detail, id) => (
                        <PostItem key={id} detail={detail} />
                    ))
                )}
            </div>
            <div className="flex justify-center m-4 gap-2">
                {currentPage > 1 && (
                    <button
                        onClick={() => setCurrentPage(currentPage - 1)}
                        className="px-3 py-1 rounded bg-gray-50 hover:bg-[#F1A72A]"
                    >
                        Previous
                    </button>
                )}
                {Array.from({ length: totalPages }, (_, index) => index + 1).map((number) => (
                    <button
                        key={number}
                        onClick={() => setCurrentPage(number)}
                        className={`px-3 py-1 rounded ${currentPage === number
                            ? 'bg-gradient-to-b from-[#ECBA32] to-[#F1A72A] font-semibold'
                            : 'bg-gray-50 hover:bg-[#F1A72A]'
                            }`}
                    >
                        {number}
                    </button>
                ))}
                {currentPage < totalPages && (
                    <button
                        onClick={() => setCurrentPage(currentPage + 1)}
                        className="px-3 py-1 rounded bg-gray-50 hover:bg-[#F1A72A]"
                    >
                        Next
                    </button>
                )}
            </div>

        </div>
    );
}
