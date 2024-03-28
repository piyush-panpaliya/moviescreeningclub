import React from 'react';
import { useNavigate ,Link} from 'react-router-dom';
import { useState } from 'react';
import axios from 'axios';

export default function GetOTP(){
  const [formData, setFormData] = useState({
    email: "",
  });

  const {email} = formData;
  const navigate =useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit=async(e)=>{
    e.preventDefault();
    try{
      const res=await axios.post("http://localhost:8000/otp/send-otp",formData);
      if(res.data.success){
        console.log('email sent');
        localStorage.setItem('getotpEmail', formData.email); // Store email in local storage
        navigate('/signup');
      }
      else console.error('failed to send')
    }catch(err){
      alert('email already registered');
      console.log("error: ",err)
    }
  }

  return(
    <div className="App">
      <h2>OTP verfication</h2>

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
      <span>already have an account <Link to='/login'>login</Link></span>
      <br />
      <button onClick={handleSubmit}>
        Submit
      </button>
    </div>
  )
}