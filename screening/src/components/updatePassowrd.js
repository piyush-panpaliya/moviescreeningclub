import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { SERVERIP } from "../config";

export default function UpdatePassword() {
  const [formData, setFormData] = useState({
    email: localStorage.getItem('forgotpassEmail') || '',
    password: '',
    otp: '',
  });

  const { email, password, otp } = formData;
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${SERVERIP}/login/update`, formData);
      if (res.data.success) {
        console.log('updated');
        localStorage.removeItem('forgotpassEmail');
        navigate('/login');
      } else {
        console.error('failed to save');
      }
    } catch (err) {
      alert('invalid otp');
      console.log("error: ", err);
    }
  };

  // Check if forgotpassEmail exists in localStorage, if not, redirect to /forgot
  if (!localStorage.getItem('forgotpassEmail')) {
    navigate('/forgot');
  }

  return (
    <div className="App">
      <h2>Forgot Password?</h2>
      <h5>Enter email to receive OTP</h5>

      <div className="form-group">
        <label htmlFor="email">Email:</label>
        <input
          type="email"
          id="email"
          name="email"
          required
          value={email}
          onChange={handleChange}
          readOnly
        />
      </div>
      <div className="form-group">
        <label htmlFor="otp">OTP</label>
        <input
          type="password"
          id="otp"
          name="otp"
          required
          value={otp}
          onChange={handleChange}
        />
      </div>
      <div className="form-group">
        <label htmlFor="password">New Password</label>
        <input
          type="password"
          id="password"
          name="password"
          required
          value={password}
          onChange={handleChange}
        />
      </div>
      <span>Already have an account? <Link to='/login'>Login</Link></span>
      <br />
      <button onClick={handleSubmit}>
        Submit
      </button>
    </div>
  );
}
