import React, { useState } from 'react';
import axios from 'axios';

export default function CreateTicket({email}) {
    const [description, setDescription] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const user_id = localStorage.getItem('user_id');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:8000/supports/', {
                email: email,
                description: description,
                user_id: user_id
            });
            console.log('Ticket created:', response.data);
            setSuccessMessage('Your ticket has been submitted successfully.');
            setErrorMessage('');
            setDescription('');
        } catch (error) {
            console.error('Error creating ticket:', error);
            setErrorMessage('There was an error submitting your ticket. Please try again.');
            setSuccessMessage('');
        }
    };

    return (
        <div className="w-screen flex justify-center mt-10 h-auto sm:h-[80rem]">
            <div className="flex flex-col h-max w-11/12 p-8 bg-[#11141E]">
                <h1 className="text-3xl sm:text-[5rem] font-bold text-white mb-8">Create A New Ticket</h1>
                {successMessage && <p className="text-green-500 mb-4">{successMessage}</p>}
                {errorMessage && <p className="text-red-500 mb-4">{errorMessage}</p>}
                <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
                    <div>
                        <label className="block text-white text-lg mb-2">Description:</label>
                        <textarea
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            className="w-full px-4 py-2 rounded-lg bg-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            rows="5"
                            required
                        ></textarea>
                    </div>
                    <button
                        type="submit"
                        className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
                    >
                        Submit Ticket
                    </button>
                </form>
            </div>
        </div>
    );
}
