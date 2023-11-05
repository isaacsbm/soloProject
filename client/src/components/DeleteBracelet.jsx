import React, {useEffect} from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const DeleteBracelet = ({allBracelets, setAllBracelets}) => {
    const navigate = useNavigate()
    const {id} = useParams();
    useEffect(() => {
        axios.delete //!DO THIS
        const updatedBracelets = allBracelets.filter(bracelet => bracelet._id !== id )
        setAllBracelets(updatedBracelets)
        // navigate("/dashboard")
    }, [id])
    return (
        <div>
            <h1>Delete</h1>
        </div>
    )
}

export default DeleteBracelet;