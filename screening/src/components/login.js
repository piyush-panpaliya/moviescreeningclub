import React from 'react';
import { useNavigate ,Link} from 'react-router-dom';
import { useState } from 'react';
import axios from 'axios';

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
    <div className="App">
      <h2>Login</h2>

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
      <span>dont have a account <Link to='/signup'>Signup</Link></span>
      <br />
      <button onClick={handleSubmit}>
        Submit
      </button>
    </div>
  )
}