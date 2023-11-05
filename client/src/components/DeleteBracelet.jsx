import React, {useEffect} from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const DeleteBracelet = ({allBracelets, setAllBracelets}) => {
    const navigate = useNavigate()
    const {id} = useParams();
    useEffect(() => {
        axios.delete(`http://127.0.0.1:8000/api/bracelets/${id}`)
            .then(res => {
                const updatedBracelets = allBracelets.filter(bracelet => bracelet._id !== id )
                setAllBracelets(updatedBracelets)
                navigate("/dashboard")
            })
            .catch(err => console.log(err));
    }, [id, allBracelets, setAllBracelets])
    return (
        <div>
        </div>
    )
}

export default DeleteBracelet;