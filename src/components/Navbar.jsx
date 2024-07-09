import { Link, useLocation } from 'react-router-dom';
import '../App.css'



function Navbar() {
    return <>
    <div className="navbar">
    <Link to="/" className="button is-warning">Home</Link>
    <Link to="/auth/signup" className="button is-warning">Signup</Link>
    <Link to="/auth/login" className="button is-warning">Login</Link>
    <Link to="/auth/browse" className="button is-warning">Browse Exercises</Link>
    <Link to="/auth/exercise" className="button is-warning">Create Exercises</Link>
    <Link to="/auth/logForm" className="button is-warning">Your Personalize Log</Link>
    <Link to="/saveLog" className="button is-warning"> Saved Logs</Link>

    </div>
    </>
}
export default Navbar