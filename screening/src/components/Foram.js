/*import React, { useState, useEffect } from "react";
import QRCode from "qrcode";
import axios from "axios";
import { getToken } from "../utils/getToken";
import { useNavigate } from "react-router-dom";
import "../Foram.css";

export const Foram = () => {
  const [amount, setAmount] = useState("");
  const [membership, setMembership] = useState("");
  const [degree, setDegree] = useState("");
  const [email, setEmail] = useState("");

  useEffect(() => {
    const storedEmail = localStorage.getItem('loggedInUserEmail');
    if (storedEmail) {
      setEmail(storedEmail);
    }
  }, []);

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
        key:"rzp_test_bVkTgi3UqyKgi7",
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
            saveuserData(email,"base",7);
            saveData(response.razorpay_payment_id,1,'base',7);
            generateAndSendEmail('base', response.razorpay_payment_id,1);
          } else if (membership === "silver") {
            saveuserData(email,"silver",15);
            saveData(response.razorpay_payment_id,2,'silver',15);
            generateAndSendEmail('silver', response.razorpay_payment_id,2);
          } else if (membership === "gold") {
            saveuserData(email,"gold",30);
            saveData(response.razorpay_payment_id ,3,'gold',30);
            generateAndSendEmail('gold', response.razorpay_payment_id,3);
          } else if (membership === "diamond") {
            saveuserData(email,"diamond",30);
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
      .post("http://localhost:8000/QR/send-email", emailContent)
      .then((response) => {
        console.log(`Email sent for ${membership} membership.`);
        alert(`Email sent successfully for ${membership} membership.`);
      })
      .catch((error) => {
        console.error("Error sending email:", error);
        alert("Error sending email. Please try again later.");
      });
  };

  const saveuserData = (email,memtype,validity) => {
    const userData = {email, memtype, validity};
    console.log("a");
    axios.post("http://localhost:8000/saveusermem", userData)
    .then((response) => {
        console.log(`Usermem data saved successfully for ${memtype,email}`);
        alert(`Usermem data saved successfully for ${memtype,email}`);
    })
    .catch((error) => {
      console.error("Error saving Usermemdata:", error);
      alert("Error saving Usermemdata. Please try again later.");
    });
};

  const saveData = (basePaymentId, totalTickets,memtype,validity) => {
    let ticketsGenerated = 0;
  
    const saveTicket = (ticketNumber) => {
      const paymentId = basePaymentId + ticketNumber; // Append ticket number to basePaymentId
      const QRData = { email, paymentId, validity, memtype };
      axios
        .post("http://localhost:8000/QR/saveQR", QRData)
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

  const token = getToken();
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) {
      navigate("/login");
    }
  });

  return (
    <>
    <div class="d-flex justify-content-center bg-secondary-gradient main">
      <div className="App mt-5">
        <h2>Razorpay Payment Integration</h2>
        <hr class="border border-primary border-2 opacity-75"></hr>
        <div className="form-group">
          <label htmlFor="name" class="form-label">Name:</label>
          <input type="text" id="name exampleFormControlInput1" class="form-control inp" name="name" placeholder="Name" required />
        </div>

        <div className="form-group">
          <label htmlFor="rollNumber" class="form-label">Roll Number:</label>
          <input type="text" id="rollNumber" name="rollNumber" class="form-control inp" placeholder="Eg. BXXXXX" />
        </div>

        <div className="form-group">
          <label htmlFor="email" class="form-label">Email:</label>
          <input
            type="text"
            id="email"
            name="email"
            class = "form-control inp"
           // placeholder="Eg. bxxxxx@students.iitmandi.ac.in"
            required
            value={email}
            readOnly
          />
        </div>

        <div className="form-group">
          <label htmlFor="phoneNumber" class="form-label">Phone Number:</label>
          <input type="text" id="phoneNumber" class="form-control inp" name="phoneNumber"placeholder="Phone no." required />
        </div>

        <div className="form-group">
          <label htmlFor="degree" class="form-label">Choose Degree:</label>
          <select class= "form-select inp"id="degree" name="degree" required>
            <option value="">Select One</option>
            <option value="btech">B-Tech</option>
            <option value="phd">PHD</option>
            <option value="fs">Faculty/Stafft</option>
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="membership" class="form-label">Choose Membership:</label>
          <select
            class= "form-select inp"
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
        <div class="form-group">
        <input class="inp" type="text" placeholder="Amount" value={amount} readOnly />
        </div>
        <br />
        <br />
        <div class="d-grid gap-2 col-6 mx-auto">
        <button onClick={handleSubmit}class="btn btn-primary sub">Submit</button>
      </div>
      </div>
      </div>
    </>
  );
};

export default Foram;*/

import React, { useState, useEffect } from "react";
import QRCode from "qrcode";
import axios from "axios";
import { getToken } from "../utils/getToken";
import { useNavigate } from "react-router-dom";
import "../Foram.css";

