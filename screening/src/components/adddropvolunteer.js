import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
// import './adddropvolunteer.css';

const AddDropVolunteer = () => {
  const [users, setUsers] = useState([]);
  const [email, setEmail] = useState('');
  const [userType, setUserType] = useState('standard');
  const navigate = useNavigate();

  useEffect(() => {
    // Check userType in local storage on component mount
    const storedUserType = localStorage.getItem('userType');
    if (!storedUserType || storedUserType !== 'admin') {
      // If userType is not found or not "admin", redirect to the home page
      navigate('/');
    } else {
      setUserType(storedUserType);
      // Fetch user data from API endpoint
      fetchUserData();
    }
  }, [navigate]);

  const fetchUserData = async () => {
    console.log('hey');
    try {
      const response = await fetch('http://localhost:8000/user/fetchusers', {
        method: 'GET'
      });
      if (!response.ok) {
        console.log(response.json());
        throw new Error('Failed to fetch user data');
      }
      const data = await response.json();
      // Sort users based on userType: admin, volunteer, standard
      const sortedUsers = data.users.sort((a, b) => {
        if (a.usertype === 'admin') return -1;
        if (a.usertype === 'volunteer' && b.usertype !== 'admin') return -1;
        return 1;
      });
      setUsers(sortedUsers);
    } catch (error) {
      console.error('Error fetching user data:', error);
      // Handle error or display appropriate message to the user
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch('http://localhost:8000/user/updateUserType', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, userType }),
      });

      if (!response.ok) {
        throw new Error('Failed to update user type');
      }

      setEmail('');
      setUserType('standard');

      // Fetch updated user data
      fetchUserData();

      // Handle success or display appropriate message to the user
    } catch (error) {
      console.error('Error updating user type:', error);
      // Handle error or display appropriate message to the user
    }
  };

  return (
    <div className='container w-75'>
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
        <p></p>
        <button type="submit">Submit</button>
      </form>

      <table>
        <thead>
          <tr>
            <th>Username</th>
            <th>Email</th>
            <th>Designation</th>
            <th>User Type</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user, index) => (
            <tr key={index}>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{user.designation}</td>
              <td>{user.usertype}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AddDropVolunteer;
