import React, { useState, useEffect } from "react";
import QRCode from "qrcode";
import axios from "axios";
import { getToken } from "../utils/getToken";
import { useNavigate } from "react-router-dom";

export const Foram = () => {
  const [amount, setAmount] = useState("");
  const [membership, setMembership] = useState("");
  const [degree, setDegree] = useState("");
  const [email, setEmail] = useState("");
  const [hasMembership, setHasMembership] = useState(false);

  const token = getToken();
  const navigate = useNavigate();

  useEffect(() => {
    const storedEmail = localStorage.getItem('loggedInUserEmail');
    if (!storedEmail) {
      navigate('/home');
    } else {
      setEmail(storedEmail);
      setDegree(getDegreeFromEmail(storedEmail));

      const checkMembership = async () => {
        try {
          const response = await axios.get(`http://localhost:8000/memrouter/checkMembership/${storedEmail}`);
          if (response.data.hasMembership) {
            setHasMembership(true);
          }
        } catch (error) {
          console.error("Error checking membership:", error);
        }
      };
      checkMembership();
    }
  }, [navigate]);

  const getDegreeFromEmail = (email) => {
    const emailDomain = email.substring(email.lastIndexOf("@") + 1);
    if (emailDomain === "students.iitmandi.ac.in") {
      if (email.charAt(0).toLowerCase() === "b") {
        return "B-Tech";
      } else {
        return "PHD/M-Tech";
      }
    } else if (emailDomain === "iitmandi.ac.in") {
      return "Faculty/Staff";
    } else {
      return "";
    }
  };

  const handleMembershipChange = (e) => {
    setMembership(e.target.value);
    const selectedDegree = document.getElementById("degree").value;
    setDegree(selectedDegree);
    const amounts = {
      "B-Tech": { base: "130", silver: "240", gold: "330", diamond: "400" },
      "PHD/M-Tech": { base: "150", silver: "280", gold: "390", diamond: "440" },
      "Faculty/Staff": {
        base: "170",
        silver: "320",
        gold: "450",
        diamond: "500",
      },
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
            saveuserData(email, "base", 7);
            saveData(response.razorpay_payment_id, 1, "base", 7);
            generateAndSendEmail("base", response.razorpay_payment_id, 1);
          } else if (membership === "silver") {
            saveuserData(email, "silver", 15);
            saveData(response.razorpay_payment_id, 2, "silver", 15);
            generateAndSendEmail("silver", response.razorpay_payment_id, 2);
          } else if (membership === "gold") {
            saveuserData(email, "gold", 30);
            saveData(response.razorpay_payment_id, 3, "gold", 30);
            generateAndSendEmail("gold", response.razorpay_payment_id, 3);
          } else if (membership === "diamond") {
            saveuserData(email, "diamond", 30);
            saveData(response.razorpay_payment_id, 4, "diamond", 30);
            generateAndSendEmail("diamond", response.razorpay_payment_id, 4);
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

  const saveuserData = (email, memtype, validity) => {
    const userData = { email, memtype, validity };
    console.log("a");
    axios
      .post("http://localhost:8000/memrouter/saveusermem", userData)
      .then((response) => {
        console.log(`Usermem data saved successfully for ${(memtype, email)}`);
        alert(`Usermem data saved successfully for ${(memtype, email)}`);
      })
      .catch((error) => {
        console.error("Error saving Usermemdata:", error);
        alert("Error saving Usermemdata. Please try again later.");
      });
  };

  const saveData = (basePaymentId, totalTickets, memtype, validity) => {
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

  if (!hasMembership) {
    return (
      <div className="flex justify-center items-center bg-gray-200 h-screen">
        <div className="flex flex-col items-center lg:w-1/2 h-[80%] border shadow-lg bg-white rounded-md">
          <h2 className="text-2xl text-center mt-5 font-semibold ">
            Razorpay Payment Integration
          </h2>
          <hr className="my-4"></hr>
          <form onSubmit={handleSubmit} className="flex flex-col gap-3 w-[60%]">
            <div className="flex justify-between">
              <label htmlFor="name" className="form-label">
                Name:
              </label>
              <input
                type="text"
                id="name exampleFormControlInput1"
                className="form-control inp border border-gray-400 rounded-md px-3 py-2 focus:outline-none focus:border-blue-500"
                name="name"
                placeholder="Name"
                required
              />
            </div>
            <div className="flex justify-between">
              <label htmlFor="rollNumber" className="form-label">
                Roll Number:
              </label>
              <input
                type="text"
                id="rollNumber"
                name="rollNumber"
                className="form-control inp border border-gray-400 rounded-md px-3 py-2 focus:outline-none focus:border-blue-500"
                placeholder="Eg. BXXXXX"
              />
            </div>

            <div className="flex justify-between">
              <label htmlFor="email" className="form-label">
                Email:
              </label>
              <input
                type="text"
                id="email"
                name="email"
                className="form-control inp border border-gray-400 rounded-md px-3 py-2 focus:outline-none focus:border-blue-500"
                required
                value={email}
                readOnly
              />
            </div>

            <div className="flex justify-between">
              <label htmlFor="phoneNumber" className="form-label">
                Phone Number:
              </label>
              <input
                type="text"
                id="phoneNumber"
                className="form-control inp border border-gray-400 rounded-md px-3 py-2 focus:outline-none focus:border-blue-500"
                name="phoneNumber"
                placeholder="Phone no."
                required
              />
            </div>

            <div className="flex justify-between">
              <label htmlFor="degree" className="form-label">
                Degree:
              </label>
              <input
                type="text"
                id="degree"
                name="degree"
                className="form-control inp border border-gray-400 rounded-md px-3 py-2 focus:outline-none focus:border-blue-500"
                value={degree}
                readOnly
              />
            </div>

            <div className="flex justify-between">
              <label htmlFor="membership" className="form-label">
                Choose Membership:
              </label>
              <select
                className="form-select inp border border-gray-400 rounded-md px-3 py-2 focus:outline-none focus:border-blue-500"
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

            <div className="flex justify-between">
            <label htmlFor="membership" className="form-label">
                Amount:
              </label>
              <input
                className="inp border border-gray-400 rounded-md px-3 py-2 focus:outline-none focus:border-blue-500"
                type="text"
                placeholder="Amount"
                value={amount}
                readOnly
              />
            </div>

            <div className="grid place-items-center">
              <button
                type="submit"
                className="btn btn-primary sub py-2 my-4 px-4 rounded-md bg-blue-500 hover:bg-blue-700 text-white font-semibold focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-opacity-50"
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  } else {
    navigate("/");
    return null;
  }
};

export default Foram;
