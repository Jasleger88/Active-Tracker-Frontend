import { Link, useLocation } from 'react-router-dom'


function Navbar() {
    return <>
    <Link to="/" className="button is-success is-rounded">Home</Link>
    <Link to="/auth/signup" className="button is-danger is-rounded">Signup</Link>
    <Link to="/auth/login" className="button is-primary is-rounded">Login</Link>
    <Link to="/auth/exercise" className="button is-link is-rounded">Add Exercise</Link>
    <Link to ="/auth/categories" className="navbar-item">Categories</Link>
    <Link to ="/auth/log" className="navbar-item">Log Your Workout</Link>
   
    </>
}
export default Navbar