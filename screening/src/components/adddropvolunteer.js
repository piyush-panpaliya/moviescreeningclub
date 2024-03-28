import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";

const AddDropVolunteer = () => {
  const [email, setEmail] = useState('');
  const [userType, setUserType] = useState('standard');
  const navigate = useNavigate();

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
