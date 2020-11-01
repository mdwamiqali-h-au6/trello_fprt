import React, {useState, useEffect, Fragment} from 'react';
import {Link, useHistory} from 'react-router-dom';

import './Navbar.css'
import AvatarImag from './img_avatar.png'

const Navbar = () => {

    const [auth, setAuth] = useState(false)
    let history = useHistory()

    useEffect(() => {
        changeStatus()
    })

    const changeStatus = () => {
        const token = localStorage.getItem('userToken')
        if(token){
            setAuth(true)
        }
    }

    const handleLogout = (e) => {
        e.preventDefault();
        localStorage.removeItem("userToken");
        localStorage.removeItem("userDetails");
        // history.push('/login')
        window.location.assign('/login');
    }
    return (
        <Fragment>
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <Link className="navbar-brand" to="/">Trello Clone</Link>

                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav mr-auto">
                        <li className="nav-item active">
                            <Link className="nav-link" to="/">
                                Home 
                                <span className="sr-only">(current)</span>
                            </Link>
                        </li>
                        {
                            auth && 
                                <li className="nav-item">
                                    <Link className="nav-link" to="/profile">Profile</Link>
                                </li>
                        }
                    </ul>
                    {
                        auth && 
                        <div className="form-inline my-2 my-lg-0 nav-item dropdown">
                            <a className="nav-link dropdown-toggle" href="!#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                <img src={AvatarImag} alt="Avatar" className="avatar"/>
                            </a>
                            <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                                <Link className="dropdown-item" to="/profile">Profile</Link>
                                <Link className="dropdown-item" to="/logout" onClick={handleLogout}>Logout</Link>
                            </div>
                        </div>
                    }
                </div>
            </nav>
        </Fragment>
    )
}

export default Navbar
