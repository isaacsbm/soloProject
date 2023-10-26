import React from 'react';
import { Link } from 'react-router-dom';

const Header = (props) => {
    return (
        <div>
            {/* <h1 className='site-header'>Header</h1> */}
            <nav className='navbar navbar-expand-sm navbar-light' id='navbar'>
                <Link to={"/dashboard"}>Dashboard</Link>
                <Link to={"#"}>Create a Bracelet</Link>
            </nav>
        </div>
    )
}

export default Header;