import React, { useState, useEffect } from 'react';
import axios from 'axios';
import QRCode from 'qrcode';
import { useNavigate } from 'react-router-dom'; 

const SERVERIP = "http://14.139.34.10:8000";

const QR = () => {
  const [validQRs, setValidQRs] = useState([]);
  const navigate = useNavigate(); 

  useEffect(() => {
    const fetchValidQRs = async () => {
      try {
        const email = localStorage.getItem('loggedInUserEmail'); 
        const response = await axios.get(`${SERVERIP}/QR/${email}`);
        const qrCodes = await Promise.all(response.data.qrCodes.map(qr => generateQRCode(qr)));
        const filteredQRs = qrCodes.filter(qr => new Date(qr.expirationDate) > new Date());
        setValidQRs(filteredQRs);
      } catch (error) {
        console.error('Error fetching valid QR codes:', error);
      }
    };

    fetchValidQRs();
  }, []);

  const generateQRCode = async (qr) => {
    try {
      const dataURL = await QRCode.toDataURL(qr.paymentId);
      return { ...qr, dataURL }; 
    } catch (error) {
      console.error('Error generating QR code:', error);
      return { ...qr, dataURL: '' }; 
    }
  };

  const handleUseQR = (qr) => {
    localStorage.setItem("seatassignment", "true");
    navigate(`/allshowtime/${qr.paymentId}`); 
    console.log(`${qr.paymentId}`);
  };

  const renderQRStatus = (qr) => {
    if (qr.verified) {
      return "OTP is verified. Happy Show time";
    } else {
      if (qr.used) {
        return "Seat selected but OTP not yet verified";
      } else {
        return <button onClick={() => handleUseQR(qr)}>Use this QR</button>;
      }
    }
  };

  return (
    <div>
      <h2>Valid QR Codes</h2>
      <div style={{ display: 'flex', flexWrap: 'wrap' }}>
        {validQRs.map((qr, index) => (
          <div key={index} style={{ marginRight: '10px', marginBottom: '10px' }}>
            <img src={qr.dataURL} alt={`QR Code ${index}`} style={{ width: '100px', height: '100px' }} />
            <p>{renderQRStatus(qr)}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default QR;
