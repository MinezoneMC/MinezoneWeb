import React from 'react';
import { Link } from 'react-router-dom';

export default function SupportPage() {
    return (
        <div className="w-screen flex justify-center mt-10 h-auto sm:h-[80rem]">
            <div className="flex flex-col h-max w-11/12 p-8 bg-[#11141E]">
                <div className="flex justify-between items-center mb-8">
                    <h1 className="text-3xl sm:text-[5rem] font-bold text-white">SUPPORT</h1>
                    <Link to="/create-ticket" className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600">
                        Create A New Ticket
                    </Link>
                </div>
                <p className="text-base sm:text-4xl text-gray-50 mb-8">
                    Welcome to the Minezone Support Page! If you're experiencing any issues or have any concerns,
                    please feel free to create a new support ticket. Our team is here to assist you.
                </p>
            </div>
        </div>
    );
}
