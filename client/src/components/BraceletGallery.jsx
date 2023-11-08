import React, {useState} from 'react';
import {Link} from 'react-router-dom';
import OneBracelet from './OneBracelet';

const BraceletGallery = ({allBracelets}) => {
    const [expandedBracelet, setExpandedBracelet] = useState(null);
    const [firstItemPopUp, setFirstItemPopUp] = useState(null);

    const openPopUp = (braceletId) => {
        if(firstItemPopUp === null){
            setFirstItemPopUp(braceletId);
        }
        setExpandedBracelet(braceletId);
    }
    const closePopUp = () => {
        setExpandedBracelet(null)
    }
    return (
        <div className=''>
            <div className="row">
                {allBracelets.map(bracelet => {
                return (
                    <div key={bracelet._id} className="col-xl-3 col-lg-4 col-md-6 mb-4">
                        <div className="bg-white rounded shadow-sm container-rounded">
                            <img className='img-fluid rounded card-img-top img-rounded' src={`http://localhost:8000/${bracelet.image}`} alt="Image not Found" />
                            <div className="p-4">
                                <h5><Link className='text-dark' 
                                to={`/bracelets/${bracelet._id}`}
                                onClick={(event) =>{
                                    event.preventDefault();
                                    openPopUp(bracelet._id)}}
                                >{bracelet.name}</Link></h5>
                                <p className="small text-muted mb-0">{bracelet.description}</p>
                                <div className="d-flex align-items-center justify-content-between rounded-pill bg-light px-3 py-2 mt-4">
                                    <p className="small mb-0"><i className='fa fa-picture-o mr-2'><span className='font-weight-bold'>{bracelet.era}</span></i></p>
                                    <div className="d-flex">
                                        <Link to={`/bracelets/delete/${bracelet._id}`}>Delete</Link>
                                        <span> | </span>
                                        <Link to={`/bracelets/update/${bracelet._id}`}>Update</Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {bracelet._id === firstItemPopUp && expandedBracelet && (
                            <div className="popup">
                                <div className="popup-content">
                                    <OneBracelet
                                    bracelet={allBracelets.find(bracelet => bracelet._id === expandedBracelet)}
                                    onClose={closePopUp}/>
                                </div>
                            </div>
                        )}
                    </div>
                )})}
            </div>
        </div>
    )
}
export default BraceletGallery;