import React, { useState, useEffect } from 'react';
import axios from 'axios';
import PostItem from './PostItem';
import Header from './Header';

export default function HomePage() {
    const [details, setDetails] = useState([]);

    useEffect(() => {
        let data;

        axios.get('http://localhost:8000')
            .then(res => {
                data = res.data;
                setDetails(data.posts);
            })
            .catch(err => {
                console.error(err);
            });
    }, []); // Empty dependency array ensures this runs once when the component mounts.

    console.log(`details is the ball`, details);



    return (
        <>
            <Header/>
            <div>
                {details.map((detail, id) => (
                    <PostItem detail={detail} id={id} />
                ))}
            </div>
        </>
    );

};

