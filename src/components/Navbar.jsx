import { Link, useLocation } from 'react-router-dom'


function Navbar() {
    return <>
    <Link to="/" className="button is-link is-outlined">Home</Link>
    <Link to="/auth/signup" className="button is-light">Signup</Link>
    <Link to="/auth/login" className="button is-light">Login</Link>
    </>
}
export default Navbar