import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios'

const OneBracelet = ({bracelet, onClose}) => {
    // const {id} = useParams();
    // const [bracelet, setBracelet] = useState({});
    // useEffect(() => {
    //     axios.get(`http://127.0.0.1:8000/api/bracelets/${id}`)
    //         .then(res => {
    //             setBracelet(res.data)
    //         })
    //         .catch((error) => {
    //             console.log('Error getting bracelet:', error);
    //         });
    // }, [id])
    return(
        <div>
            <div className="pop-up">
                <div className="pop-up-content">
                    <h3>{bracelet.name}</h3>
                    <button onClick={onClose}>Close</button>
                </div>
            </div>
        </div>
    )
}

export default OneBracelet;