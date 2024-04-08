import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';

export default function GetOTP() {
  const [formData, setFormData] = useState({
    email: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false); // State to track if form is submitting
  const { email } = formData;
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email.endsWith('iitmandi.ac.in')) {
      alert('Invalid email id. Use institute mail id.');
      setFormData({ ...formData, email: '' });
      return;
    }
    
    try {
      const res = await axios.post("http://localhost:8000/otp/user-otp", { email });
      if (res.status === 200) {
        setIsSubmitting(true);
        const sendOtpRes = await axios.post("http://localhost:8000/otp/send-otp", { email });
        if (sendOtpRes.data.success) {
          console.log('Email sent');
          localStorage.setItem('getotpEmail', email); // Store email in local storage
          navigate('/signup');
        } else {
          console.error('Failed to send');
        }
      }
    } catch (err) {
      if (err.response.status === 401) {
        alert("User already exists please login");
      } else if (err.response.status === 500) {
        alert("Internal server error");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="App">
      <h2>OTP verification</h2>

      <div className="form-group">
        <label htmlFor="email">Email:</label>
        <input
          type="email"
          id="email"
          name="email"
          required
          value={email}
          onChange={handleChange}
          disabled={isSubmitting}
        />
      </div>
      <span>already have an account <Link to='/login'>login</Link></span>
      <br />
      <button onClick={handleSubmit} disabled={isSubmitting}>
        {isSubmitting ? 'Submitting ...' : 'Submit'} 
      </button>
    </div>
  )
}
