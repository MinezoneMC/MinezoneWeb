import React from 'react';

export default function GameInfo({ title, gameModes, videoId, image, colorHex, children }) {
    return (
        <div className="my-8 p-4 bg-[#293046]">
            <h2 className='text-3xl sm:text-[4rem] uppercase font-bold my-8'
                style={{ color: `${colorHex}` }}>{title}</h2>
            <div className='flex flex-col sm:flex-row gap-8'>
                <div className='text-white w-full sm:w-1/2'>
                    <p className="text-sm sm:text-base">{children}</p>
                    {gameModes && (
                        <ul className='my-8 flex flex-col gap-2'>
                            {gameModes.map((mode, index) => (
                                <li key={index} className='p-4 bg-[#38415E] rounded-md'>
                                    <h3 className='font-semibold text-blue-400'>{mode.name}</h3>
                                    <p className="text-sm sm:text-base">{mode.description}</p>
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
                <div className='flex flex-col items-center w-full sm:w-auto'>
                    {image && <img src={image} alt={title} className='w-full sm:w-96 rounded-md' />}
                    {videoId && (
                        <iframe
                            width="100%"
                            height="315" // Set a fixed height for better aspect ratio
                            src={`https://www.youtube.com/embed/${videoId}`}
                            title={title}
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                            className='rounded-md mt-4 sm:w-96' // Set width for larger screens
                        />
                    )}
                </div>
            </div>
        </div>
    );
};
