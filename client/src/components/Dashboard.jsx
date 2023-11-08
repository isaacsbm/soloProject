import React from 'react'
import BraceletGallery from './BraceletGallery';

const Dashboard = ({allBracelets}) => {
    return (
        <div>
            {/* <h1 className='site-header'>Dashboard</h1> */}
            <BraceletGallery allBracelets={allBracelets}></BraceletGallery>
        </div>
    )
}

export default Dashboard;