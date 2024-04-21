import React, { useState, useEffect } from 'react';
import axios from 'axios';
import QRCode from 'qrcode';
import { useNavigate } from 'react-router-dom'; // Import useNavigate from react-router-dom

const SERVERIP = "http://14.139.34.10:8000";
const QR = () => {
  const [validQRs, setValidQRs] = useState([]);
  const navigate = useNavigate(); // Initialize useNavigate hook

  useEffect(() => {
    const fetchValidQRs = async () => {
      try {
        const email = localStorage.getItem('loggedInUserEmail'); // Retrieve email from localStorage
        const response = await axios.get(`${SERVERIP}/QR/${email}`);
        const qrCodes = await Promise.all(response.data.qrCodes.map(qr => generateQRCode(qr)));
        setValidQRs(qrCodes);
      } catch (error) {
        console.error('Error fetching valid QR codes:', error);
      }
    };

    fetchValidQRs();
  }, []);

  // Function to generate QR code from payment ID
  const generateQRCode = async (qr) => {
    try {
      const dataURL = await QRCode.toDataURL(qr.paymentId);
      return { ...qr, dataURL }; // Include the dataURL along with the QR object
    } catch (error) {
      console.error('Error generating QR code:', error);
      return { ...qr, dataURL: '' }; // Include an empty dataURL if generation fails
    }
  };

  // Function to handle the button click
  const handleUseQR = (qr) => {
    localStorage.setItem("seatassignment", "true");
    navigate(`/allshowtime/${qr.paymentId}`); // <-- Close the parenthesis here
    console.log(`${qr.paymentId}`);
  };

  return (
    <div>
      <h2>Valid QR Codes</h2>
      <div style={{ display: 'flex', flexWrap: 'wrap' }}>
        {validQRs.map((qr, index) => (
          <div key={index} style={{ marginRight: '10px', marginBottom: '10px' }}>
            <img src={qr.dataURL} alt={`QR Code ${index}`} style={{ width: '100px', height: '100px' }} />
            {!qr.used ? (
              <button onClick={() => handleUseQR(qr)}>Use this QR</button>
            ) : (
              <p>Already used QR</p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default QR;
