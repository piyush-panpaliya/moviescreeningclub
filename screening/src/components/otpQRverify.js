import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const OtpVerifyQR = () => {
  const [email, setEmail] = useState("");
  const [otp, setOTP] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();
  const SERVERIP = "http://14.139.34.10:8000";

  useEffect(() => {
    const userType = localStorage.getItem("userType");
    if (!userType || userType === "standard" || userType === 'movievolunteer') {
      navigate("/");
    }
  }, [navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission behavior

    try {
      const response = await axios.post(`${SERVERIP}/QR/verifyqr`, { email, otp });
      setMessage(response.data.message);
    } catch (error) {
      setMessage(error.response.data.error);
    }
  };

  const handleAnotherQR = () => {
    // Reload the page to clear all columns
    window.location.reload();
  };

  return (
    <div>
      <h2>OTP Verification</h2>
      <form onSubmit={handleSubmit}>
        <label>Email:</label>
        <input type="text" value={email} onChange={(e) => setEmail(e.target.value)} required />
        <br />
        <label>OTP:</label>
        <input type="text" value={otp} onChange={(e) => setOTP(e.target.value)} required />
        <br />
        <button type="submit">Submit</button>
      </form>
      {message && <p>{message}</p>}
      {message && (
        <button onClick={handleAnotherQR}>Check Another QR</button>
      )}
    </div>
  );
};

export default OtpVerifyQR;
