import React from 'react';

export default function GameInfo({ title, gameModes, videoId, image, colorHex, children }) {
    return (
        <div className=" my-4 p-4">
            <h2 className='text-[4rem] uppercase font-bold'
                style={{ color: `${colorHex}` }}>{title}</h2>
            <div className='flex flex-row flex-wrap gap-8'>
                <div className='text-white w-1/2'>
                    <p>{children}</p>
                    {gameModes && <ul className='my-8 flex flex-col gap-2'>
                        {gameModes.map((mode, index) => (
                            <li key={index} className='p-2 bg-[#38415E] rounded-md'>
                                <h3 className='font-semibold text-blue-400'>{mode.name}</h3>
                                <p>{mode.description}</p>
                            </li>))}
                    </ul>}
                </div>
                <div className='flex flex-col'>
                    <img src={image} className='w-96' />
                    {videoId && <iframe
                        width="440"
                        height="248"
                        src={`https://www.youtube.com/embed/${videoId}`}
                        title={title}
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                        className='rounded-md'
                    />}

                </div>
            </div>

        </div>
    );
};