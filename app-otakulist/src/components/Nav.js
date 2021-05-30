import React, {useState, useEffect} from 'react'
import {Link} from 'react-router-dom';
import '../assets/nav.scss';

function Nav() {
    const [nav, setNav] = useState(false);

    window.addEventListener('scroll', () => {
        if (window.scrollY > 50)
            setNav(true);
        else
            setNav(false);
    });

    return (
        <nav className={`navbar navbar-expand-lg sticky-top ${nav ? "nav-active navbar-dark" : "nav-inactive navbar-light"}`} >
            <div className="container-fluid">
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <Link to="/" className="link nav-link">
                    <img className="logo" src="/kitsu_icon.png" alt="logo"/>
                </Link>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item active">
                            <Link to="/" className="link nav-link">
                                Home
                            </Link>
                        </li>
                        <li className="nav-item active">
                            <Link to="/Animes" className="link nav-link">
                                Explore
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/Library" className="link nav-link">
                                Library
                            </Link>
                        </li>
                    </ul>
                    <form className="d-flex w-100">
                        <input className="form-control me-2 search-box" type="search" placeholder="Search" aria-label="Search" />
                    </form>
                </div>
            </div>
        </nav>
    )
}

export default Nav
