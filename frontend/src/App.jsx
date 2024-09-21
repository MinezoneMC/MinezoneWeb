import React, { useState, useEffect } from 'react';
import axios from 'axios';

const App = () => {
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
        <div>
            {details.map((detail, id) => (
                <div key={id}>
                    <div>
                        <div>
                            <h1>{detail.title}</h1>
                            <p>{detail.content}</p>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default App;
