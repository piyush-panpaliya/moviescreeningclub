import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

export const Signup = () => {
  const [formData, setFormData] = useState({
    name: "",
    phoneNumber: "",
    designation: "",
    password: "",
    otp: "",
  });

  const [email, setEmail] = useState("");
  const [isValidEmail, setIsValidEmail] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const storedEmail = localStorage.getItem("getotpEmail");
    if (storedEmail) {
      setEmail(storedEmail);
      parseEmail(storedEmail);
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    if (name === "email") {
      parseEmail(value);
    }
  };

  const parseEmail = (email) => {
    email = email.trim();
    if (email.endsWith("@students.iitmandi.ac.in")) {
      setIsValidEmail(true);
      if (email.toLowerCase().startsWith("b")) {
        setFormData({ ...formData, designation: "B-Tech" });
      } else {
        setFormData({ ...formData, designation: "PHD/M-Tech" });
      }
    } else if (email.endsWith("@iitmandi.ac.in")) {
      setIsValidEmail(true);
      setFormData({ ...formData, designation: "Faculty/Staff" });
    } else {
      setIsValidEmail(false);
      setFormData({ ...formData, designation: "" });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isValidEmail) {
      alert("Please enter a valid college email ID.");
      return;
    }

    try {
      const res = await axios.post("http://localhost:8000/auth/signup", {
        ...formData,
        email,
      });
      console.log(res.data);
      console.log("Submitted");
      localStorage.setItem("signupEmail",email);
      localStorage.removeItem('getotpEmail');
      navigate("/login");
    } catch (err) {
      alert("Email already registered");
      console.error("Error occurred:", err);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  
  if (!localStorage.getItem('getotpEmail')) {
    navigate('/getOTP');
  }

  const { name, phoneNumber, password, otp } = formData;

  return (
    <div className="bg-gray-200 flex flex-col items-center">
      <div className="flex flex-col bg-white h-1/2 w-4/5 my-10 rounded-xl shadow-lg">
        <h2 className="text-xl font-semibold">Sign-Up New User</h2>

        <div className="grid gap-6 mb-8 md:grid-cols-1 mx-5">
          <div>
            <label htmlFor="name">Name:</label>
            <input
              type="text"
              id="name"
              name="name"
              required
              value={name}
              onChange={handleChange}
              className="border border-gray-400 rounded-md px-3 py-2 focus:outline-none focus:border-blue-500"
            />
          </div>

          <div>
            <label htmlFor="phoneNumber">Phone Number:</label>
            <input
              type="text"
              id="phoneNumber"
              name="phoneNumber"
              value={phoneNumber}
              onChange={handleChange}
              className="border border-gray-400 rounded-md px-3 py-2 focus:outline-none focus:border-blue-500"
            />
          </div>

          <div>
            <label htmlFor="designation">Choose Degree:</label>
            <input
              type="text"
              id="designation"
              name="designation"
              required
              value={formData.designation}
              readOnly
              className="border border-gray-400 rounded-md px-3 py-2 focus:outline-none focus:border-blue-500"
            />
          </div>

          <div>
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              name="email"
              required
              value={email}
              onChange={handleChange}
              readOnly
              className="border border-gray-400 rounded-md px-3 py-2 focus:outline-none focus:border-blue-500"
            />
          </div>

          <div className="password-input">
            <label htmlFor="password">Password:</label>
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              name="password"
              required
              value={password}
              onChange={handleChange}
              className="border border-gray-400 rounded-md px-3 py-2 focus:outline-none focus:border-blue-500"
            />
            <i
              className={`eye-icon ${showPassword ? "visible" : "hidden"}`}
              onClick={togglePasswordVisibility}
            ></i>
          </div>

          <div>
            <label htmlFor="otp">OTP:</label>
            <input
              type="text"
              id="otp"
              name="otp"
              required
              value={otp}
              onChange={handleChange}
              className="border border-gray-400 rounded-md px-3 py-2 focus:outline-none focus:border-blue-500"
            />
          </div>
        </div>

        <span>
          Already have an account <Link to="/login">Login</Link>
        </span>
        <br />

        <button
          onClick={handleSubmit}
          disabled={!isValidEmail}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          Submit
        </button>
      </div>
    </div>
  );
};

export default Signup;
