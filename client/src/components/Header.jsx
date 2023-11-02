import React from 'react';
import { Link } from 'react-router-dom';

const Header = (props) => {
    return (
        <nav className="navbar navbar-expand-sm navbar-light" id="neubar">
        <div className="container">
            {/* <a class="navbar-brand" href="#"><img src="/static_files/images/logos/logo_2.png" height="60" /></a> */}
            <h2>Header</h2>
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>
                <div className=" collapse navbar-collapse" id="navbarNavDropdown">
                    <ul className="navbar-nav ms-auto ">
                        <li className="nav-item">
                        {/* <a class="nav-link mx-2 active" aria-current="page" href="#">Dashboard</a> */}
                            <Link className='nav-link mx-2 active' aria-current="page" to={"/dashboard"}>Dashboard</Link>
                        </li>
                        <li className="nav-item">
                        {/* <a class="nav-link mx-2" href="#">Products</a> */}
                            <Link className='nav-link mx-2 active' to={"/createBracelet"}>Create a Bracelet</Link>
                        </li>
                    </ul>
                </div>
        </div>
    </nav>
    )
}

export default Header;