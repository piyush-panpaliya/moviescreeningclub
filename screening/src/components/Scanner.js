import React, { useState, useEffect } from "react";
import { BrowserMultiFormatReader, NotFoundException } from "@zxing/library";
import { useNavigate } from "react-router-dom";

export const Scanner = () => {
  const [scanResult, setScanResult] = useState(null);
  const [scanResultInfo, setScanResultInfo] = useState(null);
  const [showButton, setShowButton] = useState(false); // State to control button visibility
  const navigate = useNavigate();

  useEffect(() => {
    const userType = localStorage.getItem('userType');
    // If userType is not volunteer or admin, redirect to home page
    if (!userType || userType === 'standard') {
      navigate("/");
    } else {
      initializeScanner();
    }
  }, [navigate]); // Only navigate as dependency since we're not using it in the initialization

  const initializeScanner = () => {
    const codeReader = new BrowserMultiFormatReader();
    let isScanning = true; // Variable to track if scanning is ongoing

    codeReader
      .listVideoInputDevices()
      .then((videoInputDevices) => {
        // Select the first video input device
        const selectedDeviceId = videoInputDevices[0].deviceId;
        codeReader.decodeFromVideoDevice(
          selectedDeviceId,
          "reader",
          (result, err) => {
            if (isScanning) {
              if (result) {
                console.log("Next QR"); // Log "Next QR" after identifying a QR code
                setScanResult(result.getText());
                isScanning = false; // Stop scanning once QR code is detected
                sendApiRequest(result.getText());
              } else if (err && !(err instanceof NotFoundException)) {
                console.error("Error scanning:", err);
              }
            }
          }
        );
      })
      .catch((err) => {
        console.error("Error listing video devices:", err);
      });
  };

  const sendApiRequest = async (result) => {
    try {
      const response = await fetch("http://localhost:8000/payment/checkPayment", {
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
      console.log(scanResultInfo);
      // Update button visibility based on scan result
      setShowButton(data.exists && !data.validityPassed && !data.alreadyScanned);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleRedirect = () => {
    navigate(`/allshowtime/${scanResultInfo.email}`);
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
                            {showButton && (
                              <button onClick={handleRedirect}>View All Showtimes</button>
                            )}
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
          <video id="reader" width="100%" height="100%"></video>
        )}
      </div>
    </div>
  );
};

export default Scanner;
