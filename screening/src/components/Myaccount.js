import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useLogin } from './LoginContext'; // Import useLogin hook
import './Myaccount.css';

const Myaccount = () => {
  const { loggedIn } = useLogin(); // Use loggedIn state from context
  const navigate = useNavigate();
  const [memberships, setMemberships] = useState([]);

  useEffect(() => {
    const loggedInUseremail = localStorage.getItem('loggedInUserEmail');
    if (!loggedInUseremail) {
      // If loggedInUseremail is not found, redirect to login page
      navigate('/login');
    } else {
      // Fetch memberships using the loggedInUseremail from the server
      axios.get(`http://localhost:8000/memberships/${loggedInUseremail}`)
        .then(response => {
          // Sort memberships based on purchase date in ascending order
          const sortedMemberships = response.data.memberships.sort((a, b) => {
            return new Date(a.purchasedate) - new Date(b.purchasedate);
          });
          // Update memberships state with the sorted data
          setMemberships(sortedMemberships);
        })
        .catch(error => {
          console.error('Error fetching memberships:', error);
        });
    }
  }, [loggedIn, navigate]);

  return (
    <div>
      
<<<<<<< HEAD
      {userType === 'admin' && (
        <>
          <h1>Hello Admin</h1>
          <div className = "d-grid gap-2 d-md-block">
          <span><button type="button" className='btn btn-primary btn-lg' style={{width: '20%', height: '5%'}}><Link to='/adddropvolunteer' className='link'>Add/Drop Volunteer</Link></button></span>
          <span>  </span>
          <span><button type="button" className='btn btn-primary btn-lg' style={{width: '20%', height: '5%'}}><Link to='/scanner' className='link'>Scanner</Link></button></span>
          <span>  </span>
          <span><button type="button" className='btn btn-primary btn-lg' style={{width: '20%', height: '5%'}}><Link to='/addmovie' className='link'>Add Movie</Link></button></span>
          </div>
        </>
      )}
      {userType === 'volunteer' && (
        <>
        <h1>Hello Volunteer</h1>

        <Link to='/scanner'>Scanner</Link>
        </>
=======
      {localStorage.getItem('userType') === 'admin' && (
        <>
          <Link to='/adddropvolunteer'>Add/Drop Volunteer</Link>
          <br />
          <Link to='/scanner'>Scanner</Link>
          <br/>
          <Link to='/addmovie'>Add Movie</Link>
        </>
      )}
      {localStorage.getItem('userType')  === 'volunteer' && (
        <>
        <Link to='/scanner'>Scanner</Link>
        <br/>
          <Link to='/addmovie'>Add Movie</Link>
          </>
>>>>>>> 5e3d80cc884c69e3861dc08d53899614af6622c1
      )}
      <h2>Your Memberships:</h2>
      <table class="table">
        <thead>
          <tr>
            <th>Membership Type</th>
            <th>Purchase Date</th>
            <th>Validity Date</th>
          </tr>
        </thead>
        <tbody>
          {memberships.map((membership, index) => (
            <tr key={index}>
              <td>{membership.memtype}</td>
              <td>{new Date(membership.purchasedate).toLocaleDateString()}</td>
              <td>{new Date(membership.validitydate).toLocaleDateString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Myaccount;
