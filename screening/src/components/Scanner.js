import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import jsQR from "jsqr";
const SERVERIP = "http://14.139.34.10:8000";

export const Scanner = () => {
  const [scanResult, setScanResult] = useState(null);
  const [scanResultInfo, setScanResultInfo] = useState(null);
  const [showButton, setShowButton] = useState(false);
  const navigate = useNavigate();
  const videoRef = useRef(null);

  useEffect(() => {
    const userType = localStorage.getItem('userType');
    if (!userType || userType === 'standard'|| userType === 'movievolunteer') {
      navigate("/");
    } else {
      initializeScanner();
    }

    return () => {
      stopCamera(); // Cleanup function to stop the camera when unmounting
    };
  }, [navigate]);

  const initializeScanner = () => {
    navigator.mediaDevices.getUserMedia({ video: { facingMode: "environment" } })
      .then((stream) => {
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          videoRef.current.addEventListener('loadedmetadata', () => {
            videoRef.current.play();
            scanQRCode();
          });
        }
      })
      .catch((err) => {
        console.error("Error accessing camera:", err);
      });
  };

  const scanQRCode = () => {
    const checkQRCode = () => {
      if (!videoRef.current || videoRef.current.videoWidth === 0) {
        requestAnimationFrame(checkQRCode);
        return;
      }
    
      const canvas = document.createElement('canvas');
      const context = canvas.getContext('2d');
    
      canvas.width = videoRef.current.videoWidth;
      canvas.height = videoRef.current.videoHeight;
    
      context.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);
    
      const imageData = context.getImageData(0, 0, canvas.width, canvas.height);
    
      const code = jsQR(imageData.data, imageData.width, imageData.height);
    
      if (code) {
        setScanResult(code.data);
        sendApiRequest(code.data);
        stopCamera();
      } else {
        requestAnimationFrame(checkQRCode);
      }
    };
    checkQRCode();
  };

  const stopCamera = () => {
    if (videoRef.current && videoRef.current.srcObject) {
      const stream = videoRef.current.srcObject;
      const tracks = stream.getTracks();
  
      tracks.forEach((track) => {
        track.stop();
      });
      videoRef.current.srcObject = null;
    }
  };

  const sendApiRequest = async (result) => {
    try {
      const response = await fetch(`${SERVERIP}/payment/checkPayment`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ paymentId: result }),
      });
      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }
      const data = await response.json();
      setScanResultInfo(data);
      setShowButton(data.exists && !data.validityPassed && !data.alreadyScanned);
      if (data.exists && !data.validityPassed && !data.alreadyScanned) {
        localStorage.setItem("seatassignment", "true");
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  return (
    <div style={{ width: "100%", height: "100vh", display: "flex", justifyContent: "center", alignItems: "center" }}>
      <div style={{ width: "300px", height: "300px" }}>
        {scanResult ? (
          <div>
            {scanResultInfo === null ? (
              <div>Scanning...</div>
            ) : (
              <div>
                {scanResultInfo.exists ? (
                  <div>
                    {scanResultInfo.validityPassed ? (
                      <div> Access denied: Validity of this QR has expired.</div>
                    ) : (
                      <div>
                        {scanResultInfo.alreadyScanned ? (
                          <div> Access denied: QR already scanned.</div>
                        ) : (
                          <>
                            <div>Access granted for {scanResultInfo.email}.</div>
                            {navigate(`/allshowtime/${scanResultInfo.email}`)}
                          </>
                        )}
                      </div>
                    )}
                  </div>
                ) : (
                  <div>Access denied: Invalid QR.</div>
                )}
              </div>
            )}
          </div>
        ) : (
          <video ref={videoRef} width="100%" height="100%"></video>
        )}
      </div>
    </div>
  );
};

export default Scanner;
