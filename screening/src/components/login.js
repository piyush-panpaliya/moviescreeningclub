import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import './login.css';
import imageOne from '../images/undraw_secure_login_pdn4.png';
import { useLogin } from './LoginContext'; // Import the useLogin hook

export default function Login() {
  const { login } = useLogin(); // Use the login function from context
  const [formData, setFormData] = useState({
    email: localStorage.getItem('signupEmail') || "",
    password: "",
  });
  const navigate = useNavigate();

  useEffect(() => {
    // Check if token exists in local storage on component mount
    const token = localStorage.getItem('token');
    if (token) {
      login(); // Update login status in context if token exists
      navigate('/form'); // Redirect to form if already logged in
    }
  }, [login, navigate]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:8000/login/login", formData);
      const token = res.data.token;
  
      localStorage.setItem('token', token);
      localStorage.setItem('loggedInUserEmail', formData.email);
  
      // Fetch user type
      const userTypeResponse = await axios.get(`http://localhost:8000/userType/${formData.email}`);
      const userTypeData = userTypeResponse.data;
      const userType = userTypeData.userType;
  
      // Store userType in local storage
      localStorage.setItem('userType', userType);
      console.log('successful authentication');
      login(); // Update login status in context upon successful login
<<<<<<< HEAD
      navigate('/home');
    } catch (err) {
      alert('invalid id or password');
      console.log("error: ", err)
=======
      navigate('/form');
    } catch (error) {
      alert('Invalid email or password');
      console.error("Error:", error);
>>>>>>> 5e3d80cc884c69e3861dc08d53899614af6622c1
    }
  };
  
  return (
    <>
      <div className="d-flex flex-row flex-wrap justify-content-center mt-5">
        <div className="image1">
          <img src={imageOne} className="img1" alt="Login" />
        </div>
        <div className="App container">
          <h2>Login</h2>
          <hr className="border border-primary border-2 opacity-75" />
          <div className="form-group">
            <label htmlFor="email" className="form-label">Email:</label>
            <input
              type="email"
              id="email"
              name="email"
              className="form-control"
              placeholder='name@example.com'
              required
              value={formData.email}
              onChange={handleChange} />
          </div>
          <div className="form-group">
            <label htmlFor="password" className="form-label">Password:</label>
            <input
              type="password"
              id="password"
              name="password"
              className="form-control"
              placeholder='Password'
              required
              value={formData.password}
              onChange={handleChange} />
          </div>
          <div className="d-grid gap-2 col-6 mx-auto">
            <button onClick={handleSubmit} className="btn btn-primary sub" type="button">
              Submit
            </button>
          </div>
          <span className="form-text">Don't have an account <Link to='/getOTP'>Signup</Link></span>
        </div>
      </div>
    </>
  );
}