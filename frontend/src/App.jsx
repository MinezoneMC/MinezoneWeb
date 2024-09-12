import React, { useState, useEffect } from 'react';
import axios from 'axios';

const App = () => {
    const [details, setDetails] = useState([]);

    useEffect(() => {
        let data;

        axios.get('http://localhost:8000')
            .then(res => {
                data = res.data;
                setDetails(data);
            })
            .catch(err => {
                console.error(err);
            });
    }, []); // Empty dependency array ensures this runs once when the component mounts.
    console.log(`detail: ${details[0]}`);
    

    return (
        <div>
            {details.map((detail, id) => (
                <div key={id}>
                    <div>
                        <div>
                            <h1>{detail.detail}</h1>
                            <footer>--- by 
                                <cite title="Source Title">{detail.name}</cite>
                            </footer>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default App;
