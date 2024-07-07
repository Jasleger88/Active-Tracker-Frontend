import { Link, useLocation } from 'react-router-dom';
import '../App.css'



function Navbar() {
    return <>
    <div className="navbar">
    <Link to="/" className="button is-success is-rounded">Home</Link>
    <Link to="/auth/signup" className="button is-danger is-rounded">Signup</Link>
    <Link to="/auth/login" className="button is-primary is-rounded">Login</Link>
    <Link to="/auth/exercise" className="button is-link is-rounded">Add Exercise</Link>
    </div>
    </>
}
export default Navbar