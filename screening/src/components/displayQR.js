import React, { useState, useEffect } from "react";
import axios from "axios";
import QRCode from "qrcode";
import { useNavigate } from "react-router-dom";
import { SERVERIP } from "../config";

const QR = () => {
  const [validQRs, setValidQRs] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchValidQRs = async () => {
      try {
        const email = localStorage.getItem("loggedInUserEmail");
        const response = await axios.get(`${SERVERIP}/QR/${email}`);
        const qrCodes = await Promise.all(
          response.data.qrCodes.map((qr) => generateQRCode(qr))
        );
        const filteredQRs = qrCodes.filter(
          (qr) => new Date(qr.expirationDate) > new Date()
        );
        setValidQRs(filteredQRs);
      } catch (error) {
        console.error("Error fetching valid QR codes:", error);
      }
    };

    fetchValidQRs();
  }, []);

  const generateQRCode = async (qr) => {
    try {
      const dataURL = await QRCode.toDataURL(qr.paymentId);
      return { ...qr, dataURL };
    } catch (error) {
      console.error("Error generating QR code:", error);
      return { ...qr, dataURL: "" };
    }
  };

  const handleUseQR = (qr) => {
    localStorage.setItem("seatassignment", "true");
    navigate(`/allshowtime/${qr.paymentId}`);
    console.log(`${qr.paymentId}`);
  };

  const renderQRStatus = (qr) => {
    if (qr.verified) {
      return (
        <div className="flex flex-col capitalize mt-3">
          <p>
            qR used :{" "}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="green"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m4.5 12.75 6 6 9-13.5"
              />
            </svg>
          </p>
          <p>
            qR verified :{" "}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="green"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m4.5 12.75 6 6 9-13.5"
              />
            </svg>
          </p>
        </div>
      );
    } else {
      if (qr.used) {
        return (
          <div className="flex flex-col capitalize mt-3">
            <p className="flex">
              qR used :{" "}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="green"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="m4.5 12.75 6 6 9-13.5"
                />
              </svg>
            </p>
            <p className="flex">
              qR verified :{" "}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="red"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18 18 6M6 6l12 12"
                />
              </svg>
            </p>
          </div>
        );
      } else {
        return (
          <div className="flex flex-col capitalize mt-3">
            <button className="flex justify-center bg-primary-600 p-2 text-white rounded-md mb-2" onClick={() => handleUseQR(qr)}>
              Use this QR
            </button>
            <p className="flex">
              qR used :{" "}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="red"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18 18 6M6 6l12 12"
                />
              </svg>
            </p>
            <p className="flex">
              qR verified :{" "}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="red"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18 18 6M6 6l12 12"
                />
              </svg>
            </p>
          </div>
        );
      }
    }
  };

  return (
    <div>
      <div className="bg-gray-200 flex flex-col items-center min-h-screen">
        <h2 className="text-2xl font-semibold mb-4 mt-7">Valid QR Codes</h2>
        <div className="flex flex-col bg-white h-1/2 w-4/5 my-10 rounded-xl shadow-lg">
          <div className="grid gap-6 my-4 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 mx-5">
            {validQRs.map((qr, index) => (
              <div
                key={index}
                className="even:bg-white odd:bg-slate-200 p-3 text-center flex flex-col items-center justify-center"
              >
                <img src={qr.dataURL} alt={`QR Code ${index}`} className="" />
                <p>{renderQRStatus(qr)}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default QR;
