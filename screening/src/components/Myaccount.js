import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useLogin } from './LoginContext'; // Import useLogin hook
const SERVERIP = "http://14.139.34.10:8000";

const Myaccount = () => {
  const { loggedIn } = useLogin(); // Use loggedIn state from context
  const navigate = useNavigate();
  const [memberships, setMemberships] = useState([]);
  const [currentMemberships, setCurrentMemberships] = useState([]);
  const [previousMemberships, setPreviousMemberships] = useState([]);

  useEffect(() => {
    const loggedInUseremail = localStorage.getItem('loggedInUserEmail');
    if (!loggedInUseremail) {
      navigate('/');
    } else {
      axios.get(`${SERVERIP}/memrouter/${loggedInUseremail}`)
        .then(response => {
          // Sort memberships based on purchase date in ascending order
          const sortedMemberships = response.data.memberships.sort((a, b) => {
            return new Date(a.purchasedate.split('-').reverse().join('-')) - new Date(b.purchasedate.split('-').reverse().join('-'));
          });
          
          // Filter memberships into current and previous
          const currentDate = new Date();
          const current = sortedMemberships.filter(membership => new Date(membership.validitydate.split('-').reverse().join('-')) > currentDate);
          const previous = sortedMemberships.filter(membership => new Date(membership.validitydate.split('-').reverse().join('-')) <= currentDate);
          
          // Update state with filtered memberships
          setCurrentMemberships(current);
          setPreviousMemberships(previous);
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
        return 'bg-yellow-200';
      case 'silver':
        return 'bg-gray-200';
      case 'base':
        return 'bg-orange-200';
      default:
        return 'bg-blue-200';
    }
  };

  // Function to dynamically set card dimensions
  const getCardStyle = (width, height) => {
    return {
      width: `${width}px`,
      height: `${height}px`,
    };
  };

  // Function to convert string to title case
  const toTitleCase = (str) => {
    return str.replace(/\b\w+/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
  };

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">Your Memberships:</h2>

      {/* Current Memberships Section */}
      <div>
        <h3 className="text-xl font-semibold mb-2">Active Memberships:</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2"> {/* Reduced gap here */}
          {currentMemberships.map((membership, index) => (
            <Link key={index} to={`/displayqr`} className="membership-card-link">
              <div className="membership-card-container" style={{ margin: '8px' }}> {/* Added margin */}
                <div className={`p-4 rounded-md shadow-lg ${getColor(membership.memtype)} text-center`} style={getCardStyle(150, 180)}>
                  <h3 className="text-lg font-semibold mb-2">{toTitleCase(membership.memtype)}</h3> {/* Convert to title case */}
                  <p><strong>Purchase Date:</strong> {new Date(membership.purchasedate.split('-').reverse().join('-')).toLocaleDateString()}</p>
                  <p><strong>Validity Date:</strong> {new Date(membership.validitydate.split('-').reverse().join('-')).toLocaleDateString()}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Previous Memberships Section */}
      <div>
        <h3 className="text-xl font-semibold mt-8 mb-2">Previous Memberships:</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2"> {/* Reduced gap here */}
          {previousMemberships.map((membership, index) => (
            <div key={index} className="membership-card-container" style={{ margin: '8px' }}> {/* Added margin */}
              <div className={`p-4 rounded-md shadow-lg ${getColor(membership.memtype)} text-center`} style={getCardStyle(150, 180)}>
                <h3 className="text-lg font-semibold mb-2">{toTitleCase(membership.memtype)}</h3> {/* Convert to title case */}
                <p><strong>Purchase Date:</strong> {new Date(membership.purchasedate.split('-').reverse().join('-')).toLocaleDateString()}</p>
                <p><strong>Validity Date:</strong> {new Date(membership.validitydate.split('-').reverse().join('-')).toLocaleDateString()}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}

export default Myaccount;
