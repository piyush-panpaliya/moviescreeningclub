import React from 'react';
import { useNavigate ,Link} from 'react-router-dom';
import { useState } from 'react';
import axios from 'axios';
import './login.css';
import imageOne from '../images/undraw_secure_login_pdn4.png';
export default function Login(){
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const {email, password } = formData;
  const navigate =useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit=async(e)=>{
    e.preventDefault();
    try{
      const res=await axios.post("http://localhost:8000/login",formData);
      const token=res.data.token;
      localStorage.setItem('token',token);
      console.log('seccessful authentication');
      navigate('/form');
    }catch(err){
      alert('invalid id or password');
      console.log("error: ",err)
    }
  }

  return(
    <>
    <div class="d-flex flex-row flex-wrap justify-content-center mt-5">
      <div class="image1">
        <img src={imageOne} class="img1"/>
      </div>
      <div className="App container">
      <h2>Login</h2>
      <hr class="border border-primary border-2 opacity-75"></hr>

      <div className="form-group">
        <label htmlFor="email" class="form-label">Email:</label>
        <input
          type="email"
          id="email"
          name="email"
          class="form-control"
          placeholder='name@example.com'
          required
          value={email}
          onChange={handleChange} />
      </div>

      <div className="form-group">
        <label htmlFor="password" class="form-label">Password:</label>
        <input
          type="password"
          id="password"
          name="password"
          class="form-control"
          placeholder='Password'
          required
          value={password}
          onChange={handleChange} />
      </div>
      <div class="d-grid gap-2 col-6 mx-auto">
        <button onClick={handleSubmit} class="btn btn-primary sub" type="button">
          Submit
        </button></div>
      <span class="form-text">Don't have an account <Link to='/getOTP'>Signup</Link></span>

    </div></div></>
  )
}
