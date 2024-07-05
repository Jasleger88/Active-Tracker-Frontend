import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import Navbar from "./components/Navbar";
import Home from "./components/Home";
import Signup from "./components/Signup";
import Login from "./components/Login";
import { ToastContainer } from 'react-toastify';
import Navbar from "./components/Navbar";

function App() {
  return <>

  <Router>
  <ToastContainer
  autoClose={1300}/>
    <Navbar />
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="auth/signup" element={<Signup />} />
      <Route path="auth/login" element={<Login />} />
    </Routes>
  </Router>
  
  </>
}


export default App