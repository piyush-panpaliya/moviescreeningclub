import React, { useState } from "react";
import QRCode  from "qrcode";
import axios from "axios";

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
        // Configuration for Razorpay payment
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
          if(membership==='base'){
            saveData(response.razorpay_payment_id+'1');
            generate(response.razorpay_payment_id+'1'); 
          }
          else if(membership==='silver'){
            saveData(response.razorpay_payment_id+'1');
            generate(response.razorpay_payment_id+'1'); 
            saveData(response.razorpay_payment_id+'2');
            generate(response.razorpay_payment_id+'2'); 
          }
          else if(membership==='gold'){
            saveData(response.razorpay_payment_id+'1');
            generate(response.razorpay_payment_id+'1'); 
            saveData(response.razorpay_payment_id+'2');
            generate(response.razorpay_payment_id+'2'); 
            saveData(response.razorpay_payment_id+'3');
            generate(response.razorpay_payment_id+'3'); 
          }
          else if(membership==='diamond'){
            saveData(response.razorpay_payment_id+'1');
            generate(response.razorpay_payment_id+'1'); 
            saveData(response.razorpay_payment_id+'2');
            generate(response.razorpay_payment_id+'2'); 
            saveData(response.razorpay_payment_id+'3');
            generate(response.razorpay_payment_id+'3'); 
            saveData(response.razorpay_payment_id+'4');
            generate(response.razorpay_payment_id+'4'); 
          }
        },
      };
      console.log("Options object:", options);
      var pay = new window.Razorpay(options);
      pay.open();

    }
  };
  
  let paymentids=[];
  const generate = (payment) => {
    QRCode.toDataURL(payment)
      .then((qrCodeData) => {
        // setQr(qrCodeData); // Set the Qr state after QR code generation
        sendEmail(payment,qrCodeData);
      })
      .catch((error) => {
        console.error("Error generating QR code:", error);
      });
  };

  const saveData=(paymentId)=>{
    const QRData = { email, paymentId};
    axios
      .post("http://localhost:8000/saveQR", QRData)
      .then((response) => {
        // console.log(Qr);
        console.log("QR data saved successfully:", response.data);
        // paymentids.push({paymentId,Qr});
        alert("QR data saved successfully");
      })
      .catch((error) => {
        console.error("Error saving QR data:", error);
        alert("Error saving QR data. Please try again later.");
      });
  }

  const sendEmail = (paymentId,Qr) => {
    axios 
      .post("http://localhost:8000/send-email", { email, paymentId,Qr})
      .then((response) => {
        console.log("email sent", response.data);
        alert("Email sent successfully");
        console.log(paymentids);
      })
      .catch((error) => {
        console.error("Error sending email:", error);
        alert("Error sending email. Please try again later.");
      });
  };

  return (
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
  );
};

export default Foram;
