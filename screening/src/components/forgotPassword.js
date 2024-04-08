import React from 'react';
import { useNavigate ,Link} from 'react-router-dom';
import { useState } from 'react';
import axios from 'axios';

export default function ForgotPassword(){
  const [formData, setFormData] = useState({
    email: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const {email} = formData;
  const navigate =useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit=async(e)=>{
    e.preventDefault();
    try{
      const res = await axios.post("http://localhost:8000/otp/user-otp1", { email });
      if (res.status === 200) {
        setIsSubmitting(true);
        const res1=await axios.post("http://localhost:8000/otp/send-otp",formData);
        if(res1.data.success){
          console.log('email sent');
          localStorage.setItem('forgotpassEmail', formData.email); // Store email in local storage
          navigate('/update');
        }
        else {console.log('failed to send')}
      }
   }catch(err){
      if (err.response.status === 401) {
        alert("User does not exist please sign up");
      } else if (err.response.status === 500) {
        alert("Internal server error");
      }
    }
    finally {
      setIsSubmitting(false);
    }
  };
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
          disabled={isSubmitting}
        />
      </div>
      <span>already have an account <Link to='/login'>login</Link></span>
      <br />
      <button onClick={handleSubmit} disabled={isSubmitting}>
        {isSubmitting ? 'Submitting...' : 'Submit'} 
      </button>
    </div>
  )
}