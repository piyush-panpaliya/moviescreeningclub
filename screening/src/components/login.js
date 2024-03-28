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
      await new Promise((resolve) => {
        localStorage?.setItem('loggedInUserEmail', formData.email);
        // Resolve the Promise once email is set
        resolve();
      });
      localStorage.setItem('token', token);
      console.log('successful authentication');
      login(); // Update login status in context upon successful login
      navigate('/form');
    } catch (err) {
      alert('invalid id or password');
      console.log("error: ", err)
    }
  }

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


/*import React, { useState } from "react";
import { Link } from "react-router-dom";
//import "../login.css"; // Import CSS file

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false); // Track password visibility

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Your login logic goes here
    console.log("Form Submitted:", formData);
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const { email, password } = formData;

  return (
    <div className="login-container">
      <h2>Login</h2>

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={email}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <div className="password-input">
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              name="password"
              value={password}
              onChange={handleChange}
              required
            />
            <i
              className={`eye-icon ${showPassword ? "visible" : "hidden"}`}
              onClick={togglePasswordVisibility}
            ></i>
          </div>
        </div>

        <button type="submit">Login</button>
      </form>

      <span>
        Don't have an account? <Link to="/signup">Sign up</Link>
      </span>
    </div>
  );
};

export default Login;*/

