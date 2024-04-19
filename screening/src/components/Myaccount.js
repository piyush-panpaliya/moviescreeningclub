import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useLogin } from './LoginContext'; // Import useLogin hook

const Myaccount = () => {
  const { loggedIn } = useLogin(); // Use loggedIn state from context
  const navigate = useNavigate();
  const [memberships, setMemberships] = useState([]);

  useEffect(() => {
    const loggedInUseremail = localStorage.getItem('loggedInUserEmail');
    if (!loggedInUseremail) {
      navigate('/home');
    } else {
      axios.get(`http://localhost:8000/memrouter/${loggedInUseremail}`)
        .then(response => {
          // Sort memberships based on purchase date in ascending order
          const sortedMemberships = response.data.memberships.sort((a, b) => {
            return new Date(a.purchasedate.split('-').reverse().join('-')) - new Date(b.purchasedate.split('-').reverse().join('-'));
          });
          // Update memberships state with the sorted data
          setMemberships(sortedMemberships);
        })
        .catch(error => {
          console.error('Error fetching memberships:', error);
        });
    }
  }, [loggedIn, navigate]);

  // Function to assign color to membership type
  const getColor = (memType) => {
    switch (memType.toLowerCase()) {
      case 'gold':
        return 'bg-yellow-300';
      case 'silver':
        return 'bg-gray-300';
      case 'bronze':
        return 'bg-orange-300';
      default:
        return 'bg-blue-300';
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">Your Memberships:</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {memberships.map((membership, index) => (
          <div key={index} className={`p-4 rounded-md shadow-lg ${getColor(membership.memtype)} text-center`}>
            <h3 className="text-lg font-semibold mb-2">{membership.memtype}</h3>
            <p><strong>Purchase Date:</strong> {new Date(membership.purchasedate.split('-').reverse().join('-')).toLocaleDateString()}</p>
            <p><strong>Validity Date:</strong> {new Date(membership.validitydate.split('-').reverse().join('-')).toLocaleDateString()}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Myaccount;
