import React, { useState, useEffect } from "react";
import { BrowserMultiFormatReader, NotFoundException } from "@zxing/library";
import Navbar from "./navbar";

export const Scanner = () => {
  const [scanResult, setScanResult] = useState(null);
  const [scanResultInfo, setScanResultInfo] = useState(null);

  useEffect(() => {
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

    return () => {
      codeReader.reset();
    };
  }, []);

  const sendApiRequest = async (result) => {
    try {
      const response = await fetch("http://localhost:8000/checkPayment", {
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
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  return (
    <div>
      <Navbar />
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
                        <div>Access granted.</div>
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
  );
};

export default Scanner;


