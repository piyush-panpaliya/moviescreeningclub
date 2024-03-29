<<<<<<< HEAD
import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
=======
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
>>>>>>> 5e3d80cc884c69e3861dc08d53899614af6622c1

const AddDropVolunteer = () => {
  const [email, setEmail] = useState('');
  const [userType, setUserType] = useState('standard');
  const navigate = useNavigate();
<<<<<<< HEAD
=======

  useEffect(() => {
    // Check userType in local storage on component mount
    const storedUserType = localStorage.getItem('userType');
    if (!storedUserType || storedUserType !== 'admin') {
      // If userType is not found or not "admin", redirect to the home page
      navigate('/');
    } else {
      setUserType(storedUserType);
    }
  }, [navigate]);
>>>>>>> 5e3d80cc884c69e3861dc08d53899614af6622c1

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch('http://localhost:8000/updateUserType', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, userType }),
      });

      if (!response.ok) {
        throw new Error('Failed to update user type');
      }

      // Reset form fields after successful submission
      setEmail('');
      setUserType('standard');

      // Handle success or display appropriate message to the user
    } catch (error) {
      console.error('Error updating user type:', error);
      // Handle error or display appropriate message to the user
    }
    navigate('/myaccount')
  };

  return (
    <div>
      <h1>Add/Drop Volunteer</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="email">Email:</label>
        <input
          type="email"
          id="email"
          name="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <label htmlFor="userType">User Type:</label>
        <select
          id="userType"
          name="userType"
          value={userType}
          onChange={(e) => setUserType(e.target.value)}
        >
          <option value="standard">Standard</option>
          <option value="volunteer">Volunteer</option>
          <option value="admin">Admin</option>
        </select>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default AddDropVolunteer;