export const Foram = () => {
  const [amount, setAmount] = useState("");
  const [membership, setMembership] = useState("");
  const [degree, setDegree] = useState("");
  const [email, setEmail] = useState("");

  const token = getToken();
  const navigate = useNavigate(); // Declare navigate here once

  useEffect(() => {
    const storedEmail = localStorage.getItem('loggedInUserEmail');
    if (storedEmail) {
      setEmail(storedEmail);
      setDegree(getDegreeFromEmail(storedEmail));
    }
  }, []);

  const getDegreeFromEmail = (email) => {
    const emailDomain = email.substring(email.lastIndexOf("@") + 1);
    if (emailDomain === "students.iitmandi.ac.in") {
      if (email.charAt(0).toLowerCase() === "b") {
        return "B-Tech"; // Changed from "btech" to "B-Tech"
      } else {
        return "PHD/M-Tech"; // Changed from "phd" to "PHD/M-Tech"
      }
    } else if (emailDomain === "iitmandi.ac.in") {
      return "Faculty/Staff"; // Changed from "fs" to "Faculty/Staff"
    } else {
      return ""; // Invalid email domain
    }
  };

  const handleMembershipChange = (e) => {
    setMembership(e.target.value);
    const selectedDegree = document.getElementById("degree").value;
    setDegree(selectedDegree);
    const amounts = {
      "B-Tech": { base: "130", silver: "240", gold: "330", diamond: "400" },
      "PHD/M-Tech": { base: "150", silver: "280", gold: "390", diamond: "440" },
      "Faculty/Staff": { base: "170", silver: "320", gold: "450", diamond: "500" },
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
        key:"rzp_test_bVkTgi3UqyKgi7",
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
            saveuserData(email,"base",7);
            saveData(response.razorpay_payment_id,1,'base',7);
            generateAndSendEmail('base', response.razorpay_payment_id,1);
          } else if (membership === "silver") {
            saveuserData(email,"silver",15);
            saveData(response.razorpay_payment_id,2,'silver',15);
            generateAndSendEmail('silver', response.razorpay_payment_id,2);
          } else if (membership === "gold") {
            saveuserData(email,"gold",30);
            saveData(response.razorpay_payment_id ,3,'gold',30);
            generateAndSendEmail('gold', response.razorpay_payment_id,3);
          } else if (membership === "diamond") {
            saveuserData(email,"diamond",30);
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
      .post("http://localhost:8000/QR/send-email", emailContent)
      .then((response) => {
        console.log(`Email sent for ${membership} membership.`);
        alert(`Email sent successfully for ${membership} membership.`);
      })
      .catch((error) => {
        console.error("Error sending email:", error);
        alert("Error sending email. Please try again later.");
      });
  };

  const saveuserData = (email,memtype,validity) => {
    const userData = {email, memtype, validity};
    console.log("a");
    axios.post("http://localhost:8000/saveusermem", userData)
    .then((response) => {
        console.log(`Usermem data saved successfully for ${memtype,email}`);
        alert(`Usermem data saved successfully for ${memtype,email}`);
    })
    .catch((error) => {
      console.error("Error saving Usermemdata:", error);
      alert("Error saving Usermemdata. Please try again later.");
    });
};

  const saveData = (basePaymentId, totalTickets,memtype,validity) => {
    let ticketsGenerated = 0;
  
    const saveTicket = (ticketNumber) => {
      const paymentId = basePaymentId + ticketNumber; // Append ticket number to basePaymentId
      const QRData = { email, paymentId, validity, memtype };
      axios
        .post("http://localhost:8000/QR/saveQR", QRData)
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

  useEffect(() => {
    if (!token) {
      navigate("/login");
    }
  });

  return (
    <>
    <div class="d-flex justify-content-center bg-secondary-gradient main">
      <div className="App mt-5">
        <h2>Razorpay Payment Integration</h2>
        <hr class="border border-primary border-2 opacity-75"></hr>
        <div className="form-group">
          <label htmlFor="name" class="form-label">Name:</label>
          <input type="text" id="name exampleFormControlInput1" class="form-control inp" name="name" placeholder="Name" required />
        </div>

        <div className="form-group">
          <label htmlFor="rollNumber" class="form-label">Roll Number:</label>
          <input type="text" id="rollNumber" name="rollNumber" class="form-control inp" placeholder="Eg. BXXXXX" />
        </div>

        <div className="form-group">
          <label htmlFor="email" class="form-label">Email:</label>
          <input
            type="text"
            id="email"
            name="email"
            class="form-control inp"
            required
            value={email}
            readOnly
          />
        </div>

        <div className="form-group">
          <label htmlFor="phoneNumber" class="form-label">Phone Number:</label>
          <input type="text" id="phoneNumber" class="form-control inp" name="phoneNumber"placeholder="Phone no." required />
        </div>

        <div className="form-group">
          <label htmlFor="degree" class="form-label">Degree:</label>
          <input
            type="text"
            id="degree"
            name="degree"
            class="form-control inp"
            value={degree}
            readOnly
          />
        </div>

        <div className="form-group">
          <label htmlFor="membership" class="form-label">Choose Membership:</label>
          <select
            class="form-select inp"
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
        <div class="form-group">
        <input class="inp" type="text" placeholder="Amount" value={amount} readOnly />
        </div>
        <br />
        <br />
        <div class="d-grid gap-2 col-6 mx-auto">
        <button onClick={handleSubmit}class="btn btn-primary sub">Submit</button>
      </div>
      </div>
      </div>
    </>
  );
};

export default Foram;

