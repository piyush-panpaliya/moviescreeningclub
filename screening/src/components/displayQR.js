import React, { useState, useEffect } from 'react';
import axios from 'axios';

const QR = () => {
  const [validQRs, setValidQRs] = useState([]);

  useEffect(() => {
    // Fetch valid QR codes from the backend
    const fetchValidQRs = async () => {
      try {
        const response = await axios.get('/api/qrs/valid');
        setValidQRs(response.data.qrCodes);
      } catch (error) {
        console.error('Error fetching valid QR codes:', error);
      }
    };

    fetchValidQRs();
  }, []);

  return (
    <div>
      <h2>Valid QR Codes</h2>
      <ul>
        {validQRs.map((qr) => (
          <li key={qr._id}>
            <p>Email: {qr.email}</p>
            <p>Payment ID: {qr.paymentId}</p>
            <p>Validity Date: {qr.validitydate}</p>
            <p>Membership Type: {qr.memtype}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default QR;
