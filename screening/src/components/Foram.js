import React, { useState } from "react";
import QRCode from "qrcode";
import axios from "axios";
import Navbar from "./navbar";

export const Foram = () => {
  const [amount, setAmount] = useState("");
  const [membership, setMembership] = useState("");
  const [degree, setDegree] = useState("");
  const [email, setEmail] = useState("");
  // const[Qr,setQr]=useState("");

  const handleMembershipChange = (e) => {
    setMembership(e.target.value);
    const selectedDegree = document.getElementById("degree").value;
    setDegree(selectedDegree);
    const amounts = {
      btech: { base: "130", silver: "240", gold: "330", diamond: "400" },
      phd: { base: "150", silver: "280", gold: "390", diamond: "440" },
      fs: { base: "170", silver: "320", gold: "450", diamond: "500" },
    };
    setAmount(amounts[selectedDegree][e.target.value]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Submit button clicked");
    if (amount === "" || email === "") {
      alert("Please select a membership and provide an email");
    } else {
      var options = {
        key: "rzp_test_bVkTgi3UqyKgi7",
        amount: amount * 100,
        currency: "INR",
        name: "STARTUP_PROJECTS",
        description: "for testing purpose",
        prefill: {
          name: "Aryan",
          email: "shahrukhkhan@gmail.com",
          contact: "9799000999",
        },
        notes: {
          address: "Razorpay Corporate office",
        },
        theme: {
          color: "#3399cc",
        },
        handler: function (response) {
          console.log("Payment successful:", response);
          if (membership === "base") {
            saveData(response.razorpay_payment_id,1,'base',7);
            generateAndSendEmail('base', response.razorpay_payment_id,1);
          } else if (membership === "silver") {
            saveData(response.razorpay_payment_id,2,'silver',15);
            generateAndSendEmail('silver', response.razorpay_payment_id,2);
          } else if (membership === "gold") {
            saveData(response.razorpay_payment_id ,3,'gold',30);
            generateAndSendEmail('gold', response.razorpay_payment_id,3);
          } else if (membership === "diamond") {
            saveData(response.razorpay_payment_id,4,'diamond',30);
            generateAndSendEmail('diamond', response.razorpay_payment_id,4);
          }
        },
      };
      console.log("Options object:", options);
      var pay = new window.Razorpay(options);
      pay.open();
    }
  };
  const generateAndSendEmail = (membership, paymentId, totalTickets) => {
    let qrCodes = [];
  
    for (let i = 1; i <= totalTickets; i++) {
      QRCode.toDataURL(paymentId + i)
        .then((qrCodeData) => {
          qrCodes.push(qrCodeData);
          if (qrCodes.length === totalTickets) {
            sendEmail(membership, paymentId, qrCodes);
          }
        })
        .catch((error) => {
          console.error("Error generating QR code:", error);
        });
    }
  };
  
  const sendEmail = (membership, paymentId, qrCodes) => {
    const emailContent = {
      email,
      membership,
      paymentId,
      qrCodes,
    };
    axios
      .post("http://localhost:8000/send-email", emailContent)
      .then((response) => {
        console.log(`Email sent for ${membership} membership.`);
        alert(`Email sent successfully for ${membership} membership.`);
      })
      .catch((error) => {
        console.error("Error sending email:", error);
        alert("Error sending email. Please try again later.");
      });
  };

  const saveData = (basePaymentId, totalTickets,memtype,validity) => {
    let ticketsGenerated = 0;
  
    const saveTicket = (ticketNumber) => {
      const paymentId = basePaymentId + ticketNumber; // Append ticket number to basePaymentId
      const QRData = { email, paymentId, validity };
      axios
        .post("http://localhost:8000/saveQR", QRData)
        .then((response) => {
          ticketsGenerated++;
          if (ticketsGenerated === totalTickets) {
            console.log(`QR data saved successfully for ${memtype} membership`);
            alert(`QR data saved successfully for ${memtype} membership`);
          } else {
            const nextTicketNumber = ticketNumber + 1;
            saveTicket(nextTicketNumber); // Call the function recursively until all tickets are generated
          }
        })
        .catch((error) => {
          console.error("Error saving QR data:", error);
          alert("Error saving QR data. Please try again later.");
        });
    };
    saveTicket(1); // Start with ticket number 1
};

  return (
    <>
      <Navbar />
      <div className="App">
        <h2>Razorpay Payment Integration</h2>

        <div className="form-group">
          <label htmlFor="name">Name:</label>
          <input type="text" id="name" name="name" required />
        </div>

        <div className="form-group">
          <label htmlFor="rollNumber">Roll Number:</label>
          <input type="text" id="rollNumber" name="rollNumber" />
        </div>

        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label htmlFor="phoneNumber">Phone Number:</label>
          <input type="text" id="phoneNumber" name="phoneNumber" required />
        </div>

        <div className="form-group">
          <label htmlFor="degree">Choose Degree:</label>
          <select id="degree" name="degree" required>
            <option value="">Select One</option>
            <option value="btech">B-Tech</option>
            <option value="phd">PHD</option>
            <option value="fs">Faculty/Stafft</option>
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="membership">Choose Membership:</label>
          <select
            id="membership"
            name="membership"
            required
            onChange={handleMembershipChange}
          >
            <option value="">Select One</option>
            <option value="base">Base</option>
            <option value="silver">Silver</option>
            <option value="gold">Gold</option>
            <option value="diamond">Diamond</option>
          </select>
        </div>

        <br />
        <input type="text" placeholder="Amount" value={amount} readOnly />
        <br />
        <br />
        <button onClick={handleSubmit}>Submit</button>
      </div>
    </>
  );
};

export default Foram;
