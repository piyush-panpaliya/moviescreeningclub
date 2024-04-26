import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import jsQR from "jsqr";
import { SERVERIP } from "../config";

export const Scanner = () => {
  const [scanResult, setScanResult] = useState(null);
  const [scanResultInfo, setScanResultInfo] = useState(null);
  const navigate = useNavigate();
  const videoRef = useRef(null);

  useEffect(() => {
    const userType = localStorage.getItem("userType");
    if (!userType || userType === "standard" || userType === "movievolunteer") {
      navigate("/");
    } else {
      initializeScanner();
    }

    return () => {
      stopCamera(); // Cleanup function to stop the camera when unmounting
    };
  }, [navigate]);

  const initializeScanner = () => {
    navigator.mediaDevices
      .getUserMedia({ video: { facingMode: "environment" } })
      .then((stream) => {
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          videoRef.current.addEventListener("loadedmetadata", () => {
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

      const canvas = document.createElement("canvas");
      const context = canvas.getContext("2d");

      canvas.width = videoRef.current.videoWidth;
      canvas.height = videoRef.current.videoHeight;

      context.drawImage(
        videoRef.current,
        0,
        0,
        canvas.width,
        canvas.height
      );

      const imageData = context.getImageData(
        0,
        0,
        canvas.width,
        canvas.height
      );

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
      console.log(data);
  
      // After access is granted, generate printable HTML content
      if (data && data.exists && !data.verified && !data.validityPassed && data.seatbooked) {
        const printContent = `
          <html>
            <head>
              <title>Print Ticket</title>
              <style>
                /* Add CSS styles for ticket layout */
                body {
                  font-family: Arial, sans-serif;
                  margin: 0;
                  padding: 0;
                }
                .ticket {
                  width: 200px; /* Adjust width for receipt size */
                  padding: 10px;
                  border: 1px solid #ccc;
                  text-align: center;
                }
              </style>
            </head>
            <body>
              <div class="ticket">
                <h2>Ticket Details</h2>
                <p>Access granted for ${data.email}</p>
                <p>TIme : ${data.showtime}</p>
                <p>Date : ${data.showdate}</p>
                <img id ="ticketImage" src="https://static-koimoi.akamaized.net/wp-content/new-galleries/2015/05/abcd-any-body-can-dance-2-movie-poster-1.jpg" alt="Image" width="100" height="100">
              </div>
            </body>
          </html>
        `;
        const printWindow = window.open("", "_blank");
if (printWindow) {
  printWindow.document.write(printContent);
  printWindow.document.close();
  
  // Wait for the image to load before triggering print dialog
  const ticketImage = printWindow.document.getElementById("ticketImage");
  ticketImage.onload = function() {
    printWindow.print(); // Trigger print dialog after image has loaded
  };
          
        } else {
          console.error("Failed to open print window");
        }
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  
  
  return (
    <div className="flex justify-center w-full h-100vh mt-6">
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
                        {!scanResultInfo.seatbooked ? (
                          <div> Access denied: Please book a seat with this QR.</div>
                        ) : (
                          <div>
                            {scanResultInfo.verified ? (
                              <div> Access denied: This QR is already verified and used to watch a movie.</div>
                            ) : (
                              <div>Access granted for {scanResultInfo.email}. Printing your ticket.</div>
                            )}
                          </div>
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
