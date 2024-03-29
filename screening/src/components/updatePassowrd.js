import React from 'react';
import { useNavigate ,Link} from 'react-router-dom';
import { useState } from 'react';
import axios from 'axios';

export default function UpdatePassword(){
  const [formData, setFormData] = useState({
    email: "",
    password:"",
    otp:"",
  });

  const {email,password,otp} = formData;
  const navigate =useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit=async(e)=>{
    e.preventDefault();
    try{
      const res=await axios.post("http://localhost:8000/login/update",formData);
      if(res.data.success){
        console.log('updated');
        navigate('/login');
      }
      else console.error('failed to save')
    }catch(err){
      alert('invalid otp');
      console.log("error: ",err)
    }
  }
  return(
    <div className="App">
      <h2>forgot password?</h2>
      <h5>enter email to recieve OTP</h5>

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
        <label htmlFor="otp">OTP</label>
        <input
          type="password"
          id="OTP"
          name="otp"
          required
          value={otp}
          onChange={handleChange}
        />
      </div>
      <div className="form-group">
        <label htmlFor="password">new password</label>
        <input
          type="password"
          id="password"
          name="password"
          required
          value={password}
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