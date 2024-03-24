import React, { useState, useEffect } from "react";
import { BrowserMultiFormatReader } from "@zxing/library";

export const Scanner= () => {
  const [scanResult, setScanResult] = useState(null);
  const [scanResultExists, setScanResultExists] = useState(null);

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
            if (isScanning && result) {
              setScanResult(result.getText());
              isScanning = false; // Stop scanning once QR code is detected
              sendApiRequest(result.getText());
            }
            if (err) {
              console.error("Error scanning:", err);
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
      setScanResultExists(data.exists ? "yes" : "no");
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  
  return (
    <div>
      {scanResult ? (
        <div>
          {scanResultExists === null ? (
            <div>Scanning...</div>
          ) : (
            <div>
              {scanResultExists === "yes" ? (
                <div>Payment ID exists in the database</div>
              ) : (
                <div>Payment ID does not exist in the database</div>
              )}
            </div>
          )}
        </div>
      ) : (
        <video id="reader" width="100%" height="100%"></video>
      )}
    </div>
  );
}

export default Scanner;


