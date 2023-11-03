import React, {useEffect} from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const DeleteBracelet = ({allBracelets, setAllBracelets}) => {
    const navigate = useNavigate()
    const {id} = useParams();
    useEffect(() => {
        const updatedBracelets = allBracelets.filter(bracelet => bracelet._id !== id )
        setAllBracelets(updatedBracelets)
        navigate("/dashboard")
    }, [id, navigate])
    return (
        <div>
        </div>
    )
}

export default DeleteBracelet;