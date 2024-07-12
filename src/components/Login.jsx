import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../../styles/Login.css'
import { baseUrl } from "../config";


export default function Login() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  function handleChange(e) {
    const newFormData = structuredClone(formData);
    newFormData[e.target.name] = e.target.value;
    setFormData(newFormData);
  }

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const { data } = await axios.post(`${baseUrl}/auth/login/`, formData);
      toast.success(`Welcome, ${formData.email}`);
      const token = data.token;

    

      localStorage.setItem('token', token);
      navigate('/userHome')
    } catch (err) {
      console.log(err);
      toast.error('Login failed');
    }
  }

  return (
    <div className="login-section section" id="login-section">
      <div className="login-container container" id="login-container">
        <form onSubmit={handleSubmit} className="login-form" id="login-form">
          <div className="login-field field" id="login-email-field">
            <label className="login-label label" htmlFor="email" id="login-email-label">Email</label>
            <div className="login-control control" id="login-email-control">
              <input
                className="login-input input"
                type="text"
                name="email"
                id="login-email-input"
                onChange={handleChange}
                value={formData.email}
              />
            </div>
          </div>
          <div className="login-field field" id="login-password-field">
            <label className="login-label label" htmlFor="password" id="login-password-label">Password</label>
            <div className="login-control control" id="login-password-control">
              <input
                className="login-input input"
                type="password"
                name="password"
                id="login-password-input"
                onChange={handleChange}
                value={formData.password}
              />
            </div>
          </div>
          <button className="login-button button" type="submit" id="login-submit-button">Login</button>
        </form>
      </div>
    </div>
  );
}