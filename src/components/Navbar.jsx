import React, { useEffect, useState } from "react";
import { Link, useLocation } from 'react-router-dom';
import { toast } from 'react-toastify';
import '../App.css';
import { useNavigate } from "react-router-dom";


const Navbar = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [isLoggedIn, setIsLoggedIn] = useState(localStorage.getItem('token'));

    useEffect(() => {
        setIsLoggedIn(localStorage.getItem('token'));
    }, [location]);

    function logout() {
        toast.success(`Thank you for visiting!`);
        setIsLoggedIn(false);
        localStorage.removeItem('token');
        navigate('/')
    }

    return (
        <div className="navbar">
            {!isLoggedIn && <Link to="/" className="button is-warning"> Home</Link>}
            {!isLoggedIn && <Link to="/auth/signup" className="button is-warning">Create an Account</Link>}
            {!isLoggedIn && <Link to="/auth/login" className="button is-warning">Welcome back! Please log in</Link>}
            {isLoggedIn && <Link to="/userHome" className="button is-warning"> Home</Link>}
            {isLoggedIn && <Link to="/auth/logForm" className="button is-warning">Create Personalized Log</Link>}
            {isLoggedIn && <Link to="/saveLog" className="button is-warning">Saved Logs</Link>}
            {isLoggedIn && <Link to="/timerComponent" className="button is-warning">Interval Timer</Link>}
            {isLoggedIn && <button className="button is-warning" onClick={logout}>Logout</button>}
        </div>
    );
};

export default Navbar;
