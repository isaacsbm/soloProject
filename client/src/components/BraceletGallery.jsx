import React from 'react';
import {Link} from 'react-router-dom';

const BraceletGallery = ({allBracelets}) => {
    return (
        <div>
            {/* <h1 className='site-header'>Bracelet Gallery</h1> */}
            <table>
                <thead>
                    <td>Name</td>
                    <td>Description</td>
                    <td>Era</td>
                    <td>Image</td>
                    <td>Actions</td>
                </thead>
                <tbody>
                    {allBracelets.map( bracelet => {
                        return( 
                            <tr key={bracelet._id}>
                                <td>{bracelet.name}</td>
                                <td>{bracelet.description}</td>
                                <td>{bracelet.era}</td>
                                <td><img src={`http://localhost:8000/${bracelet.image}`} alt="image not reached" /></td>
                                <Link to={`/api/bracelets/delete/${bracelet._id}`}>Delete</Link>
                            </tr>
                        )
                    })}

                </tbody>
            </table>
        </div>
    )
}

export default BraceletGallery;