import React, { useState } from "react";
import axios from "axios";
import { Navigate, useNavigate,Link } from "react-router-dom";
// import { useAuth } from './AuthContext';

export const Signup = () => {

  const [formData, setFormData] = useState({
    name: "",
    phoneNumber: "",
    designation: "",
    email: "",
    password: "",
    otp:"",
  });

  const { name, phoneNumber, designation, email, password, otp } = formData;
  const navigate=useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      console.log(formData);
      const res = await axios.post("http://localhost:8000/auth/signup", formData);
      console.log(res.data);
      console.log("Submitted");
      navigate('/form');
      // signup(); // Authenticate the user
    } catch (err) {
      alert('email already registered');
      console.error("Error occurred:", err);
    }
  };

  return (
    <div className="App">
      <h2>Sign-Up New User</h2>

      <div className="form-group">
        <label htmlFor="name">Name:</label>
        <input
          type="text"
          id="name"
          name="name"
          required
          value={name}
          onChange={handleChange}
        />
      </div>

      <div className="form-group">
        <label htmlFor="phoneNumber">Phone Number:</label>
        <input
          type="text"
          id="phoneNumber"
          name="phoneNumber"
          value={phoneNumber}
          onChange={handleChange}
        />
      </div>

      <div className="form-group">
        <label htmlFor="designation">Choose Degree:</label>
        <select
          id="designation"
          name="designation"
          required
          value={designation}
          onChange={handleChange}
        >
          <option value="">Select One</option>
          <option value="btech">B-Tech</option>
          <option value="phd">PHD</option>
          <option value="fs">Faculty/Staff</option>
        </select>
      </div>

      <div className="form-group">
        <label htmlFor="email">Email:</label>
        <input
          type="email"
          id="email"
          name="email"
          required
          value={email}
          onChange={handleChange}
        />
      </div>

      <div className="form-group">
        <label htmlFor="password">Password:</label>
        <input
          type="password"
          id="password"
          name="password"
          required
          value={password}
          onChange={handleChange}
        />
      </div>
      <div className="form-group">
        <label htmlFor="otp">otp:</label>
        <input
          type="otp"
          id="otp"
          name="otp"
          required
          value={otp}
          onChange={handleChange}
        />
      </div>
      <span>already have an account <Link to='/login'>login</Link></span>
      <br />
      <button onClick={handleSubmit}>
        Submit
      </button>
    </div>
  );
};

export default Signup;
