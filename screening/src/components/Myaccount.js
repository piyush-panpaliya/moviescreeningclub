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
      navigate('/home');
    } else {
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
      <h2>Your Memberships:</h2>
      <table className="table">
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

/*
{localStorage.getItem('userType') === 'admin' && (
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

{localStorage.getItem('userType') === 'volunteer' && (
  <>
  <h1>Hello Volunteer</h1>
  <div className = "d-grid gap-2 d-md-block">
    <span><button type="button" className='btn btn-primary btn-lg' style={{width: '20%', height: '5%'}}><Link to='/scanner' className='link'>Scanner</Link></button></span>
    <span>  </span>
    <span><button type="button" className='btn btn-primary btn-lg' style={{width: '20%', height: '5%'}}><Link to='/addmovie' className='link'>Add Movie</Link></button></span>
    </div>
  </>
)}*/
